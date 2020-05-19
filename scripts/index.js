const dropDown = () => {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".drop");
  const triangle = document.querySelector(".rotate");
  const dropLinks = dropdown.querySelectorAll("a");

  dropdownBtn.addEventListener("click", () => {
    dropdown.classList.toggle("dropdown-active");
    triangle.classList.toggle("rotate-active");
  });
  window.addEventListener("click", (event) => {
    let isActiveBtn = dropdownBtn.contains(event.target);
    let isActiveDrop = dropdown.contains(event.target);
    if (!isActiveBtn && !isActiveDrop) {
      if (dropdown.classList.contains("dropdown-active")) {
        dropdown.classList.remove("dropdown-active");
        triangle.classList.remove("rotate-active");
      }
    }
  });
  dropLinks.forEach((link) => {
    link.addEventListener("click", () => {
      dropdown.classList.toggle("dropdown-active");
      triangle.classList.toggle("rotate-active");
    });
  });
};

const mql = window.matchMedia("@media screen and (max-width: 768px)");

mql.addEventListener("change", (event) => {
  if (event.matches) {
    console.log("mobile");
  } else {
    console.log("not mobile");
  }
});

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li:not(.drop-link)");

  burger.addEventListener("click", () => {
    // Toggle nav
    nav.classList.toggle("nav-active");
    document.body.classList.toggle("overflow");

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${
          index / 7 + 0.65
        }s`;
      }
    });

    // burger animation
    burger.classList.toggle("toggle");
  });
};

dropDown();
navSlide();
