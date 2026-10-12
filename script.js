// ---------- 1. Select the elements (DOM) ----------
var form = document.getElementById("registerForm");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");

var submitBtn = document.getElementById("submitBtn");


// ---------- 2. Validation functions ----------
// Each function returns true (valid) or false (invalid)

function validateName() {
  var value = nameInput.value.trim();

  if (value === "") {
    nameError.textContent = "Name is required.";
    nameInput.className = "invalid";
    return false;
  } else {
    nameError.textContent = "";
    nameInput.className = "valid";
    return true;
  }
}

function validateEmail() {
  var value = emailInput.value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    emailError.textContent = "Email is required.";
    emailInput.className = "invalid";
    return false;
  } else if (!emailPattern.test(value)) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.className = "invalid";
    return false;
  } else {
    emailError.textContent = "";
    emailInput.className = "valid";
    return true;
  }
}

function validatePassword() {
  var value = passwordInput.value;

  if (value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordInput.className = "invalid";
    return false;
  } else {
    passwordError.textContent = "";
    passwordInput.className = "valid";
    return true;
  }
}


// ---------- 3. Enable / disable the submit button ----------
function checkForm() {
  // Check silently (without showing errors) whether every field is valid
  var nameOk = nameInput.value.trim() !== "";
  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  var passwordOk = passwordInput.value.length >= 6;

  if (nameOk && emailOk && passwordOk) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}


// ---------- 4. Event handlers ----------
// "input" event -> runs on every keystroke (real-time validation)
nameInput.addEventListener("input", function () {
  validateName();
  checkForm();
});

emailInput.addEventListener("input", function () {
  validateEmail();
  checkForm();
});

passwordInput.addEventListener("input", function () {
  validatePassword();
  checkForm();
});

// "blur" event -> runs when the user leaves a field (catches empty fields)
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);

// "submit" event -> runs when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  var isNameValid = validateName();
  var isEmailValid = validateEmail();
  var isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    alert("Registration successful!\nName: " + nameInput.value.trim() +
          "\nEmail: " + emailInput.value.trim());
    form.reset();
    nameInput.className = "";
    emailInput.className = "";
    passwordInput.className = "";
    submitBtn.disabled = true;
  }
});
