"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HistoryEntry {
  type: "input" | "output" | "error";
  text: string;
}

type CommandFn = (args: string[]) => string;

interface Command {
  description: string;
  exec: CommandFn;
}

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", text: "RESEARCH_CORE Terminal v1.0.0" },
    { type: "output", text: 'Type "help" for available commands.' },
    { type: "output", text: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const commandsRef = useRef<Record<string, Command>>({});
  const historyStack = useRef<HistoryEntry[]>([]);
  const historyIndexRef = useRef(-1);

  const registerDefaults = useCallback(() => {
    const cmds: Record<string, Command> = {
      help: {
        description: "List available commands",
        exec: () =>
          "Available commands:\n" +
          Object.entries(commandsRef.current)
            .map(([name, cmd]) => `  ${name.padEnd(12)} ${cmd.description}`)
            .join("\n"),
      },
      clear: {
        description: "Clear terminal",
        exec: () => "__CLEAR__",
      },
      status: {
        description: "System status",
        exec: () =>
          "NODE: research-core\nUPTIME: 24d 7h 12m\nLOAD: 0.42 0.38 0.41\nMEM: 64.2% used\nNET: 2.4 gb/s tx, 1.8 gb/s rx",
      },
      streams: {
        description: "List active streams",
        exec: () =>
          "STREAM_ID          NODE         STATUS    RATE\n" +
          "str_alpha          NODE_ALPHA   ONLINE    847mb/s\n" +
          "str_beta           NODE_BETA    ONLINE    632mb/s\n" +
          "str_gamma          NODE_GAMMA   DEGRADED  124mb/s\n" +
          "str_delta          NODE_DELTA   ONLINE    2.1gb/s",
      },
      ping: {
        description: "Ping a node (usage: ping <node>)",
        exec: (args: string[]) => {
          if (!args[0]) return "Usage: ping <node_name>";
          const latency = Math.floor(Math.random() * 20 + 5);
          return `PING ${args[0].toUpperCase()} (192.168.1.${Math.floor(Math.random() * 254 + 1)}) ${latency}ms bytes`;
        },
      },
      date: {
        description: "Show current date and time",
        exec: () =>
          new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
      },
      whoami: {
        description: "Show current user",
        exec: () => "guest",
      },
      echo: {
        description: "Echo input back",
        exec: (args: string[]) => args.join(" "),
      },
    };
    commandsRef.current = cmds;
  }, []);

  useEffect(() => {
    registerDefaults();
  }, [registerDefaults]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0]?.toLowerCase() ?? "";
    const args = parts.slice(1).map((a) => a.replace(/^"(.*)"$/, "$1"));

    const command = commandsRef.current[cmd];
    if (command) return command.exec(args);
    return `command not found: ${cmd}. Type 'help' for available commands.`;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newHistory = [
          ...history,
          { type: "input" as const, text: currentInput },
        ];
        const output = executeCommand(currentInput);

        if (output === "__CLEAR__") {
          setHistory([]);
          historyStack.current = [];
        } else {
          if (output) newHistory.push({ type: "output", text: output });
          setHistory(newHistory);
          historyStack.current = newHistory;
        }

        historyIndexRef.current = -1;
        setCurrentInput("");
      } else if (e.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const entries = historyStack.current.filter((h) => h.type === "input");
        if (entries.length > 0) {
          const idx =
            historyIndexRef.current === -1
              ? entries.length - 1
              : Math.max(0, historyIndexRef.current - 1);
          historyIndexRef.current = idx;
          setCurrentInput(entries[idx].text);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const entries = historyStack.current.filter((h) => h.type === "input");
        if (entries.length > 0 && historyIndexRef.current >= 0) {
          const idx = historyIndexRef.current + 1;
          if (idx < entries.length) {
            historyIndexRef.current = idx;
            setCurrentInput(entries[idx].text);
          } else {
            historyIndexRef.current = -1;
            setCurrentInput("");
          }
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
      }
    },
    [history, currentInput, executeCommand]
  );

  const focusTerminal = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className="bg-surface-dark px-[var(--margin-desktop)] max-md:px-[var(--margin-mobile)] pb-10">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div
          ref={containerRef}
          onClick={focusTerminal}
          className="bg-surface-dark border border-white/20 p-4 font-mono text-xs leading-[1.6] text-text-on-dark min-h-[60vh] max-h-[60vh] overflow-y-auto cursor-text"
        >
          {history.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "error"
                  ? "text-[#ff6b6b]"
                  : line.type === "output"
                    ? "opacity-70"
                    : ""
              }
            >
              {line.type === "input" ? (
                <>
                  <span className="text-brand-gold">
                    guest@research-core:~${" "}
                  </span>
                  {line.text}
                </>
              ) : (
                line.text
              )}
            </div>
          ))}
          <div>
            <span className="text-brand-gold">
              guest@research-core:~${" "}
            </span>
            {currentInput}
            <span
              className="inline-block w-2 h-[14px] bg-brand-gold align-text-bottom"
            style={{
              animation: "terminal-blink 1s step-end infinite",
              verticalAlign: "text-bottom",
            }}
            />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="absolute -left-[9999px] opacity-0"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
