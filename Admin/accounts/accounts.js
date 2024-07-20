db.get(
  "account",
  function (xhr) {
    if (xhr.status == 0) {
      alert("Server Error");
    }

    document.querySelector(".body").innerHTML += acc_ui.createTitleBar(xhr);

    var parsedData = JSON.parse(xhr.response);
    coolLoop(
      parsedData,
      function (acc) {
        document
          .querySelector(".body")
          .appendChild(acc_ui.create(acc).parseElement()[0]);
      },
      0,
      90
    );
  },
  3
);
