if (localStorage.getItem('theme')) {
  document.getElementById('theme').value = localStorage.getItem('theme')
}

document.getElementById('theme').onchange = function() {
  var value = document.getElementById('theme').value;
  setTheme(value)
  localStorage.setItem('theme', document.getElementById('theme').value)
}