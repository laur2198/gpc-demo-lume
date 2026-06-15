// reveal.js — scroll reveal + sticky-nav state, compatible with Astro View Transitions.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup() {
  // Scroll reveal
  const els = document.querySelectorAll('[data-reveal]:not(.in-view)');
  if (reduce) {
    els.forEach((e) => e.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => io.observe(e));
  }

  // Sticky header condense state
  const onScroll = () => {
    document.documentElement.dataset.lumeScrolled = window.scrollY > 24 ? '1' : '0';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('astro:before-swap', () => window.removeEventListener('scroll', onScroll), { once: true });
}

document.addEventListener('astro:page-load', setup);
