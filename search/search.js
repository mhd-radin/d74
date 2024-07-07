function searchVideos(search = false, inScript = function() {}) {
  document.querySelector('.loader-bg').style.display = 'block'
  db.get('videos?h=' + decodeURI(JSON.stringify({})), function(xhr = new XMLHttpRequest()) {
    var res = JSON.parse(xhr.response)


    if (document.querySelector('.loader-bg')) {
      document.querySelector('.loader-bg').style.display = 'none'
    }

    if (search != false) {
      document.getElementById('searcher').value = search
      srchVd(search)
    }

    function srchVd(value) {
      document.querySelector('.body').innerHTML = ''
      res.forEach(function(data, index) {
        if (data.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || data.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
          var id = 'ID_10' + index
          var snippet = data
          var code = `<div class="card" id="${id}" >
            <div class="card-date">${snippet.date.slice(0, 10)}</div>
            <div class="card-img" onclick="redirctTo('../visit/?id=${data.ytid}')">
              <img src="${snippet.thumb}" alt="yt">
            </div>
            <div class="card-title" onclick="redirctTo('../visit/?id=${data.ytid}')">${snippet.title}</div>
            <button class="card-opt-icon" onclick="openOptions('${id+"2"}')">Actions</button>
            <!--div class="card-opt-icon">
              <ion-icon name="ellipsis-horizontal"></ion-icon>
            </div-->
            <div class="card-options" id="${id+"2"}">
              <div class="card-head">
                Options
              </div>
              <div class="card-body">
                <p class="card-opt" onclick="redirctTo('../visit/?id=${data.ytid}')">
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
        }
      })
    }

    inScript()

    document.getElementById('searcher').onchange = function(e) {
      if (document.getElementById('searcher').value == false || document.getElementById('searcher').value == '') {
        document.querySelector('.null-search').style.display = 'block'
      } else {
        document.querySelector('.null-search').style.display = 'none'
      }

      if (document.getElementById('searcher').value == false || document.getElementById('searcher').value.replaceAll(' ', '') == '' || document.getElementById('searcher').value == 'null') {
        document.querySelector('.body').innerHTML = ''
      } else {
        srchVd(document.getElementById('searcher').value)
      }
    }
  })
}

function openOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'block'
}

function closeOptions(id) {
  var elem = document.getElementById(id)
  elem.style.display = 'none'
}

searchVideos()