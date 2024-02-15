const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const startedLink = document.querySelector(".started_link");
const navList = document.querySelector(".nav_list");
const supLinkDissp = document.querySelector(".sup_link--disp");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector(".hero_section");
const questions = document.querySelector(".questions_container");
const showElements = document.querySelectorAll(".show_el");
const mediaQuery1 = window.matchMedia("(max-width: 62rem)");
const mediaQuery2 = window.matchMedia("(max-width: 35.13rem)");

// Listen to media query change
if (mediaQuery1.matches) {
  startedLink.classList.add("hidden");
  navList.insertAdjacentHTML(
    "beforeend",
    `<a target="_blank" href="start" class="nav_link started_link flex"
    >Try Bugbeat</a>`
  );
}

// Wait promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// nav icon's click event
const showNavList = function () {
  overlay.classList.toggle("hidden");
  wait(0.05).then(() => overlay.classList.toggle("overlay--active"));
  navIcon.classList.toggle("nav_icon--active");
  navList.classList.toggle("nav_list--active");
  header.classList.toggle("header--active");
};

navIcon.addEventListener("click", showNavList);
overlay.addEventListener("click", showNavList);

navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_link");
  if (clicked && navList.classList.contains("nav_list--active")) {
    overlay.classList.add("hidden");
    overlay.classList.remove("overlay--active");
    navIcon.classList.remove("nav_icon--active");
    navList.classList.remove("nav_list--active");
    header.classList.remove("header--active");
  }
});

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

// Sup Links
const supSrc = document.querySelector(".sup_src");
const supLink = document.querySelector(".sup_link--disp");
const supLinks = document.querySelector(".sup_links");

let timeoutId;

supLink.addEventListener("mouseover", function () {
  clearTimeout(timeoutId);
  supLinks.classList.add("sup_links--active");
  wait(3).then(() => supLinks.classList.remove("sup_links--active"));
});
