import { Hero } from "./components/pages/Hero";
import { Navbar } from "./components/ui/Navbar";
import { About } from "./components/pages/About";
import { Features } from "./components/pages/Features";
import { Footer } from "./components/pages/Footer";
import "./components/styles/style.css";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Footer />
    </SkeletonTheme>
  );
}

export default App;
