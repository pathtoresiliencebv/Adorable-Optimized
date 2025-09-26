"use client";

import { useRouter } from "next/navigation";
import { PromptInput, PromptInputActions } from "@/components/ui/prompt-input";
import Image from "next/image";
import LogoSvg from "@/logo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExampleButton } from "@/components/ExampleButton";
import { UserButton } from "@stackframe/stack";
import { UserApps } from "@/components/user-apps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PromptInputTextareaWithTypingAnimation } from "@/components/prompt-input";
import { Code2 } from "lucide-react";

const queryClient = new QueryClient();

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    router.push(`/app/new?message=${encodeURIComponent(prompt)}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-4 relative bg-[#111111] text-white">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
        <div className="absolute top-4 right-4 z-20">
          <UserButton />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="absolute top-8 flex items-center gap-2 text-sm bg-black px-3 py-1 rounded-full">
            <Code2 className="w-4 h-4" />
            <span>Powered by Expo & NativeWind</span>
          </div>

          <div className="w-full max-w-2xl px-4 mx-auto mt-[-100px]">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4">
              Prompt to Mobile App
            </h1>
            <p className="text-lg text-neutral-400 mb-12">
              Chat and get production-ready React Native App with AI.
            </p>

            <div className="w-full relative">
              <div className="relative w-full">
                <div className="w-full bg-black/50 border border-neutral-700 rounded-md relative z-10 backdrop-blur-sm">
                  <PromptInput
                    isLoading={isLoading}
                    value={prompt}
                    onValueChange={setPrompt}
                    onSubmit={handleSubmit}
                    className="relative z-10 border-none bg-transparent shadow-none"
                  >
                    <PromptInputTextareaWithTypingAnimation placeholder="Describe your app idea..." />
                    <PromptInputActions>
                      <Button
                        variant={"ghost"}
                        size="sm"
                        onClick={handleSubmit}
                        disabled={isLoading || !prompt.trim()}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white h-8 text-sm"
                      >
                        Create my app
                      </Button>
                    </PromptInputActions>
                  </PromptInput>
                </div>
              </div>
            </div>
            <Examples setPrompt={setPrompt} />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}

function Examples({ setPrompt }: { setPrompt: (text: string) => void }) {
  const examplePrompts = [
    {
      text: "Fitness App",
      prompt: "A fitness app that tracks workouts and nutrition.",
    },
    {
      text: "Food Delivery",
      prompt: "A food delivery app for local restaurants.",
    },
    { text: "Task Manager", prompt: "A simple task manager app." },
    {
      text: "E-commerce Storefront",
      prompt: "An e-commerce storefront for a clothing brand.",
    },
    {
      text: "Portfolio Website",
      prompt: "A personal portfolio website for a designer.",
    },
    {
      text: "Real Estate Platform",
      prompt:
        "A real estate platform to browse and search for property listings.",
    },
    {
      text: "Learning Management System",
      prompt: "A learning management system for online courses.",
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-3">
        {examplePrompts.map((example) => (
          <ExampleButton
            key={example.text}
            text={example.text}
            promptText={example.prompt}
            onClick={() => setPrompt(example.prompt)}
          />
        ))}
      </div>
    </div>
  );
}
