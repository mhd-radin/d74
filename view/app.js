if (nowUrl) {
} else {
  var nowUrl = "";
  nowUrl = "";
}

const themes = ["light", "blue", "dark", "green", "black"];

function setThemeColor(color) {
  document.body.style = "--theme-color: " + color;
}

function setTheme(theme) {
  var body = document.body;
  var is = false;
  themes.map(function (thm) {
    if (body.className.includes(thm)) {
      body.className = body.className.replace(thm, theme);
      is = true;
    }
  });

  if (!is) {
    body.className += theme;
  }
}

if (localStorage.getItem("theme")) {
  var value = localStorage.getItem("theme");

  setTheme(value);
}

if (localStorage.getItem("theme-color")) {
  var value = localStorage.getItem("theme-color");

  setThemeColor(value);
}

function hErr(e) {}

window.onerror = hErr;
document.querySelectorAll("*").forEach(function (elem) {
  elem.onerror = hErr;
});

if (localStorage.getItem("admin")) {
  if (JSON.parse(localStorage.getItem("admin")).expaire == undefined) {
    localStorage.removeItem("admin");
    window.location.reload();
  }
}

function addScript(path) {
  var script = document.createElement("script");
  script.src = nowUrl + path;
  document.body.appendChild(script);
}

if (heading) {
} else {
  var heading = "D74 Edits";
  heading = "D74 Edits";
}
addScript("../veiw/alert.js");
//addScript('../view/d74.js');

function redirctTo(url) {
  window.location.href = url;
}

if (document.getElementById("loginLink")) {
  document.getElementById("loginLink").addEventListener("click", function () {
    redirctTo(nowUrl + "../login");
  });

  if (localStorage.getItem("user")) {
    var user = JSON.parse(localStorage.getItem("user"));

    if (
      localStorage.getItem("admin") ||
      (user.name.includes("guest") == false &&
        user.email.includes("guest") == false)
    ) {
      document.getElementById("loginLink").style.display = "none";
    }
  }

  if (localStorage.getItem("user")) {
    if (JSON.parse(localStorage.getItem("user")).name.includes("guest")) {
      document.getElementById("loginLink").style.display = "flex";
    }
  }
}

/*
if (document.querySelector('nav .title')) {
  var title = document.querySelector('nav .title')
  var i = 0
  setInterval(function() {
    i += 1
    i = i % (heading.length)
    //for (var i = 0; i < heading.length; i++) {
    var heading1 = heading.slice(0, i)
    var heading2 = heading.slice(i + 1, heading.length)
    heading = heading1 + '<v style="font-weight: bold">' + heading[i] + '</v>' + heading2
    title.innerHTML = heading
  }, 5000)
  //}
}
*/

if (document.querySelector(".menu")) {
  var menu = document.querySelector(".menu");
  menu.style.left = window.innerWidth / 2 - menu.offsetWidth / 2 + "px";

  var adminPermission = {
    started: false,
    duration: 0,
  };

  document.querySelector("body").addEventListener("touchstart", function () {
    adminPermission.started = true;
    adminPermission.duration = 0;
  });

  document.querySelector("body").ontouchend = function () {
    adminPermission.started = false;
    adminPermission.duration = 0;
  };

  setInterval(function () {
    if (adminPermission.started) {
      adminPermission.duration += 1;

      if (adminPermission.duration >= 4100) {
        window.location.href = "../Admin";
      }
    }
  }, 0.5);
}

if (localStorage.getItem("admin")) {
  var code = `<div class="link" onclick="redirctTo(\'' + nowUrl + '../Admin\')">
          <ion-icon name="people-outline"></ion-icon> <div>
            <p>Admin</p> <div class="small"> You're the Administrator</div></div>
  </div>`;
  if (document.querySelector(".left-bar")) {
    document.querySelector(".left-bar").innerHTML += code;
  }
}

// alert('Development mode', 'Web development refers to the creating, building, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet i.e. websites.')

if (document.querySelector("nav")) {
  document.querySelector(".left-bar").ondblclick = document.getElementById(
    "leftBarCloser"
  ).onclick = function () {
    document.querySelector(".left-bar").animate(
      [
        {
          transform: "translate(0%)",
        },
        {
          transform: "translate(-120%)",
        },
      ],
      { duration: 500, iterations: 1 }
    );

    setTimeout(function () {
      document.querySelector(".left-bar").style.display = "none";
    }, 410);
  };

  document.querySelector("nav").animate(
    [
      {
        transform: "translate(0, -100%)",
      },
      {
        transform: "translate(0, -50%)",
      },
      {
        transform: "translate(0, -0%)",
      },
    ],
    {
      duration: 500,
      iterations: 1,
    }
  ).onfinish = function () {};

  document.getElementById("menuOpener").onclick = function () {
    document.querySelector(".left-bar").style.display = "block";
    document.querySelectorAll(".link").forEach(function (elem, index) {
      elem.style.transform = "translate(20px) scale(1.3)";
      elem.animate(
        [
          {
            transform: "translate(20px) scale(1.3)",
          },
          {
            transform: "translate(0px) scale(1)",
          },
        ],
        {
          duration: 400,
          delay: index * 100,
          iterations: 1,
        }
      ).onfinish = function () {
        elem.style.transform = "translate(0px) scale(1)";
      };
    });
  };
}

if (localStorage.getItem("user")) {
} else {
  var name = "guest" + Math.floor(Math.random() * 9999);

  var deviceName = navigator.userAgent;

      var user = {
      name: name,
      email: name + "@gmail.com",
      location: window.location.href,
      date: new Date(),
      languages: navigator.languages.join(","),
    };

    db.push(
      "account",
      JSON.stringify({
        name: user.name,
        email: user.email,
        location: window.location.href,
        date: user.date,
        languages: user.languages,
      })
    );

    localStorage.setItem("user", JSON.stringify(user));
}

if (localStorage.getItem("app")) {
  // window.location.reload()
}

class TagString extends String {
  constructor(code) {
    super(code);
  }

  parse(next) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this, "text/html");
    if (typeof next == "function") next({ content: doc, str: this });
    return doc;
  }

  parseElement() {
    var parsed = this.parse();
    return parsed.body.children;
  }

  setOptions(obj = {}) {
    var doc = this.parse();
    doc = doc.body.children[0];

    Object.keys(obj).forEach(function (key) {
      doc[key] = obj[key];
    });

    return new TagString(doc.outerHTML);
  }

  setAttributes(obj = {}) {
    var doc = this.parse();
    doc = doc.body.children[0];

    Object.keys(obj).forEach(function (key) {
      if (doc.setAttribute) {
        doc.setAttribute(key, obj[key]);
      }
    });

    return new TagString(doc.outerHTML);
  }

  child(html) {
    var doc = this.parse();
    doc = doc.body.children[0];
    doc.innerHTML = html;
    return new TagString(doc.outerHTML);
  }

  data(next) {
    if (typeof next === "function") {
      var data = next(this);
      if (data) return data;
    }
    return this;
  }
}

function coolLoop(arr, callback, index = 0, time = 10) {
  return new Promise((res) => {
    if (arr.length > 0) {
      callback(arr[index], index);
      index += 1;
      if (arr[index] != undefined) {
        setTimeout(function () {
          coolLoop(arr, callback, index, time).then(res);
        }, time);
      } else {
        res();
      }
    }
  });
}

if ("dayjs" in window || window.dayjs) {
  if (dayjs && window.dayjs_plugin_relativeTime) {
    dayjs.extend(window.dayjs_plugin_relativeTime);
  }
}
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../sw.js', {
      // scope: window.location.origin
    })
    .then(registration => {})
}*/
