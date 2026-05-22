const header = document.querySelector(".site-header");

if (header) {
  const setDepth = () => {
    header.toggleAttribute("data-scrolled", window.scrollY > 8);
  };

  setDepth();
  window.addEventListener("scroll", setDepth, { passive: true });
}
