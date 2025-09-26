"use server";

import { getUser } from "@/auth/stack-auth";
import { freestyle } from "@/lib/freestyle";
import { templates } from "@/lib/templates";
import { memory, builderAgent } from "@/mastra/agents/builder";
import { sendMessageWithStreaming } from "@/lib/internal/stream-manager";
import { cloudstate } from "freestyle-sh";
import { App } from "@/cloudstate/models";
import { v4 as uuidv4 } from 'uuid';

export async function createApp({
  initialMessage,
  templateId,
}: {
  initialMessage?: string;
  templateId: string;
}) {
  console.time("get user");
  const user = await getUser();
  console.timeEnd("get user");

  if (!templates[templateId]) {
    throw new Error(
      `Template ${templateId} not found. Available templates: ${Object.keys(
        templates
      ).join(", ")}`
    );
  }

  console.time("git");
  const repo = await freestyle.createGitRepository({
    name: "Unnamed App",
    public: true,
    source: {
      type: "git",
      url: templates[templateId].repo,
    },
  });
  await freestyle.grantGitPermission({
    identityId: user.freestyleIdentity,
    repoId: repo.repoId,
    permission: "write",
  });

  const token = await freestyle.createGitAccessToken({
    identityId: user.freestyleIdentity,
  });
  console.timeEnd("git");

  console.time("dev server");
  const { mcpEphemeralUrl, fs } = await freestyle.requestDevServer({
    repoId: repo.repoId,
  });
  console.timeEnd("dev server");

  console.time("cloudstate: create app");
  const appId = uuidv4();
  const AppCS = cloudstate.get(App, { id: appId });
  
  await AppCS.init(appId, initialMessage || "Unnamed App", "No description", repo.repoId, templateId);
  await AppCS.setAdmin(user.userId, user.freestyleIdentity, token.token, token.id);

  const appInfo = {
      id: appId,
      name: await AppCS.name,
      gitRepo: await AppCS.gitRepo
  }
  console.timeEnd("cloudstate: create app");


  console.time("mastra: create thread");
  await memory.createThread({
    threadId: appInfo.id,
    resourceId: appInfo.id,
  });
  console.timeEnd("mastra: create thread");

  if (initialMessage) {
    console.time("send initial message");
    
    const message = {
        id: crypto.randomUUID(),
        parts: [
            {
                text: initialMessage,
                type: "text",
            },
        ],
        role: "user",
    };

    await AppCS.addMessage(message);

    // Send the initial message using the same infrastructure as the chat API
    await sendMessageWithStreaming(builderAgent, appInfo.id, mcpEphemeralUrl, fs, message);

    console.timeEnd("send initial message");
  }

  return appInfo;
}
