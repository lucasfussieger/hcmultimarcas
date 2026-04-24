import DestaquesWrapper from "./components/DestaquesWrapper";
import Hero from "./components/hero";
import SobreResumo from "./components/sobreresumo";

export default function Home() {
    return (
        <section className="bg-gray-200 min-h-screen">
            <Hero />
            <DestaquesWrapper />
            <SobreResumo />
        </section>
    )
}