const input = {
    name: document.getElementById("name"),
    lastName: document.getElementById("last-name"),
    email: document.getElementById("email"),
    password: document.getElementById("password")
};

const labels = {
    name: document.getElementById("label-name"),
    lastName: document.getElementById("label-lastName"),
    email: document.getElementById("label-email"),
    password: document.getElementById("label-password")
};

const errors = {
    name: document.getElementById("name-errors"),
    lastName: document.getElementById("lastName-errors"),
    email: document.getElementById("email-errors"),
    password: document.getElementById("password-errors")
};

const offer = document.getElementById("offer");
const successMessage = document.getElementById("success-message");
const allInputs = document.getElementById("formulario");

function emailValidation(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}

function strValidation(str) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(str);
}

function passwordValidation(password) {
    const passwordErrors = [];

    if (password.length < 8)
        passwordErrors.push("- At least 8 characters");

    if (!/[A-Z]/.test(password))
        passwordErrors.push("- One uppercase letter");

    if (!/\d/.test(password))
        passwordErrors.push("- One number");

    if (!/[^A-Za-z0-9]/.test(password))
        passwordErrors.push("- One symbol");

    return passwordErrors;
}

function showFieldError(container, message) {
    container.innerHTML = "";

    if (!message) return;

    const p = document.createElement("p");
    p.classList.add("passError");
    p.textContent = message;

    container.appendChild(p);
}

function showPasswordErrors(passwordErrors) {
    errors.password.innerHTML = "";

    if (passwordErrors.length === 0) return;

    const title = document.createElement("p");
    title.classList.add("passError");
    title.textContent = "Your password must contain:";

    errors.password.appendChild(title);

    passwordErrors.forEach(error => {
        const p = document.createElement("p");
        p.classList.add("passError");
        p.textContent = error;

        errors.password.appendChild(p);
    });
}

function setFieldStatus(field, label, isValid) {
    field.classList.remove("invalid", "input__valid", "valid");
    label.classList.remove("invalid", "valid");

    if (isValid) {
        field.classList.add("input__valid");
        label.classList.add("valid");
    } else {
        field.classList.add("invalid");
        label.classList.add("invalid");
    }
}

function validateNameField(showError = false) {
    const value = input.name.value.trim();

    if (!value) {
        showFieldError(
            errors.name,
            showError ? "Please enter your first name." : ""
        );

        if (showError) {
            setFieldStatus(input.name, labels.name, false);
        } else {
            input.name.classList.remove("invalid", "input__valid", "valid");
            labels.name.classList.remove("invalid", "valid");
        }

        return false;
    }

    showFieldError(errors.name, "");

    const isValid = strValidation(value);

    setFieldStatus(input.name, labels.name, isValid);

    return isValid;
}

function validateLastNameField(showError = false) {
    const value = input.lastName.value.trim();

    if (!value) {
        showFieldError(
            errors.lastName,
            showError ? "Please enter your last name." : ""
        );

        if (showError) {
            setFieldStatus(input.lastName, labels.lastName, false);
        } else {
            input.lastName.classList.remove("invalid", "input__valid", "valid");
            labels.lastName.classList.remove("invalid", "valid");
        }

        return false;
    }

    showFieldError(errors.lastName, "");

    const isValid = strValidation(value);

    setFieldStatus(input.lastName, labels.lastName, isValid);

    return isValid;
}

function validateEmailField(showError = false) {
    const email = input.email.value.trim();

    if (!email || !emailValidation(email)) {
        showFieldError(
            errors.email,
            (showError || email.length > 0)
                ? "Please enter a valid email address."
                : ""
        );

        if (showError || email.length > 0) {
            setFieldStatus(input.email, labels.email, false);
        } else {
            input.email.classList.remove("invalid", "input__valid", "valid");
            labels.email.classList.remove("invalid", "valid");
        }

        return false;
    }

    showFieldError(errors.email, "");
    setFieldStatus(input.email, labels.email, true);

    return true;
}

function validatePasswordField(showError = false) {
    const password = input.password.value;

    if (!password) {
        errors.password.innerHTML = "";

        showFieldError(
            errors.password,
            showError ? "Please enter a password." : ""
        );

        if (showError) {
            setFieldStatus(input.password, labels.password, false);
        } else {
            input.password.classList.remove("invalid", "input__valid", "valid");
            labels.password.classList.remove("invalid", "valid");
        }

        return false;
    }

    const passwordErrors = passwordValidation(password);

    showPasswordErrors(passwordErrors);

    const isValid = passwordErrors.length === 0;

    setFieldStatus(input.password, labels.password, isValid);

    return isValid;
}

input.name.addEventListener("input", () => {
    input.name.value = input.name.value.replace(
        /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g,
        ""
    );

    validateNameField();
});

input.lastName.addEventListener("input", () => {
    input.lastName.value = input.lastName.value.replace(
        /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g,
        ""
    );

    validateLastNameField();
});

input.email.addEventListener("input", () => {
    validateEmailField();
});

input.password.addEventListener("input", () => {
    validatePasswordField();
});

allInputs.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameValid = validateNameField(true);
    const lastNameValid = validateLastNameField(true);
    const emailValid = validateEmailField(true);
    const passwordValid = validatePasswordField(true);

    const formValid =
        nameValid &&
        lastNameValid &&
        emailValid &&
        passwordValid;

    if (formValid) {
        allInputs.hidden = true;
        offer.hidden = true;
        successMessage.hidden = false;
    }
});

let time = 600000;

const counter = document.getElementById("counter");

function updateCounter() {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    counter.textContent =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}:` +
        `${String(milliseconds).padStart(2, "0")}`;

    if (time > 0) {
        time -= 10;
    }
}

updateCounter();

setInterval(updateCounter, 10);
