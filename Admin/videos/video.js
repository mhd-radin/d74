var pageTkn = false

db.getYTchannelVideos(function(xhr = new XMLHttpRequest()) {
  var res = JSON.parse(xhr.response)
  
  

  if (document.querySelector('.loader-bg')) {
    document.querySelector('.loader-bg').style.display = 'none'
  }

  res.items.forEach(function(data, index) {
    var id = 'ID_10' + index
    var snippet = data.snippet
    
        /*db.push('videos', JSON.stringify({
          thumb: snippet.thumbnails.medium.url,
          date: snippet.publishedAt,
          ytid: data.id.videoId,
          pw: 'd4f2cwyw7',
          description: snippet.description,
          url: 'https://youtube.com/watch?v='+data.id.videoId,
          title: snippet.title,
        }))*/
    
    var code = `<div class="card" id="${id}" >
      <div class="card-date">${snippet.publishedAt.slice(0, 10)}</div>
      <div class="card-img" onclick="redirctTo('../edit_video/?id=${data.id.videoId}')">
        <img src="${snippet.thumbnails.medium.url}" alt="yt">
      </div>
      <div class="card-title" onclick="redirctTo('../edit_video/?id=${data.id.videoId}')">${snippet.title}</div>
      <div class="card-opt-icon" onclick="openOptions('${id+"2"}')">
        <ion-icon name="ellipsis-horizontal"></ion-icon>
      </div>
      <div class="card-options" id="${id+"2"}">
        <div class="card-head">
          Options
        </div>
        <div class="card-body">
          <p class="card-opt" onclick="redirctTo('../../visit/?id=${data.id.videoId}')">
            View
          </p>
          <p class="card-opt">
            Save
          </p>
          <p class="card-opt" onclick="closeOptions('${id+'2'}')">
            Close
          </p>
        </div>
    </div>
`
    document.querySelector('.body').innerHTML += code
  })

  if (res.nextPageToken) {
    pageTkn = res.nextPageToken

    document.querySelector('.load23').innerHTML += '<button id="q43" class="load-btn" onclick="document.getElementById(\'q43\').remove();reloadVD()">Load More</button>'
  }
})

function reloadVD() {
  db.getYTchannelVideos(function(xhr = new XMLHttpRequest()) {
    var res = JSON.parse(xhr.response)


    if (document.querySelector('.loader-bg')) {
      document.querySelector('.loader-bg').style.display = 'none'
    }

    res.items.forEach(function(data, index) {
      var id = 'ID_10' + index
      var snippet = data.snippet
      var code = `<div class="card" id="${id}" >
      <div class="card-date">${snippet.publishedAt.slice(0, 10)}</div>
      <div class="card-img" onclick="redirctTo('../edit_video/?id=${data.id.videoId}')">
        <img src="${snippet.thumbnails.medium.url}" alt="yt">
      </div>
      <div class="card-title" onclick="redirctTo('../edit_video/?id=${data.id.videoId}')">${snippet.title}</div>
      <div class="card-opt-icon" onclick="openOptions('${id+"2"}')">
        <ion-icon name="ellipsis-horizontal"></ion-icon>
      </div>
      <div class="card-options" id="${id+"2"}">
        <div class="card-head">
          Options
        </div>
        <div class="card-body">
          <p class="card-opt" onclick="redirctTo('../../visit/?id=${data.id.videoId}')">
            View
          </p>
          <p class="card-opt">
            Save
          </p>
          <p class="card-opt" onclick="closeOptions('${id+'2'}')">
            Close
          </p>
        </div>
    </div>
`
      document.querySelector('.body').innerHTML += code
    })

    if (res.nextPageToken) {
      pageTkn = res.nextPageToken

      document.querySelector('.load23').innerHTML += '<button id="q43" class="load-btn" onclick="document.getElementById(\'q43\').remove();reloadVD()">Load More</button>'
    }
  }, pageTkn)
}

function openOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'block'
}

function closeOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'none'
}