import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cn } from "./utils/cn";

gsap.registerPlugin(ScrollTrigger);

const media = {
  heroOne:
    "https://images.pexels.com/photos/14581391/pexels-photo-14581391.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1180&w=2200",
  heroTwo:
    "https://images.pexels.com/photos/6651647/pexels-photo-6651647.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1180&w=2200",
  heroThree:
    "https://images.pexels.com/photos/4938507/pexels-photo-4938507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1180&w=2200",
  serum:
    "https://images.pexels.com/photos/31251024/pexels-photo-31251024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  toner:
    "https://images.pexels.com/photos/20382236/pexels-photo-20382236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  lipstick:
    "https://images.pexels.com/photos/25533534/pexels-photo-25533534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  skincare:
    "https://images.pexels.com/photos/4832435/pexels-photo-4832435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  honey:
    "https://images.pexels.com/photos/16329382/pexels-photo-16329382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  brushes:
    "https://images.pexels.com/photos/12969218/pexels-photo-12969218.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  palette:
    "https://images.pexels.com/photos/12955613/pexels-photo-12955613.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  marble:
    "https://images.pexels.com/photos/4938271/pexels-photo-4938271.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  perfume:
    "https://images.pexels.com/photos/4889723/pexels-photo-4889723.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  beige:
    "https://images.pexels.com/photos/7256160/pexels-photo-7256160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  model:
    "https://images.pexels.com/photos/6651652/pexels-photo-6651652.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Skincare", href: "#categories" },
  { label: "Makeup", href: "#makeup" },
  { label: "About", href: "#ritual" },
  { label: "Contact", href: "#contact" },
];

const heroSlides = [
  {
    kicker: "NEW GLOW RITUAL",
    brand: "Zack Beauty",
    title: "Premium beauty products for a soft-focus finish.",
    text: "High-performance skincare and makeup wrapped in blush, rose gold, and modern luxury.",
    image: media.heroOne,
    product: media.serum,
    secondaryProduct: media.lipstick,
    position: "62% center",
  },
  {
    kicker: "EDITORIAL RADIANCE",
    brand: "Zack Beauty",
    title: "Build your luminous everyday signature.",
    text: "Featherlight textures, camera-ready glow, and complexion care made for every ritual.",
    image: media.heroTwo,
    product: media.skincare,
    secondaryProduct: media.toner,
    position: "58% center",
  },
  {
    kicker: "ROSE GOLD ESSENTIALS",
    brand: "Zack Beauty",
    title: "Color, care, and scent in one polished edit.",
    text: "A curated beauty wardrobe inspired by atelier finishes and effortless feminine detail.",
    image: media.heroThree,
    product: media.brushes,
    secondaryProduct: media.perfume,
    position: "center center",
  },
];

const features = [
  { icon: "truck", title: "Free shipping", text: "On all orders over $50" },
  { icon: "medal", title: "High quality", text: "Premium beauty formulas" },
  { icon: "return", title: "Easy returns", text: "30 day money back" },
  { icon: "lock", title: "Secure payment", text: "Protected checkout" },
];

const categories = [
  { name: "Skincare", text: "Daily glow care", image: media.serum },
  { name: "Makeup", text: "Soft glam color", image: media.palette },
  { name: "Haircare", text: "Polished shine", image: media.toner },
  { name: "Accessories", text: "Tools and brushes", image: media.brushes },
  { name: "Fragrance", text: "Delicate scent", image: media.perfume },
];

