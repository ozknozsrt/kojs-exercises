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
    if (e == "gundem") {
      var getGundem = self.seedData.filter((p) => p.value == "gundem");
      self.data([]);
      sendRequest(getGundem[0].url);
    } else if (e == "bilimteknoloji") {
      var getBilim = self.seedData.filter((p) => p.value == "bilimteknoloji");
      self.data([]);
      sendRequest(getBilim[0].url);
    }
  });

  // Saat gösterimi
  self.dateNow = ko.observable();
  var dateNowUpdate = function () {
    var d = new Date();
    let h = `${d.getHours()}`.padStart(2, "0");
    let m = `${d.getMinutes()}`.padStart(2, "0");
    let s = `${d.getSeconds()}`.padStart(2, "0");
    let crtime = h + ":" + m;
    self.dateNow(crtime);
  };
  window.setInterval(dateNowUpdate, 1000);
  dateNowUpdate();

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


  // burc yorumu
  self.burcadi = ko.observable();
  self.burcyorumu = ko.observable();
  self.burcModalHandler = ko.observable(false);
  
  self.burcmodal = function() {
    self.burcModalHandler(true);
    var burcname = "terazi";
    var corsproxy = "https://cors-anywhere.herokuapp.com/";
    $.get(corsproxy + 'http://mahmure.hurriyet.com.tr/astroloji/burclar/' + burcname, function(response) {
      var dom_nodes = $($.parseHTML(response));
      self.burcadi(dom_nodes.find('.horoscope-menu-title').text())
      self.burcyorumu(dom_nodes.find('.horoscope-detail-tab-content').text())
    });
  }

  
  self.formHandler = function (e) {
    var name = self.Name();
    localStorage.setItem("name", name);
    responsiveVoice.speak(
      "Günaydın " + localStorage.getItem("name") + ", işte bugünkü haberler",
      "Turkish Female",
      { rate: 0.95 }
    );
  };

  ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
      // Initially set the element to be instantly visible/hidden depending on the value
      var value = valueAccessor();
      $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
      // Whenever the value subsequently changes, slowly fade the element in or out
      var value = valueAccessor();
      ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
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
