var game = new ex.Engine(null, null, "game");
game.backgroundColor = ex.Color.Black;
var emitter = new ex.ParticleEmitter(game.getWidth()/2, game.getHeight()/2, 2, 2);
emitter.minVel = 100;
emitter.maxVel = 200;
emitter.minAngle = 0;
emitter.maxAngle = Math.PI*2;
emitter.isEmitting = true;
emitter.emitRate = 300;
emitter.opacity = 0.5;
emitter.fade = true;
emitter.particleLife = 1000; // 1 sec
emitter.maxSize = 10;
emitter.minSize = 1;
emitter.acceleration = new ex.Vector(0, 800);
emitter.particleColor = ex.Color.Rose;
emitter.focusAccel = 800;
game.addChild(emitter);
game.start();


var EmitterViewModel = function(){
   var me = this;
   me.colors = [];
   for(var color in ex.Color){
      if(ex.Color.hasOwnProperty(color) && color.indexOf('from') == -1){
         me.colors.push({name: color, value: ex.Color[color]});
      }
   }
   me.colors.reverse();

   me.minVel = ko.observable(100);
   me.maxVel = ko.observable(200);
   me.minAngle = ko.observable(0);
   me.maxAngle = ko.observable(6.2);
   me.minSize = ko.observable(1);
   me.maxSize = ko.observable(10);
   me.width = ko.observable(2);
   me.height = ko.observable(2);

   me.particleColor = ko.observable({name: "Rose", value: ex.Color.Rose});

   me.ax = ko.observable(0);
   me.ay = ko.observable(800);

   me.emitRate = ko.observable(300);
   me.fade = ko.observable(true);
   me.opacity = ko.observable(.5);
   me.particleLife = ko.observable(1000);

   me.particleCount = function(){
     return emitter.particles.count();
   };

   // setup subscriptions
   me.emitRate.subscribe(function(newRate){
      emitter.emitRate = parseInt(newRate);
   });

   me.minVel.subscribe(function(newVel){
      emitter.minVel = parseFloat(newVel);
   });

   me.maxVel.subscribe(function(newVel){
      emitter.maxVel = parseFloat(newVel);
   });

   me.minAngle.subscribe(function(newVel){
      emitter.minAngle = parseFloat(newVel);
   });

   me.maxAngle.subscribe(function(newVel){
      emitter.maxAngle = parseFloat(newVel);
   });

   me.minSize.subscribe(function(newSize){
      emitter.minSize = parseInt(newSize);
   });

   me.maxSize.subscribe(function(newSize){
      emitter.maxSize = parseInt(newSize);
   });

   me.particleLife.subscribe(function(life){
      emitter.particleLife = parseInt(life);
   });

   me.particleColor.subscribe(function(newColor){
      emitter.particleColor = newColor.value;
   });

   me.opacity.subscribe(function(newOpacity){
      emitter.opacity = newOpacity;
   });

   me.fade.subscribe(function(newFade){
      emitter.fade = newFade;
   });

   me.ax.subscribe(function(newAx){
      emitter.acceleration.x = newAx;
   });

   me.ay.subscribe(function(newAy){
      emitter.acceleration.y = newAy;
   });

   me.width.subscribe(function(width){
      emitter.setWidth(width);
   });

   me.height.subscribe(function(height){
      emitter.setHeight(height);
   });

   me.code = ko.computed(function(){
      return "var emitter = new ex.ParticleEmitter(game.getWidth()/2, game.getHeight()/2, "+me.width()+", "+me.height()+");\n"+
      "emitter.minVel = "+me.minVel()+";\n"+
      "emitter.maxVel = "+me.maxVel()+";\n"+
      "emitter.minAngle = "+me.minAngle()+";\n"+
      "emitter.maxAngle = "+me.maxAngle()+";\n"+
      "emitter.isEmitting = true;\n"+
      "emitter.emitRate = "+me.emitRate()+";\n"+
      "emitter.opacity = "+me.opacity()+";\n"+
      "emitter.fade = "+me.fade()+";\n"+
      "emitter.particleLife = "+me.particleLife()+";\n"+
      "emitter.maxSize = "+me.maxSize()+";\n"+
      "emitter.minSize = "+me.minSize()+";\n"+
      "emitter.acceleration = new ex.Vector("+me.ax()+", "+me.ay()+");\n"+
      "emitter.particleColor = ex.Color."+me.particleColor().name+";\n"
});

   return me;
};

var click = false;
game.canvas.addEventListener('mousedown', function(evt){
   click = true;
   emitter.x = evt.clientX;
   emitter.y = evt.clientY;
});

game.canvas.addEventListener('mouseup', function(evt){
   click = false;
});

game.canvas.addEventListener('mousemove', function(evt){
   if(click){
      emitter.x = evt.clientX;
      emitter.y = evt.clientY;
   }
});

var vm = new EmitterViewModel();
ko.applyBindings(vm);
