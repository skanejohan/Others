(function() {
  var app = angular.module('map', ['google-maps']);

  app.controller('AppController', ['$scope',
    function($scope) {
      $scope.mapdata = mapdata;
      $scope.gamedata = gamedata;
      $scope.serverif = mockserverif;
      $scope.language = language;
      $scope.validselection = false;

      $scope.events = {
        tilesloaded: function (map) {
          $scope.$apply(function () {
            $scope.mapdata.initialize($scope.gamedata, map, $scope.handleValidSelection);
            $scope.gamedata.initialize($scope.mapdata, $scope.serverif);
          });
        }
      };

      $scope.answer = function() {
        $scope.gamedata.answer();
        $scope.validselection = false;
      };

      $scope.ask_quit = function() {
        $scope.gamedata.ask_quit();
      };

      $scope.dont_quit = function() {
        $scope.gamedata.dont_quit();
      };

      $scope.quit = function() {
        $scope.gamedata.quit();
        $scope.validselection = false;
      };

      $scope.post_fb = function() {
        s = $scope.language.facebook_message($scope.gamedata.score, $scope.gamedata.noOfQuestions); 
        postAboutGame(s);
      };

      $scope.handleValidSelection = function(valid) {
        $scope.$apply($scope.validselection = valid);
      };

    }]
  );

})();
