var pageTkn = false;
var liveAndHL = null;


function playLive(url) {
  if (url) {
    window.location.href = url
  }
}

db.getLiveAndHL(function(xhr = new XMLHttpRequest()) {
  var res = JSON.parse(xhr.response);
  liveAndHL = res;

  const div = document.querySelector('#matchtoday');
  div.innerHTML = '';

  const streams = document.getElementById('streams')

  if (res && Array.isArray(res)) {
    var rs = res;
    rs.sort((a, b) => {
      return b.date.localeCompare(a.date)
    })


    coolLoop(rs.slice(0, 12), function(data, index) {
      var code = live_card_ui.create(data)
      div.innerHTML += code;
    }, 0, 30).then(() => {
      div.innerHTML += live_card_ui.createViewMoreCard()

      var ts = res;
      var lives = []

      ts.map((v, i, a) => {
        v.videos.map((vd) => {
          if (vd.title === 'Live Stream') {
            lives.push(v)
          }
        })
      })


      coolLoop(res, function(data, index) {
        var code = live_card_ui.create(data);

        streams.innerHTML += code;
      }, 0, 70).then(() => {

        streams.innerHTML += live_card_ui.createViewMoreCard()
      })
      
      reloadVD()
    })
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
      var code = d74_structure.create(data, id)

      document.querySelector('.body').innerHTML += code
    })

    if (res.nextPageToken) {
      pageTkn = res.nextPageToken

      document.querySelector('.load23').innerHTML += '<button id="q43" class="load-btn" onclick="document.getElementById(\'q43\').remove();reloadVD()">Load More</button>'
    }
  }, pageTkn)
}

//reloadVD()
function openOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'block'
}

function closeOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'none'
}