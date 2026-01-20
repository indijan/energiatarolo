"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { InverterIndicator, EligibilityStatus } from "./InverterIndicator";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: "adult",
    question: "Nagykorú magánszemély vagy, magyar adóazonosítóval?",
    type: "yesno",
    hard: true,
  },
  {
    id: "address",
    question: "A beruházás helyszíne a magyarországi állandó lakcímedhez köthető?",
    type: "yesno",
    hard: true,
  },
  {
    id: "property",
    question: "Van megfelelő jogcímed az ingatlanhoz (tulajdon, haszonélvezet, stb.)?",
    type: "yesno",
    hard: true,
  },
  {
    id: "grid",
    question: "Az ingatlan hálózatra csatlakoztatott és technikailag alkalmas?",
    type: "yesno",
    hard: true,
  },
  {
    id: "solar",
    question: "Van már napelemed vagy vállalod a napelem-telepítést?",
    type: "yesno",
    hard: true,
  },
  {
    id: "storage",
    question: "Tervezel otthoni energiatárolót (kb. 10 kWh kategória)?",
    type: "yesno",
    hard: false,
  },
  {
    id: "timeline",
    question: "12 hónapon belül meg tudod valósítani a beruházást?",
    type: "yesno",
    hard: false,
  },
  {
    id: "budget",
    question: "Tudod vállalni az önerőt és a szükséges adminisztrációt?",
    type: "yesno",
    hard: false,
  },
];

type Answer = "yes" | "no" | undefined;

type AnswerMap = Record<string, Answer>;

interface EligibilityWizardProps {
  onCompleteScroll: () => void;
}

export function EligibilityWizard({ onCompleteScroll }: EligibilityWizardProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[current];
  const total = questions.length;
  const progress = Math.round(((current + 1) / total) * 100);

  const status: EligibilityStatus = useMemo(() => {
    if (!showResult) return "pending";
    const failedHard = questions.some(
      (question) => question.hard && answers[question.id] === "no"
    );
    return failedHard ? "ineligible" : "eligible";
  }, [answers, showResult]);

  const handleAnswer = (value: Answer) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  const goNext = () => {
    if (!canProceed) return;
    if (current < total - 1) {
      setCurrent((prev) => prev + 1);
      return;
    }
    setShowResult(true);
  };

  const goBack = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
  };

  return (
    <section
      id="eligibility"
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/60 p-6 shadow-2xl"
    >
      <div className="absolute inset-0 opacity-60">
        <div className="pulse-line absolute left-6 top-6 h-1 w-24 rounded-full bg-cyan-400/70" />
        <div className="pulse-line absolute right-10 top-20 h-1 w-28 rounded-full bg-emerald-400/60" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Jogosultsági szűrés</p>
            <span className="text-xs text-white/60">Lépés {showResult ? total : current + 1}/{total}</span>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${showResult ? 100 : progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400"
            />
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-semibold text-white">{currentQuestion.question}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {([
                    { label: "Igen", value: "yes" },
                    { label: "Nem", value: "no" },
                  ] as const).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      className={`rounded-2xl border px-4 py-5 text-left text-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 ${
                        answers[currentQuestion.id] === option.value
                          ? "border-cyan-400 bg-cyan-400/15 text-white"
                          : "border-white/10 bg-slate-950/60 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {option.label}
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-semibold text-white">Eredmény</h3>
                <p className="mt-3 text-white/70">
                  Ez egy gyors előszűrés a pályázati feltételek alapján. A részleteket a hivatalos
                  felhívás tartalmazza.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40"
                  >
                    Újrakezdés
                  </button>
                  <button
                    type="button"
                    onClick={onCompleteScroll}
                    className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Kapcsolatfelvétel (Google űrlap)
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Vissza
            </button>
            {!showResult && (
              <button
                type="button"
                disabled={!canProceed}
                onClick={goNext}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                  canProceed
                    ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                    : "bg-white/10 text-white/30"
                }`}
              >
                Következő
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <InverterIndicator status={status} />
        </div>
      </div>
    </section>
  );
}
