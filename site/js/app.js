/*******************************************************************************
    App Main Code:
    Run the app
*******************************************************************************/

var DecentralizedFitness = new DecentralizedFitness();

/*******************************************************************************
    Nav Stuff: Only touch this if you really know what you're doing
*******************************************************************************/
routes = DecentralizedFitness.getRoutes();

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )

  jQuery.ajax({
      url: routes[pathname],
      success: function (data) {
        rootDiv.innerHTML = data;
      }.bind(this),
      async: false //async so this is done upon loading
  });
}

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname]
}

// upon first load, spin up the home page
onNavigate('/');