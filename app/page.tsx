import Image from "next/image";
import styles from "./page.module.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Testimonials } from "./components/Testimonials";
import { Technologies } from "./components/Technologies";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Technologies />
      <Testimonials />
      <Contact />
    </>
  );
}
