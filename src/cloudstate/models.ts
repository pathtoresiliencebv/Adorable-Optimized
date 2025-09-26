import { cloudstate } from "freestyle-sh";
import type { UIMessage } from "ai";

// Using a class for user permissions to be extensible
export class UserPermission {
  canRead: boolean = true;
  canWrite: boolean = false;
  canAdmin: boolean = false;
}

@cloudstate
export class AppUser {
  permissions: UserPermission = new UserPermission();
  freestyleIdentity: string = "";
  freestyleAccessToken: string = "";
  freestyleAccessTokenId: string = "";
}

@cloudstate
export class App {
  static id: string; // The app's ID will be the static ID for the class instance

  name: string = "Unnamed App";
  description: string = "No description";
  gitRepo: string = "";
  baseId: string = "nextjs-dkjfgdf"; // Default template
  previewDomain?: string;
  createdAt: Date = new Date();
  users: Record<string, AppUser> = {}; // Maps userId to AppUser object
  messages: UIMessage[] = [];

  constructor(id: string, name: string, description: string, gitRepo: string, baseId?: string) {
    App.id = id;
    this.name = name;
    this.description = description;
    this.gitRepo = gitRepo;
    if (baseId) {
        this.baseId = baseId;
    }
  }

  addUser(userId: string): AppUser {
    const newUser = new AppUser();
    this.users[userId] = newUser;
    return newUser;
  }

  setAdmin(userId: string, freestyleIdentity: string, freestyleAccessToken: string, freestyleAccessTokenId: string): AppUser {
    let user = this.users[userId];
    if (!user) {
      user = this.addUser(userId);
    }
    user.permissions.canWrite = true;
    user.permissions.canAdmin = true;
    user.freestyleIdentity = freestyleIdentity;
    user.freestyleAccessToken = freestyleAccessToken;
    user.freestyleAccessTokenId = freestyleAccessTokenId;
    return user;
  }

  addMessage(message: UIMessage) {
    this.messages.push(message);
  }
  
  getMessages(): UIMessage[] {
    return this.messages;
  }
}
