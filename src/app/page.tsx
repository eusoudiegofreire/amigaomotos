import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import HeroSeam from "@/components/HeroSeam";
import Servicos from "@/components/Servicos";
import Sobre from "@/components/Sobre";
import Galeria from "@/components/Galeria";
import Localizacao from "@/components/Localizacao";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HeroSeam />
      <Servicos />
      <Sobre />
      <Galeria />
      <Localizacao />
      <Contato />
      <Footer />
    </main>
  );
}
