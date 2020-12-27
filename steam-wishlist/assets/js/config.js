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
  self.input = ko.observable("");
  self.games = ko.observableArray();
  self.visibleGames = ko.observableArray();
  self.title = ko.observable("Upcoming Games");
  self.selectedGames = ko.observableArray();

 
  var allGamesApiUrl = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
  $.get(allGamesApiUrl, function (data) {
    data.applist.apps.map(function(item) {
      let appid = item.appid;
      let name = item.name;
      let img = "https://cdn.cloudflare.steamstatic.com/steam/apps/" + appid + "/header.jpg";
      let url = "https://store.steampowered.com/app/" + appid;
  
      self.games.push({
        appid: appid,
        name: name,
        img: img,
        url: url
      });

    });
  });  


  var twitch = window.Twitch.ext;

  var gameCollection = db.collection('games');
  self.GameList = kofs.getBoundCollection(gameCollection, GameModel);


  self.submitGameList = function () {
    self.visibleGames.removeAll();
    if(self.input().length > 0) {
      self.games().filter(function(game){
        if(!self.input() || game.name.toLowerCase().indexOf(self.input().toLowerCase()) !== -1) {
          self.visibleGames.push(game);
        }
      });
    }
  };
   
  self.Selected = function(data, item) {
    self.selectedGames.push(data);
    // localStorage.setItem("selectedGames", JSON.stringify(self.selectedGames()));
    $(item.target).css("background", "gray");

    
    // Add a new document with a generated id.
    db.collection("games").add({
      appid: data.appid,
      name: data.name,
      img: data.img,
      url: data.url
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  self.rightClick = function(data) {
    var fsDocumentId = data.fsDocumentId;
    // var json = JSON.parse(localStorage["selectedGames"]);
    // for (i=0;i<json.length;i++) {
    //   if (json[i].appid == data.appid) json.splice(i,1);
    // }
    // localStorage["selectedGames"] = JSON.stringify(json);
    // $(item.target).css("background", "lightslategrey");

    db.collection("games").doc(fsDocumentId).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }


})();
ko.applyBindings(vm, document.getElementById("app"));
