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
import Link from "next/link";
import { FrameworkSelector } from "@/components/framework-selector";

const queryClient = new QueryClient();

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState("nextjs");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    router.push(
      `/app/new?message=${encodeURIComponent(prompt)}&template=${framework}`
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-[#111111] text-white">
        <header className="p-4 flex justify-between items-center border-b border-neutral-800">
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src={LogoSvg}
              alt="Qreatify Logo"
              width={28}
              height={28}
            />
            <h1 className="text-xl font-bold">Qreatify</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
            <Link href="#" className="hover:text-white">FAQ</Link>
            <Link href="#" className="hover:text-white">Blog</Link>
            <Link href="#" className="hover:text-white">Pricing</Link>
            <Link href="#" className="hover:text-white">Discord</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="bg-transparent border-neutral-700 hover:bg-neutral-800">Get free credits</Button>
            <UserButton />
          </div>
        </header>

        <div className="py-20 md:py-32 text-center">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4">
              Build native mobile apps, fast.
            </h1>
            <p className="text-lg text-neutral-400 max-w-3xl mx-auto mb-12">
             Qreatify builds complete, cross-platform mobile apps using AI and React Native. 
             Describe the mobile app you want to build...
            </p>

            <div className="w-full max-w-2xl mx-auto px-4">
                 <div className="w-full bg-black/50 border border-neutral-700 rounded-md relative z-10 backdrop-blur-sm">
                  <PromptInput
                    leftSlot={
                      <FrameworkSelector
                        value={framework}
                        onChange={setFramework}
                      />
                    }
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
              <Examples setPrompt={setPrompt} />
            </div>
        </div>

        <div className="border-t border-neutral-800 py-16">
            <h2 className="text-2xl font-bold text-center mb-8">Your Recent Projects</h2>
            <UserApps />
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
      text: "Real Estate Platform",
      prompt:
        "A real estate platform to browse and search for property listings.",
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
