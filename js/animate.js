// SCROLL REVEAL ANIMATION
document.addEventListener("DOMContentLoaded", function () {

  // Elements to animate on scroll
  const revealSelectors = [
    { selector: ".feature-box",           cls: "reveal" },
    { selector: ".product-card",          cls: "reveal" },
    { selector: ".why-box",               cls: "reveal" },
    { selector: ".stat-box",              cls: "reveal-zoom" },
    { selector: ".blog-card",             cls: "reveal" },
    { selector: ".service-card",          cls: "reveal-zoom" },
    { selector: ".faq-item",              cls: "reveal" },
    { selector: ".section-title",         cls: "reveal" },
    { selector: ".section-sub",           cls: "reveal" },
    { selector: ".about-left",            cls: "reveal-left" },
    { selector: ".about-right",           cls: "reveal-right" },
    { selector: ".choose-left",           cls: "reveal-left" },
    { selector: ".choose-right",          cls: "reveal-right" },
    { selector: ".achievement-image",     cls: "reveal-left" },
    { selector: ".achievement-content",   cls: "reveal-right" },
    { selector: ".highlight-image",       cls: "reveal-left" },
    { selector: ".highlight-content",     cls: "reveal-right" },
    { selector: ".course-highlight-img",  cls: "reveal-left" },
    { selector: ".course-highlight-content", cls: "reveal-right" },
    { selector: ".booking-text",          cls: "reveal-left" },
    { selector: ".booking-form-box",      cls: "reveal-right" },
    { selector: ".process-card",          cls: "reveal" },
    { selector: ".testi-card",            cls: "reveal" },
    { selector: ".gallery-card",          cls: "reveal-zoom" },
    { selector: ".class-card",            cls: "reveal" },
    { selector: ".class-feature-box",     cls: "reveal" },
    { selector: ".pricing-card",          cls: "reveal-zoom" },
    { selector: ".shopproduct-card",      cls: "reveal" },
    { selector: ".top-seller-card",       cls: "reveal" },
    { selector: ".event-card",            cls: "reveal" },
    { selector: ".review-card",           cls: "reveal" },
    { selector: ".team-item",             cls: "reveal" },
    { selector: ".contact-box",           cls: "reveal" },
    { selector: ".order-product-card",    cls: "reveal" },
    { selector: ".order-form-title",      cls: "reveal" },
    { selector: ".order-form-section",    cls: "reveal" },
    { selector: ".chef-card2",            cls: "reveal-zoom" },
    { selector: ".class-row",             cls: "reveal" },
    { selector: ".approach-title",        cls: "reveal" },
    { selector: ".approach-images img",   cls: "reveal-zoom" },
    { selector: ".footer-box",            cls: "reveal" },
    { selector: ".order-hero h1",         cls: "reveal" },
    { selector: ".order-hero p",          cls: "reveal" },
  ];

  // Add stagger delay to grid children
  function addStagger(parentSelector, childSelector) {
    document.querySelectorAll(parentSelector).forEach(parent => {
      parent.querySelectorAll(childSelector).forEach((child, i) => {
        child.style.transitionDelay = (i * 0.1) + "s";
      });
    });
  }

  addStagger(".product-grid",       ".product-card");
  addStagger(".why-container",      ".why-box");
  addStagger(".blog-container",     ".blog-card");
  addStagger(".process-grid",       ".process-card");
  addStagger(".testi-grid",         ".testi-card");
  addStagger(".gallery-grid",       ".gallery-card");
  addStagger(".class-grid",         ".class-card");
  addStagger(".class-features-grid",".class-feature-box");
  addStagger(".pricing-grid",       ".pricing-card");
  addStagger(".shopproduct-grid",   ".shopproduct-card");
  addStagger(".top-seller-grid",    ".top-seller-card");
  addStagger(".review-grid",        ".review-card");
  addStagger(".order-products",     ".order-product-card");
  addStagger(".chef-grid-container",".chef-card2");
  addStagger(".stats-container",    ".stat-box");
  addStagger(".features",           ".feature-box");
  addStagger(".contact-info-container", ".contact-box");

  // Apply reveal classes (skip counter elements)
  revealSelectors.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains("counter")) {
        el.classList.add(cls);
      }
    });
  });

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom")
    .forEach(el => observer.observe(el));
});
