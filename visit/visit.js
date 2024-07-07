var params = location.search.replace('?', '');
var paramsString = '{"' + params.replaceAll("&", '","').replaceAll('=', '":"') + '"}';
if (params == '') {
  alert("File Not Found", "sorry, this id not found", function() {
    window.location.href = '../'
  })
  window.location.href = '../'
} else {
  var objectParams = JSON.parse(paramsString);
  objectParams = objectParams
  if (objectParams.id == undefined) {

  } else {
    const data = null;
    const xhr = new XMLHttpRequest();

    var q = 'videos?q=' + decodeURI(JSON.stringify({ ytid: objectParams.id }))

    document.getElementById('dl').style.display = 'none'

    db.get(q, function(xhr) {
      var res = JSON.parse(xhr.response)[0]

      document.getElementById('dl').style.display = 'none'

      if (res.url == 'https://youtube.com/watch?v=' + res.ytid || res.url == '') {
        document.getElementById('dl').style.display = 'none'
      } else {
        document.getElementById('dl').style.display = 'block'
      }

      document.getElementById('submit').addEventListener('click', function() {
        document.getElementById('submit').innerHTML = '<div class="loader-sml hide"></div><div class="load"><div class="loader-sml"></div></div>'

        if (document.getElementById('password').value == res.pw) {
          document.querySelector('.block-div').style.display = 'none'
          document.querySelector('.form-center').style.display = 'none'
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0;
          document.body.style.overflow = 'scroll'
          document.getElementById('submit').innerHTML = 'Submit'

          if (localStorage.getItem('app') || localStorage.getItem('appCH')) {
            window.open(res.url)
          } else {
            if (res.url.includes('ddl=true')) {
              var atag = document.createElement('a')
              atag.href = res.url
              atag.download = 'freeClip.mp4'
              atag.click()
            } else {
              window.location.href = res.url
            }
          }
        } else {
          alert("Wrong Password!", "Didn't get your password? Watch the full video on YouTube", function() {
            document.getElementById('submit').innerHTML = 'Submit'
            window.location.reload()
          })
        }
      })
    })

    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        if (document.querySelector('.loader-bg')) {
          document.querySelector('.loader-bg').style.display = 'none'
        }

        var res = JSON.parse(this.response)
        var snippet = res.items[0].snippet

        document.getElementById('thumb').src = snippet.thumbnails.medium.url
        document.getElementById('tags').innerHTML = ''
        document.getElementById('title').innerHTML = snippet.title
        document.getElementById('date').innerHTML = snippet.publishedAt.slice(0, 10)
        var view = res.items[0].statistics.viewCount
        view = (view >= 1000 ? (view / 1000) >= 1000 ? Math.floor((view / 1000000)) + 'M Views' : Math.floor((view / 1000)) + 'K Views' : view + ' Views')
        document.getElementById('views').innerHTML = view
        document.getElementById('wt').onclick = function() {
          window.open('https://youtube.com/watch?v=' + res.items[0].id)
        }

        var des = snippet.description
        var pureDes = snippet.description
        des = des.replaceAll('\n', '<br />')

        des.match(/#[a-z0-9_]+/g).forEach(function(str) {
          des = des.replace(str, '<a href="">' + str + '</a>')
        })
        des.match(/#[A-z0-9_]+/g).forEach(function(str) {
          des = des.replace(str, '<a href="">' + str + '</a>')
        })
        des.match(/#[a-z\d-]+/ig).forEach(function(str) {
          des = des.replace(str, '<a href="">' + str + '</a>')
        })

        des = des.replaceAll('<br/><br/><br/>', '<br/>')
        des = des.replaceAll('<br/><br/>', '<br/>')
        des = des.replaceAll('<br /><br /><br />', '<br/>')
        des = des.replaceAll('<br /><br />', '<br/>')

        document.getElementById('pr').innerHTML = des
        snippet.tags.forEach(function(tagName) {
          document.getElementById('tags').innerHTML += '<div class="tag">' + tagName + '</div>'
        })


        if (this.status != 200 || this.status == 0) {
          alert('err: loading failed [' + this.status + ']')
        }
      }
    });

    xhr.open('GET', 'https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=' + objectParams.id);
    xhr.setRequestHeader('X-RapidAPI-Key', '786ab693aamsh13b490be165befdp1ebb1bjsn20906d36a500');
    xhr.setRequestHeader('X-RapidAPI-Host', 'youtube-v31.p.rapidapi.com');
    xhr.send(data);
  }
}

document.querySelector('.block-div').style.display = 'none'
document.querySelector('.form-center').style.display = 'none'

document.getElementById('dl').onclick = function() {
  document.querySelector('.block-div').style.display = 'block'
  document.querySelector('.form-center').style.display = 'block'
  document.body.style.overflow = 'scroll'
  window.location.href = '#top'
}

var animationRequiredElem = ['.primary-box', '.buttons', '.des']

animationRequiredElem.forEach(function(elem, index) {
  elem = document.querySelector(elem)
  elem.animate([{
    transform: "translate(-0%, 100%)",
    opacity: '0'
    }, {
    transform: "translate(-0%, 0%)",
    opacity: '100%'
    }], {
    duration: 1350,
    delay: 170 * (index == 0 ? 2 : index),
    iterations: 1,
    easing: 'ease'
  })
})