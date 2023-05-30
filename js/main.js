let countdownInterval;
let countdownSeconds = 60; // 60 seconds countdown
let isExpired = false;
let isOTPValidated = false;


function generateOTP() {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  countdownElement.textContent = countdownSeconds;

  countdownInterval = setInterval(() => {
    countdownSeconds--;
    countdownElement.textContent = countdownSeconds;

    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = 'Expired';
      isExpired = true;
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  countdownSeconds = 60;
  isExpired = false;
  startCountdown();
}

function validateOTP(event) {
  event.preventDefault();

  const digit1 = document.getElementById('digit1').value;
  const digit2 = document.getElementById('digit2').value;
  const digit3 = document.getElementById('digit3').value;
  const digit4 = document.getElementById('digit4').value;

  const otpInput = digit1 + digit2 + digit3 + digit4;
  const generatedOTPElement = document.getElementById('generatedOTP');
  const expirationElement = document.getElementById('expiration');

  if (generatedOTPElement && expirationElement) {
    const generatedOTP = generatedOTPElement.textContent;
    const expiration = parseInt(expirationElement.textContent);

    console.log('Entered OTP:', otpInput);
    console.log('Generated OTP:', generatedOTP);

    if (isExpired) {
      showMessage('OTP has expired. Please resend a new OTP.', 'red');
      console.log('OTP validation: Expired');
      return;
    }

    if (otpInput === generatedOTP) {
      showMessage('OTP is valid.', 'green');
      console.log('OTP validation: Success');
      isOTPValidated = true;
      document.getElementById('resendButton').disabled = false; // Enable Resend button
    } else {
      showMessage('Invalid OTP.', 'red');
      console.log('OTP validation: Failed');
      isOTPValidated = false;
    }
  } else {
    console.log('Error: Element with ID "generatedOTP" or "expiration" not found.');
  }
}

function showMessage(message, color) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.style.color = color;
}

function resendOTP() {
  if (!isOTPValidated && isExpired) {
    // Resend the OTP
    const generatedOTP = generateOTP();
    const expiration = Date.now() + 60000; // 1 minute expiration

    document.getElementById('digit1').value = '';
    document.getElementById('digit2').value = '';
    document.getElementById('digit3').value = '';
    document.getElementById('digit4').value = '';

    document.getElementById('generatedOTP').textContent = generatedOTP;
    document.getElementById('expiration').textContent = expiration;

    resetCountdown();

    console.log('Generated OTP:', generatedOTP);
    console.log('OTP Expiration:', expiration);

    document.getElementById('resendButton').disabled = true; // Disable Resend button
    isExpired = false; // Reset the expired state
    startCountdown(); // Start the countdown for the new OTP
  }
}

function moveFocus(currentElement, nextElement) {
    const length = currentElement.value.length;
    const maxLength = parseInt(currentElement.getAttribute('maxlength'));
  
    if (length === maxLength) {
      nextElement.focus();
    }
  }

  function moveFocusBack(currentElement, previousElement) {
    const length = currentElement.value.length;
  
    if (length === 0) {
      previousElement.focus();
    }
  }

// Generate OTP immediately and display in the console
const generatedOTP = generateOTP();
const expiration = Date.now() + 60000; // 1 minute expiration

document.getElementById('generatedOTP').textContent = generatedOTP;
document.getElementById('expiration').textContent = expiration;

startCountdown();

console.log('Generated OTP:', generatedOTP);
console.log('OTP Expiration:', expiration);

// Disable Resend button initially
document.getElementById('resendButton').disabled = true;

// Get the input elements
const digit1Input = document.getElementById('digit1');
const digit2Input = document.getElementById('digit2');
const digit3Input = document.getElementById('digit3');
const digit4Input = document.getElementById('digit4');

// Add event listeners to move focus to the next input field
digit1Input.addEventListener('input', () => moveFocus(digit1Input, digit2Input));
digit2Input.addEventListener('input', () => moveFocus(digit2Input, digit3Input));
digit3Input.addEventListener('input', () => moveFocus(digit3Input, digit4Input));
digit4Input.addEventListener('input', () => moveFocusBack(digit4Input, digit3Input));

// Add event listeners to move focus back when deleting digits
digit2Input.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    moveFocusBack(digit2Input, digit1Input);
  }
});
digit3Input.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    moveFocusBack(digit3Input, digit2Input);
  }
});
digit4Input.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    moveFocusBack(digit4Input, digit3Input);
  }
});