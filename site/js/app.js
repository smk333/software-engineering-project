
/*******************************************************************************
    Modify this to add pages to the nav system where the format follows:
    <suburl> : <js file>
*******************************************************************************/
const routes = {
  '/' : home
};


/*******************************************************************************
    HOME PAGE
*******************************************************************************/

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  rootDiv.innerHTML = routes[pathname]
}

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname]
}

// upon first load, spin up the home page
onNavigate('/');