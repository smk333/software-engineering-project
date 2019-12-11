// Good reference for OOD Javascript:
// https://joebuckle.me/quickie/jquery-create-object-oriented-classes-in-jquery/
/*
 * Main system object, everything exists within here to bridge user interactions with the UI
 */


var GoalManagementView = function(sessionKey){
 
    /*
     * Private member variables
     */
    this.template = '/templates/goalManager.html';
    this.url = '/goals';
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


    var getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.afterRender = function() {
        var values = [
            {
                distance: 1200,
                food: 2000,
                sleep: 8,
                weight: 145
            },
            {
                distance: 1400,
                food: 2200,
                sleep: 7,
                weight: 165
            },
            {
                distance: 1100,
                food: 1800,
                sleep: 7.5,
                weight: 115
            },
            {
                distance: 925,
                food: 1950,
                sleep: 10,
                weight: 170
            }
        ];

        var ind = getRandomInt(0,3);
        var v = values[ind];

        $('#dist-goal-input').val(v.distance);
        $('#food-goal-input').val(v.food);
        $('#sleep-goal-input').val(v.sleep);
        $('#weight-goal-input').val(v.weight);
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