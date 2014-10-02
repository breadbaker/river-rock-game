var Engine          = require('famous/core/Engine');
var Surface         = require('famous/core/Surface');
var EventHandler    = require('famous/core/EventHandler');
var View            = require('famous/core/View');
var Transform       = require('famous/core/Transform');
var StateModifier   = require('famous/modifiers/StateModifier');

var PhysicsEngine   = require('famous/physics/PhysicsEngine');
var Body            = require('famous/physics/bodies/Body');
var Circle          = require('famous/physics/bodies/Circle');
var Wall            = require('famous/physics/constraints/Wall');

var Force           = require('famous/physics/forces/Force');
var Vector          = require('famous/math/Vector');
var VectorField     = require('famous/physics/forces/VectorField');

var Distance        = require('famous/physics/constraints/Distance');
var Drag            = require('famous/physics/forces/Drag');
var Collision       = require('famous/physics/constraints/Collision');

var Modifier      = require("famous/core/Modifier");
var Transitionable = require("famous/transitions/Transitionable");
var MouseSync     = require("famous/inputs/MouseSync");
var TouchSync     = require("famous/inputs/TouchSync");
var GenericSync   = require("famous/inputs/GenericSync");

GenericSync.register({
    "mouse"  : MouseSync,
    "touch"  : TouchSync
});


var RockView = function() {
    this.initialize.apply(this, arguments);
};

_.extend(RockView.prototype, {

    initialize: function(options) {
        this.context = options.context;

        this.config = options.config.rockView;
        this.backgroundSurface();
        this.addBalls();

        this.addWalls();
        this.gravitate();
        this.collide();
    },

    backgroundSurface: function () {
        var firstSurface = new Surface({
            content: 'Rock Stacker',
            properties: {
                color: 'white',
                fontSize: '22px',
                textAlign: 'center',
                backgroundImage:  'url(imgs/mountain.jpg)',
                backgroundSize:   '100% 100%',
                backgroundRepeat: 'no-repeat'
            }
        });

        this.context.add(firstSurface);
    },

    genColor: function (i) {
        return 'rgb('+ ((i % 12) * 20) + ', ' + ((i%24) * 10 + 30) + ',' +((i%48) * 5 + 30) + ')';
    },

    addBall: function ( color, i) {
        var ballSize = this.config.ball.size.value;
        var ball = new Surface ({
          size: [ballSize, ballSize],
          properties: {
            backgroundColor: color,
            borderRadius: '122px'
          }
        });

        ball.state = new StateModifier({
            origin:[0.5,0.5]
        });

        var numBalls = this.config.ball.numberOfBalls.value;

        ball.particle = new Circle({
            radius:ballSize / 2, 
            mass: this.config.ball.mass.value, 
            position: new Vector(-numBalls/2 + i * 10,-numBalls/2 + i * 40,0)
        });

        this.physicsEngine.addBody(ball.particle);

        this.drag(ball.particle);

        var positionModifier = this.dragBallModifier(ball);
        this.context.add(ball.state).add(ball);

        Engine.on('prerender', function(){
            ball.state.setTransform(ball.particle.getTransform());
        });

        return ball;
    },

    addBalls: function () {
        _.times( this.config.ball.numberOfBalls.value, function(index) {
            var color = this.genColor(index);
            var body = this.addBall(color, index);
            this.corners = this.particles.concat(body.corners);
            this.particles.push(body.particle);
        }, this);
    },

    drag: function (particle) {
        var drag = new Drag({
            strength: this.config.ball.drag.value
        });

        this.physicsEngine.attach(drag, [particle]);
    },

    gravitate: function () {
        var vf = new VectorField({
            field: VectorField.FIELDS.CONSTANT, 
            direction: new Vector(0.0,0.0050,0)
        });

        this.gravityField = vf;

        var that = this;
        setTimeout( function () {
            that.gravityId = that.physicsEngine.attach(that.gravityField, that.particles);
        }, 200);
    },

    gravitateBall: function (particle) {
        particle.gravityId = this.physicsEngine.attach(this.gravityField, [particle]);
    },

    dragBallModifier: function (ball) {

        var position = new Transitionable([0, 0, 1000]);

        var sync = new GenericSync({
            "mouse"  : {},
            "touch"  : {}
        });

        var event_handler = new EventHandler();

        ball.pipe(sync);
        var that = this;
        sync.on('start', function (data) {
            that.removeGravity(ball);
        });
        sync.on('end', function (data) {
            that.gravitate();
        });
        sync.on('update', function(data){
            var currentPosition = ball.particle.getPosition();
            position.set([
                currentPosition[0] + data.delta[0],
                currentPosition[1] + data.delta[1]
            ]);
            ball.particle.setPosition(position.get());
        });

        return position;
    },

    removeGravity: function (ball) {
        this.physicsEngine.detach(this.gravityId);
    },

    collide: function () {
        var collision = new Collision();

        _.each(this.particles, function (particle) {
            this.physicsEngine.attach(collision, this.particles, particle);

            collision.on('collision', _.throttle(function (d) {
                if( Math.abs(d.overlap) > 5) {
                    navigator.notification.vibrate(30);
                }
            }, 100));
        }, this);
    },

    addWalls: function () {
        var contextSize = this.context.getSize();

        var leftWall    = new Wall({normal : [1,0,0],  distance : contextSize[0]/2.0, restitution : 0.7});
        var rightWall   = new Wall({normal : [-1,0,0], distance : contextSize[0]/2.0, restitution : 0.7});
        var topWall     = new Wall({normal : [0,1,0],  distance : contextSize[1]/2.0, restitution : 0.7});
        var bottomWall  = new Wall({normal : [0,-1,0], distance : contextSize[1]/2.4, restitution : 0.7});
        this.walls = [leftWall,rightWall,bottomWall,topWall];
        _.each(this.walls, function(wall) {
            this.physicsEngine.attach(wall);
        }, this);
    },

    particles: [],
    physicsEngine: new PhysicsEngine

});

module.exports = RockView;