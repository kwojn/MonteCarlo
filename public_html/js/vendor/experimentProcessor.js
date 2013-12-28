"use strict";
function ExperimentProcessor(){
    var self = this;
    self.functionProcessed=null;
    //maximum density of points
    self.maxDensity=0;
    //step for density increment
    self.densityStep = 0;
    //elementary counting points
    self.elemetaryIterationCount=0;
    //couting accuracy;
    self.accuracy=0;
    self.experimentResult = {
        sigmaSquare:[],
        testTime:[],
        refferenceTime:[]
        
    };
    
    self.loadExperimentData = function(experiment){
        for(var x in experiment){
            self[x] = experiment[x];
        }
    };
    
    self.performExperiment = function(){
        
        var currentDensity=1;
        //refference - this is refference integrator - treated as analitical
        var refference = new SquareIntegrator();
        refference = refference.buildFromDataSet(self.functionProcessed);
        // this density is hardcoded since we assume we Integrate with sqare method based on Riemann's concept of Integral
        refference.setDensity(1000000);
        // in order to test methods efficiency - we will mesure how long does it take to preform 
        // Monte Carlo and the "analitycal way"
        var refStartTime = new Date();
        var expected = refference.process();
        var refEndTime = new Date();
        var reffrenceTime = refEndTime - refStartTime;
         
        // this is estimated integrator - the monte carlo one
        var estimated = new MonteCarloIntegrator();
        estimated = estimated.buildFromDataSet(self.functionProcessed);
        
        //as long as density is lower than desired
        while (currentDensity<=self.maxDensity){
            //define sigma
            
            var sigmaSquare = 0 , sigma=0;
            // set estimator's density to current one
            estimated.setDensity(currentDensity);
            // run experiment  n times
            for (var nth=0;nth<self.elemetaryIterationCount;nth++){
                if (nth==0){
                    var testStartTime = new Date();
                    estimated.process();
                    var testEndTime = new Date();
                    var testTime= testEndTime - testStartTime;
                   
                }
                sigmaSquare+=Math.pow((estimated.process() - expected),2);
            }
            sigmaSquare = sigmaSquare/(nth);
            self.experimentResult.sigmaSquare.push([Math.round(currentDensity),Math.sqrt(sigmaSquare)]);
            self.experimentResult.testTime.push([Math.round(currentDensity),testTime]);
            self.experimentResult.refferenceTime.push([Math.round(currentDensity),reffrenceTime]);
            // increase density with step
            currentDensity+=Math.round(self.densityStep);
            
        }     
     console.log("done");
     console.log(self); 
    };
    
    
    
    
    
    
}