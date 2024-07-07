if (localStorage.getItem('theme')) {
  document.getElementById('theme').value = localStorage.getItem('theme')
}

document.getElementById('theme').onchange = function() {
  var style = document.createElement('style')

  if (document.getElementById('theme').value == 'light') {
    style.innerHTML = `
    :root {
  --color: #111;
  --blue: #5A78CB;
  --bg: #fff;
  --sec-color: #333;
  --inverted-color: #fff;
  --white: #fff;
  --black: #000;
  --sec-bg: #EEE;
}
    `
  } else if (document.getElementById('theme').value == 'dark') {
    style.innerHTML = `
:root {
  --color: #fff;
  --blue: #5A78CB;
  --bg: #222;
  --sec-color: #aaa;
  --inverted-color: #111;
  --white: #fff;
  --black: #000;
  --sec-bg: #333;
}
      `
  } else if (document.getElementById('theme').value == 'blue') {
    style.innerHTML = `
   :root {
  --color: #fff;
  --blue: #5A78CB;
  --bg: #1C2157;
  --sec-color: #eee;
  --inverted-color: #111;
  --white: #fff;
  --black: #000;
  --sec-bg: #29307E;
}
    `
  }
  
  localStorage.setItem('theme', document.getElementById('theme').value)

  document.head.appendChild(style)
}