// Good reference for OOD Javascript:
// https://joebuckle.me/quickie/jquery-create-object-oriented-classes-in-jquery/
/*
 * Main system object, everything exists within here to bridge user interactions with the UI
 */
var DecentralizedFitness = function(options){
 
    /*
     * Private member variables
     */
    var m_views = [];
 
    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;
 
    /*
     * Constructor
     */
    this.construct = function(){
        init();
    };

    var init = function() {
        console.log('Initizalizing app...');

        // init home view
        m_views.push(new HomePageView());

        console.log('Finished app!');
    };

    this.getRoutes = function()
    {
        routes = {};
        for(var i = 0; i < m_views.length; ++i)
        {
            var u = m_views[i].url;
            var t = m_views[i].template;
            routes[u] = t;
        }

        return routes;
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
    
    this.construct();
 
};