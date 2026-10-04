import countries from "world-countries";

export const DEFAULT_COUNTRY_CCA2 = "IN";

// Server-only: world-countries' full dataset (borders, languages, capitals,
// coordinates, ...) is ~1MB and must never reach the client bundle. Callers
// import this from a Server Component and pass the slim result down as a
// prop, so only {cca2, name, flag, dialCode} × ~250 gets serialized.
export function getCountries() {
  return countries
    .filter((c) => c.idd?.root)
    .map((c) => {
      const suffix = c.idd.suffixes?.length === 1 ? c.idd.suffixes[0] : "";
      return {
        cca2: c.cca2,
        name: c.name.common,
        dialCode: c.idd.root + suffix,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
