"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart, MapPin, NavigationArrow, Phone, Smiley, Car, Sun } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TEL = "tel:+19722124080", PHONE = "(972) 212-4080";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=3035+S+Shiloh+Rd+130+Garland+TX+75041";
// Listings say 5 AM to noon or 1 PM daily, and they may close early when sold out; confirm.
const HOURS: Hours = { 0: [5, 12], 1: [5, 12], 2: [5, 12], 3: [5, 12], 4: [5, 12], 5: [5, 12], 6: [5, 12] };
const WHY = [["w1", Heart], ["w2", Smiley], ["w3", Sun], ["w4", Car]] as const;
const SPRINKLES = [["M34 34l6 4", "#ffd23f"], ["M80 30l-4 6", "#33c3f0"], ["M90 60l4 6", "#8be37a"], ["M30 70l7-2", "#33c3f0"], ["M50 92l6 3", "#ffd23f"], ["M78 86l4-5", "#fff"], ["M58 28h7", "#fff"], ["M40 56l-2 6", "#8be37a"], ["M84 46l6 0", "#ffd23f"]];

/** The house donut: golden dough, glaze that follows the theme, rainbow sprinkles. */
function Donut({ className, hole = "var(--bg)" }: { className?: string; hole?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="#e8b06a" />
      <path className="glazed transition-[fill] duration-500" fill="var(--glaze)" d="M60 12c14 0 24 4 32 12 6 6 4 12 10 18 6 7 4 14 2 22-2 9-8 12-10 20-3 9-12 16-22 18-10 2-14-4-24-2-10 2-18-2-24-10-6-8-4-14-8-22-4-8-6-14-2-24 4-9 10-12 14-20 6-9 18-12 32-12z" />
      <circle cx="60" cy="60" r="16" fill={hole} /><circle cx="60" cy="60" r="16" fill="none" stroke="#c98c4a" strokeWidth="4" />
      <g strokeWidth="5" strokeLinecap="round">{SPRINKLES.map(([d, c]) => <path key={d} className="spr" d={d} stroke={c} />)}</g>
    </svg>
  );
}
const TREATS = [
  { k: "m1", art: <Donut className="size-full" hole="var(--card)" /> },
  { k: "m2", art: <svg viewBox="0 0 120 120" className="size-full"><path d="M14 66c-6-24 18-46 46-46s56 18 48 46c-6 20-28 30-50 30S18 84 14 66z" fill="#d99a50" /><path d="M28 50c10-8 22 2 32-4s22-6 30 2M24 68c14-6 22 6 36 0s24-8 38 0" stroke="#a96a2a" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M20 40c20-14 70-14 86 6" stroke="#fff8e6" strokeWidth="6" opacity=".6" fill="none" strokeLinecap="round" /></svg> },
  { k: "m3", art: <svg viewBox="0 0 120 120" className="size-full"><ellipse cx="60" cy="68" rx="46" ry="34" fill="#e8b06a" /><ellipse cx="60" cy="76" rx="16" ry="8" fill="#fff6e6" /></svg> },
  { k: "m4", art: <svg viewBox="0 0 120 120" className="size-full"><rect x="18" y="40" width="84" height="44" rx="22" fill="#e8b06a" /><rect x="30" y="50" width="60" height="24" rx="12" fill="#c45a4a" /></svg> },
];

const btn = "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-extrabold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 hover:rotate-[-1deg] active:scale-[.96]";
const primary = cn(btn, "bg-btn text-btnfg shadow-[0_14px_30px_-14px_var(--shadow)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_2px_var(--line)]");
const eyebrow = "mb-2.5 block text-[13px] font-black tracking-[.12em] text-glazetext uppercase";

/** Language: a coffee cup; the sleeve reads EN or ES and it steams when you switch. */
function Cup() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  return (
    <button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"} className="h-[52px] w-11 flex-none cursor-pointer transition-transform duration-300 ease-spring hover:-rotate-6">
      <svg viewBox="0 0 44 52" className="size-full overflow-visible" aria-hidden="true">
        <g key={lang} className="steam" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round"><path d="M16 12c-3-4 3-6 0-10" /><path d="M26 12c-3-4 3-6 0-10" /></g>
        <path d="M8 16h28l-3 32H11z" fill="#fff" stroke="#3a1f14" strokeWidth="2" strokeLinejoin="round" />
        <rect x="6" y="13" width="32" height="5" rx="2" fill="#3a1f14" />
        <path d="M9.6 26h24.8l-1.1 12H10.7z" fill="#d63f86" />
        <text x="22" y="35.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff" fontFamily="var(--font-nunito)">{lang.toUpperCase()}</text>
      </svg>
    </button>
  );
}

