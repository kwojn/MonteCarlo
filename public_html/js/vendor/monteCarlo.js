"use strict";
/**
 * Integrator object
 * @returns {undefined}
 */
function MonteCarloIntegrator() {
    var self = this;
    var parent = new Integrator(self);
   
    self.process = function() {
        var ret = 0;
        for (var i = 0; i < self.density; i++) {
            var factor = Math.random();
            var x = self.range[0] + self.range[1] * factor;
            ret += self.funct(x);
        }
        self.integrate = ret/self.density;
        return self.integrate;

    };

}


