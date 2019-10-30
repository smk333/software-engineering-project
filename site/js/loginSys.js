var loginSystem = function()
{

  var init = function(){
    // set up event listeners
    $('#loginSubmitBtn').on('click', function(e){
      var credentials = validateInput($('#loginUsername').val(), $('#loginPassword').val());
      var sessionId = create_UUID();
      sessionId = 'testing';
      // rewrite clean credentials to page before attempting to access from php
      
      // try to auth user data and if it works, create a session schema, send the key to the app, and start up the app
      $.ajax({
        type: "POST",
        url: 'auth.php',
        //url: 'dbtest.php',
        dataType: 'json',
        data: {'username' : credentials.u, 'password' : credentials.p, 'sessionId': sessionId},
        success: function (response) {
          if(!response['userAuth'])
          {
            console.log("Invalid username or password entered");
          }
          else
          {
            // clear app for login
            $('#app-main').remove();
            $('body').append('<div id="root"><div class="loader"></div></div>');

            // add depenencies to head
            var html =
            '<script src="js/lib/plotly-latest.min.js"></script>';
            $('head').append(html);

            // start app
            MAIN_APP();
          }
        },
        error: function (response) {
          console.log(response);
        }
    });

    }.bind(this));
  }
  

  var create_UUID = function(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  var validateInput = function(username, password)
  {
    var safeUsernameInput = username;
    var safePasswordInput = password;

    return {u: safePasswordInput, p: safePasswordInput};
  }

  init();

  var _DecentralizedFitness = new DecentralizedFitness();

  var MAIN_APP = function()
  {

    /*******************************************************************************
    App Main Code:
    Run the app
*******************************************************************************/

var df = new DecentralizedFitness();

/*******************************************************************************
    Nav Stuff: Only touch this if you really know what you're doing
*******************************************************************************/
routes = df.getViewsMappedByUrl();

// const rootDiv = document.getElementById('root');

// const onNavigate = (pathname, hackFix = false) => {
//   window.history.pushState(
//     {},
//     pathname,
//     window.location.origin + pathname
//   )

//   rootDiv.innerHTML = '<div class="loader"></div>';

//   var url = (hackFix) ? 'site/' + routes[pathname].template : routes[pathname].template;
//   jQuery.ajax({
//       url: url,
//       success: function (data) {
//         rootDiv.innerHTML = data;
//         routes[pathname].afterRender(this);
//       },
//       async: false //async so this is done upon loading
//   });
// }

// window.onpopstate = () => {
//   rootDiv.innerHTML = routes[window.location.pathname]
// }

// upon first load, spin up the home page
onNavigate('/', true);


  }
}