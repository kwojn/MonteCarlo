"use strict";
function SquareIntegrator(){
    var self = this;
    var parent = new Integrator(self);

    self.process = function(){
        
        var ret = 0;
        for (var i = 0; i < self.density; i++) {
            var x=i*((self.range[1] - self.range[0])/self.density);
            ret+=self.funct(x);
        }
        self.integrate = ret/self.density;
        return self.integrate;
    };
    
}
