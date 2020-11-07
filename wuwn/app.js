var vm = new (function () {
  var self = this;

  self.data = ko.observableArray();
  self.Name = ko.observable(localStorage.getItem("name"));

  self.seedData = [
    {
      text: "Gündem",
      value: "gundem",
      url: "https://t24.com.tr/rss",
    },
    {
      text: "Bilim / Teknoloji",
      value: "bilimteknoloji",
      url: "https://t24.com.tr/rss/haber/bilim-teknoloji",
    },
  ];
  

  self.selectedItem = ko.observable(); 

  self.selectedItem.subscribe(function (e) {
    if(e == "gundem") {
      var getGundem = self.seedData.filter(p => p.value == "gundem");
      self.data([]);
      sendRequest(getGundem[0].url);
    }else if(e == "bilimteknoloji") {
      var getBilim = self.seedData.filter(p => p.value == "bilimteknoloji");
      self.data([]);
      sendRequest(getBilim[0].url);
    }
  });

  function sendRequest(kategori) {
    $.ajax({
      type: "GET",
      url: kategori,
      cache: false,
      dataType: "xml",
      success: function (xml) {
        $(xml)
          .find("item")
          .each(function () {
            $(this)
              .find("title")
              .each(function () {
                var title = $(this).text();
                var link = $(this).siblings("link").text();
                var enclosure = $(this).siblings("enclosure").attr("url");
                

                self.data.push({
                  title: title,
                  link: link,
                  enclosure: enclosure,
                });

              });
          });
      },
    });
  }

  self.play = function () {
    var getTitle = self
      .data()
      .map((i) => i.title)
      .join("");
    var x = JSON.stringify(getTitle);
    x = x.replace("[", "").replace("]", "");
    responsiveVoice.speak(x, "Turkish Female", { rate: 0.95 });
  };

  self.formHandler = function (e) {
    var name = self.Name();
    localStorage.setItem("name", name);
    responsiveVoice.speak(
      "Günaydın " + localStorage.getItem("name") + ", işte bugünkü haberler",
      "Turkish Female",
      { rate: 0.95 }
    );
  };

  $(function () {
    if (self.Name()) {
      responsiveVoice.speak(
        "Günaydın " + localStorage.getItem("name") + ", işte bugünkü haberler",
        "Turkish Female",
        { rate: 0.95 }
      );
    }
  });
})();

ko.applyBindings(vm, document.getElementById("wrapper"));
ko.applyBindings(vm, document.getElementById("login"));
