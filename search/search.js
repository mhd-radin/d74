var bodyData = document.querySelector('.body').innerHTML;

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
        if (
          data.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
          || data.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
            
          var id = 'ID_10' + index
          var code = search_page_card.create(data, id)
          document.querySelector('.body').innerHTML += code
        }
      })
    }

    inScript()

    document.getElementById('searcher').onchange = function(e) {
      if (document.getElementById('searcher').value == false || document.getElementById('searcher').value == '') {
        //document.querySelector('.null-search').style.display = 'block'
                document.querySelector('.body').innerHTML = bodyData
      } else {
        //document.querySelector('.null-search').style.display = 'none'
      }

      if (document.getElementById('searcher').value == false || document.getElementById('searcher').value.replaceAll(' ', '') == '' || document.getElementById('searcher').value == 'null') {
        //document.querySelector('.body').innerHTML = ''
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