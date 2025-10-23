import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Objetivos from "@/components/Objetivos";
import Veiculos from "@/components/Veiculos";
import Transmissoes from "@/components/Transmissoes";
import Dados from "@/components/Dados";
import PitchComparativo from "@/components/PitchComparativo";
import Parcerias from "@/components/Parcerias";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Objetivos />
      <Veiculos />
      <Transmissoes />
      <Dados />
      <PitchComparativo />
      <Parcerias />
      <Contato />
      <Footer />
    </div>
  );
};

export default Index;
