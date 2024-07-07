var pw = document.getElementById('pw')
var admin_passid = '64bf4b3ea1ce3020000abcb4'
if (!localStorage.getItem('key56')) {
  window.location.href = 'log.html'
}
document.getElementById('sbt').onclick = function() {
  if (pw.value.length < 20) {
    alert('password required minimum 20+ words and numbers')
  } else {
    db.put('custom/64bf4b3ea1ce3020000abcb4', JSON.stringify({
      json: {
        q23: document.getElementById('pw').value,
        t56: document.getElementById('id').value
      }
    }), function(xhr) {
      if (xhr.status != 200) {
        alert('faild: update')
      } else {
        alert('successful')
        localStorage.removeItem('key56')
      }
    })
  }
}