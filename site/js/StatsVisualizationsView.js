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

    this.setUnitCateOptions = function()
    {
        // set options for selected plot type
        var selectedTab = $('.selected-plot-type')[0];
        var type = selectedTab.children[0].innerText;

        var unitsViewSelect = $('#plot-units-select');
        switch(type)
        {
            case 'Distance':
                var html = '<option value="steps">Steps</option><option value="miles">Miles</option>';
                unitsViewSelect.append(html);
                break;
            case 'Food':
                var html = '<option value="calories">Calories</option>';
                unitsViewSelect.append(html);
                break;
            case 'Heart Rate':
                var html = '<option value="bpm">BPM</option>';
                unitsViewSelect.append(html);
                break;
        }
    }

    this.afterRender = function() {
        // set up listeners
        $('.plot-view-type-tab').on('click', function(event){
            var oldSelected = $('.selected-plot-type');
            oldSelected.removeClass('selected-plot-type');

            $(event.currentTarget).addClass('selected-plot-type');

            Plotly.deleteTraces('health-plot-cont', 0);
            this.plotData();
        }.bind(this));
        $('#plot-units-select').on('change', function(event){
            Plotly.deleteTraces('health-plot-cont', 0);
            this.plotData();
        }.bind(this));

        this.setUnitCateOptions();

        // get all data for plots
        this.DATA = {};
        $.ajax({
            type: "POST",
            url: 'getFitnessData.php',
            dataType: 'json',
            data: {'sessionId' : this.sessionKey},
            success: function (response) {
                for(var i = 0; i < response.length; ++i)
                {
                    var u = response[i]['unit'];
                    var c = response[i]['category'];
                    var v = response[i]['value'];
                    var t = response[i]['sys_timestamp'];

                    if(this.DATA[c] == undefined || this.DATA[c][u] == undefined)
                    {
                        // new category/unit
                        if(this.DATA[c] == undefined)
                        {
                            this.DATA[c] = {};
                        }
                        this.DATA[c][u] = [{ // unit -> data
                            value: v,
                            time: t
                        }];
                    }
                    else
                    {
                        // existing category, maybe new unit
                        var catData = this.DATA[c];

                        // new unit
                        if(catData[u] == undefined)
                        {
                            catData[u] = {
                                u : []
                            };
                        }

                        // add data
                        var values = catData[u].push({
                            value: v,
                            time: t
                        });

                        this.DATA[c] = catData;
                    }
                }

                this.plotData();
            }.bind(this),
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

    this.plotData = function()
    {
        var PLOT = document.getElementById('health-plot-cont');

        // get currently selected type and units
        var selectedTab = $('.selected-plot-type')[0];
        var type = selectedTab.children[0].innerText;
        var units = $('#plot-units-select').val();

        // get matching data
        var plottingData = this.DATA[type.toLocaleLowerCase()][units.toLocaleLowerCase()];
        var x = [];
        var y = [];
        for(var i = 0; i < plottingData.length; ++i)
        {
            x.push(plottingData[i].time);
            y.push(plottingData[i].value);
        }

        $('#plot-loading-text').css('visibility', 'hidden'); // clear loading before plotting
        $('#plot-loading-text').css('height', '0px'); // clear loading before plotting
        
        Plotly.plot( PLOT, [{
        x: x,
        y: y,
        name: "My Data" }], {
        title: {
            text:'My Data for ' + type
          },
          xaxis: {
            title: {
              text: 'Entry Timestamp',
            },
          },
          yaxis: {
            title: {
              text: 'Value ['+units+']',
            }
          }
        } );
    }
 
    /*
     * Private method
     * Can only be called inside class
     */
    var myPrivateMethod = function() {
        console.log('accessed private method');
    };
    
    this.construct(sessionKey);
 
};