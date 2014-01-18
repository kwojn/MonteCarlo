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


    global.buildExperimentFromPredefinedInput = function(experiment) {

        experiment.functionProcessed = window.predefinedDataSets[$("#predefinedFunctions").val()];

    };

    global.buildExperimentFromManualInput = function(experiment) {

        var dataSet = new Object();
        dataSet.functionName = "custom";
        dataSet.range = {
            top: parseFloat($("#topBoundary").val()),
            bottom: parseFloat($("#bottomBoundary").val())
        };
        
        
        if($("#tempFunct").length!==0){
            $("#tempFunct").remove();
        }
        var fn = document.createElement('script');
            fn.setAttribute("id","tempFunct");
	    fn.appendChild(document.createTextNode('var refference = function(x){ return ' + $("#integratedFunction").val()+ ';}'));
	    (document.body || document.head || document.documentElement).appendChild(fn);
            
        dataSet.funct = refference;
        
        dataSet.density=10000;
        
        var exp = $("#expectedValue").val();
        dataSet.expected=parseFloat(exp);
        console.log(dataSet);
        experiment.functionProcessed = dataSet;
        

    };


    /**
     * Function for building experiment
     * @returns {Object}
     */
    global.buildExperiment = function() {
        var experiment = new Object();
        if ($("#inputSelect1").is(":checked")) {
            global.buildExperimentFromManualInput(experiment);
        } else {
            global.buildExperimentFromPredefinedInput(experiment);
        }
        //maximum density of points
        experiment.maxDensity = $("#density").val();
        //step for density increment
        experiment.densityStep = Math.round($("#density").val() / $("#stepCount").val());
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

    $("#inputSelect1").on("click", function() {
        if ($("#inputSelect1").is(":checked")) {
            $("#manualInputSet").removeClass("hidden");
            $("#predefinedInputSet").addClass("hidden");
        }
        ;
    });
    $("#inputSelect2").on("click", function() {
        if ($("#inputSelect2").is(":checked")) {
            $("#manualInputSet").addClass("hidden");
            $("#predefinedInputSet").removeClass("hidden");
        }
        ;
    });


    $("#runComplexTest").on("click", function(e) {
        e.preventDefault();
        var processor = new ExperimentProcessor();
        var experiment = global.buildExperiment();
        processor.loadExperimentData(experiment);
        var consoleValues = processor.performExperiment();
        console.log(consoleValues);
        $("#resultConsole").append("<p>****************************************************</p>"+
                "<p>Postać funkcji: "+consoleValues[3].funct.toString()+"</p>"+
                "<p>Granice całkowania: "+consoleValues[0].range[0]+"/"+consoleValues[0].range[1]+"</p>"+
                "<p>Wynik metody Monte Carlo:"+consoleValues[0].integrate+"</p>"+
                "<p>Wynik całkowania referencyjnego: "+consoleValues[1]+"</p>"+
                "<p>Odchylenie standardowe: "+consoleValues[2]+"</p>"
                );
       
        $("#plotArea").empty();
        $("#benchmarkPlotArea").empty();
        $.jqplot("plotArea", [processor.experimentResult.sigmaSquare, processor.experimentResult.nRoot],
                {
                    title: "Błąd średniokwadratowy w zależności od liczby punktów.",
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.LogAxisRenderer,
                            tickDistribution: 'power'
                        },
                        yaxis: {
                            renderer: $.jqplot.LogAxisRenderer,
                            tickDistribution: 'power'
                        }
                    },
                    series: [
                        {
                            showLine: false
                        },
                        {
                            showMarker: false

                        }


                    ]
                }

        );
        $.jqplot("benchmarkPlotArea", [processor.experimentResult.testTime, processor.experimentResult.refferenceTime],
                {
                    title: "Porównanie czasów obliczeń",
                    series: [
                        {
                            show: true,
                            label: "Czas metody Monte Carlo",
                            showLabel: true
                        },
                        {
                            show: true,
                            label: "Czas metody prostokątów",
                            showLabel: true
                        }

                    ],
                    legend: {show: true}

                }

        );

    });


}(this));