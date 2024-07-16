const db = {
  qC4dK: '64a3b47b86d8c5956ded8f77',
  Coll: class Coll {
    constructor(collection, queryObj) {
      this.collection = collection;
      this.queryObj = queryObj;
    }
  hasQuery(){
    return (this.queryObj && Object.keys(this.queryObj).length > 0);
  }

    toQURL() {
      var str = '' + this.collection;
      if (this.hasQuery()) {
        str += ('?q=' + decodeURI(JSON.stringify(this.queryObj)));
      }
      return str;
    }

    QforFB(operator = '==') {
      var x = Object.keys(this.queryObj)[0]
      var y = operator;
      var z = this.queryObj[x];
      return [x, y, z];
    }
  },
  fbConfig: {
    apiKey: "AIzaSyDVkWn_J2dQIiOvxPvoa9g1TOS6h69y_gY",
    authDomain: "d74-2024.firebaseapp.com",
    projectId: "d74-2024",
    storageBucket: "d74-2024.appspot.com",
    messagingSenderId: "438339741597",
    appId: "1:438339741597:web:9b4de7f44c3ace95af7174",
    measurementId: "G-QRPWP8E6K3",
    uid: 'AIzaSyDVkWn_J2dQIiOvxPvoa9g1TOS6h69y_gY'
  },
  fdb: null,
  isInited: false,
  sdk: {},
  fbApp: null,
  config() {
    return new Promise((resolve, reject) => {

      var self = this;
      if (this.fdb == null || (!this.isInited)) {
        var script = document.createElement('script');
        script.type = 'module';
        script.textContent = `import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
//import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js"
import * as fbfs from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

if (db && db.sdk){
  db.sdk = fbfs;
  const appfb = initializeApp(db.fbConfig);
  db.fdb = fbfs.getFirestore(appfb);
  db.fbApp = appfb;
  }`

        document.head.appendChild(script);
        //script.onload = function() {
        setTimeout(function() {
          self.isInited = true;
          resolve()
        }, 2000)
        //}
      }
    })
  },
  async apiToggler(status, as1, as2) {
    var asr1 = await as1();
    if (asr1 != status) {
      await as2();
    }
    return true;
  },
  push(collection, data = {}, onfinish = function() {}) {
    if (!collection instanceof db.Coll || !collection.collection) collection = new db.Coll(collection);
    this.config().then(() => {
      this.apiToggler(201, function() {
        return new Promise((resolve, reject) => {
          db.sdk.setDoc(db.sdk.doc(db.fdb, collection.collection, ('FBD_Atqva7qb' + Math.floor(Math.random() * 999) + 'Fayqb' + Math.floor(Math.random() * 999999))), JSON.parse(data)).then(() => {
            resolve(201)
            onfinish({
              status: 201
            })
            console.log('dt')
          }).catch((err) => reject(404))
        })
      }, function() {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;

          xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
              onfinish(this)
              resolve(xhr.status);
            }
          });

          xhr.open("POST", "https://d74edits-fce6.restdb.io/rest/" + collection);
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", this.qC4dK);
          xhr.setRequestHeader("cache-control", "no-cache");

          xhr.send(data);
        })
      })
    })
  },
  put(collection, data = {}, onfinish = function() {}) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        onfinish(this)
      }
    });

    xhr.open("PUT", "https://d74edits-fce6.restdb.io/rest/" + collection);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", this.qC4dK);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

    return xhr
  },
  get(collection, finish) {
    if (!collection instanceof db.Coll || !collection.collection) collection = new db.Coll(collection);
    this.config().then(() => {
      this.apiToggler(200, function() {
        return new Promise((resolve, reject) => {
          var col = db.sdk.collection(db.fdb, collection.collection);
          if (collection.hasQuery()) {
            var qfb = collection.QforFB('==');
            col = db.sdk.query(col, db.sdk.where(qfb[0], qfb[1],qfb[2]))
          }
          db.sdk.getDocs(col).then((snapshot) => {
            resolve(200)
            var data = [];
            snapshot.forEach(function(e) {
              var dt = e.data();
              dt._id = e.id;
              data.push(dt);
            });

            finish({
              status: 200,
              response: JSON.stringify(data)
            })
            console.log('dt5')
          }).catch((err) => reject(404))
        })
      }, function() {
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function() {
          if (this.readyState === 4) {
            finish(xhr)
          }
        });

        xhr.open("GET", "https://d74edits-fce6.restdb.io/rest/" + collection);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", this.qC4dK);
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
      })
    })
  },
  getYTchannelVideos(onfinish, pageTkn = false) {
    const data = null;


    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        onfinish(xhr)

        if (this.status == 0) {
          alert('failed to load!')
        }
      }
    });

    xhr.open('GET', 'https://youtube-v31.p.rapidapi.com/search?channelId=UCFodctpE1wtpFhWw716uCgg&part=snippet%2Cid&order=date&maxResults=15' + (pageTkn == false ? '' : '&pageToken=' + pageTkn));
    xhr.setRequestHeader('X-RapidAPI-Key', '786ab693aamsh13b490be165befdp1ebb1bjsn20906d36a500');
    xhr.setRequestHeader('X-RapidAPI-Host', 'youtube-v31.p.rapidapi.com');

    xhr.send(data);
  },
  getLiveAndHL(callback) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        if (typeof callback == 'function') callback(xhr)
      }
    });

    xhr.open('GET', 'https://free-football-soccer-videos.p.rapidapi.com');
    xhr.setRequestHeader('x-rapidapi-key', '786ab693aamsh13b490be165befdp1ebb1bjsn20906d36a500');
    xhr.setRequestHeader('x-rapidapi-host', 'free-football-soccer-videos.p.rapidapi.com');

    xhr.send(data);
  }
}