import Navbar from "../../components/layout/NavBar.jsx";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer />
    </div>
  );
};

export default Home;