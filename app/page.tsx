import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Mission from "@/components/sections/Mission";
import Resources from "@/components/sections/Resources";
import Feedback from "@/components/sections/Feedback";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Website Content */}
      <main>
        <Hero />

        <About />

        <Stats />

        <Gallery />

        <Team />

        <Mission />

        <Resources />

        {/* Feedback Form */}
        <Feedback />

        {/* Contact Information */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}