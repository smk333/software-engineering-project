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
    var sessionKey;
 
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
        console.log('Initizalizing app...');

        // init home view
        m_views.push(new HomePageView(session));
        m_views.push(new AddDataView(session));
        m_views.push(new StatsVisualizationsView(session));

        console.log('Finished initializing app!');
    };

    this.getViewsMappedByUrl = function()
    {
        routes = {};
        for(var i = 0; i < m_views.length; ++i)
        {
            var u = m_views[i].url;
            var t = m_views[i];
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
    
    this.construct(options);
 
};