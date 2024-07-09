db.get('account', function(xhr) {
  if (xhr.status == 0) {
    alert('Server Error')
  }
  
  document.querySelector('.body').innerHTML += acc_ui.createTitleBar(xhr)

  JSON.parse(xhr.response).forEach(function(acc) {
    document.querySelector('.body').innerHTML += acc_ui.create(acc)
  })
})