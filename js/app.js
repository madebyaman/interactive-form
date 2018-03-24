const form = document.querySelector('form');
const nameField = document.querySelector('form #name');
const emailField = document.querySelector('form #mail');
const jobRole = document.querySelector('#title');
const jobRoleText = document.querySelector('#job_role');
const shirtSize = document.querySelector('#size');
const designOption = document.querySelector('#design');
const colorContainer = document.querySelector('#color');
const colorOptions = document.querySelectorAll('#color option');
const activitiesMenu = document.querySelector('.activities');
const activityCheckbox = activitiesMenu.querySelectorAll('input');
const paymentOption = document.querySelector('#payment');
const creditCardDiv = document.querySelector('#credit-card');
const paypalDiv = creditCardDiv.nextElementSibling;
const bitcoinDiv = creditCardDiv.nextElementSibling.nextElementSibling;
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const expMonth = document.querySelector('#exp-month');
const expYear = document.querySelector('#exp-year');

// Give focus on name field on loading

nameField.focus();

// Reveal a text field when 'other' job role is selected

jobRoleText.style.display = 'none';
jobRole.addEventListener('change', (e) => {
  if (e.path[0].selectedOptions[0].value === 'other') {
    jobRoleText.style.display = '';
  } else {
    jobRoleText.style.display = 'none';
  }
})

// Only display selected colors based on the design selected

function createOption(setValue, text) {
  const option = document.createElement('option');
  option.value = setValue;
  option.innerHTML = text;
  return option;
}
const optionOne = createOption('cornflowerblue', 'Cornflower Blue');
const optionTwo = createOption('darkslategrey', 'Dark Slate Grey');
const optionThree = createOption('gold', 'Gold');
const optionFour = createOption('tomato', 'Tomato');
const optionFive = createOption('steelblue', 'Steel Blue');
const optionSix = createOption('dimgrey', 'Dim Grey');
const defaultOption = createOption('default', '<--- Select a T-shirt theme');
colorOptions.forEach(color => {
  colorContainer.removeChild(color);
})
colorContainer.appendChild(defaultOption);
defaultOption.setAttribute('selected', true);

designOption.addEventListener('change', (e) => {
  const colorContainer = document.querySelector('#color');
  const colorOptions = document.querySelectorAll('#color option');

  colorOptions.forEach(color => {
    colorContainer.removeChild(color);
  })

  if (e.target.selectedIndex === 1) {
    colorContainer.appendChild(optionOne);
    colorContainer.appendChild(optionTwo);
    colorContainer.appendChild(optionThree);
  } else if (e.target.selectedIndex === 2) {
    colorContainer.appendChild(optionFour);
    colorContainer.appendChild(optionFive);
    colorContainer.appendChild(optionSix);
  } else if (e.target.selectedIndex === 0) {
    colorContainer.appendChild(defaultOption);
  }
})

// Display shirt color options IF any design is picked from design options

form.querySelector('#colors-js-puns').style.display = 'none';

designOption.addEventListener('input', () => {
  if (designOption.querySelectorAll('option')[1].selected || designOption.querySelectorAll('option')[2].selected) {
    form.querySelector('#colors-js-puns').style.display = '';
  }
})

// Event listener for checkbox event and calculating total amount

const amount = document.createElement('p');
activitiesMenu.appendChild(amount);
let total = 0;
activitiesMenu.addEventListener('change', (e) => {
  relevantCheckbox(e);
  amount.innerText = `Total: $${totalAmount(e)}`;
  if (total === 0) {
    amount.style.display = 'none';
  } else {
    amount.style.display = '';
  }
})



// Disable checkbox for event, if the timing collides with other events
function relevantCheckbox(e) {
  const checkbox = e.target;
  const value = checkbox.name;
  const isChecked = checkbox.checked;

  if (isChecked) {
    switch (value) {
      case 'js-frameworks':
        activityCheckbox[3].setAttribute('disabled', true);
        break;
      case 'js-libs':
        activityCheckbox[4].setAttribute('disabled', true);
        break;
      case 'express':
        activityCheckbox[1].setAttribute('disabled', true);
        break;
      case 'node':
        activityCheckbox[2].setAttribute('disabled', true);
        break;
    }
  } else if (!isChecked) {
    switch (value) {
      case 'js-frameworks':
        activityCheckbox[3].removeAttribute('disabled');
        break;
      case 'js-libs':
        activityCheckbox[4].removeAttribute('disabled');
        break;
      case 'express':
        activityCheckbox[1].removeAttribute('disabled');
        break;
      case 'node':
        activityCheckbox[2].removeAttribute('disabled');
        break;
    }
  }
}

