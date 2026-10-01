import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { getHelpResponse, type HelpMessage } from "@/lib/help-ai";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — WorkWave" },
      {
        name: "description",
        content:
          "Ask our AI assistant anything about WorkWave — finding work, posting gigs, volunteering, communities, and more.",
      },
    ],
  }),
  component: Help,
});

const card =
  "rounded-2xl border border-border bg-card/80 p-6 backdrop-blur shadow-[0_20px_60px_-30px_oklch(0.62_0.22_305/0.8)]";

const input =
  "w-full rounded-xl border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const primaryBtn =
  "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50";

const SUGGESTIONS = [
  "How do I find work?",
  "How do I post a gig?",
  "How do I create a community?",
  "How does verification work?",
  "Is there an age limit?",
  "How do I contact someone?",
];

function Help() {
  const [messages, setMessages] = useState<HelpMessage[]>([
    {
      role: "ai",
      text: "Hi! I'm your WorkWave assistant. Ask me anything about finding work, posting gigs, volunteering, creating communities, verification, payments, or anything else about the platform. How can I help?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function ask(question: string) {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInputValue("");
    setThinking(true);

    setTimeout(() => {
      const response = getHelpResponse(question);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setThinking(false);
    }, 600);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Help
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Ask{" "}
        <span className="bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
          anything
        </span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Our AI assistant knows everything about WorkWave. Type your question below.
      </p>

      <div className={`mt-6 ${card} flex h-[60vh] flex-col`}>
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/70 border border-border text-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-background/70 border border-border px-4 py-3">
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 border-t border-border pt-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="mt-3 flex gap-2 border-t border-border pt-3">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(inputValue);
              }
            }}
            placeholder="Type your question…"
            maxLength={500}
            className={input}
          />
          <button
            type="button"
            disabled={!inputValue.trim() || thinking}
            onClick={() => ask(inputValue)}
            className={primaryBtn}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
