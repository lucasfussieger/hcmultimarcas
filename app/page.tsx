import Destaques from "./components/destaques";
import Hero from "./components/hero";
import SobreResumo from "./components/sobreresumo";

export default function Home() {
    return (
        <section className="bg-gray-200 min-h-screen">
            <Hero />
            <Destaques />
            <SobreResumo />
        </section>
    )
}