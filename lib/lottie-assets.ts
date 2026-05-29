export const LOTTIE_ASSETS = {
  hero: "/lottie/hero-workflow.json",
  optimize: "/lottie/optimize.json",
  accelerate: "/lottie/accelerate.json",
  customCommand: "/lottie/custom-command.json",
  signalPulse: "/lottie/signal-pulse.json",
  ctaSpark: "/lottie/cta-spark.json",
} as const;

export const ENGAGEMENT_PATH_LOTTIES: Record<string, string> = {
  optimize: LOTTIE_ASSETS.optimize,
  accelerate: LOTTIE_ASSETS.accelerate,
  custom_command: LOTTIE_ASSETS.customCommand,
};
