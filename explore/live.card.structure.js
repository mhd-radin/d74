const live_card_ui = {
  create(data) {
    return new TagString(`<div class="team-card">
              <div class="team-thumb">
                <img src="${data.thumbnail}" alt="">
              </div>
              <div class="match-title">${data.side1.name} <div class="match-vs">VS</div> ${data.side2.name}</div>
              <div class="match-info">${data.competition.name}</div>
              <div class="match-info-basic">${data.videos[0].title} • ${dayjs(data.date).fromNow()}</div>
              <hr>
              ${live_card_ui.listPlayLinks(data.videos)}
            </div>
          `)
  },
  createViewMoreCard(){
    return new TagString(`<div class='team-card more-card-link'><div class='more-view-card'><a href="#">Click to <br> View or Search more</a></div></div>`)
  },
  createPlayLink(video, url, ind) {
    return new TagString(`<div class="match-opt" id="PLAY_MATCH_BTN_${Math.floor(Math.random()*9999)}_${ind}" onclick="playLive('${url})">
                        ${video.title} 
                        <div class="right-icons">
                          <ion-icon name="play-circle-outline"></ion-icon>
                        </div>
                      </div>`)
  },
  listPlayLinks(videos) {
    var self = this;
    var text = ''
    if (Array.isArray(videos)) {
      videos.forEach(function(video, ind) {
        var str = video.embed
        const urlRegex = /(https?:\/\/[^\/\s]+)(?:\/[^\/\s]+)?(?:\/[^\s]+)?/g;
        var url = str.match(urlRegex)[0]

        var code = self.createPlayLink(video, url, ind);
        text += code;
      })

      return text;
    }
  }
}