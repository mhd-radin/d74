const search_page_card = {
  create(data, id){
    var snippet = data
    var code = new TagString(`<div class="card" id="${id}" >
                <div class="card-date">${dayjs(snippet.date).fromNow()}</div>
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
          `);
    return code
  }
}