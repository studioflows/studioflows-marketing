import { REC_FIT_BUSINESSES } from "@/lib/rec-case-study";

export const PLATFORM_VERTICAL_MOLDS = REC_FIT_BUSINESSES.map((group) => ({
  id: group.id,
  category: group.category,
  tagline: group.tagline,
  examples: group.items.map((item) => item.name),
}));

export function flattenPlatformMoldOptions() {
  return REC_FIT_BUSINESSES.flatMap((group) =>
    group.items.map((item) => ({
      value: `${group.id}:${item.id}`,
      label: `${group.category} — ${item.name}`,
    })),
  );
}
