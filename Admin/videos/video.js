var pageTkn = false

function reloadVD() {
  db.getYTchannelVideos(function(xhr = new XMLHttpRequest()) {
    var res = JSON.parse(xhr.response)


    if (document.querySelector('.loader-bg')) {
      document.querySelector('.loader-bg').style.display = 'none'
    }

    res.items.forEach(function(data, index) {
      var id = 'ID_10' + index
      var code = old_card_ui.create(data, id)
      document.querySelector('.body').innerHTML += code
    })

    if (res.nextPageToken) {
      pageTkn = res.nextPageToken

      document.querySelector('.load23').innerHTML += '<button id="q43" class="load-btn" onclick="document.getElementById(\'q43\').remove();reloadVD()">Load More</button>'
    }
  }, pageTkn)
}

reloadVD()

function openOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'block'
}

function closeOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'none'
}