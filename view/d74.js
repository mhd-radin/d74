const db = {
  qC4dK: '64a3b47b86d8c5956ded8f77',
  Coll: class Coll {
    constructor(collection, queryObj) {
      this.collection = collection;
      this.queryObj = queryObj;
    }
    hasQuery() {
      return (this.queryObj && Object.keys(this.queryObj).length > 0);
    }

    toQURL() {
      var str = this.collection;
      if (this.hasQuery()) {
        str += ('?q=' + decodeURI(JSON.stringify(this.queryObj)));
      }
      return str;
    }

    QforFB(operator = '==', i = 0) {
      var x = Object.keys(this.queryObj)[i]
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
      } else {
        resolve()
      }
    })
  },

  getFDBDocByQueries(col) {
    return new Promise((resolve, reject) => {
      if (col && col.collection) {
        const returnData = [];

        function requestForDoc(collection) {
          return new Promise((res, rej) => {
            db.sdk.getDocs(collection).then((snapshot) => {
              var status = 200;
              var data = [];

              snapshot.forEach(function(e) {
                var dt = e.data();
                dt._id = e.id;
                data.push(dt);
              });

              if (data.length == 0) {
                status = 100;
                console.log('status 100...')
                rej(status)
              }

              res(data)
            }).catch((err) => {
              console.warn()
              rej(404)
            })
          })
        }

        var collection = db.sdk.collection(db.fdb, col.collection);
        if (col.hasQuery()) {
          var obj = col.queryObj;
          var keys = Object.keys(obj);
          var whs = []

          keys.forEach(function(key, index) {
            let where = db.sdk.where(key, '==', obj[key]);
            whs.push(where)
          })

          console.log("whs", whs)

          requestForDoc(db.sdk.query(collection, ...whs)).then(function(data) {
            console.log('the data', data);
            returnData.push(data);
            //if ((keys.length - 1) == index) {
            resolve([returnData[0]]);
            console.log('RTD', returnData)
            //}
          }).catch(err => reject(err))
        } else {
          requestForDoc(collection).then((data) => {
            resolve(data)
          }).catch(err => reject(err))
        }
      }
    })
  },
  async apiToggler(status, as1, as2, typeCode = 0) {
    switch (typeCode) {
      case 0:

        as1().then(function(status) {
          console.log('as1 getted..', status)
        }).catch(function() {
          console.log('catched...')
          as2()
        })
        break;
      case 1:
        as1();
        break;
      case 2:
        as2();
        break;
      case 3:
        as1().then(() => {
          as2()
        })
        break;
    }
  },
  push(collection, data = {}, onfinish = function() {}) {
    if (!collection instanceof db.Coll || !collection.collection) collection = new db.Coll(collection);
    this.config().then(() => {
      this.apiToggler(201, function() {
        return new Promise((resolve, reject) => {
          db.sdk.setDoc(db.sdk.doc(db.fdb, collection.collection, ('FBD_Atqva7qb' + Math.floor(Math.random() * 999) + 'Fayqb' + Math.floor(Math.random() * 999999))), JSON.parse(data)).then(() => {
            onfinish({
              status: 201
            })
            resolve(201)
            console.log('dt')
          }).catch((err) => { reject(404) })
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

          xhr.open("POST", "https://d74edits-fce6.restdb.io/rest/" + collection.toQURL());
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", this.qC4dK);
          xhr.setRequestHeader("cache-control", "no-cache");

          xhr.send(data);
        })
      })
    })
  },
  put(collection, data = {}, onfinish = function() {}) {
    if (!collection instanceof db.Coll || !collection.collection) collection = new db.Coll(collection);
    this.config().then(() => {
      this.apiToggler(200, function() {
        return new Promise((resolve, reject) => {
          db.sdk.setDoc(db.sdk.doc(db.fdb, collection.collection), JSON.parse(data)).then(() => {
            onfinish({
              status: 200
            })
            resolve(200)
            console.log('dtPut')
          }).catch((err) => reject(404))
        })
      }, function() {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;

          xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
              onfinish(this)
              resolve(this)
            }
          });

          xhr.open("PUT", "https://d74edits-fce6.restdb.io/rest/" + collection.toQURL());
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", this.qC4dK);
          xhr.setRequestHeader("cache-control", "no-cache");

          xhr.send(data);
        })
      })
    })
  },
  get(collection, finish, typeCode = 0) {
    if (!collection instanceof db.Coll || !collection.collection) collection = new db.Coll(collection);
    this.config().then(() => {
      this.apiToggler(200, function() {
          return new Promise((resolve, reject) => {
            var status = 200;
            db.getFDBDocByQueries(collection).then((data) => {
              console.log('getting collection', data)

              finish({
                status: status,
                response: JSON.stringify(data)
              })
              console.log('dt5')
            }).catch(err => { console.log(err);
              reject(404) });
          })

        },
        function() {
          console.log(collection.toQURL());

          var data = null;

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;

          xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
              console.log('Done Request')
              console.log(xhr.status)
              if (xhr.status == 0) { alert('error') }
              finish(xhr)
            }
          });

          xhr.open("GET", "https://d74edits-fce6.restdb.io/rest/" + collection.toQURL());
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", db.qC4dK);
          xhr.setRequestHeader("cache-control", "no-cache");

          xhr.send(data);
        },
        typeCode)
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