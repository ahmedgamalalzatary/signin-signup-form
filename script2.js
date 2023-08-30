const signin_button = document.getElementById('signin');
const signup_button = document.getElementById('signup');
const signup_form = document.getElementById('signup_form');
const signin_form = document.getElementById('signin_form');

signin_button.addEventListener('click', function(){
    signup_form.style.display = 'none';
    signin_form.style.display = 'flex';
});

signup_button.addEventListener('click', function() {
    signin_form.style.display = 'none';
    signup_form.style.display = 'flex';
});

const passwordToggles = document.querySelectorAll('input[type="checkbox"][data-toggle-password]');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
        const targetId = this.getAttribute('data-toggle-password');
        const targetPassword = document.getElementById(targetId);
        
        if (targetPassword) {
            targetPassword.type = this.checked ? 'text' : 'password';
        }
    });
});

const signupSubmitButton = document.querySelector('.signup_submit');
const passwordStrengthMessage = document.getElementById('password_strength_message');
const sign_message = document.getElementById('message');

function checkPasswordStrength(password) {
    const minLength = 8;
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length >= minLength && hasSpecialCharacter && hasUpperCase && hasNumber) {
        return 'strong';
    } else {
        return 'weak';
    }
}

// Function to check if an email is valid
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

signupSubmitButton.addEventListener('click', function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email_account = document.getElementById('email_account').value;
    const signupPassword = document.getElementById('signup_password').value;
    const repeatSignupPassword = document.getElementById('repeat_signup_password').value;

    if (!firstName || !lastName || !email_account) {
        passwordStrengthMessage.textContent = "Please fill out all required fields.";
        return;
    } else {
        passwordStrengthMessage.textContent = "All fields are good.";
    }

    if (!isValidEmail(email_account)) {
        passwordStrengthMessage.textContent = "The provided email doesn't meet the specifications";
        return;
    }

    if (signupPassword === repeatSignupPassword) {
        const strength = checkPasswordStrength(signupPassword);
        passwordStrengthMessage.textContent = `Password is ${strength}.`;
    } else {
        passwordStrengthMessage.textContent = "Passwords do not match.";
    }
});

// Function to check if the user entered both email and password
function isSignInFormFilled(email, password) {
    return email.trim() !== '' && password.trim() !== '';
}

const signinSubmitButton = document.querySelector('.signin_submit');

signinSubmitButton.addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const signInPassword = document.getElementById('signin_password').value;

    if (!isSignInFormFilled(email, signInPassword)) {
        sign_message.textContent = "You must enter both the email and password.";
        return;
    } else {
        sign_message.textContent = "You've entered all that's needed.";
    }

    // Your sign-in logic can follow here
});

function checkRequiredFields(fields) {
    const missingFields = [];

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            missingFields.push(field.name);
        }
    });

    return missingFields;
}

signupSubmitButton.addEventListener('click', function() {
    const email_account = document.getElementById('email_account');
    const requiredFields = [
        { id: 'email', name: 'Email' },
        { id: 'signin_password', name: 'Password' },
    ];

    const missingFields = checkRequiredFields(requiredFields);

    if (missingFields.length > 0) {
        sign_message.textContent = `The following fields are needed: ${missingFields.join(', ')}.`;
        return;
    }

    if (!isValidEmail(email_account.value)) {
        sign_message.textContent = "The provided email doesn't meet the specifications of an email.";
        return;
    }
});




