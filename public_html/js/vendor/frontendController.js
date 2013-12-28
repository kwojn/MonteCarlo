"use strict";
(function(global) {
    // on window load
    // load predefined functions
    global.onWindowLoaded = function() {
        for (var x in window.predefinedDataSets) {
            $("#predefinedFunctions").append("<option value=\"" + x + "\">" + window.predefinedDataSets[x].functionName + "</option>");
        }
        $("#predefinedFunctions").trigger("change");
        
        

    };
    
    
    
    
    /**
     * Function for building experiment
     * @returns {Object}
     */
    global.buildExperiment = function() {
        var experiment = new Object();
        experiment.functionProcessed = window.predefinedDataSets[$("#predefinedFunctions").val()];
        //maximum density of points
        experiment.maxDensity = $("#density").val();
        //step for density increment
        experiment.densityStep = Math.round($("#density").val()/$("#stepCount").val());
        //elementary counting points
        experiment.elemetaryIterationCount = $("#stepTest").val();
        //couting accuracy;
        experiment.accuracy = $("#accuracy").val();
        return experiment;
    };
//----------------------Bind events to buttons ----------------------------//
    $("#predefinedFunctions").on("change", function() {
        var functionObject = window.predefinedDataSets[$("#predefinedFunctions").val()];
        
        $("#functName").html(functionObject.functionName);
        $("#integrateRange").html(functionObject.range.bottom + " : " + functionObject.range.top);
        $("#functionEquation").html(functionObject.funct.toString());

    });


    $("#runComplexTest").on("click",function(e){
        e.preventDefault();
        var processor = new ExperimentProcessor();
        var experiment = global.buildExperiment();
        processor.loadExperimentData(experiment);
        processor.performExperiment();
       // console.log(processor.experimentResult.sigmaSquare);
        $("#plotArea").empty();
        $("#benchmarkPlotArea").empty();
        $.jqplot("plotArea",[processor.experimentResult.sigmaSquare],
        {
            title:"Błąd średniokwadratowy w zależności od liczby prób.",
            axes:{
                yaxis:{
                    renderer:$.jqplot.LogAxisRenderer, 
                    tickDistribution:'log'
                }
            }
        
        }
        
        );
        $.jqplot("benchmarkPlotArea",[processor.experimentResult.testTime,processor.experimentResult.refferenceTime],
        {
            title:"Porównanie czasów obliczeń"
            
        
        }
        
        );
        
    });


}(this));