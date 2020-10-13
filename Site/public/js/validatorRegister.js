//LoginForm
window.addEventListener('load', function() {
    
    let errors = {};

    let form = document.getElementById('registerForm');
    let firstName = document.getElementById('first_name');
    let lastName = document.getElementById('last_name');
    let password = document.getElementById('password_register');
    let email = document.getElementById('email_register');
    let address = document.getElementById('adress');
    let phoneNumber = document.getElementById('phone_number');
    let image = document.getElementById('image');

    let validateFirstName = function() {
        let feedback = '';
        
        if (validator.isEmpty(firstName.value, { ignore_whitespace:true })) {
            feedback = 'El nombre no puede estar vacío';
        }else if (!validator.isLength(firstName.value, { min: 2 })) {
            feedback = 'El nombre debe tener al menos 2 caracteres';
        }

        handleFeedback(firstName, feedback);
    };

    let validateLastName = function() {
        let feedback = '';
        
        if (validator.isEmpty(lastName.value, { ignore_whitespace:true })) {
            feedback = 'El apellido no puede estar vacío';
        }else if (!validator.isLength(lastName.value, { min: 2 })) {
            feedback = 'El apellido debe tener al menos 2 caracteres';
        }

        handleFeedback(lastName, feedback);
    };

    function validateEmail(){
        let feedback = '';

        // Expresión regular para validar la estructura del email
        // https://www.w3resource.com/javascript/form/email-validation.php
        let regexpEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if(email.value == "") {
            feedback = "El correo no puede estar vacío";
        }else if(!regexpEmail.test(email.value)) {
            feedback = "Debe ingresar un mail válido";
        }

        handleFeedback(email, feedback);
    };

    function validatePassword(){
        let feedback = '';
        // Expresiones regulares para el checkeo del formato
        let upper = new RegExp("[A-Z]");
        let lower = new RegExp("[a-z]");
        let number = new RegExp("[0-9]");

        if(password.value == "") feedback = "La contraseña no puede estar vacía";
        else if(password.value.length < 8 || password.value.length > 20) feedback = "Debe contener entre 8 y 20 caracteres";
        // Checkea que se cumplan todas las condiciones del formato
        else if(
                !(upper.test(password.value) && lower.test(password.value) && number.test(password.value))
               )
            feedback = "Debe contener al menos una minúscula, una mayúscula y un número";
        
        handleFeedback(password, feedback);
    };
    
    let validateAddress = function() {
        let feedback = '';
        
        if (validator.isEmpty(address.value, { ignore_whitespace:true })) {
            feedback = 'La direccion no puede estar vacía';
        }

        handleFeedback(address, feedback);
    };
    let validatePhoneNumber = function() {
        let feedback = '';
        
        if (validator.isEmpty(phoneNumber.value, { ignore_whitespace:true })) {
            feedback = 'El telefono no puede estar vacío';
        }

        handleFeedback(phoneNumber, feedback);
    };

    function validateImage(){
        const Ext = ["jpg", "jpeg", "png", "gif"];
        let feedback = '';
        let ext = image.value.split(".")[1]; 
        console.log(ext);
        if(!Ext.includes(ext)) {
            feedback = "Imagen de formato inválido";
        }
        handleFeedback(image, feedback);
    }


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

    firstName.addEventListener('blur',validateFirstName);
    lastName.addEventListener('blur',validateLastName);
    email? email.addEventListener('blur', validateEmail): null;
    password ? password.addEventListener('blur', validatePassword): null;
    address.addEventListener('blur',validateAddress);
    phoneNumber.addEventListener('blur',validatePhoneNumber);
    image.addEventListener('change', validateImage);

    form.addEventListener('submit', function (event) {

        validateFirstName();
        validateLastName();
        email? validateEmail(): null;
        password ? validatePassword(): null;
        validateAddress();
        validatePhoneNumber();
        validateImage();

        // Si hay errores no enviamos el formulario
        // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
        if (Object.keys(errors).length) {
            event.preventDefault();
        }
    });
});