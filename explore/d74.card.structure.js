const d74_structure = {
  create(data, id) {
    var snippet = data.snippet;
    var code = new TagString(`
<div class="card" id="${id}">
  <a class="white-link" href="../visit/?id=${data.id.videoId}">
    <div class="card-date">${dayjs(snippet.publishedAt).fromNow()}</div>
    <div class="card-img">
      <img src="${snippet.thumbnails.medium.url}" alt="yt">
    </div>
    <div class="card-grad"></div>
    <div class="card-title card-title-bottom">${snippet.title}</div>
    <div class="card-opt-icon" onclick="openOptions('${id+" 2"}')">
      <ion-icon name="ellipsis-horizontal"></ion-icon>
    </div>
    <div class="card-options" id="${id+" 2"}">
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
  </a>
</div>
`)
    return code;
  }
}