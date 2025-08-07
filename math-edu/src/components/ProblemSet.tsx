"use client";

import { PracticeProblem } from "@/data/types";
import { useState } from "react";

function MultipleChoice({ problem }: { problem: PracticeProblem }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isAnswered = selectedIndex !== null;
  const isCorrect = isAnswered && selectedIndex === problem.correctIndex;

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-black/10">
      <p className="font-medium mb-3">{problem.question}</p>
      <div className="flex flex-col gap-2">
        {problem.choices.map((choice, idx) => {
          const chosen = selectedIndex === idx;
          const correct = idx === problem.correctIndex;
          const showCorrect = isAnswered && correct;
          return (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`text-left rounded-md border px-3 py-2 transition-colors
                ${chosen ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40" : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"}
                ${showCorrect ? "!border-green-600" : ""}
              `}
              disabled={isAnswered}
            >
              <span className="mr-2 text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/10">{String.fromCharCode(65 + idx)}</span>
              {choice}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div className={`mt-3 text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
          {isCorrect ? "Correct!" : "Not quite. Review and try similar problems."}
          {problem.explanation && (
            <p className="mt-2 text-foreground/80">Explanation: {problem.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProblemSet({ problems }: { problems: PracticeProblem[] }) {
  return (
    <section className="flex flex-col gap-4">
      {problems.map((p) => (
        <MultipleChoice key={p.id} problem={p} />
      ))}
    </section>
  );
}