(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.utils.toArray("[data-zack-reveal]").forEach(function (item) {
      window.gsap.from(item, {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%"
        }
      });
    });
  }

  if (window.Lenis && window.gsap) {
    var lenis = new window.Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", window.ScrollTrigger && window.ScrollTrigger.update);
    window.gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
  }
})();