const products = [
  {
    id: "serum",
    name: "HydraLumiere Acid Serum",
    price: "$24.99",
    oldPrice: "$32.00",
    rating: "4.9",
    reviews: "123",
    sale: true,
    image: media.serum,
  },
  {
    id: "brush-set",
    name: "Rose Atelier Brush Set",
    price: "$29.99",
    oldPrice: "$39.00",
    rating: "4.8",
    reviews: "158",
    sale: false,
    image: media.brushes,
  },
  {
    id: "night-cream",
    name: "Collagen Veil Night Cream",
    price: "$19.99",
    oldPrice: "$28.00",
    rating: "4.9",
    reviews: "133",
    sale: false,
    image: media.skincare,
  },
  {
    id: "matte-lipstick",
    name: "Velvet Muse Matte Lipstick",
    price: "$14.99",
    oldPrice: "$19.00",
    rating: "4.7",
    reviews: "118",
    sale: true,
    image: media.lipstick,
  },
  {
    id: "perfume",
    name: "Nude Rose Luxury Perfume",
    price: "$34.99",
    oldPrice: "$45.00",
    rating: "4.9",
    reviews: "220",
    sale: true,
    image: media.perfume,
  },
  {
    id: "toner",
    name: "Milk Cloud Facial Toner",
    price: "$22.99",
    oldPrice: "$30.00",
    rating: "4.8",
    reviews: "96",
    sale: false,
    image: media.toner,
  },
];

const promos = [
  {
    eyebrow: "SPECIAL OFFER",
    title: "Up to 30% off on skincare products",
    cta: "Shop offer",
    image: media.honey,
    href: "#shop",
  },
  {
    eyebrow: "NEW ARRIVALS",
    title: "Fresh and trendy makeup collection",
    cta: "Discover now",
    image: media.marble,
    href: "#makeup",
  },
];

const instagramPosts = [
  { image: media.marble, label: "Rose gold ritual", tall: false },
  { image: media.brushes, label: "Atelier tools", tall: true },
  { image: media.model, label: "Soft glam finish", tall: false },
  { image: media.serum, label: "Hydration edit", tall: true },
  { image: media.beige, label: "Nude essentials", tall: false },
  { image: media.toner, label: "Morning glow", tall: false },
];

const benefits = [
  { icon: "bunny", title: "Cruelty free", text: "Never tested on animals" },
  { icon: "leaf", title: "Natural ingredients", text: "Clean and safe for skin" },
  { icon: "drop", title: "Dermatologically tested", text: "Gentle luxury formulas" },
  { icon: "support", title: "Customer support", text: "Beauty help when you need it" },
];

