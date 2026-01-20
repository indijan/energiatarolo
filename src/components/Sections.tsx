"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bolt, ShieldCheck, Sparkles, Zap, CircuitBoard, Mail } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function HeroSection({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[42px] border border-white/10 bg-slate-900/70 px-6 py-16 shadow-2xl">
      <div className="absolute inset-0">
        <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute -right-6 bottom-0 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="circuit-lines absolute inset-0" />
      </div>
      <motion.div {...fadeUp} className="relative">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/70">Pályázati előszűrés</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
          Energiatároló támogatás gyors előszűrése
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/70">
          Tudd meg 2 perc alatt, hogy jó eséllyel megfelelsz-e a támogatási feltételeknek. A landing
          segít tisztán látni, mielőtt hivatalos pályázatot indítanál.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onCTAClick}
            className="flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Jogosultság ellenőrzése (2 perc)
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Nem kérünk adatbázisos regisztrációt
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function UsesOfFundsSection() {
  return (
    <section className="rounded-[36px] border border-white/10 bg-slate-950/70 p-8">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan-200/70">
          <Bolt className="h-4 w-4" />
          Mire használható a támogatás?
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-white">A pályázat célja az energiatárolás erősítése</h2>
        <p className="mt-3 max-w-3xl text-white/70">
          A pályázati kiírás szerint általában az alábbi tételek támogathatók. A pontos részleteket
          mindig a hivatalos felhívásban érdemes ellenőrizni.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Otthoni energiatároló beszerzése",
              text: "Tipikusan 8-12 kWh körüli kapacitású akkumulátor rendszerek.",
            },
            {
              title: "Kapcsolódó telepítési munkák",
              text: "Kivitelezés, szerelés, engedélyeztetés a kiírás szerinti keretek között.",
            },
            {
              title: "Szükséges kiegészítők",
              text: "Inverter, vezérlés, rendszerintegráció és hálózati eszközök.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="rounded-[36px] border border-white/10 bg-slate-900/70 p-8">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan-200/70">
          <CircuitBoard className="h-4 w-4" />
          Hogyan működik?
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-white">3 egyszerű lépés a tiszta képhez</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Gyors kérdéssor",
              text: "7-8 rövid kérdés alapján előszűrjük a jogosultságot.",
              icon: <Zap className="h-5 w-5 text-emerald-300" />,
            },
            {
              step: "02",
              title: "Inverter kijelző",
              text: "Azonnali vizuális jelzés: indulhat / nem indulhat.",
              icon: <Sparkles className="h-5 w-5 text-cyan-300" />,
            },
            {
              step: "03",
              title: "Kapcsolatfelvétel",
              text: "Google űrlapon keresztül visszahívást kérhetsz.",
              icon: <Mail className="h-5 w-5 text-sky-300" />,
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">{item.step}</span>
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function FAQSection() {
  const items = [
    {
      q: "Ez hivatalos pályázati oldal?",
      a: "Nem. Ez az oldal tájékoztató és előszűrő célú, a részletek a hivatalos felhívásban találhatók.",
    },
    {
      q: "Mit jelent az \"Indulhat\" állapot?",
      a: "Az előszűrés alapján valószínűsíthető, hogy megfelelsz a kulcskritériumoknak.",
    },
    {
      q: "Mi történik az űrlap kitöltése után?",
      a: "A kapcsolatfelvételi űrlap alapján visszahívást egyeztetünk, nincs adatbázisos regisztráció.",
    },
  ];

  return (
    <section className="rounded-[36px] border border-white/10 bg-slate-950/70 p-8">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan-200/70">
          <Sparkles className="h-4 w-4" />
          GYIK
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.q} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-lg font-semibold text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-white/60">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-white/70">
          <p>
            Ez az oldal nem hivatalos kormányzati oldal. Tájékoztató és előszűrő célú. A pályázati
            részletekért mindig a hivatalos felhívás az irányadó.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export function ContactSection() {
  const GOOGLE_FORM_EMBED_URL = "https://forms.gle/rgrzgjkYfcQH5W2S6";

  return (
    <section id="contact" className="rounded-[36px] border border-white/10 bg-slate-900/70 p-8">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan-200/70">
          <Mail className="h-4 w-4" />
          Kapcsolat / Visszahívás
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-white">Add le az érdeklődésedet egy perc alatt</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          A kapcsolatfelvétel Google Formon keresztül történik. Az adataid a Google rendszereiben
          kerülnek rögzítésre, adatbázist nem üzemeltetünk.
        </p>
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-2">
          <div className="aspect-[4/5] w-full sm:aspect-[16/9]">
            <iframe
              title="Kapcsolatfelvétel"
              src={GOOGLE_FORM_EMBED_URL}
              className="h-full w-full rounded-2xl border-0 bg-white"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-white/50">
          Adatkezelés: <a className="underline" href="#">Adatkezelési tájékoztató</a> • A Google
          űrlapok saját adatkezelési szabályzata szerint működnek.
        </p>
      </motion.div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="rounded-[30px] border border-white/10 bg-slate-950/70 p-6 text-sm text-white/60">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>Energiatároló pályázati előszűrés — 2024</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Adatkezelés</a>
          <a href="#" className="hover:text-white">Impresszum</a>
        </div>
      </div>
    </footer>
  );
}
