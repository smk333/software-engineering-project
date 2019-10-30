

const onNavigate = (pathname, hackFix = true) => {
  const rootDiv = document.getElementById('root');
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )

  rootDiv.innerHTML = '<div class="loader"></div>';

  var url = (hackFix) ? 'site' + routes[pathname].template : routes[pathname].template;
  jQuery.ajax({
      url: url,
      success: function (data) {
        rootDiv.innerHTML = data;
        routes[pathname].afterRender();
      }.bind(this),
      async: false //async so this is done upon loading
  });
}

window.onpopstate = () => {
  const rootDiv = document.getElementById('root');
  rootDiv.innerHTML = routes[window.location.pathname]
}
