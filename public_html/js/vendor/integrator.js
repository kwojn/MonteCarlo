"use strict";
/**
 * Integrator class - base class for integrating methods
 * @returns {undefined}
 */
function Integrator(instance) {
    var self = instance ;
    self.range = new Array();
    self.density = 0;
    self.funct = null;
    self.integrate = 0;

    self.setRange = function(bottom, top) {
        self.range = [bottom, top];

    };
    self.setDensity = function(density) {
        self.density = density;
    };

    self.setFunction = function(funct) {
        self.funct = funct;
    };

    self.process = function() {
        throw new Error("This Supposed to be implemented by successor class");
    };

    self.buildFromDataSet = function(dataSet) {
        
        var integrator = new self.constructor;
        integrator.setDensity(dataSet.density);
        integrator.setRange(dataSet.range.bottom, dataSet.range.top);
        integrator.setFunction(dataSet.funct);
        
        return integrator;
    };

    self.__construct = function(instance) {
        for (var x in this) {
            if (!instance.hasOwnProperty(x)) {
                instance[x] = self[x];

            }
        }
        
    };

    self.__construct(this);

}


