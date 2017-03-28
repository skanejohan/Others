window.fbAsyncInit = function() {
    FB.init({
      appId      : '605417236236953',
      xfbml      : true,
      version    : 'v2.1'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function postAboutGame(result) {
  FB.ui({
    method: 'feed',
    app_id: '605417236236953',
    redirect_uri: 'http://apps.johanahlgren.se/mapquiz',
    link: 'http://apps.johanahlgren.se/mapquiz',
    picture: 'http://apps.johanahlgren.se/mapquiz/static/lg.png',
    caption: result, 
  }, function(response){});
};

