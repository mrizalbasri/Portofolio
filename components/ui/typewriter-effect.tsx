"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentCharIndex < wordsArray[currentWordIndex].text.length) {
            setCurrentCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentCharIndex > 0) {
            setCurrentCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % wordsArray.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentWordIndex, isDeleting, wordsArray]);

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <motion.span
        className={cn("inline-block", wordsArray[currentWordIndex]?.className)}
      >
        {wordsArray[currentWordIndex]?.text.slice(0, currentCharIndex).join("")}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-6 w-[4px] rounded-sm bg-primary",
          cursorClassName
        )}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn("text-foreground", word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="whitespace-nowrap text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block h-6 w-[4px] rounded-sm bg-primary sm:h-8 md:h-10 lg:h-12 xl:h-14",
          cursorClassName
        )}
      />
    </div>
  );
};

export default TypewriterEffect;
