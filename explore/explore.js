var pageTkn = false;
var liveAndHL = null;

dayjs.extend(window.dayjs_plugin_relativeTime);

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

  function playList(videos) {
    var text = ''
    if (Array.isArray(videos)) {
      videos.forEach(function(video, ind) {
        var str = video.embed
        const urlRegex = /(https?:\/\/[^\/\s]+)(?:\/[^\/\s]+)?(?:\/[^\s]+)?/g;
        var url = str.match(urlRegex)[0]

        var code = `<div class="match-opt" id="PLAY_MATCH_BTN_${Math.floor(Math.random()*9999)}_${ind}" onclick="playLive('${url})">
                    ${video.title} 
                    <div class="right-icons">
                      <ion-icon name="play-circle-outline"></ion-icon>
                    </div>
                  </div>`
        text += code;
      })

      return text;
    }
  }

  if (res && Array.isArray(res)) {
    var rs = res;
    rs.sort((a, b) => {
      return b.date.localeCompare(a.date)
    })


    coolLoop(rs.slice(0, 12), function(data, index) {
      var code = `
      <div class="team-card">
          <div class="team-thumb">
            <img src="${data.thumbnail}" alt="">
          </div>
          <div class="match-title">${data.side1.name} <div class="match-vs">VS</div> ${data.side2.name}</div>
          <div class="match-info">${data.competition.name}</div>
          <div class="match-info-basic">${data.videos[0].title} • ${dayjs(data.date).fromNow()}</div>
          <hr>
          ${playList(data.videos)}
        </div>
      `

      div.innerHTML += code;

    }, 0, 30).then(() => {
      div.innerHTML += `
      <div class='team-card more-card-link'>
        <div class='more-view-card'><a href="#">Click to <br> View or Search more</a></div>
      </div>
    `


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
        var code = `
      <div class="team-card">
          <div class="team-thumb">
            <img src="${data.thumbnail}" alt="">
          </div>
          <div class="match-title">${data.side1.name} <div class="match-vs">VS</div> ${data.side2.name}</div>
          <div class="match-info">${data.competition.name}</div>
          <div class="match-info-basic">${data.videos[0].title} • ${dayjs(data.date).fromNow()}</div>
          <hr>
          ${playList(data.videos)}
        </div>
      `

        streams.innerHTML += code;
      }, 0, 70).then(() => {

        streams.innerHTML += `
      <div class='team-card more-card-link'>
        <div class='more-view-card'><a href="#">Click to <br> View or Search more</a></div>
      </div>
    `
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
      var snippet = data.snippet
      var code = `<div class="card" id="${id}" >
      <div class="card-date">${dayjs(snippet.publishedAt).fromNow()}</div>
      <a href="../visit/?id=${data.id.videoId}"><div class="card-img">
        <img src="${snippet.thumbnails.medium.url}" alt="yt">
      </div>
      </a>
      <a class="white-link" href="../visit/?id=${data.id.videoId}"><div class="card-title">${snippet.title}</div></a>
      <div class="card-opt-icon" onclick="openOptions('${id+"2"}')">
        <ion-icon name="ellipsis-horizontal"></ion-icon>
      </div>
      <div class="card-options" id="${id+"2"}">
        <div class="card-head">
          Options
        </div>
        <div class="card-body">
          <p class="card-opt" onclick="redirctTo('../visit/?id=${data.id.videoId}')">
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

//reloadVD()
function openOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'block'
}

function closeOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'none'
}