// Good reference for OOD Javascript:
// https://joebuckle.me/quickie/jquery-create-object-oriented-classes-in-jquery/
/*
 * Main system object, everything exists within here to bridge user interactions with the UI
 */

var StatsVisualizationsView = function(sessionKey){
 
    /*
     * Private member variables
     */
    this.html = '';
    this.template = '/templates/vis.html';
    this.url = '/statvis';
    this.sessionKey = '';
    this.DATA = {};
 
    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;
 
    /*
     * Constructor
     */
    this.construct = function(sessionKey){
        this.sessionKey = sessionKey;
        init();
    };

    var init = function() {

        // // load plotly lib via script tags
        // var script = document.createElement("script"); //Make a script DOM node
        // script.src = '/js/lib/plotly-latest.min.js'; //Set it's src to the provided URL
        // document.head.appendChild(script); //Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    };

    this.afterRender = function() {
        var TESTER = document.getElementById('tester');
        Plotly.plot( TESTER, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );

        $.ajax({
            type: "POST",
            url: 'getFitnessData.php',
            //url: 'dbtest.php',
            dataType: 'json',
            data: {'sessionId' : this.sessionKey},
            success: function (response) {
              console.log(response);
            },
            error: function (response) {
              console.log(response);
            }
          });
    }
 
    /*
     * Public method
     * Can be called outside class
     */
    this.myPublicMethod = function(){
        console.log(vars.myVar);
 
        myPrivateMethod();
    };
 
    /*
     * Private method
     * Can only be called inside class
     */
    var myPrivateMethod = function() {
        console.log('accessed private method');
    };
    
    this.construct(sessionKey);
 
};