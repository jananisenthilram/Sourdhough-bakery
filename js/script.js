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

  // Next button
  if (nextBtn && slides.length) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });
  }

  // Prev button
  if (prevBtn && slides.length) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });
  }

  // Auto slide
  if (slides.length) {
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000);
  }

});

// menu bar
document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileActions = document.querySelector(".nav-right");

  function closeMobileMenu() {
    if (navLinks) {
      navLinks.classList.remove("active");
    }

    if (mobileActions) {
      mobileActions.classList.remove("active");
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

      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a, .nav-right a").forEach(link => {
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

// Function to toggle text direction to RTL for the entire page
function setRTL() {
  document.body.classList.toggle('rtl');
}

  const rtlToggleBtn = document.getElementById("rtlToggleBtn");
  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener("click", function () {
      setRTL();
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
