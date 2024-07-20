var pageTkn = false;
var liveAndHL = null;

function playLive(url) {
  if (url) {
    window.location.href = url;
  }
}

db.getLiveAndHL(function (xhr = new XMLHttpRequest()) {
  var res = JSON.parse(xhr.response);
  liveAndHL = res;

  const div = document.querySelector("#matchtoday");
  div.innerHTML = "";

  // const streams = document.getElementById('streams')

  if (res && Array.isArray(res)) {
    var rs = res;
    rs.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });

    coolLoop(
      rs.slice(0, 12),
      function (data, index) {
        var code = live_card_ui.create(data).parseElement()[0];
        div.appendChild(code);
      },
      0,
      30
    ).then(() => {
      if (document.querySelector(".loader-bg")) {
        document.querySelector(".loader-bg").style.display = "none";
      }

      div.appendChild(live_card_ui.createViewMoreCard().parseElement()[0]);

      reloadApiVideo(false, function (res) {
        addVideosCardUi(res, document.querySelector("#clipsbox"));
        if (res.nextPageToken) {
          reloadApiVideo(res.nextPageToken, function (res) {
            addVideosCardUi(res, document.querySelector("#explorebox"), true);
          });
        }
      });
      // var ts = res;
      // var lives = []

      // ts.map((v, i, a) => {
      //   v.videos.map((vd) => {
      //     if (vd.title === 'Live Stream') {
      //       lives.push(v)
      //     }
      //   })
      // })

      // coolLoop(res.slice(15, 40).reverse(), function(data, index) {
      //   var code = live_card_ui.create(data).parseElement()[0];

      //   streams.appendChild(code);
      // }, 0, 70).then(() => {

      //   streams.appendChild(live_card_ui.createViewMoreCard().parseElement()[0])
      // })
    });
  }
});

function reloadApiVideo(pageTkn = pageTkn, then) {
  db.getYTchannelVideos(function (xhr = new XMLHttpRequest()) {
    var res = JSON.parse(xhr.response);
    if (typeof then === "function") then(res);
  }, pageTkn);
}

reloadApiVideo(false, function (res) {
  addVideosCardUi(res, document.querySelector(".body"), true);
});

function addVideosCardUi(res, rootelem, loadbtn = false) {
  res.items.forEach(function (data, index) {
    var id = "ID_10" + index;
    var code = d74_structure.create(data, id);

    rootelem.appendChild(code.parseElement()[0]);
  });

  if (res.nextPageToken) {
    pageTkn = res.nextPageToken;
    if (loadbtn) {
      rootelem.innerHTML +=
        '<button id="q43" class="load-btn" >Load More</button>';
      document.getElementById("q43").onclick = function () {
        reloadApiVideo(pageTkn, function (res2) {
          addVideosCardUi(res2, rootelem, loadbtn);
          document.getElementById("q43").remove();
        });
      };
    }
  }
}

//reloadVD()
function openOptions(id) {
  var elem = document.getElementById(id);
  elem.style.display = "block";
}

function closeOptions(id) {
  var elem = document.getElementById(id);
  elem.style.display = "none";
}
