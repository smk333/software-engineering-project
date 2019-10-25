// Good reference for OOD Javascript:
// https://joebuckle.me/quickie/jquery-create-object-oriented-classes-in-jquery/
/*
 * Main system object, everything exists within here to bridge user interactions with the UI
 */
var HomePageView = function(){
 
    /*
     * Private member variables
     */
    this.html = '';
    this.template = '/templates/home.html';
    this.url = '/';
 
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
    };

    this.afterRender = function() {
        
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