import LoginPage from "@/components/login/LoginPage";
import { getCountries, DEFAULT_COUNTRY_CCA2 } from "@/lib/countries";

export const metadata = {
  title: "Log In — nativeChat",
  description: "Verify your mobile number to log in to nativeChat.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Login() {
  const countries = getCountries();
  const defaultCountry = countries.find((c) => c.cca2 === DEFAULT_COUNTRY_CCA2) ?? countries[0];

  return <LoginPage countries={countries} defaultCountry={defaultCountry} />;
}
