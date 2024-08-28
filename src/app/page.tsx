import HomePage from "./componets/mainPages/homepage";
import Navbar from "./componets/mainPages/NavBar";
import VortexDemoSecond from "./componets/mainPages/About";
import Services from "./componets/mainPages/Services";
import Portfolio from "./componets/mainPages/Portfolio";
import Contact from "./componets/mainPages/Contact";
import Products from "./componets/mainPages/Products";
import Footer from "./componets/mainPages/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <VortexDemoSecond />
      <Services />
      <Portfolio />
      <Products />
      <Contact />
      <Footer />
    </>
  );
}
