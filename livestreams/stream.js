var title = document.getElementById('title');
var frame = document.getElementById('frame')

const playboxUI = {
  currentId: null,
  toName(id) {
    var name = id.replaceAll('_', ' ');
    return name
  },
  create(id) {
    var name = this.toName(id)

    return new TagString(`<div class="playbox" id="${id}" onclick="playboxUI.select('${id}')">
        <div class="playbox-text">${name}</div>
        <div class="right-icons">
          <ion-icon name="play-circle-outline"></ion-icon>
        </div>
      </div>`)
  },
  select(id, title2 = false, tag = false) {
    playboxUI.currentId = id;
    var div = document.getElementById(id);
    if (tag){
      div = document.createElement('div')
    }
    document.querySelectorAll('.playbox').forEach(function(elem) {
      elem.className = 'playbox'
    })
    div.className = 'playbox active';
    if (title2) {
      title.innerHTML = title2;
    } else {
      title.innerHTML = this.toName(id)
    };
    frame.src = '../livehelper/player.html?id=' + id;
  }
}

var params = location.search.replace('?', '');
var paramsString = '{"' + params.replaceAll("&", '","').replaceAll('=', '":"') + '"}';
if (params == '') {} else {
  var objectParams = JSON.parse(paramsString);
  objectParams = objectParams
  if (objectParams.id == undefined) {

  } else {
    var title2 = false;
    var id = objectParams.id;
    if (objectParams.title) title2 = decodeURI(objectParams.title);
    playboxUI.select(id, title2, true)
    
  }
}

document.getElementById('list').innerHTML = ''

coolLoop(
  Object.keys(CH_API), (id, i) => {
    document.getElementById('list').appendChild(playboxUI.create(id).parseElement()[0]);
    if (i === 0 && !playboxUI.currentId && playboxUI.currentId == null) {
      playboxUI.select(id)
    }
  }, 0, 60)