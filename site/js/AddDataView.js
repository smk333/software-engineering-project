// Good reference for OOD Javascript:
// https://joebuckle.me/quickie/jquery-create-object-oriented-classes-in-jquery/
/*
 * Main system object, everything exists within here to bridge user interactions with the UI
 */


var AddDataView = function(sessionKey){
 
    /*
     * Private member variables
     */
    this.template = '/templates/addData.html';
    this.url = '/dataEntry';
    this.sessionKey = '';
 
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
    };

    this.afterRender = function() {
        $('#submitDataEntry').on('click', function(e){
            var v = $('#dataEntryInput').val();
            alert("Added data with value: " + v);
        })
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