// Calculate total amount

function totalAmount(e) {
  if (e.target === activityCheckbox[0] && e.target.checked) {
    total += 200;
  } else if (e.target === activityCheckbox[0] && !e.target.checked) {
    total -= 200;
  }
  for (let i = 1; i < activityCheckbox.length; i++) {
    if (e.target === activityCheckbox[i] && e.target.checked) {
      total += 100;
    } else if (e.target === activityCheckbox[i] && !e.target.checked) {
      total -= 100;
    }
  }
  return total;
}

// Show payment information based on the select menu

function displayPaymentDiv(style1 = 'none', style2 = 'none', style3 = 'none') {
  creditCardDiv.style.display = style1;
  paypalDiv.style.display = style2;
  bitcoinDiv.style.display = style3;
}
displayPaymentDiv();

creditCardDiv.style.display = 'none';
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';
paymentOption.addEventListener('change', (e) => {
  if (e.target.selectedIndex === 1) {
    displayPaymentDiv('');
  } else if (e.target.selectedIndex === 2) {
    displayPaymentDiv('none', '');
  } else if (e.target.selectedIndex === 3) {
    displayPaymentDiv('none', 'none', '');
  } else if (e.target.selectedIndex === 0) {
    displayPaymentDiv();
  }
})

// Validate Name

function validateName() {
  if (nameField.value === "") {
    nameField.previousElementSibling.innerText = "You must enter your name";
    nameField.previousElementSibling.classList.add('error');
    return false;
  } else {
    nameField.previousElementSibling.innerText = "Name:";
    nameField.previousElementSibling.classList.remove('error');
    return true;
  }
}

// Validate Email

function validateEmail() {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailField.value.match(mailformat)) {
    emailField.previousElementSibling.innerText = "Email:";
    emailField.previousElementSibling.classList.remove('error');
    return true;
  } else {
    emailField.previousElementSibling.innerText = "Uh-oh! Your email seems to be invalid";
    emailField.previousElementSibling.classList.add('error');
    return false;
  }
}

// Validate Job Role

function validateJobRole() {
  if (jobRole.querySelectorAll('option')[0].selected || jobRole.querySelectorAll('option')[1].selected || jobRole.querySelectorAll('option')[2].selected || jobRole.querySelectorAll('option')[3].selected || jobRole.querySelectorAll('option')[4].selected) {
    jobRole.previousElementSibling.innerText = "Job Role";
    jobRole.previousElementSibling.classList.remove('error');
    return true;
  } else if (jobRole.querySelectorAll('option')[5].selected) {
    jobRoleText.addEventListener('input', () => {
      if (jobRoleText.value === '') {
        jobRole.previousElementSibling.innerText = "Enter a valid job name";
        jobRole.previousElementSibling.classList.add('error');
        return false;
      } else {
        jobRole.previousElementSibling.innerText = "Job Role";
        jobRole.previousElementSibling.classList.remove('error');
        return true;
      }
    })
  } else {
    jobRole.previousElementSibling.innerText = "Please select a valid job";
    jobRole.previousElementSibling.classList.add('error');
    return false;
  }
}

// Validate Shirt Size

function validateShirtSize() {
  if (shirtSize.querySelectorAll('option')[0].selected || shirtSize.querySelectorAll('option')[1].selected || shirtSize.querySelectorAll('option')[2].selected || shirtSize.querySelectorAll('option')[3].selected) {
    shirtSize.previousElementSibling.innerText = 'Size:';
    shirtSize.previousElementSibling.classList.remove('error');
    return true;
  } else {
    shirtSize.previousElementSibling.innerText = 'You need to pick at least one size';
    shirtSize.previousElementSibling.classList.add('error');
    return false;
  }
}

// Validate Shirt Design

function validateShirtDesign() {
  if (designOption.querySelectorAll('option')[1].selected || designOption.querySelectorAll('option')[2].selected) {
    designOption.previousElementSibling.innerText = 'Design:';
    designOption.previousElementSibling.classList.remove('error');
    return true;
  } else {
    designOption.previousElementSibling.innerText = 'You need to select a design option';
    designOption.previousElementSibling.classList.add('error');
    return false;
  }
}

