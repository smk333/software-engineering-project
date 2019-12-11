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
	var fitnessChain = new Blockchain();
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
			// this is where I want the blockchain to interact with her implementation
			var big_elem = document.getElementsByClassName("form-control form-control-lg");
			var data_type = big_elem[0].options[big_elem[0].selectedIndex].value;
			var units = big_elem[1].options[big_elem[1].selectedIndex].value;
			switch(data_type){
				case "Sleep":
					if(units !== "Hours"){
						alert("Sleep is measured in hours, not " + units + ".");
						break;
					}
					else{
						if(isNaN(v)){
							alert("Your input data is in the wrong format.");
						}
						else if(Number(v) < 0){
							alert("You cannot sleep a negative amount, no matter how hard you work on Marsic's software engineering assignment.");
						}
						else if(Number(v) > 24){
							alert("You can't sleep in more than 24 hours, no matter how tired you are.");
						}
						else{
							fitnessChain.addBlock(new Block(Date.now(), v));
							for(let i = 0; i < fitnessChain.chain.length; i++){
								console.log("Chain element #" + i + ": " + fitnessChain.chain[i].data);
							}
							alert("Added data with value: " + v);
						}
						break;
					}
				case "Food":
					if(units !== "Calories"){
						alert("Food intake is measured in calories, not " + units + ".");
						break;
					}
					else{
						if(isNaN(v)){
							alert("Your input data is in the wrong format.");
						}
						else if(Number(v) < 0){
							alert("You cannot eat less than zero calories, even if you're on a hunger strike.");
						}
						else if(Number(v) > 100000){
							alert("You cannot eat this many calories, even if you enrolled in Nathan's Hot Dog Eating Contest.");
						}
						else{
							fitnessChain.addBlock(new Block(Date.now(), v));
							for(let i = 0; i < fitnessChain.chain.length; i++){
								console.log("Chain element #" + i + ": " + fitnessChain.chain[i].data);
							}
							alert("Added data with value: " + v);
						}
						break;
					}
				case "Walking distance":
					if(units !== "Steps" && units !== "Kilometers" && units !== "Miles"){
						alert("Walking distance is measured in steps, kilometers, or miles, not " + units + ".");
						break;
					}
					else{
						if(isNaN(v)){
							alert("Your input data is in the wrong format.");
							break;
						}
						switch(units){
							case "Steps":
								if(Number(v) < 0){
									alert("You cannot take less than zero steps.");
								}
								else if(Number(v) > 300000){
									alert("An ultramarathon runner can't get that many steps in.");
								}
								else{
									fitnessChain.addBlock(new Block(Date.now(), v));
									for(let i = 0; i < fitnessChain.chain.length; i++){
										console.log("Chain element #" + i + ": " + fitnessChain.chain[i].data);
									}
									alert("Added data with value: " + v);
								}
								break;
							case "Kilometers":
								if(Number(v) < 0){
									alert("You cannot walk less than zero kilometers.");
								}
								else if(Number(v) > 160){
									alert("An ultramarathon runner can't walk that many kilometers.");
								}
								else{
									fitnessChain.addBlock(new Block(Date.now(), v));
									for(let i = 0; i < fitnessChain.chain.length; i++){
										console.log("Chain element #" + i + ": " + fitnessChain.chain[i].data);
									}
									alert("Added data with value: " + v);
								}
								break;
							case "Miles":
								if(Number(v) < 0){
									alert("You cannot walk less than zero steps.");
								}
								else if(Number(v) > 100){
									alert("An ultramarathon runner still usually needs more than one day for 100 miles.");
								}
								else{
									fitnessChain.addBlock(new Block(Date.now(), v));
									for(let i = 0; i < fitnessChain.chain.length; i++){
										console.log("Chain element #" + i + ": " + fitnessChain.chain[i].data);
									}
									alert("Added data with value: " + v);
								}
								break;
						}
						break;
					}
				case "Heart Rate":
					if(units !== "BPM"){
						alert("Heart rate is measured in BPM, not " + units + ".");
						break;
					}
					else{
						if(isNaN(v)){
							alert("Your input data is in the wrong format.");
						}
						else if(Number(v) < 0){
							alert("Your heart can never beat less than 0 beats per minute.");
						}
						else if(Number(v) > 200){
							alert("If your heart is beating this fast, call an ambulance!");
						}
						else{
							fitnessChain.addBlock(new Block(Date.now(), v));
							for(let i = 0; i < fitnessChain.chain.length; i++){
								console.log("Chain element #" + i + ": " + fitnessChain.chain[i].data);
							}
							alert("Added data with value: " + v);
						}
						break;
					}
			}
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
