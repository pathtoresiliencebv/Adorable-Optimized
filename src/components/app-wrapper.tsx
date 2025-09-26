"use client";

import React, { useEffect, useState } from "react";
import Chat from "./chat";
import { TopBar } from "./topbar";
import WebView from "./webview";
import { UIMessage } from "ai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppWrapper({
  appName,
  repo,
  initialMessages,
  appId,
  repoId,
  baseId,
  domain,
  running,
  codeServerUrl,
  consoleUrl,
}: {
  appName: string;
  repo: string;
  appId: string;
  respond?: boolean;
  initialMessages: UIMessage[];
  repoId: string;
  baseId: string;
  codeServerUrl: string;
  consoleUrl: string;
  domain?: string;
  running: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        height: "100dvh",
      }}
    >
      <div className="flex-1 overflow-hidden grid grid-cols-2">
        <div className="h-full overflow-hidden flex flex-col">
          <QueryClientProvider client={queryClient}>
            <Chat
              topBar={
                <TopBar
                  appName={appName}
                  repoId={repoId}
                  consoleUrl={consoleUrl}
                  codeServerUrl={codeServerUrl}
                />
              }
              appId={appId}
              initialMessages={initialMessages}
              key={appId}
              running={running}
            />
          </QueryClientProvider>
        </div>

        <div className="h-full overflow-hidden relative border-l">
          <WebView
            repo={repo}
            baseId={baseId}
            appId={appId}
            domain={domain}
          />
        </div>
      </div>
    </div>
  );
}
