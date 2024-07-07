unload()
signup()


class UserDataModel {
  constructor(name, email, id, data) {
    this.name = name
    this.email = email
    this.id = id
    this.data = data
  }
}

function signup(lg = false) {
  var user = JSON.parse(localStorage.getItem('user'))

  if (localStorage.getItem('user')) {
    if (user.name.includes('guest') && user.email.includes('guest')) {
      if (user.id == undefined) {
        setText('Updating...')
        loadit()
        db.get('account?q=' + decodeURI(JSON.stringify({ name: user.name, email: user.email })), function(xhr) {
          var res = JSON.parse(xhr.response)
          if (res.length == 0) {
            localStorage.removeItem('user')
          } else {
            localStorage.setItem('user', JSON.stringify(new UserDataModel(user.name, user.email, res[0]._id, JSON.stringify(res))))
          }
          unload()
          signup(true)
        })
      }
    } else {

    }
  }

  function $(id) {
    return document.getElementById(id)
  }

  document.getElementById('submit').addEventListener('click', function() {

    console.log($('email').value.slice($('email').value.lastIndexOf('.') + 1, $('email').value.length).length)

    if ($('username').value == false ||
      $('password').value == false ||
      $('confPass').value == false ||
      $('email') == false) {
      alert('please fill inputs')
    } else if ($('email').value.includes('@') == false ||
      $('email').value.includes('.') == false ||
      ($('email').value.slice($('email').value.lastIndexOf('.'), $('email').value.length).length >= 2) == false
    ) {
      alert('please type vail email')
    } else if (($('password').value.length >= 7) == false) {
      alert('password required minimum 8 letters')
    } else if (($('password').value == $('confPass').value) == false) {
      alert('password and configure password is not equal')
    } else {
      setText('Creating...')
      loadit()
      if (localStorage.getItem('user')) {
        var key = 'Vwu_62£gw7an:27' + Math.floor(Math.random * 99) + '839' + Math.floor(Math.random() * 9999) + '_4628bsusYueja583__' + ['W', 'n', 'k', 'M', 'OL', 'K', 'b', 'T', 'f', 'r', 'R'][Math.floor(Math.random() * 9)]
        db.put('account/' + JSON.parse(localStorage.getItem('user')).id, JSON.stringify({
          name: document.getElementById('username').value,
          password: JSON.stringify(CryptoJS.AES.encrypt(document.getElementById('password').value, key)),
          email: document.getElementById('email').value,
          cid: key,
        }), function(xhr) {
          var res = JSON.parse(xhr.response);
          if (xhr.status != 200) {
            alert('Account Creation Failed', 'can\'t create account')
          } else {
            redirctTo('../login/?email=' + $('email').value + '&password=' + $('password').value)
          }

          unload()
        })
      } else {
        var key = 'Vwu_62£gw7an:27' + Math.floor(Math.random * 99) + '839' + Math.floor(Math.random() * 9999) + '_4628bsusYueja583__' + ['W', 'n', 'k', 'M', 'OL', 'K', 'b', 'T', 'f', 'r', 'R'][Math.floor(Math.random() * 9)]
        db.post('account', JSON.stringify({
          name: document.getElementById('username').value,
          password: CryptoJS.AES.encrypt(document.getElementById('password').value, key),
          email: document.getElementById('email').value,
          cid: key,
        }), function(xhr) {
          var res = JSON.parse(xhr.response);
          if (xhr.status != 201) {
            alert('Account Creation Failed', 'can\'t create account')
          } else {
            redirctTo('../login/?email=' + $('email').value + '&password=' + $('password').value)
          }

          unload()
        })
      }
    }
  })
}

function setText(txt) {
  document.querySelector('.loadtitle').innerHTML = txt
}

document.querySelector('.block-div').style.zIndex = '9999';

function loadit() {
  document.querySelector('.block-div').style.display = 'block';

  document.querySelectorAll('.center *').forEach(function(elem) {
    elem.style.display = 'block'
  })
}

function unload() {
  document.querySelector('.block-div').style.display = 'none';

  document.querySelectorAll('.center *').forEach(function(elem) {
    elem.style.display = 'none'
  })
}