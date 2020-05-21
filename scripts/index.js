const dropDown = () => {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".drop");
  const caret = document.querySelector(".rotate");
  const dropLinks = dropdown.querySelectorAll("a");

  dropdownBtn.addEventListener("click", () => {
    dropdown.classList.toggle("dropdown-active");
    caret.classList.toggle("rotate-active");
  });
  window.addEventListener("click", (event) => {
    let isActiveBtn = dropdownBtn.contains(event.target);
    let isActiveDrop = dropdown.contains(event.target);
    if (!isActiveBtn && !isActiveDrop) {
      if (dropdown.classList.contains("dropdown-active")) {
        dropdown.classList.remove("dropdown-active");
        caret.classList.remove("rotate-active");
      }
    }
  });
  dropLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (dropdown.classList.contains("dropdown-active")) {
        dropdown.classList.remove("dropdown-active");
        caret.classList.remove("rotate-active");
      }
    });
  });
};

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li:not(.drop-link)");

  burger.addEventListener("click", () => {
    // Toggle nav
    nav.classList.toggle("nav-active");

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${
          index / 7 + 0.65
        }s`; // delay in between each link
      }
    });

    // burger animation
    burger.classList.toggle("toggle");
  });
};

dropDown();
navSlide();
