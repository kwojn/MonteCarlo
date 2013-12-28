"use strict";
(function(global) {

    global.predefinedDataSets = [
        {
            functionName:"circle",
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return Math.PI * Math.pow(r, 2);
            }
        },
        {
            functionName:"triangle",
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return 4 * r;
            }
        }
    ];

}
(this));