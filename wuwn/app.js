var vm = new (function () {
  var self = this;

  self.data = ko.observableArray();
  self.Name = ko.observable(localStorage.getItem('name'));


  var bilimteknoloji = "https://t24.com.tr/rss/haber/bilim-teknoloji";
  var gundem = "https://t24.com.tr/rss";
  self.kategori = ko.observable(gundem);

  self.kategori.subscribe(function (e) {
    if (e == "bilimteknoloji") {
      self.kategori(bilimteknoloji);
      self.data().length = 0;
      sendRequest();
    } else if (e == "gundem") {
      self.kategori(gundem);
      self.data().length = 0;
      sendRequest();
    }
  });

  function sendRequest() {
    $.ajax({
      type: "GET",
      url: self.kategori(),
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
                self.data.push({ title: title, link: link });
              });
          });
      },
    });
  }

  self.play = function () {
    var getTitle = self.data().map(i => i.title).join('');
    var x = JSON.stringify(getTitle);
    x = x.replace('[', '').replace(']', '');
    responsiveVoice.speak(x, "Turkish Female", { rate: 0.95 });
  };
   

  self.formHandler = function(e) {
    var name = self.Name();
    localStorage.setItem('name', name);
    responsiveVoice.speak("Günaydın " + localStorage.getItem('name') + ", işte bugünkü haberler", "Turkish Female", { rate: 0.95 });
  }

  $(function(){
    if(self.Name()){
      responsiveVoice.speak("Günaydın " + localStorage.getItem('name') + ", işte bugünkü haberler", "Turkish Female", { rate: 0.95 });
    }
  })


})();

ko.applyBindings(vm, document.getElementById("wrapper"));
ko.applyBindings(vm, document.getElementById("login"));
