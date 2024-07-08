if (localStorage.getItem('theme')) {
  document.getElementById('theme').value = localStorage.getItem('theme')
}

if (localStorage.getItem('theme-color')) {
  document.getElementById('theme-color').value = localStorage.getItem('theme-color')
}

document.getElementById('theme').onchange = function() {
  var value = document.getElementById('theme').value;
  setTheme(value)
  localStorage.setItem('theme', document.getElementById('theme').value)
}

document.getElementById('theme-color').onchange = function() {
  var value = document.getElementById('theme-color').value;
  setThemeColor(value)
  localStorage.setItem('theme-color', document.getElementById('theme-color').value)
}