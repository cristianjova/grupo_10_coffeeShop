window.addEventListener('load', function () {
  // Menu desplegable
  let menuButton = document.getElementById('toggle-menu');
  let menuMobile = document.getElementById('menu-mobile');

  menuButton.addEventListener('click', function() {
    menuMobile.classList.toggle('show');
  })
});