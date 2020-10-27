//LoginForm
window.addEventListener('load', function() {
    
    let errors = {};

    let form = document.getElementById('loginForm');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let validateEmail = function() {
        let feedback = '';
        
        if (validator.isEmpty(email.value, { ignore_whitespace:true })) {
            feedback = 'El mail no puede estar vacío';
        }

        handleFeedback(email, feedback);
    };

    let validatePassword = function() {
        let feedback = '';
        
        if (validator.isEmpty(password.value, { ignore_whitespace:true })) {
            feedback = 'Debe ingresar contraseña';
        }else if (!validator.isLength(password.value, { min: 8 })) {
            feedback = 'La contraseña debe tener al menos 8 caracteres';
        }

        handleFeedback(password, feedback);
    };


    let handleFeedback = function (element, feedback) {
        let feedbackElement = element.nextElementSibling;

        if (feedback) {
            element.style.border = "0.1rem";
            element.style.borderStyle = "solid";
            element.style.borderColor = "red";
            feedbackElement.style.color = "red";
            errors[element.name] = feedback;
        } else {
            element.style.border = "0rem";
            element.style.borderStyle = "none";
            element.style.borderColor = "none";
            feedbackElement.style.color = "none";
            delete errors[element.name];
        }
        
        feedbackElement.innerText = feedback;
    }

    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);

    form.addEventListener('submit', function (event) {

        validateEmail();
        validatePassword();

        // Si hay errores no enviamos el formulario
        // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
        if (Object.keys(errors).length) {
            event.preventDefault();
        }
    });
});