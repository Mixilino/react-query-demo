import type { PresentationData, Slide } from "../types/presentation";

/**
 * Helper function to create a single slide
 */
export function createSlide({
  bulletPoints,
  subtitle,
}: {
  bulletPoints: string[];
  subtitle?: string;
}): Slide {
  return {
    subtitle,
    bulletPoints,
  };
}

/**
 * Helper function to create presentation data from multiple slides
 */
export function createPresentation({
  slides,
}: {
  slides: Slide[];
}): PresentationData {
  return {
    slides,
  };
}

/**
 * Helper function to create a simple single-slide presentation
 */
export function createSingleSlidePresentation(
  bulletPoints: string[],
  subtitle?: string
): PresentationData {
  return {
    slides: [
      {
        subtitle,
        bulletPoints,
      },
    ],
  };
}

/**
 * Helper function to create presentation data from legacy format
 * This helps with migration from old modal format
 */
export function createPresentationFromLegacy(
  bulletPoints: string[],
  subtitle?: string
): PresentationData {
  return createSingleSlidePresentation( bulletPoints, subtitle);
}
    