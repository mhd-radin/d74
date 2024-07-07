var params = location.search.replace('?', '');
var paramsString = '{"' + params.replaceAll("&", '","').replaceAll('=', '":"') + '"}';
var sid = ''

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
    var ytId = objectParams.id

    var sub = document.getElementById('sub')
    sub.innerHTML = 'Getting...'

    var loader = document.getElementById('load')

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        if (xhr.status != 200) {
          sub.innerHTML = 'ERROR: ' + this.status + ' -- ' + this.statusText
          load.value = 0
        } else {
          sub.innerHTML = 'Installing...'
          load.value = 50
          
          var data = JSON.parse(xhr.response).items[0]
          var snippet = data.snippet
          

          db.push('videos', JSON.stringify({
            thumb: snippet.thumbnails.medium.url,
            date: snippet.publishedAt,
            ytid: ytId,
            pw: 'd4f2cwyw7',
            description: snippet.localized.description.slice(0, 200),
            url: 'https://youtube.com/watch?v=' + ytId,
            title: snippet.title,
          }), function (xhr2 = new XMLHttpRequest()){
            if (xhr2.status != 201) {
              sub.innerHTML = 'Server Upload Failed '+xhr2.status
            } else {
              sub.innerHTML = 'Successfully Installed'
              loader.value = 100
              document.querySelector('.center').innerHTML += 'Go To Editor'.link('../edit_video/?id='+ytId)
            }
          })
        }
      }
    });
    xhr.open('GET', 'https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id='+ytId);
    xhr.setRequestHeader('X-RapidAPI-Key', '786ab693aamsh13b490be165befdp1ebb1bjsn20906d36a500');
    xhr.setRequestHeader('X-RapidAPI-Host', 'youtube-v31.p.rapidapi.com');
    xhr.send(data);
  }
}