// Formular validation

const form = document.querySelector(".message-form");
form.addEventListener("submit", onSubmit);

// Input fields
const nameInputField = document.querySelector("#name");
const emailInputField = document.querySelector("#email");
const messageInputField = document.querySelector("#message");

// Input fields eventlisteners
nameInputField.addEventListener("blur", validateForm);
emailInputField.addEventListener("blur", validateForm);
messageInputField.addEventListener("blur", validateForm);

// Validate inputfields
function validateForm(e) {
  const errorMessageElement = this.nextElementSibling;

  // Name
  if (this.name == "name") {
    // Test if name is not empty
    if (this.value == "") {
      // e.preventDefault();
      errorMessageElement.textContent = "Please fill in your full name";

      return false;
    }
  }

  // Email
  if (this.name == "email") {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Test if email is not empty
    if (this.value == "") {
      // e.preventDefault();
      errorMessageElement.textContent = "Please fill in your e-mail address";

      return false;
    }

    // If input doesnt match email regex display error message
    if (!emailRegex.test(this.value)) {
      // e.preventDefault();
      errorMessageElement.textContent =
        "Please fill in your e-mail address correctly, e.g. email@email.dk";

      return false;
    }
  }

  // Message
  if (this.name == "message") {
    // Test if message is not empty
    if (this.value == "") {
      // e.preventDefault();
      errorMessageElement.textContent = "Please fill out a message for us";

      return false;
    }
  }

  errorMessageElement.textContent = "";

  return true;
}

// Validate on submit
function onSubmit(e) {
  // Check if there is any error messages
  const errorMessageLabels = [
    ...e.target.querySelectorAll(".message-form__error-message"),
  ];

  const anyErrors = errorMessageLabels.some(
    (label) => label.textContent !== ""
  );

  if (anyErrors) {
    e.preventDefault();
  }

  // Check if input fields are not empty
  const inputs = [
    ...e.target.querySelectorAll("input"),
    ...e.target.querySelectorAll("textarea"),
  ];

  const anyEmptyInputs = inputs.some((input) => input.value === "");

  if (anyEmptyInputs) {
    e.preventDefault();
    const errorMessageElement = e.target.querySelector(
      ".message-form__error-message:last-child"
    );
    errorMessageElement.textContent = "All fields must be filled";

    setTimeout(() => {
      errorMessageElement.textContent = "";
    }, 3000);
  }

  if (!anyErrors && !anyEmptyInputs) {
    const submitButton = e.target.querySelector(".message-form__button");
    submitButton.classList.add("message-form__button--success");
    submitButton.textContent = "Sent";

    nameInputField.value = "";
    emailInputField.value = "";
    messageInputField.value = "";

    setTimeout(() => {
      submitButton.classList.remove("message-form__button--success");
      submitButton.textContent = "Submit";
    }, 1000);
  }
}
