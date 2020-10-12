window.addEventListener('load', function() {
  let errors = {};

  let productForm = document.getElementById('product-form');
  let productName = document.getElementById('product-name');
  let productPrice = document.getElementById('product-price');
  let productImage = document.getElementById('product-image'); 
  let productDescription = document.getElementById('product-description');

  let validateProductName = function() {
    let errorText = '';
    
    if (validator.isEmpty(productName.value, { ignore_whitespace:true })) {
      errorText = 'Debés completar el campo nombre';
    } else if(!validator.isLength(productName.value, { min: 5 } )) {
      errorText = 'El campo nombre debe tener al menos 5 caracteres';
    }

    handleError(productName, errorText);
  };

  let validateProductPrice= function() {
    let errorText = '';
    
    if (validator.isEmpty(productPrice.value, { ignore_whitespace:true })) {
      errorText = 'Debés completar el campo precio';
    } else if(!validator.isNumeric(productPrice.value)) {
      errorText = 'Solo se permiten números';
    }

    handleError(productPrice, errorText);
  };

  let validateProductDescription = function() {
    let errorText = '';
    
    if (validator.isEmpty(productDescription.value, { ignore_whitespace:true })) {
      errorText = 'Debes completar el campo descripción';
    } else if(!validator.isLength(productDescription.value, { min: 20 } )) {
      errorText = 'El campo descripción debe tener al menos 20 caracteres';
    }

    handleError(productDescription, errorText);
  };

  let validateProductImage = function() {
    let errorText = '';
    let validFormat = true;
    if(productImage.value) {
      let ext = productImage.value.split('.')[1];
      switch (ext) {
        case 'jpg':
          validFormat = true;
          break;
        case 'jpeg':
          validFormat = true;
          break;
        case 'png':
          validFormat = true;
          break;
        case 'gif':
          validFormat = true;
          break;
        default:
          validFormat = false;
          break;
      }
    }
    if (!validFormat) {
      errorText = 'La imagén debe tener uno de los siguientes formatos (JPG, JPEG, PNG, GIF).';
    }

    handleError(productImage, errorText);
  };

  let handleError = function (element, textError) {
    let textErrorElement = element.nextElementSibling;

    if (textError) {
        element.classList.add('input-danger');
        textErrorElement.classList.add('text-danger');
        errors[element.name] = textError;
    } else {
        element.classList.remove('input-danger');
        textErrorElement.classList.remove('text-danger');
        delete errors[element.name];
    }
    
    textErrorElement.innerText = textError;
  }

  productName.addEventListener('blur', validateProductName);
  productDescription.addEventListener('blur', validateProductDescription);
  productImage.addEventListener('blur', validateProductImage);
  productPrice.addEventListener('blur', validateProductPrice);


  productForm.addEventListener('submit', function (event) {

    validateProductName();
    validateProductPrice();
    validateProductDescription();
    validateProductImage();
    // Si hay errores no enviamos el formulario
    // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
    if (Object.keys(errors).length) {
        event.preventDefault();
    }
});


})