/** Theme: a donut; strawberry glaze by day, chocolate at night. It spins as the glaze changes. */
function DonutSwitch() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  const [n, setN] = useState(0);
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={() => { setN(x => x + 1); flipTheme(document.body, () => flushSync(() => setTheme(dark ? "light" : "dark"))); }}
      className="size-[50px] flex-none cursor-pointer">
      <motion.span className="block size-full" animate={{ rotate: n * 360 }} transition={{ type: "spring", stiffness: 120, damping: 12 }} whileHover={{ scale: 1.08 }}>
        <Donut className="size-full overflow-visible" />
      </motion.span>
    </button>
  );
}

/** Hero: a giant donut rolls in, sprinkles land one by one, then it keeps a slow turn while you scroll. */
function BigDonut() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ delay: 0.2 })
        .from(".big", { x: 260, rotate: 300, opacity: 0, duration: 1.4, ease: "power3.out" })
        .from(".big .spr", { y: -40, opacity: 0, stagger: 0.05, duration: 0.5, ease: "bounce.out" }, "-=0.4")
        .from(".badge", { scale: 0, rotate: -120, ease: "back.out(2)", duration: 0.7 }, "-=0.3");
      gsap.to(".big", { rotate: 90, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[480px]" aria-hidden="true">
      <div className="sprinkles absolute inset-[4%] rounded-full opacity-25 [mask-image:radial-gradient(closest-side,#000_60%,transparent)]" />
      <Donut className="big absolute inset-[8%] drop-shadow-[0_40px_50px_var(--shadow)]" />
      <div className="badge absolute top-[2%] right-[2%] grid size-[118px] rotate-12 place-items-center rounded-full bg-lemon text-center font-display text-[30px] leading-[.95] text-[#3a1f14] shadow-[0_16px_30px_-12px_rgba(0,0,0,.35)] [&_small]:block [&_small]:font-sans [&_small]:text-[13px] [&_small]:font-black rtl:right-auto rtl:left-[2%]"
        dangerouslySetInnerHTML={{ __html: t("badge") }} />
    </div>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[74px] max-w-[1160px] items-center justify-between gap-3 rounded-full border-2 border-line ps-3 pe-3 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex flex-none items-center gap-2.5" aria-label="Wowdy Donuts">
            <Donut className="size-11" hole="var(--bg)" />
            <span><b className="block font-display text-[26px] leading-none font-normal">Wowdy</b><T k="logoSub" className="block text-xs font-bold text-soft max-sm:hidden" /></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-bold max-[900px]:hidden">
            {[["menu", "navMenu"], ["visit", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-2.5">
            <Cup /><DonutSwitch />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden pt-16 pb-24 max-sm:pt-10">
          <Wrap className="grid grid-cols-[1.05fr_.95fr] items-center gap-12 max-[960px]:grid-cols-1">
            <div>
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-lemon px-4 py-1.5 text-sm font-extrabold text-[#3a1f14]">
                  <Sun size={17} weight="bold" /><i className={cn("size-2 rounded-full", status.open ? "bg-[#22a35a]" : "bg-[#3a1f14]/40")} />{status.text || " "}
                </span>
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(58px,8vw,116px)]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[46ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="flex flex-wrap gap-3">
                <a href={TEL} className={primary}><Phone size={18} weight="bold" /><T k="ctaCall" /></a>
                <a href={DIR} target="_blank" rel="noopener" className={ghost}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="w-full max-w-[480px] justify-self-end max-[960px]:justify-self-center"><BigDonut /></Reveal>
          </Wrap>
        </section>

        <div className="bg-glaze py-4 text-white transition-colors duration-500 dark:text-[#fbeee6]" aria-hidden="true">
          <Marquee className="[--duration:24s] [--gap:2.5rem]">
            {["t1", "t2", "t3", "t4"].map(k => <span key={k} className="flex items-center gap-10 font-display text-[28px]"><T k={k} /><i className="h-2 w-5 rotate-[35deg] rounded-full bg-lemon" /></span>)}
          </Marquee>
        </div>

        <section id="menu" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[740px]"><T k="menuEyebrow" className={eyebrow} /><T k="menuTitle" as="h2" className="mb-4 text-[clamp(44px,5.8vw,78px)]" /><T k="menuLead" as="p" className="max-w-[56ch] text-[17px] text-soft" /></Reveal>
            <div className="grid grid-cols-4 gap-5 max-[960px]:grid-cols-2 max-sm:grid-cols-1">
              {TREATS.map(({ k, art }, i) => (
                <Reveal key={k} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="h-full rounded-[30px] bg-card p-1.5 shadow-[inset_0_0_0_2px_var(--line),0_30px_60px_-40px_var(--shadow)]">
                    <MagicCard gradientSize={200} gradientColor="rgba(255,111,174,.14)" gradientFrom="#ff6fae" gradientTo="#ffd23f" className="h-full rounded-[25px] [&>div:last-child]:h-full">
                      <div className="h-full p-6 text-center">
                        <div className="mx-auto mb-5 size-32 rounded-full bg-tint p-3">{art}</div>
                        <T k={`${k}t`} as="h3" className="mb-2 text-[28px]" /><T k={`${k}p`} as="p" className="text-[15px] text-soft" />
                      </div>
                    </MagicCard>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12 max-w-[740px]"><T k="whyEyebrow" className={eyebrow} /><T k="whyTitle" as="h2" className="text-[clamp(44px,5.8vw,78px)]" /></Reveal>
            <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2 max-sm:grid-cols-1">
              {WHY.map(([k, Icon], i) => (
                <Reveal key={k} delay={i * 0.06} className={cn("rounded-[26px] p-7", ["bg-glaze text-white", "bg-lemon text-[#3a1f14]", "bg-sky text-[#06283a]", "bg-[#8be37a] text-[#163a0e]"][i])}>
                  <Icon size={32} weight="fill" className="mb-8" />
                  <T k={`${k}t`} as="b" className="mb-1.5 block font-display text-[30px] font-normal" /><T k={`${k}p`} as="p" className="text-[15px] font-semibold opacity-85" />
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="visit" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(44px,5.8vw,78px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="relative overflow-hidden rounded-[30px] bg-card p-8 shadow-[inset_0_0_0_2px_var(--line)]">
                <BorderBeam size={200} duration={10} colorFrom="#ff6fae" colorTo="#ffd23f" borderWidth={2} />
                <div className="grid content-start gap-5">
                  <T k="hoursTitle" as="h3" className="text-[36px]" />
                  <HoursTable hours={HOURS} accent="text-glazetext font-extrabold" />
                  {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "3035 S Shiloh Rd #130", null]] as const).map(([href, I, strong, sub]) => (
                    <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-start gap-3.5">
                      <span className="grid size-11 flex-none place-items-center rounded-full bg-tint text-glazetext transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:rotate-12"><I size={20} weight="bold" /></span>
                      <span><strong className="block font-extrabold">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Garland, TX 75041</span>}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08} className="min-h-[440px] overflow-hidden rounded-[30px] shadow-[inset_0_0_0_2px_var(--line)]"><MapFrame q="3035+S+Shiloh+Rd+130,+Garland,+TX+75041" className="min-h-[440px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="bg-bg2 py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(44px,5.8vw,74px)]" /></Reveal>
            <Faq ids={[1, 2, 3]} accent="text-glazetext" item="rounded-[22px] bg-card shadow-[inset_0_0_0_2px_var(--line)]" />
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[40px] bg-[#3a1f14] px-14 py-20 text-[#fff6f0] max-[960px]:flex-col max-[960px]:items-start max-sm:px-7 max-sm:py-14">
              <div className="sprinkles pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative"><T k="ctaTitle" as="h2" className="mb-3 text-[clamp(48px,6.4vw,92px)]" /><T k="ctaLead" as="p" className="text-lg font-semibold opacity-80" /></div>
              <a href={TEL} className={cn(btn, "relative flex-none bg-[#ff6fae] px-8 py-4 text-lg text-[#3a1f14]")}><Phone size={20} weight="bold" />{PHONE}</a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm font-semibold text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t-2 border-line pt-6"><span>© {new Date().getFullYear()} Wowdy Donuts · 3035 S Shiloh Rd #130, Garland, TX 75041</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-full p-1.5 shadow-[inset_0_0_0_2px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}
