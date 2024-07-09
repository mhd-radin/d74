const old_card_ui = {
  create(data, id){
    var snippet = data.snippet
    var code = new TagString(`<div class="card" id="${id}" >
          <div class="card-date">${dayjs(snippet.publishedAt).fromNow()}</div>
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
    `)
    
    return code;
  }
}