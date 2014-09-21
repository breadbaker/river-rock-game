var ConfigOptions = require("data/config-options");
var Engine        = require('famous/core/Engine');
var RockView      = require('views/rock-view');

function App() {
    this.context = Engine.createContext();
    this.rockView = new RockView({
        context: this.context,
        config: ConfigOptions
    });
}

var app = new App();