const testimonials = [
  "The textures feel expensive, the shades are wearable, and the packaging looks beautiful on my vanity.",
  "Zack Beauty made my morning routine feel like a polished editorial ritual without adding time.",
  "The glow is soft, modern, and never glittery. It feels like skincare and makeup working together.",
];

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeHero, setActiveHero] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState("");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1450);

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-glow", {
        scale: 1.16,
        opacity: 0.72,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".hero-float", {
        y: -18,
        rotate: 2.5,
        duration: 3.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.32,
      });

      gsap.to(".hero-media", {
        yPercent: 7,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-shell",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger-reveal").forEach((container) => {
        gsap.from(container.querySelectorAll(".stagger-item"), {
          y: 42,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.92 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canUseCursor = window.matchMedia("(pointer: fine)").matches;
    if (!cursor || !canUseCursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    const moveCursor = (event: PointerEvent) => {
      xTo(event.clientX - 12);
      yTo(event.clientY - 12);
    };

    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const addToCart = (productName: string) => {
    setCartCount((count) => count + 1);
    setToast(`${productName} added to your beauty bag`);
    window.setTimeout(() => setToast(""), 2300);
  };

  const currentHero = heroSlides[activeHero];

  return (
    <div ref={rootRef} className="min-h-screen overflow-hidden bg-[#fffaf8] font-body text-[#241b1c]">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <div
        className="fixed left-0 top-0 z-[95] h-1 origin-left bg-gradient-to-r from-[#d54f7a] via-[#d69a8b] to-[#f4c6bb] transition-transform duration-200"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div ref={cursorRef} className="luxury-cursor hidden md:block" aria-hidden="true" />

      <Announcement />
      <Header
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        cartCount={cartCount}
      />

      <main>
        <section id="home" className="hero-shell relative flex min-h-screen items-center overflow-hidden bg-[#f8dedc]">
          <div className="hero-glow absolute left-[4%] top-[18%] z-[1] h-80 w-80 rounded-full bg-[#f4b9c4]/45 blur-3xl" />
          <div className="hero-glow absolute bottom-[4%] right-[8%] z-[1] h-96 w-96 rounded-full bg-[#e9b68a]/35 blur-3xl" />

          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            loop
            speed={1200}
            autoplay={{ delay: 4700, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveHero(swiper.realIndex)}
            className="hero-swiper absolute inset-0 z-0 h-full w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.title}>
                <img
                  src={slide.image}
                  alt={`${slide.brand} campaign visual`}
                  className="hero-media h-full min-h-screen w-full object-cover"
                  style={{ objectPosition: slide.position }}
                  loading="eager"
                  decoding="async"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(255,246,243,0.96)_0%,rgba(255,236,232,0.85)_39%,rgba(255,224,221,0.44)_62%,rgba(255,247,245,0.12)_100%)]" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.62),transparent_30%),linear-gradient(180deg,rgba(255,250,248,0.16),rgba(255,250,248,0.68))]" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-20 pt-36 sm:px-8 lg:px-10">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hero-copy max-w-2xl"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.36em] text-[#c75578]">
                {currentHero.kicker}
              </p>
              <h1 className="font-display text-[clamp(4.5rem,12vw,11rem)] leading-[0.78] tracking-[-0.08em] text-[#1d1717]">
                {currentHero.brand}
              </h1>
              <p className="mt-8 max-w-xl font-display text-[clamp(2.15rem,5.2vw,5.35rem)] leading-[0.92] tracking-[-0.055em] text-[#be446b]">
                {currentHero.title}
              </p>
              <p className="mt-7 max-w-md text-sm leading-7 text-[#5d4a4c] sm:text-base">
                {currentHero.text}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <MagneticButton onClick={() => scrollTo("#shop")} variant="primary">
                  Shop now
                </MagneticButton>
                <MagneticButton onClick={() => scrollTo("#categories")} variant="secondary">
                  Browse collections
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-14 right-[5%] z-10 hidden h-[360px] w-[390px] lg:block">
            <motion.img
              key={`${activeHero}-primary`}
              src={currentHero.product}
              alt="Floating Zack Beauty product"
              initial={{ opacity: 0, y: 36, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-float absolute bottom-0 left-0 h-60 w-52 rounded-[3rem] object-cover shadow-[0_35px_90px_rgba(143,74,74,0.28)] ring-1 ring-white/60"
              loading="eager"
            />
            <motion.img
              key={`${activeHero}-secondary`}
              src={currentHero.secondaryProduct}
              alt="Floating cosmetic detail"
              initial={{ opacity: 0, y: 28, rotate: 7 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="hero-float absolute right-4 top-12 h-44 w-44 rounded-full object-cover shadow-[0_28px_70px_rgba(129,62,73,0.24)] ring-1 ring-white/70"
              loading="eager"
            />
          </div>
        </section>

        <FeatureStrip />
        <CategorySection scrollTo={scrollTo} />
        <ProductSection wishlist={wishlist} setWishlist={setWishlist} addToCart={addToCart} />
        <PromoSection scrollTo={scrollTo} />
        <InstagramSection />
        <BenefitSection />
        <TestimonialSection />
      </main>

      <Footer scrollTo={scrollTo} />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="fixed bottom-6 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full border border-white/70 bg-white/90 px-5 py-3 text-center text-sm font-medium text-[#4a3438] shadow-[0_22px_55px_rgba(147,81,93,0.22)] backdrop-blur-xl"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
      className="fixed inset-0 z-[120] grid place-items-center bg-[#fff7f4]"
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <Logo size="large" />
        <div className="mx-auto mt-8 h-px w-56 overflow-hidden rounded-full bg-[#efd0ce]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-28 bg-gradient-to-r from-transparent via-[#c75578] to-transparent"
          />
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#b9878d]">Preparing your glow</p>
      </motion.div>
    </motion.div>
  );
}

function Announcement() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[80] flex h-8 items-center justify-center bg-[#f9dce1]/90 px-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#6e3d46] backdrop-blur-md">
      Free shipping on all orders over $50 | 30 day easy returns
    </div>
  );
}

type HeaderProps = {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  scrollTo: (href: string) => void;
  cartCount: number;
};

function Header({ scrolled, menuOpen, setMenuOpen, scrollTo, cartCount }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-8 z-[85] transition-all duration-500",
        scrolled ? "bg-white/86 shadow-[0_18px_50px_rgba(107,69,74,0.10)] backdrop-blur-2xl" : "bg-white/18 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Primary">
        <button type="button" onClick={() => scrollTo("#home")} className="group flex items-center gap-3" aria-label="Zack Beauty home">
          <Logo />
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => scrollTo(item.href)} className="nav-link text-[13px] font-medium text-[#352729]">
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[#322628]">
          <IconButton label="Search">
            <Icon name="search" />
          </IconButton>
          <IconButton label="Account" className="hidden sm:grid">
            <Icon name="user" />
          </IconButton>
          <IconButton label="Beauty bag" className="relative">
            <Icon name="bag" />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#c75578] px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          </IconButton>
          <button
            type="button"
            className="ml-1 grid h-10 w-10 place-items-center rounded-full text-[#322628] transition hover:bg-white/70 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Icon name="x" /> : <Icon name="menu" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-[#f1d7d5] bg-white/95 px-5 py-5 shadow-[0_28px_70px_rgba(111,69,75,0.16)] backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  className="rounded-2xl px-4 py-3 text-left font-display text-2xl text-[#332526] transition hover:bg-[#fff4f1] hover:text-[#c75578]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo({ size = "default" }: { size?: "default" | "large" }) {
  return (
    <span className="flex items-center gap-3 text-left">
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffe7e7] via-[#f7ccd4] to-[#d39a88] text-[#bd4f69] shadow-[0_12px_35px_rgba(195,94,113,0.18)]",
          size === "large" ? "h-16 w-16" : "h-10 w-10",
        )}
      >
        <Icon name="flower" className={size === "large" ? "h-8 w-8" : "h-5 w-5"} />
      </span>
      <span>
        <span className={cn("block font-display leading-none tracking-[-0.055em] text-[#211819]", size === "large" ? "text-5xl" : "text-3xl")}>
          Zack
        </span>
        <span className={cn("block font-semibold uppercase tracking-[0.35em] text-[#b86c7b]", size === "large" ? "mt-2 text-xs" : "text-[9px]")}>Beauty</span>
      </span>
    </span>
  );
}

function FeatureStrip() {
  return (
    <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-5 sm:px-8 lg:px-10" aria-label="Store features">
      <div className="reveal-up grid overflow-hidden rounded-[2rem] border border-white/70 bg-white/82 shadow-[0_25px_80px_rgba(117,74,78,0.12)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={feature.title} className={cn("flex items-center gap-4 px-6 py-6", index !== 0 && "border-t border-[#efdada] sm:border-l sm:border-t-0")}>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fff5f2] text-[#c75578] ring-1 ring-[#efd3d1]">
              <Icon name={feature.icon} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#322526]">{feature.title}</p>
              <p className="mt-1 text-xs text-[#8a6f71]">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategorySection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <section id="categories" className="px-5 py-20 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Shop by category" title="Curated rituals for every glow" text="Explore soft luxury edits inspired by the reference layout, refined with modern motion." />
      <div className="stagger-reveal mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <button key={category.name} type="button" onClick={() => scrollTo("#shop")} className="stagger-item group text-center">
            <span className="category-orb mx-auto block h-36 w-36 overflow-hidden rounded-full bg-[#fae7e3] p-2 shadow-[0_22px_55px_rgba(159,92,99,0.12)] transition duration-500 group-hover:-translate-y-2 sm:h-40 sm:w-40">
              <img
                src={category.image}
                alt={`${category.name} category`}
                className="h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="mt-5 block text-xs font-bold uppercase tracking-[0.2em] text-[#332526]">{category.name}</span>
            <span className="mt-1 block text-xs text-[#b26275]">{category.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

type ProductSectionProps = {
  wishlist: Record<string, boolean>;
  setWishlist: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  addToCart: (productName: string) => void;
};

function ProductSection({ wishlist, setWishlist, addToCart }: ProductSectionProps) {
  return (
    <section id="shop" className="bg-[#fff5f2] px-5 py-20 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Best sellers" title="Soft glam icons, loved daily" text="High-converting product cards with quick add, wishlisting, sale states, ratings, and tactile hover motion." />
      <div id="makeup" className="mx-auto mt-12 max-w-7xl">
        <Swiper
          modules={[Autoplay, Navigation]}
          speed={850}
          loop
          navigation
          autoplay={{ delay: 3600, disableOnInteraction: false }}
          spaceBetween={22}
          slidesPerView={1.12}
          breakpoints={{
            560: { slidesPerView: 2, spaceBetween: 22 },
            900: { slidesPerView: 3, spaceBetween: 24 },
            1180: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="product-swiper pb-14"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                wished={Boolean(wishlist[product.id])}
                onWishlist={() => setWishlist((current) => ({ ...current, [product.id]: !current[product.id] }))}
                onAdd={() => addToCart(product.name)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

type Product = (typeof products)[number];

function ProductCard({ product, wished, onWishlist, onAdd }: { product: Product; wished: boolean; onWishlist: () => void; onAdd: () => void }) {
  return (
    <article className="product-card group reveal-up relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_18px_45px_rgba(123,76,81,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_85px_rgba(173,83,105,0.20)]">
      <div className="relative aspect-[1.08] overflow-hidden bg-[#f7dfdb]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1719]/12 via-transparent to-white/10 opacity-0 transition duration-500 group-hover:opacity-100" />
        {product.sale && <span className="absolute left-4 top-4 rounded-full bg-[#c75578] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Sale</span>}
        <button
          type="button"
          onClick={onWishlist}
          className={cn(
            "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-[#c75578] shadow-[0_12px_30px_rgba(100,53,58,0.12)] backdrop-blur-md transition duration-300 hover:scale-110",
            wished && "wishlist-active bg-[#c75578] text-white",
          )}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Icon name="heart" className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="quick-add absolute bottom-4 left-4 right-4 rounded-full bg-[#241b1c] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_45px_rgba(36,27,28,0.24)] transition duration-500 hover:bg-[#c75578] focus:translate-y-0 focus:opacity-100"
        >
          Quick add
        </button>
      </div>
      <div className="p-5">
        <h3 className="min-h-12 font-display text-2xl leading-none tracking-[-0.04em] text-[#2b2021]">{product.name}</h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#2b2021]">
              {product.price} <span className="ml-1 text-xs font-medium text-[#a98a8d] line-through">{product.oldPrice}</span>
            </p>
            <Rating rating={product.rating} reviews={product.reviews} />
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#fff2ef] text-[#c75578] transition duration-300 group-hover:bg-[#c75578] group-hover:text-white">
            <Icon name="arrow" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

function PromoSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {promos.map((promo) => (
          <article key={promo.title} className="promo-card image-reveal relative min-h-[320px] overflow-hidden rounded-[2rem] bg-[#f8d5d8] p-8 shadow-[0_26px_70px_rgba(127,77,82,0.13)] sm:p-10">
            <img
              src={promo.image}
              alt={promo.title}
              className="absolute bottom-0 right-0 h-full w-3/5 object-cover opacity-80 mix-blend-multiply transition duration-700 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffe7e6] via-[#ffd9d5]/88 to-transparent" />
            <div className="relative z-10 max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c75578]">{promo.eyebrow}</p>
              <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.05em] text-[#211819] sm:text-5xl">{promo.title}</h2>
              <div className="mt-8">
                <MagneticButton variant="primary" onClick={() => scrollTo(promo.href)}>
                  {promo.cta}
                </MagneticButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Follow us on Instagram" title="@zack.beauty" text="Masonry moments from blush vanities, model skin, and rose gold essentials." />
      <div className="stagger-reveal mx-auto mt-12 max-w-7xl columns-2 gap-4 md:columns-3 lg:columns-6">
        {instagramPosts.map((post) => (
          <a
            key={post.label}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="stagger-item instagram-tile group mb-4 block overflow-hidden rounded-[1.5rem] bg-[#f8e5e1] shadow-[0_18px_45px_rgba(118,75,80,0.08)]"
            aria-label={`Open Instagram post: ${post.label}`}
          >
            <span className={cn("relative block", post.tall ? "h-72" : "h-48")}>
              <img src={post.image} alt={post.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
              <span className="absolute inset-0 grid place-items-center bg-[#231819]/0 text-xs font-bold uppercase tracking-[0.2em] text-white opacity-0 transition duration-500 group-hover:bg-[#231819]/35 group-hover:opacity-100">
                {post.label}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function BenefitSection() {
  return (
    <section id="ritual" className="bg-[#fff7f4] px-5 py-20 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Clean beauty promise" title="Gentle formulas, polished results" text="A premium ritual designed for sensitive skin, daily wear, and conscious luxury." />
      <div className="stagger-reveal mx-auto mt-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="stagger-item flex items-start gap-4 border-t border-[#ecd6d3] pt-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#c75578] shadow-[0_12px_36px_rgba(140,81,90,0.10)]">
              <Icon name={benefit.icon} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#302527]">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#806568]">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="reveal-up mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c75578]">Beauty notes</p>
        <Swiper modules={[Autoplay, Pagination]} loop speed={900} autoplay={{ delay: 3600, disableOnInteraction: false }} pagination={{ clickable: true }} className="quote-swiper mt-8 pb-12">
          {testimonials.map((quote) => (
            <SwiperSlide key={quote}>
              <blockquote className="font-display text-4xl leading-tight tracking-[-0.045em] text-[#241b1c] sm:text-5xl">"{quote}"</blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Footer({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <footer id="contact" className="reveal-up bg-[#241b1c] px-5 py-16 text-[#fff7f4] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-7 text-[#dcc9c7]">
            Zack Beauty is a soft luxury cosmetics destination for modern routines, editorial glow, and premium feminine design.
          </p>
          <div className="mt-7 flex gap-3">
            {["ig", "tk", "pin"].map((item) => (
              <a key={item} href="https://www.instagram.com/" className="animated-social grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xs font-bold uppercase transition hover:border-[#f3bcc8] hover:text-[#f3bcc8]" aria-label={item}>
                {item}
              </a>
            ))}
          </div>
        </div>
        <FooterLinks title="Shop" links={["Best sellers", "New arrivals", "Skincare", "Makeup"]} scrollTo={scrollTo} />
        <FooterLinks title="Support" links={["Shipping", "Returns", "Ingredients", "Contact"]} scrollTo={scrollTo} />
        <div>
          <h3 className="font-display text-3xl tracking-[-0.04em]">Join the glow list</h3>
          <p className="mt-3 text-sm leading-6 text-[#dcc9c7]">Receive early access, skin notes, and private sale invitations.</p>
          <form className="mt-6 flex overflow-hidden rounded-full border border-white/15 bg-white/8 p-1" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input id="email" type="email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#bca8a8]" />
            <button type="submit" className="rounded-full bg-[#f0bac4] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#241b1c] transition hover:bg-white">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.16em] text-[#b9a3a2] sm:flex-row">
        <p>Copyright 2026 Zack Beauty. All rights reserved.</p>
        <p>Shopify-ready luxury beauty storefront</p>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links, scrollTo }: { title: string; links: string[]; scrollTo: (href: string) => void }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-[#f0bac4]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-[#dcc9c7]">
        {links.map((link) => (
          <li key={link}>
            <button type="button" onClick={() => scrollTo(link === "Skincare" ? "#categories" : "#shop")} className="transition hover:text-white">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="reveal-up mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c75578]">{eyebrow}</p>
      <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.06em] text-[#231a1b] sm:text-6xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#7a6265] sm:text-base">{text}</p>
    </div>
  );
}

function Rating({ rating, reviews }: { rating: string; reviews: string }) {
  return (
    <div className="mt-3 flex items-center gap-1.5 text-[#d6a14f]" aria-label={`${rating} out of 5 stars from ${reviews} reviews`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon key={index} name="star" className="h-3.5 w-3.5 fill-current" />
      ))}
      <span className="ml-1 text-[11px] font-medium text-[#907476]">({reviews})</span>
    </div>
  );
}

function MagneticButton({ children, onClick, variant = "primary", className }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary"; className?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.18,
      y: (event.clientY - rect.top - rect.height / 2) * 0.28,
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onMouseDown={() => setOffset((current) => ({ x: current.x * 0.55, y: current.y * 0.55 }))}
      className={cn("magnetic-button", variant === "secondary" && "magnetic-button-secondary", className)}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      <span>{children}</span>
      <Icon name="arrow" className="button-arrow h-4 w-4" />
    </button>
  );
}

function IconButton({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <button type="button" className={cn("grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/72 hover:text-[#c75578]", className)} aria-label={label}>
      {children}
    </button>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const base = cn("h-5 w-5", className);

  switch (name) {
    case "search":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.4-3.4" />
        </svg>
      );
    case "user":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </svg>
      );
    case "bag":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 8h12l-1 13H7L6 8Z" />
          <path d="M9 8a3 3 0 0 1 6 0" />
        </svg>
      );
    case "heart":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.8 5.6c-1.7-2-4.9-1.8-6.4.4L12 9.3 9.6 6C8.1 3.8 4.9 3.6 3.2 5.6c-1.8 2.1-1.4 5.3.8 7.1L12 20l8-7.3c2.2-1.8 2.6-5 .8-7.1Z" />
        </svg>
      );
    case "menu":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    case "x":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </svg>
      );
    case "arrow":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "star":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L2.9 9.4l6.3-.9L12 2.8Z" />
        </svg>
      );
    case "flower":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 12c3.7-2.6 4.5-6 2-8-2.6-.1-4.1 2.4-2 8Z" />
          <path d="M12 12c-3.7-2.6-4.5-6-2-8 2.6-.1 4.1 2.4 2 8Z" />
          <path d="M12 12c2.6 3.7 6 4.5 8 2 .1-2.6-2.4-4.1-8-2Z" />
          <path d="M12 12c-2.6 3.7-6 4.5-8 2-.1-2.6 2.4-4.1 8-2Z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "truck":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7h11v10H3z" />
          <path d="M14 10h4l3 3v4h-7" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "medal":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="9" r="5" />
          <path d="m9 14-2 7 5-3 5 3-2-7" />
          <path d="m10.5 9 1 1 2-2" />
        </svg>
      );
    case "return":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 7H5v4" />
          <path d="M5 11a7 7 0 1 0 2-5" />
        </svg>
      );
    case "lock":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "bunny":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 10C5 5 5 2.5 7 2.5c2.3 0 3.4 4.4 3.8 7" />
          <path d="M16 10c3-5 3-7.5 1-7.5-2.3 0-3.4 4.4-3.8 7" />
          <path d="M5 15a7 7 0 0 0 14 0c0-3.3-2.7-6-7-6s-7 2.7-7 6Z" />
          <path d="M9 15h.1M15 15h.1" />
        </svg>
      );
    case "leaf":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 4C11 4 5 9 5 16a4 4 0 0 0 4 4c7 0 11-7 11-16Z" />
          <path d="M5 20c3-6 7-9 12-12" />
        </svg>
      );
    case "drop":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12Z" />
        </svg>
      );
    case "support":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M4 12v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" />
          <path d="M20 12v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
          <path d="M13 20h2a3 3 0 0 0 3-3" />
        </svg>
      );
    default:
      return null;
  }
}