"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/repo");
    }
  }, [session, router]);

  const handleSignIn = async () => {
    await signIn("github");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="flex flex-col items-center justify-center space-y-4 mb-8 sm:mb-12">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white text-center">
          Amrita
        </h1>
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-yellow-300 text-center">
          Summer of Code 2025
        </h1>
        <p className="text-white text-center text-sm sm:text-base md:text-lg w-full max-w-[450px] bg-white/10 rounded-3xl p-4">
          {session
            ? "Welcome back! Configure your webhooks to sync your repo with SoC."
            : "Sign in with GitHub to get started with configuring webhooks to sync your repo with SoC."}
        </p>
      </div>
      {session ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-full w-full justify-center">
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm sm:text-base truncate">
              {session.user.name}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => signIn("github")}
              className="text-white/70 hover:text-white text-sm underline"
            >
              Switch Account
            </button>
            <button
              onClick={() => signOut()}
              className="text-white/70 hover:text-white text-sm underline"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/90 text-black rounded-full hover:bg-white duration-200 shadow-lg hover:scale-105 transform transition-transform w-full max-w-sm justify-center"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with GitHub
        </button>
      )}
    </div>
  );
}
