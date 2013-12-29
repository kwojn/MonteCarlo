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


    $("#runComplexTest").on("click", function(e) {
        e.preventDefault();
        var processor = new ExperimentProcessor();
        var experiment = global.buildExperiment();
        processor.loadExperimentData(experiment);
        processor.performExperiment();
        // console.log(processor.experimentResult.sigmaSquare);
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