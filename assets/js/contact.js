// contact.js

// Initialize EmailJS
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("HmK10CILaRwbfljVw");
});

// Shake animation on invalid input
const shakeInput = (element) => {
  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 300);
};

// Contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMsg = document.getElementById("successMsg");

    [name, email, message].forEach(el => el.classList.remove("invalid"));
    [nameError, emailError, messageError].forEach(el => el.classList.remove("visible"));
    successMsg.style.display = "none";

    if (name.value.trim().length < 3) {
      name.classList.add("invalid");
      nameError.classList.add("visible");
      shakeInput(name);
      valid = false;
    }

    const emailPattern = /^[^\s@]{3,}@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("invalid");
      emailError.classList.add("visible");
      shakeInput(email);
      valid = false;
    }

    if (message.value.trim().length < 10) {
      message.classList.add("invalid");
      messageError.classList.add("visible");
      shakeInput(message);
      valid = false;
    }

    if (!valid) return;

    emailjs.send("service_28cv9bk", "template_53s3oyg", {
      name: name.value,
      email: email.value,
      message: message.value,
    }).then(() => {
      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
        form.reset();
      }, 3000);
    }).catch((error) => {
      alert("Something went wrong. Please try again.\n" + (error.text || error));
      console.error("EmailJS Error:", error);
    });
  });
});