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
    var q = 'videos?q=' + decodeURI(JSON.stringify({ ytid: ytId }))

    db.get(q, function(xhr = new XMLHttpRequest()) {
      var res = JSON.parse(xhr.response)[0]
      
      if (JSON.parse(xhr.response).length == 0) {
        alert('Data Not Found', 'Data not found in d74 edits server. please install this video', function(){
          window.location.href = '../init/?id='+ytId
        })
      }
      
      document.getElementById('title').value = res.title
      document.getElementById('password').value = res.pw
      document.getElementById('date').value = res.date
      document.getElementById('ytid').value = res.ytid
      sid = document.getElementById('sid').value = res._id
      document.getElementById('vurl').value = res.url
      document.getElementById('imgUrl').value = res.thumb
      const des = res.description

      loadImg()

      document.getElementById('submit').onclick = function() {
        db.put('videos/' + sid, JSON.stringify({
          title: document.getElementById('title').value,
          pw: document.getElementById('password').value,
          date: document.getElementById('date').value,
          ytid: document.getElementById('ytid').value,
          url: document.getElementById('vurl').value,
          thumb: document.getElementById('imgUrl').value,
          description: des
        }), function() {
          if (xhr.status != 200) {
            alert('Saving Unsuccessful!', 'data not saved in server, please try again')
          } else {
            alert('Saved Successfully', 'Data Successfully Updated')
          }
        })
      }
    })
  }
}

function loadImg() {
  document.getElementById('img').src = document.getElementById('imgUrl').value
  document.getElementById('img').onerror = function() {
    document.getElementById('img').src = '../../visit/image.png'
  }
}

document.getElementById('imgUrl').addEventListener('change', loadImg);
document.getElementById('imgUrl').addEventListener('keyup', loadImg);