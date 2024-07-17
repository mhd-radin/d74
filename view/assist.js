var col = db.sdk.collection(db.fdb, collection.collection);
          if (collection.hasQuery()) {
            var qfb = collection.QforFB('==');
            col = db.sdk.query(col, db.sdk.where(qfb[0], qfb[1], qfb[2]))
          }
          db.sdk.getDocs(col).then((snapshot) => {
            var status = 200;

            var data = [];
            snapshot.forEach(function(e) {
              var dt = e.data();
              dt._id = e.id;
              data.push(dt);
            });

            if (data.length == 0) {
              status = 100;
              reject(status)
            } else {

              resolve(status)