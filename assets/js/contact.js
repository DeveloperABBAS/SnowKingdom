document.addEventListener("DOMContentLoaded", function () {
  console.log("contact.js loaded");
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Tap/click animation for button
  const btn = form.querySelector("button[type=submit]");
  if (btn) {
    ["mousedown", "touchstart"].forEach(ev =>
      btn.addEventListener(ev, () => btn.classList.add("pressed"))
    );
    ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(ev =>
      btn.addEventListener(ev, () => btn.classList.remove("pressed"))
    );
  }

  // Shake animation on invalid input
  const shakeInput = (element) => {
    element.classList.add("shake");
    setTimeout(() => element.classList.remove("shake"), 300);
  };

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

    // Custom validation
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

    // Disable button and show feedback
    btn.disabled = true;
    btn.textContent = "Sending...";

    grecaptcha.ready(function() {
      grecaptcha.execute('6LeC6JwrAAAAADng3E9lYsFl3qZLQkoc783jg1a2', {action: 'contact'}).then(function(token) {
        // Prepare form data
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('message', message.value);
        formData.append('g-recaptcha-response', token);

        fetch('assets/php/sendmail.php', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          btn.disabled = false;
          btn.textContent = "Send Message";
          if (data.status === "success") {
            successMsg.style.display = "block";
            setTimeout(() => {
              successMsg.style.display = "none";
              form.reset();
            }, 3000);
          } else {
            alert("Something went wrong. Please try again.\n" + (data.message || ""));
          }
        })
        .catch((error) => {
          btn.disabled = false;
          btn.textContent = "Send Message";
          alert("Something went wrong. Please try again.");
          console.error("Error:", error);
        });
      });
    });
  });
});
