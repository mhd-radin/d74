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
  select(id) {
    playboxUI.currentId = id;
    var div = document.getElementById(id);
    document.querySelectorAll('.playbox').forEach(function(elem) {
      elem.className = 'playbox'
    })
    div.className = 'playbox active';
    title.innerHTML = this.toName(id);
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
    playboxUI.currentId = objectParams.id;
    if (objectParams.title) title.innerHTML = objectParams.title;
  }
}

document.getElementById('list').innerHTML = ''
Object.keys(CH_API).map((id, i) => {
  document.getElementById('list').innerHTML += playboxUI.create(id);
  if (i === 0 && !playboxUI.currentId) {
    playboxUI.select(id)
  }
})