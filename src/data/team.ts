/**
 * EXPERTS & CREDENTIALS (Our Story page)
 * Add real people and verifiable credentials only. While a list is empty,
 * the page shows a clearly labelled "coming soon" placeholder.
 *
 * Example advisor:
 * { name: "…", role: "Nutrition advisor", bio: "…", image: "/images/team/….jpg" }
 *
 * Example credential:
 * { label: "FSSAI licence", value: "1234…" }
 */
export interface Person {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface Credential {
  label: string;
  value: string;
}

export const advisors: Person[] = [];
export const credentials: Credential[] = [];
