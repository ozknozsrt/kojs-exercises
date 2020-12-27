var GameModel = function () {
  this.appid = ko.observable();
  this.name = ko.observable();
  this.img = ko.observable();
  this.url = ko.observable();
};

var App = function () {
    this.title = ko.observable();
};

var vm = new (function () {
  var self = this;
  self.title = ko.observable("Upcoming Games");


  var twitch = window.Twitch.ext;

  var gameCollection = db.collection("games");
  self.GameList = kofs.getBoundCollection(gameCollection, GameModel);

  var appCollection = db.collection("app");
  self.App = kofs.getBoundCollection(appCollection, App);



})();
ko.applyBindings(vm, document.getElementById("app"));
