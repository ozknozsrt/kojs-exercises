var vm = new (function () {
  var self = this;
  self.input = ko.observable("");
  self.games = ko.observableArray();
  self.visibleGames = ko.observableArray();
  self.title = ko.observable("Upcoming Games");
  self.selectedGames = ko.observableArray();

  self.visibleGames(JSON.parse(localStorage.getItem("selectedGames")));

  self.rightClick = function(data, item) {
      var json = JSON.parse(localStorage["selectedGames"]);
      for (i=0;i<json.length;i++) {
        if (json[i].appid == data.appid) json.splice(i,1);
      }
      localStorage["selectedGames"] = JSON.stringify(json);
      $(item.target).css("background", "lightslategrey");
  }
  
 
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
    localStorage.setItem("selectedGames", JSON.stringify(self.selectedGames()));
    $(item.target).css("background", "gray");
  }


})();
ko.applyBindings(vm, document.getElementById("app"));