// Validate activities picked

function validateActivity() {
  if (activitiesMenu.querySelectorAll('input')[0].checked || activitiesMenu.querySelectorAll('input')[1].checked || activitiesMenu.querySelectorAll('input')[2].checked || activitiesMenu.querySelectorAll('input')[3].checked || activitiesMenu.querySelectorAll('input')[4].checked || activitiesMenu.querySelectorAll('input')[5].checked || activitiesMenu.querySelectorAll('input')[6].checked) {
    activitiesMenu.querySelector('legend').innerText = 'Register for Activities';
    activitiesMenu.querySelector('legend').classList.remove('error');
    return true;
  } else {
    activitiesMenu.querySelector('legend').innerText = "Select at least one activity to continue:"
    activitiesMenu.querySelector('legend').classList.add('error');
    return false;
  }
}

// validate payment

function validatePayment() {
  if (paymentOption.querySelectorAll('option')[1].selected) {
    creditCardDiv.addEventListener('input', (e) => {
      if (e.target === cardNumber) {
        validateCardNumber();
      } else if (e.target === cvv) {
        validateCVV();
      } else if (e.target === zip) {
        validateZIP();
      }
    })
    paymentOption.previousElementSibling.innerText = 'I\'m going to pay with:';
    paymentOption.previousElementSibling.classList.remove('error');
  } else if (paymentOption.querySelectorAll('option')[2].selected || paymentOption.querySelectorAll('option')[3].selected) {
    paymentOption.previousElementSibling.innerText = 'I\'m going to pay with:';
    paymentOption.previousElementSibling.classList.remove('error');
    return true;
  } else {
    paymentOption.previousElementSibling.innerText = 'Select at least one of the payment option';
    paymentOption.previousElementSibling.classList.add('error');
    return false;
  }
}

// Validate credit card number

function validateCardNumber() {
  let regex = RegExp('^[0-9]{13,16}$');
  if (cardNumber.value.match(regex)) {
    cardNumber.previousElementSibling.innerText = 'Card Number:'
    cardNumber.previousElementSibling.classList.remove('error');
    return true;
  } else {
    cardNumber.previousElementSibling.innerText = 'Your card number seems to be valid'
    cardNumber.previousElementSibling.classList.add('error');
    return false;
  }
}

// validate cvv number

function validateCVV() {
  let regex = RegExp('^[0-9]{3}$');
  if (cvv.value.match(regex)) {
    cvv.previousElementSibling.innerText = 'CVV:'
    cvv.previousElementSibling.classList.remove('error');
    return true;
  } else {
    cvv.previousElementSibling.innerText = 'Enter a correct 3-digit CVV'
    cvv.previousElementSibling.classList.add('error');
    return false;
  }
}

// validate ZIP code

function validateZIP() {
  let regex = RegExp('^[0-9]{5}$');
  if (zip.value.match(regex)) {
    zip.previousElementSibling.innerText = 'ZIP Code:'
    zip.previousElementSibling.classList.remove('error');
    return true;
  } else {
    zip.previousElementSibling.innerText = 'Enter a correct 5-digit zip code'
    zip.previousElementSibling.classList.add('error');
    return false;
  }
}

// Event listeners for form elements

form.addEventListener('input', (e) => {
  if (e.target === nameField) {
    validateName();
  } else if (e.target === emailField) {
    validateEmail();
  } else if (e.target === jobRole) {
    validateJobRole();
  } else if (e.target === shirtSize) {
    validateShirtSize();
  } else if (e.target === designOption) {
    validateShirtDesign();
  } else if (e.target === paymentOption) {
    validatePayment();
  }
})

// Event listener for activities menu

activitiesMenu.addEventListener('change', () => {
  validateActivity();
})

// Submit event listener on form

form.addEventListener('submit', (e) => {
  if (!validateName() || !validateActivity() || !validateEmail() || !validateJobRole() || !validatePayment() || !validateShirtDesign() || !validateShirtSize) {
    e.preventDefault();
    validateName();
    validateEmail();
    validateJobRole();
    validateShirtDesign();
    validateShirtSize();
    validatePayment();
    validateActivity();
  }
})