"use strict";
(function(global) {

    global.predefinedDataSets = [
        {
            functionName: "circle",
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return Math.PI * Math.pow(r, 2);
            },
            expected:false
        },
        {
            functionName: "triangle",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return 4 * r;
            }
        },
        {
            functionName: "wave",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return 10 * Math.exp(-r) * Math.cos(0.5 * r);
            }
        },
        {
            functionName: "complex",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return r * Math.log(10 * Math.exp(-0.8 * r) * Math.cos(0.5 * r)) / Math.exp(r);
            }
        },
         {
            functionName: "wide Sine",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return Math.sin(0.01*r);
            }
        },
        {
            functionName: "thin Sine",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return Math.sin(2*r);
            }
        },
        {
            functionName: "const",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return 4;
            }
        },
        {
            functionName: "power Sine",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                return Math.pow(Math.sin(6*r),2);
            }
        },
        {
            functionName: "discreete",
            expected:false,
            range: {
                bottom: 0,
                top: 1
            },
            density: 10000,
            funct: function(r) {
                if (r>0.5)
                    return 0;
                return 1;
            }
        }
    ];

}
(this));