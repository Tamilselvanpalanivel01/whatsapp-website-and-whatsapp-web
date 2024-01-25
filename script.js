document.getElementById('login-button').addEventListener('click', function () {
    var loginContainer = document.getElementById('login-container');
    var text_msg = document.getElementById('text-msg');

    loginContainer.style.display = (loginContainer.style.display === 'none' || loginContainer.style.display === '') ? 'block' : 'none';
    text_msg.style.display = (text_msg.style.display === 'block' || text_msg.style.display === '') ? 'none' : 'block';
  });

  document.getElementById('logtosignup').addEventListener('click', function () {
    var loginContainer = document.getElementById('login-container');
    var signupContainer = document.getElementById('signupContainer');
    loginContainer.style.display = (loginContainer.style.display === 'block' || loginContainer.style.display === '') ? 'none' : 'block';
    signupContainer.style.display = (signupContainer.style.display === 'none' || signupContainer.style.display === '') ? 'block' : 'none';
  });

//login container//
  const form = document.querySelector("form");
  eField = form.querySelector(".phone"),
    eInput = eField.querySelector("input"),
    pField = form.querySelector(".password"),
    pInput = pField.querySelector("input");

  form.onsubmit = (e) => {
    e.preventDefault();

    (eInput.value == "") ? eField.classList.add("shake", "error") : checkPhoneNumber();
    (pInput.value == "") ? pField.classList.add("shake", "error") : checkPassword();

    setTimeout(() => {
      eField.classList.remove("shake");
      pField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => { checkPhoneNumber(); }
    pInput.onkeyup = () => { checkPassword(); }

    function checkPhoneNumber() {
      let pattern = /^[0-9]{10}$/;
      if (!eInput.value.match(pattern)) {
        eField.classList.add("error");
        eField.classList.remove("valid");
        let errorTxt = eField.querySelector(".error-txt");
        (eInput.value != "") ? errorTxt.innerText = "Enter a valid phone number" : errorTxt.innerText = "Phone number can't be blank";
      } else {
        eField.classList.remove("error");
        eField.classList.add("valid");
      }
    }

    function checkPassword() {
      let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
      if (!pInput.value.match(pattern)) {
        pField.classList.add("error");
        pField.classList.remove("valid");
        let errorTxt = pField.querySelector(".error-txt");
        (pInput.value != "") ? errorTxt.innerText = "Password must have at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character" : errorTxt.innerText = "Password can't be blank";
      } else {
        pField.classList.remove("error");
        pField.classList.add("valid");
      }
    }

    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
      window.location.href = form.getAttribute("action");
    }
  }
  function gotoweb() {
    var userList = JSON.parse(localStorage.getItem('Users')) || [];
    var getloginphone = document.getElementById("phn").value;
    var getloginpass = document.getElementById("logpass").value;
    var checkdata = userList.some(login => login.phoneNumberData === getloginphone && login.passwordData === getloginpass);
}


//signup container//

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#newSignupForm');
    var username = document.querySelector('#new-username');
    var email = document.querySelector('#new-email');
    var password = document.querySelector('#new-password');
    var rePassword = document.querySelector('#new-re-password');
    var phoneNumber = document.querySelector('#new-phone-number');
    var showPassword = document.querySelector('#new-show-password');
    var passwordValidationList = document.querySelector('.new-password-validation');

    showPassword.addEventListener('click', function () {
      if (password.type === 'password') {
        password.type = 'text';
        showPassword.className = 'fa-solid fa-eye-slash';
      } else {
        password.type = 'password';
        showPassword.className = 'fa-solid fa-eye';
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      checkInputs();
    
      var usernameValue = username.value.trim();
      var emailValue = email.value.trim();
      var passwordValue = password.value.trim();
      var rePasswordValue = rePassword.value.trim();
      var phoneNumberValue = phoneNumber.value.trim();
    
      var userList = JSON.parse(localStorage.getItem('Users')) || [];
    
      for (var i = 0; i < userList.length; i++) {
        if (userList[i].emailData === emailValue) {
          setErrorFor(email, 'Email already exists');
          return; // Prevent form submission on validation error
        } else if (userList[i].usernameData === usernameValue) {
          setErrorFor(username, 'Username already exists');
          return; // Prevent form submission on validation error
        }
      }
    
      var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    
      if (!passwordPattern.test(passwordValue)) {
        setErrorFor(password, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character');
        return; // Prevent form submission on validation error
      }
    
      if (passwordValue !== '' && rePasswordValue !== '' && passwordValue === rePasswordValue) {
        // The condition now checks if both fields are not empty and if they match
        if (usernameValue !== '' && emailValue !== '' && phoneNumberValue !== '') {
          userList.push(setData(usernameValue, emailValue, passwordValue, rePasswordValue, phoneNumberValue));
          localStorage.setItem('Users', JSON.stringify(userList));
          document.getElementById('login-container').style.display = 'block';
          document.getElementById('signupContainer').style.display = 'none';
        }
      } else {
        setErrorFor(rePassword, 'RePassword doesn\'t match');
        return; // Prevent form submission on validation error
      }
      
    });

    function setData(username, email, password, rePassword, phoneNumber) {
      return {
        usernameData: username,
        emailData: email,
        passwordData: password,
        rePasswordData: rePassword,
        phoneNumberData: phoneNumber,
      };
    }

    function checkInputs() {
      let usernameValue = username.value.trim();
      let emailValue = email.value.trim();
      let passwordValue = password.value.trim();
      let rePasswordValue = rePassword.value.trim();
      let phoneNumberValue = phoneNumber.value.trim();

      if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
      } else {
        setSuccessFor(username);
      }

      if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
      } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
      } else {
        setSuccessFor(email);
      }
         if (phoneNumberValue === '') {
      
        setErrorFor(phoneNumber, 'Phone Number cannot be blank');
      
      } else {
        setSuccessFor(phoneNumber);
      }

      if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
      } else {
        setSuccessFor(password);
      }

      if (rePasswordValue === '') {
        setErrorFor(rePassword, 'RePassword cannot be blank');
      } else {
        setSuccessFor(rePassword);
      }

   
    }

    function setErrorFor(input, message) {
      const formControl = input.parentElement;
      const errorMessage = formControl.querySelector('.error-message');
      errorMessage.innerHTML = message;
      formControl.className = 'new-form-control error error-icon';
    }

    function setSuccessFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'new-form-control success success-icon';
    }

    function isEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
  });
  
  function showLoginContainer() {
    document.getElementById('login-container').style.display = 'block'
    document.getElementById('signupContainer').style.display = 'none'
  }
