var START_APP = function(sessionKey)
{
  this.sessionKey = sessionKey;
  var js = ["js/DecentralizedFitness.js", "js/HomePageView.js", "js/AddDataView.js", "js/StatsVisualizationsView.js"];
  var $head = $("head");
  for (var i = 0; i < js.length; i++) {
    $head.append("<script src=\"" + js[i] + "\"></scr" + "ipt>");
  }
  $head.append('<script src="js/DecentralizedFitness.js"></script>');

  /*******************************************************************************
      App Main Code:
      Run the app
  *******************************************************************************/

  var DecentralizedFitness = new DecentralizedFitness();

  /*******************************************************************************
      Nav Stuff: Only touch this if you really know what you're doing
  *******************************************************************************/
  routes = DecentralizedFitness.getViewsMappedByUrl();

  const rootDiv = document.getElementById('root');

  const onNavigate = (pathname) => {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname
    )

    rootDiv.innerHTML = '<div class="loader"></div>';

    jQuery.ajax({
        url: routes[pathname].template,
        success: function (data) {
          rootDiv.innerHTML = data;
          routes[pathname].afterRender();
        }.bind(this),
        async: false //async so this is done upon loading
    });
  }

  window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname]
  }

  // upon first load, spin up the home page
  onNavigate('/');

};