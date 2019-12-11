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
    this.COMMUNITY_DATA = {};
 
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

            this.setUnitCateOptions();
            Plotly.deleteTraces('health-plot-cont', 0);
            this.plotData();
        }.bind(this));
        $('#plot-units-select').on('change', function(event){
            Plotly.deleteTraces('health-plot-cont', 0);
            this.plotData();
        }.bind(this));
        $('input[type=radio][name=statType]').on('change', function(event) {
            switch (event.currentTarget.value) {
              case 'personal':
                    this.setUnitCateOptions();
                    try{
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                    }
                    catch{

                    }
                    this.plotData();
                break;
              case 'community':
                    this.setUnitCateOptions();
                    try{
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                        Plotly.deleteTraces('health-plot-cont', 0);
                    }
                    catch{
                        
                    }
                    this.plotCommunityData();
                break;
            }
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
          this.COMMUNITY_DATA = {};
          $.ajax({
              type: "POST",
              url: 'getCommunityData.php',
              dataType: 'json',
              data: {'sessionId' : this.sessionKey},
              success: function (response) {
                  for(var i = 0; i < response.length; ++i)
                  {
                      var id = response[i]['username'];
                      var u = response[i]['unit'];
                      var c = response[i]['category'];
                      var v = response[i]['value'];
                      var t = response[i]['sys_timestamp'];
  
                      var idData = this.COMMUNITY_DATA[id];
                      if(idData == undefined)
                      {
                          var idData = {};
                      }
                      
                      if(idData[c] == undefined || idData[c][u] == undefined)
                      {
                          // new category/unit
                          if(idData[c] == undefined)
                          {
                              idData[c] = {};
                          }
                          idData[c][u] = [{ // unit -> data
                              value: v,
                              time: t
                          }];
                      }
                      else
                      {
                          // existing category, maybe new unit
                          var catData = idData[c];
  
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
  
                          idData[c] = catData;
                      }

                      this.COMMUNITY_DATA[id] = idData;
                  }
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

    this.plotCommunityData = function()
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

        var traces = [{
            x: x,
            y: y,
            name: "My Data" }];
        
            
        // get community average
        var keys = Object.keys(this.COMMUNITY_DATA);
        var commonTimes = [];
        var averageValues = [];
        for(var j = 0; j < traces[0].x.length; ++j)
        {
            var t = traces[0].x[j];
            var commonTime = t.substr(0,10);

            var xVals = [];
            for(var i = 0; i < keys.length; ++i)
            {
                var key = keys[i];
                var data = this.COMMUNITY_DATA[key][type.toLocaleLowerCase()][units.toLocaleLowerCase()];
                var x = [];
                var y = [];
                for(var n = 0; n < data.length; ++n)
                {
                    var t_possible = data[n].time;
                    if(t_possible.substr(0,10).indexOf(commonTime) >= 0)
                    {
                        xVals.push(data[n].value);
                    }
                }
            }

            if(xVals.length > 0)
            {
                var average = 0;
                xVals.forEach(p => {average += parseFloat(p);});
                average /= xVals.length;

                commonTimes.push(commonTime);
                averageValues.push(average);
            }
        }

        traces.push({
            x: commonTimes,
            y: averageValues,
            name: "Community Average" });

        $('#plot-loading-text').css('visibility', 'hidden'); // clear loading before plotting
        $('#plot-loading-text').css('height', '0px'); // clear loading before plotting
        
        Plotly.plot( PLOT, traces, {
        title: {
            text:'My Data for ' + type + ' vs Community Average'
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