"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?",
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [gibberishChars, setGibberishChars] = useState<string[]>([]);

  // Initialize gibberish characters
  const getRandomChar = useCallback(() => {
    return charset[Math.floor(Math.random() * charset.length)];
  }, [charset]);

  // Initialize gibberish array
  useEffect(() => {
    setGibberishChars(
      text.split("").map((char) => (char === " " ? " " : getRandomChar()))
    );
  }, [text, getRandomChar]);

  // Reveal characters one by one
  useEffect(() => {
    if (revealedCount >= text.length) return;

    const timeout = setTimeout(() => {
      setRevealedCount((prev) => prev + 1);
    }, revealDelayMs);

    return () => clearTimeout(timeout);
  }, [revealedCount, text.length, revealDelayMs]);

  // Flip gibberish characters
  useEffect(() => {
    const interval = setInterval(() => {
      setGibberishChars((prev) =>
        prev.map((char, index) => {
          if (index < revealedCount) return char;
          if (text[index] === " ") return " ";
          return getRandomChar();
        })
      );
    }, flipDelayMs);

    return () => clearInterval(interval);
  }, [revealedCount, text, flipDelayMs, getRandomChar]);

  const characters = useMemo(() => {
    return text.split("").map((char, index) => {
      const isRevealed = index < revealedCount;
      const displayChar = isRevealed ? char : gibberishChars[index] || char;

      return (
        <span
          key={index}
          className={cn(
            "transition-colors duration-100",
            isRevealed ? revealedClassName : encryptedClassName
          )}
        >
          {displayChar}
        </span>
      );
    });
  }, [
    text,
    revealedCount,
    gibberishChars,
    encryptedClassName,
    revealedClassName,
  ]);

  return <span className={cn("inline-block", className)}>{characters}</span>;
}
