"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Clapperboard,
  HeartPulse,
  Shuffle,
  Wrench,
} from "lucide-react";

import { REC_FIT_BUSINESSES } from "@/lib/rec-case-study";

const CATEGORY_ICONS = {
  media: Clapperboard,
  field: Wrench,
  mobile: HeartPulse,
  agency: Briefcase,
  property: Building2,
};

export default function RecFitExplorer() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);

  const category = REC_FIT_BUSINESSES[categoryIndex];
  const item = category.items[itemIndex];
  const Icon = CATEGORY_ICONS[category.id] ?? Briefcase;

  const totalLanes = useMemo(
    () => REC_FIT_BUSINESSES.reduce((sum, group) => sum + group.items.length, 0),
    [],
  );

  const exploredCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < categoryIndex; i += 1) {
      count += REC_FIT_BUSINESSES[i].items.length;
    }
    return count + itemIndex + 1;
  }, [categoryIndex, itemIndex]);

  function selectCategory(index) {
    setCategoryIndex(index);
    setItemIndex(0);
  }

  function selectItem(index) {
    setItemIndex(index);
  }

  function shuffleLane() {
    const pool = category.items;
    if (pool.length <= 1) return;
    let next = Math.floor(Math.random() * pool.length);
    while (next === itemIndex) {
      next = Math.floor(Math.random() * pool.length);
    }
    setItemIndex(next);
  }

  function nextLane() {
    setItemIndex((prev) => (prev + 1) % category.items.length);
  }

  function seeInRec() {
    const tabId = item.recTabId || "workspace";
    const url = new URL(window.location.href);
    url.searchParams.set("rec", tabId);
    window.history.pushState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
    document.getElementById("rec-spotlight")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C4B5FD]">Sound like your week?</p>
          <p className="mt-2 max-w-[520px] text-sm text-white/65">
            Pick a lane. See the ops pattern REC runs for teams like yours.
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
          Lane {exploredCount} of {totalLanes}
        </p>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {REC_FIT_BUSINESSES.map((group, index) => {
          const CatIcon = CATEGORY_ICONS[group.id] ?? Briefcase;
          const active = categoryIndex === index;
          return (
            <motion.button
              key={group.id}
              type="button"
              onClick={() => selectCategory(index)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-left transition ${
                active
                  ? "bg-[#FACC15] text-black shadow-[0_8px_24px_rgba(250,204,21,0.25)]"
                  : "bg-black/40 text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:bg-white/[0.08]"
              }`}
              whileHover={{ y: active ? 0 : -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <CatIcon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.12em]">{group.category}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/50">{category.tagline}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {category.items.map((lane, index) => {
          const active = itemIndex === index;
          return (
            <motion.button
              key={lane.id}
              type="button"
              onClick={() => selectItem(index)}
              className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
                active
                  ? "bg-white text-black shadow-[0_0_0_1px_rgba(250,204,21,0.5)]"
                  : "bg-white/[0.06] text-[#C7D2FE] hover:bg-white/[0.12]"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {lane.shortLabel}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${category.id}-${item.id}`}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.99 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-5 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(30,27,75,0.85),rgba(10,10,10,0.95))] p-5 shadow-[0_0_0_1px_rgba(196,181,253,0.25),0_20px_50px_rgba(0,0,0,0.45)] sm:p-7"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FACC15]/15 blur-3xl"
            aria-hidden
          />
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FACC15]/15 shadow-[inset_0_0_0_1px_rgba(250,204,21,0.35)]">
              <Icon className="h-5 w-5 text-[#FDE68A]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4B5FD]">{category.category}</p>
              <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">{item.name}</h3>
            </div>
          </div>

          <p className="mt-5 text-base font-medium leading-7 text-[#FDE68A] sm:text-lg">{item.hook}</p>
          <p className="mt-3 text-sm leading-7 text-white/76">{item.pain}</p>
          <p className="mt-4 text-xs text-white/50">Same ops shape REC installed. Your labels change. The control layer does not.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <motion.button
              type="button"
              onClick={seeInRec}
              className="inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black transition hover:brightness-105"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              See in REC
            </motion.button>
            <motion.button
              type="button"
              onClick={shuffleLane}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:bg-white/[0.08]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden />
              Surprise me
            </motion.button>
            {category.items.length > 1 ? (
              <motion.button
                type="button"
                onClick={nextLane}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C7D2FE] transition hover:bg-white/[0.14]"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Next in {category.category}
              </motion.button>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
