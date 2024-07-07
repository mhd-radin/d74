var err = 0
if (localStorage.getItem('adminErr')) {
  err = JSON.parse(localStorage.getItem('adminErr'))
} else {
  err = 0
}

if (localStorage.getItem('errDate')) {
  var value = (Date.now() - JSON.parse(localStorage.getItem('errDate')))
  if (value >= 86400) {
    localStorage.clear()
  }
}


if (localStorage.getItem('admin')) {
  if (JSON.parse(localStorage.getItem('admin')).expaire == undefined) {
    localStorage.removeItem('admin')
    window.location.reload()
  }
}

//localStorage.clear()

document.getElementById('submit').onclick = function() {
  if (localStorage.getItem('adminErr') <= 8) {
    if (document.getElementById('username').value != false) {
      document.getElementById('submit').innerHTML = '<div class="loader-sml hide"></div><div class="load"><div class="loader-sml"></div></div>'
      db.get('custom/64bf4b3ea1ce3020000abcb4', function(xhr) {
        var res = JSON.parse(xhr.response).json
        
        document.getElementById('submit').innerHTML = 'Confirm'

        if (document.getElementById('password').value == res.q23) {
          document.querySelector('.form-center').style.display = document.querySelector('.block-div').style.display = 'none'
          localStorage.setItem('admin', JSON.stringify({ date: Date.now(), name: document.getElementById('username').value, expaire: '-1'}))
          redirctTo('../')
        } else {
          alert('please type valid password', 'password incorrect,  please type valid password')
          err += 1
          localStorage.setItem('adminErr', err)
          redirctTo('./')
        }
      })
    } else {
      alert('username not found')
      redirctTo('./')
    }
  } else {
    alert('Sorry!', 'Maximum login attempts reached on this day')
    setTimeout(function() {
      redirctTo('./')
    }, 2000)
    localStorage.setItem('errDate', Date.now())
  }
}