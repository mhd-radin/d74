document.getElementById('sbt').onclick = function() {
  var value = document.getElementById('pw').value
  db.get('custom/64bf4b3ea1ce3020000abcb4', function(xhr) {
    var res = JSON.parse(xhr.response).json
    
    if (value == res.t56) {
      localStorage.setItem('key56', true)
      location.href = 'index.html'
    }
  })
}