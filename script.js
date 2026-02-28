// Smooth scrolling for same-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    // Close mobile nav after selecting a link
    const navList = document.querySelector(".nav-list");
    const toggle = document.querySelector(".nav-toggle");
    if (navList && toggle && navList.classList.contains("nav-open")) {
      navList.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("nav-open");
  });
}

// Back-to-top button
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

// Update footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Contact form: submit to Formspree (backend) and show success/error
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const statusEl = contactForm.querySelector(".form-status");
  const formspreeId = contactForm.getAttribute("data-formspree-id");
  const formAction = contactForm.getAttribute("action") || "";
  const isFormspreeConfigured =
    formspreeId &&
    formspreeId !== "YOUR_FORMSPREE_ID" &&
    formAction.includes("formspree.io");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!statusEl) return;

    if (!contactForm.checkValidity()) {
      statusEl.textContent =
        "Please fill in the required fields before sending your message.";
      statusEl.classList.remove("success");
      statusEl.classList.add("error");
      return;
    }

    if (!isFormspreeConfigured) {
      statusEl.textContent =
        "Form backend not set up yet. See BACKEND.md to add your Formspree ID.";
      statusEl.classList.remove("success");
      statusEl.classList.add("error");
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    statusEl.textContent = "";
    statusEl.classList.remove("success", "error");

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(formAction, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && !data.error) {
        statusEl.textContent = "Thank you. Your message has been sent.";
        statusEl.classList.add("success");
        contactForm.reset();
      } else {
        statusEl.textContent =
          data.error || "Something went wrong. Please try again or email us directly.";
        statusEl.classList.add("error");
      }
    } catch (err) {
      statusEl.textContent =
        "Unable to send. Please check your connection and try again.";
      statusEl.classList.add("error");
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });
}

