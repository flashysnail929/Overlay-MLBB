// heroImages.ts
export const heroImages = import.meta.glob(
  "@/assets/HeroPick/*.{png,webp}",
  {
    eager: true,
    import: "default",
  }
)as Record<string, string>;