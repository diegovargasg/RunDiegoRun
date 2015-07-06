define([
  'phaser',
], function (phaser) {


  var GameState = function (game) {};

  GameState.prototype = {
    constructor: GameState,
    preload: function() {
      this.game.time.advancedTiming = true;
    },
    create: function() {
      //create player
      this.player = this.game.add.sprite(0, 0, 'player');
    },
    update: function() {

    },
    render: function(){
      this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");  
      this.game.debug.bodyInfo(this.player, 0, 80);   
    }
  };

  return GameState;
});