$(function() {
  $('#goalInput').focus();
});

var vm = function () {
  var self = this;
  self.input = ko.observable("");
  self.data = ko.observableArray([]);
  self.countdown = ko.observable("");

  // init Lang
  self.language = ko.observable(localStorage.getItem("lang"));
  self.language.subscribe(function (value) {
    i18nextko.setLanguage(value);
    localStorage.setItem("lang", value);
    $("html").attr("lang", value);
  });
  $("html").attr("lang", localStorage.getItem("lang"));
  self.ph = i18nextko.t("placeholder");
  // */init Lang

  // First letter make uppercase
  self.input.subscribe(function () {
    if (self.input() != "") {
      var t = self.input()[0].toUpperCase() + self.input().slice(1);
      self.input(t);
    }
  });

  self.addGoal = function () {
    if (self.input() != "") {
      self.data.push(document.getElementById("goalInput").value);
      self.input("");
    }

    if (self.data().length >= 3) {
      $("#submitBtn").attr("disabled", true);
      $("#goalInput").attr("disabled", true);
    }
  };

  var timer = null,
    interval = 1000;

  function timeText(timer, s, dk, sn) {
    if (timer == null) {
      if (self.language() == "en") {
        return "You Stopped Your Goal!";
      } else {
        return "Hedefinizi Durdurdunuz!";
      }
    } else {
      if (self.language() == "en") {
        return `You have last <b>${s} hours ${dk} mins ${sn} secs</b> to your goals`;
      } else {
        return `Hedefinize kalan son <b>${s} saat ${dk} dk ${sn} sn</b>`;
      }
    }
  }

  self.startCounter = function () {
    if (timer !== null) return;

    // Current Time
    var crTime = new Date();
    crTime.setDate(crTime.getDate() + 1);

    var countDownDate = new Date(crTime).getTime();

    // Update the count down every 1 second
    timer = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      self.countdown(timeText("", hours, minutes, seconds));

      // self.countdown(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timer);
        self.countdown("Süreniz Doldu!");
      }
    }, interval);
  };

  self.stopCounter = function () {
    clearInterval(timer);
    timer = null;
    self.countdown(timeText(timer));
    $("#stopCounter").hide();
    $("#startCounter").show();
  };
};

ko.applyBindings(new vm(), document.getElementById("app"));
