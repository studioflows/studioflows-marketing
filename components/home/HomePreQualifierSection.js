"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  HOME_BODY_LG,
  HOME_CARD,
  HOME_CARD_PAD,
  HOME_CTA_PRIMARY,
  HOME_CTA_SECONDARY,
  HOME_EYEBROW_ACCENT,
  HOME_H2,
  HOME_SECTION,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { buildOpsHubUrl, getPreQualBand } from "@/lib/lead-attribution";
import { HOMEPAGE_CTA, PRE_QUALIFIER, QUIZ_QUESTIONS } from "@/lib/homepage-content";

function getAssessment(score) {
  if (score >= 13) {
    return {
      title: "High Operational Drag",
      body: "You likely have margin leakage and founder bottlenecking in your core execution flow.",
      qualified: true,
    };
  }
  if (score >= 8) {
    return {
      title: "Moderate Operational Drag",
      body: "You have partial structure, but handoffs and ownership still leak execution.",
      qualified: true,
    };
  }
  return {
    title: "Low to Moderate Drag",
    body: "You may not need a full audit slot yet. We recommend waitlist and follow-up first.",
    qualified: false,
  };
}

function DiagnosisQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const isComplete = questionIndex >= QUIZ_QUESTIONS.length;
  const score = answers.reduce((sum, item) => sum + item.score, 0);
  const assessment = getAssessment(score);
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  const selectAnswer = (option) => {
    const next = [...answers];
    next[questionIndex] = option;
    setAnswers(next);
    setQuestionIndex((prev) => prev + 1);
  };

  const opsHubHandoffUrl = assessment.qualified
    ? buildOpsHubUrl({
        source: "homepage-diagnosis",
        pqScore: score,
        pqQualified: assessment.qualified,
        pqBand: getPreQualBand(score),
      })
    : null;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`${HOME_CARD} ${HOME_CARD_PAD}`}
      >
        <p className={HOME_EYEBROW_ACCENT}>Pre-Qualifier Complete</p>
        <h3 className="mt-3 text-2xl font-bold">{assessment.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/80">{assessment.body}</p>
        <p className="mt-2 text-sm text-white/65">Ops Drag Snapshot: {score} / 18</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {assessment.qualified ? (
            <Link href={opsHubHandoffUrl} className={HOME_CTA_PRIMARY}>
              {HOMEPAGE_CTA.auditLabel}
            </Link>
          ) : (
            <Link href={HOMEPAGE_CTA.vessaWaitlistHref} className={HOME_CTA_PRIMARY}>
              {HOMEPAGE_CTA.vessaWaitlistLabel}
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setQuestionIndex(0);
              setAnswers([]);
            }}
            className={HOME_CTA_SECONDARY}
          >
            Retake Pre-Qualifier
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`${HOME_CARD} ${HOME_CARD_PAD}`}>
      <div className="flex items-center justify-between text-xs text-white/65">
        <span>
          Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span>{Math.round((questionIndex / QUIZ_QUESTIONS.length) * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
        <motion.div
          className="h-1.5 rounded-full bg-[#FACC15]"
          animate={{ width: `${(questionIndex / QUIZ_QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mt-5 text-xl font-semibold leading-8">{currentQuestion.prompt}</h3>
          <div className="mt-4 space-y-2.5">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-sm text-white/88 transition hover:bg-white/[0.06]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-5">
        <button
          type="button"
          disabled={questionIndex === 0}
          onClick={() => setQuestionIndex((prev) => Math.max(prev - 1, 0))}
          className="rounded-lg border border-white/25 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/75 disabled:opacity-45"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default function HomePreQualifierSection() {
  return (
    <motion.section id="diagnosis" className={HOME_SECTION} {...SECTION_REVEAL}>
      <p className={HOME_EYEBROW_ACCENT}>{HOMEPAGE_CTA.diagnosisLabel}</p>
      <h2 className={`mt-4 max-w-[980px] text-left ${HOME_H2}`}>{PRE_QUALIFIER.heading}</h2>
      <p className={`mt-4 max-w-[980px] text-left ${HOME_BODY_LG}`}>{PRE_QUALIFIER.subcopy}</p>
      <div className="mt-7">
        <DiagnosisQuiz />
      </div>
      <p className="mt-4 text-sm text-white/62">{PRE_QUALIFIER.footnote}</p>
    </motion.section>
  );
}
