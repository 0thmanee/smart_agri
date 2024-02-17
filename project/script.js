const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const startedLink = document.querySelector(".started_link");
const navList = document.querySelector(".nav_list");
const supLinkDissp = document.querySelector(".sup_link--disp");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const overlay = document.querySelector(".overlay");
const showElements = document.querySelectorAll(".show_el");
const mediaQuery1 = window.matchMedia("(max-width: 62rem)");
const mainContent = document.querySelector("main");
const loading = document.querySelector(".loader_content");
const inputs = document.querySelectorAll(".input:not(select)");
const contactForm = document.querySelector(".cta_form");
const contactFname = document.querySelector(".first_name_input");
const contactLname = document.querySelector(".last_name_input");
const contactEmail = document.querySelector(".email_input");
const contactSubject = document.querySelector(".subject_input");
const contactMessage = document.querySelector(".message_input");  
const contactSubmit = document.querySelector(".submit_btn");
const popupBtn = document.querySelector(".popup_btn");
const thanksPopup = document.querySelector(".thanks_popup");
const productPage = document.querySelector(".product");
const slides = document.querySelectorAll(".slide");
const productsContainer = document.querySelector(".small_products");
const buyBtn = document.querySelector(".buy_btn");
const buyPopup = document.querySelector(".buy_form_popup");
const buyForm = document.querySelector(".buy_form");
const buyName = document.querySelector(".buy_name");
const buyEmail = document.querySelector(".buy_email");
const buyPhone = document.querySelector(".buy_phone");
const buyAddress = document.querySelector(".buy_address");
const buyClose = document.querySelector(".buy_close");
const buySubmit = document.querySelector(".buy_submit");

// Listen to media query change
if (mediaQuery1.matches) {
  startedLink.classList.add("hidden");
  navList.insertAdjacentHTML(
    "beforeend",
    `<a target="_blank" href="#" class="nav_link started_link flex"
    >Contactez-nous</a>`
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

// Contact form

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value) {
      input
        .closest(".input_container")
        .querySelector("label")
        .classList.add("has_value");
    }
  });
});

const showPopup = function (joinSubmit, msg, params) {
  const serviceID = "service_8zno8p4";
  const templateID = "template_peok8hc";
  emailjs.send(serviceID, templateID, params).then((res) => {
    joinSubmit.value = msg;
    thanksPopup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    overlay.classList.add("overlay--active");
  });
};

function contactSendEmail() {

  var params = {
    name: contactFname.value,
    email: contactEmail.value,
    subject: contactSubject.value,
    message: contactMessage.value,
  };
  showPopup(contactSubmit, "Envoyer Le Message", params);
  contactFname.value =
    contactLname.value =
    contactEmail.value =
    contactSubject.value =
    contactMessage.value =
      "";
}
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  contactSubmit.value = "Attendez Svp ...";
  contactSubmit.disabled = true;
  contactSendEmail();
});
popupBtn.addEventListener("click", function () {
  thanksPopup.classList.add("hidden");
  overlay.classList.add("hidden");
  overlay.classList.remove("overlay--active");
  contactSubmit.disabled = false;
});
const loadingContent = function () {
  wait(1.2).then(() => {
    loading.classList.add("hidden");
    mainContent.classList.remove("hidden");
  });
};
window.addEventListener("load", function () {
  /* wait(0.5).then(() => loadingContent()); */
  loadingContent();
});

// Product Section

const goToSlide = function (slide) {
  able = 1;
  slides.forEach((s) => {
    s.style.transform = `translateX(${100 * -slide}%)`;
  });
};
goToSlide(0);

productsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".small_product");
  if (clicked) {
    const { slide } = clicked.dataset;
    goToSlide(slide);
  }
});


// Buy Section

const showBuyPopup = function (joinSubmit, msg, params) {
  const serviceID = "service_8zno8p4";
  const templateID = "template_1q0hetc";
  emailjs.send(serviceID, templateID, params).then((res) => {
    buyPopup.classList.add("hidden");
    joinSubmit.value = msg;
    thanksPopup.classList.remove("hidden");
  });
};

buyBtn.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.classList.remove("hidden");
  overlay.classList.add("overlay--active");
  buyPopup.classList.remove("hidden");
});

buyClose.addEventListener("click", function () {
  overlay.classList.add("hidden");
  overlay.classList.remove("overlay--active");
  buyPopup.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  overlay.classList.remove("overlay--active");
  buyPopup.classList.add("hidden");
});

buyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  buySubmit.value = "Attendez Svp ...";
  buySubmit.disabled = true;
  var params = {
    name: buyName.value,
    email: buyEmail.value,
    phone: buyPhone.value,
    address: buyAddress.value,
  };
  showBuyPopup(buySubmit, "Acheter", params);
  buyName.value = buyEmail.value = buyPhone.value = buyAddress.value = "";
});

// Scroll Animation

window.addEventListener("scroll", function () {
  showElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight)
      if (element.classList.contains("member_leader") && !mediaQuery1.matches)
        element.classList.add("animate__fadeInTop--leader");
      else element.classList.add("animate__fadeInTop");
  });
});