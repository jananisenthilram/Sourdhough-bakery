document.addEventListener("DOMContentLoaded", function () {

  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides[i]) {
      slides[i].classList.add("active");
    }
  }

  function goToNextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function goToPrevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  // Next button
  if (nextBtn && slides.length) {
    nextBtn.addEventListener("click", goToNextSlide);
  }

  // Prev button
  if (prevBtn && slides.length) {
    prevBtn.addEventListener("click", goToPrevSlide);
  }

  if (slides.length) {
    const slider = document.querySelector(".hero-slider");
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
      slider.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
      }, { passive: true });

      slider.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 40) {
          return;
        }

        if (swipeDistance < 0) {
          goToNextSlide();
        } else {
          goToPrevSlide();
        }
      }, { passive: true });
    }
  }

  // Auto slide
  if (slides.length) {
    setInterval(() => {
      goToNextSlide();
    }, 4000);
  }

});

// menu bar + direction toggle
document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileActions = document.querySelector(".nav-right");
  const navControls = document.querySelector(".nav-btns");
  const rtlToggleBtn = document.getElementById("rtlToggleBtn");

  function closeMobileMenu() {
    if (navLinks) {
      navLinks.classList.remove("active");
    }

    if (mobileActions) {
      mobileActions.classList.remove("active");
    }

    if (navControls) {
      navControls.classList.remove("active");
    }

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("active");

      if (mobileActions) {
        mobileActions.classList.toggle("active", isOpen);
      }

      if (navControls) {
        navControls.classList.toggle("active", isOpen);
      }

      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a, .nav-right a, .nav-btns a, .nav-btns button").forEach(link => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 900) {
          closeMobileMenu();
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    });
  }

  function applyDirection(isRTL) {
    document.body.classList.toggle("rtl", isRTL);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");

    if (rtlToggleBtn) {
      rtlToggleBtn.innerText = isRTL ? "LTR" : "RTL";
    }
  }

  const savedDirection = localStorage.getItem("direction");
  const shouldUseRTL = savedDirection === "rtl";
  applyDirection(shouldUseRTL);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener("click", function () {
      const isRTL = !document.body.classList.contains("rtl");
      applyDirection(isRTL);
      localStorage.setItem("direction", isRTL ? "rtl" : "ltr");
    });
  }

});
// stat count
const counters = document.querySelectorAll(".counter");

const startCounter = (entry) => {
  if (entry.isIntersecting) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;

      let updateCount = () => {
        let speed = target / 100;
        count += speed;

        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCount();
    });
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(startCounter);
}, { threshold: 0.5 });

if (counters.length) {
  counters.forEach(counter => observer.observe(counter));
}
// FILTER FUNCTION
function filterClass(category, event) {

  let cards = document.querySelectorAll(".class-card");
  let buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      if (card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}
// POPUP OPEN
function openForm(className) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("className").innerText = className;
}

// POPUP CLOSE
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// CLICK OUTSIDE CLOSE
window.onclick = function(e) {
  let popup = document.getElementById("popupForm");
  if (e.target === popup) {
    popup.style.display = "none";
  }
}
