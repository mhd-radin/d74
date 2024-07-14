var user = JSON.parse(localStorage.getItem('user'))

class UserDataModel {
  constructor(name, email, id, data) {
    this.name = name
    this.email = email
    this.id = id
    this.data = data
    this.device = navigator.userAgent
    this.location = window.location.href;
    this.date = new Date().toString()
    this.languages = navigator.languages.join(','),
    this.platform = navigator.userAgentData.platform,
    this.brandsAndVersion= JSON.stringify(navigator.userAgentData.brands);
    if (user.model) this.model = user.model;
  }
}

unload()
logIt()

function logIt(lg = false) {
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
          logIt(true)
        })
      }
    } else {
      redirctTo('../')
    }
  }

  document.getElementById('submit').addEventListener('click', function() {
    setText('Singing...')
    loadit()
    db.get('account?q=' + decodeURI(JSON.stringify({ email: document.getElementById('email').value, password: document.getElementById('password').value })), function(xhr) {
      var res = JSON.parse(xhr.response);
      if (res.length == 0) {
        alert('Signing Failed', 'Account not found, some reasons given below, type valid email and password <ul><li>Account Banned</li><li>or Account Deleted</li><li>or Invalid Email & Password</li><li>or Internet connection error</li></ul>')
      } else {
        localStorage.setItem('user', JSON.stringify(new UserDataModel(res[0].name, res[0].email, res[0]._id, JSON.stringify(res))))
        redirctTo('../explore')
      }

      unload()
    })
  })

  var params = location.search.replace('?', '');
  var paramsString = '{"' + params.replaceAll("&", '","').replaceAll('=', '":"') + '"}';
  if (params == '') {} else {
    var objectParams = JSON.parse(paramsString);
    objectParams = objectParams
    if (objectParams.email == undefined || objectParams.password == undefined) {

    } else {
      setText('Singing...')
      loadit()
      db.get('account?q=' + decodeURI(JSON.stringify({ email: objectParams.email, password: objectParams.password })), function(xhr) {
        var res = JSON.parse(xhr.response);
        if (res.length == 0) {
          alert('Signing Failed', 'Account not found, some reasons given below, type valid email and password <ul><li>Account Banned</li><li>or Account Deleted</li><li>or Invalid Email & Password</li><li>or Internet connection error</li></ul>')
        } else {
          localStorage.setItem('user', JSON.stringify(new UserDataModel(res[0].name, res[0].email, res[0]._id, JSON.stringify(res))))
          redirctTo(objectParams.url == undefined ? '../explore' : objectParams.url)
        }
        unload()
      })

    }
  }

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