import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import AboutProject from "./AboutProject";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <AboutProject />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
