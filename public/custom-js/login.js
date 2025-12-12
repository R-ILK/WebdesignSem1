document.getElementById('user-login').addEventListener('submit', (event) => {

    var email = document.getElementById('emailAddressID').value;
    var password = document.getElementById('passwordID').value;

    var errorDiv = document.getElementById("loginerror");

    if (email === "wmitty@email.com" && password === "password1") {

        errorDiv.classList.add("d-none");

        localStorage.setItem('loggedIn', 1);
        window.location.href = "shop";

    } else {
        errorDiv.classList.remove("d-none");

        localStorage.setItem('loggedIn', 0);
    }

    event.preventDefault();
});

  document.getElementById('togglePassword')?.addEventListener('click', function() {
        const passwordInput = document.getElementById('passwordID');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });


