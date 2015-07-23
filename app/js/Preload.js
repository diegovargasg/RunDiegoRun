define([
  'phaser',
], function (phaser) {
  'use strict';
  
  var PreloadState = function (game) {};

  PreloadState.prototype = {
    constructor: PreloadState,
    preload: function() {
      //show loading screen
      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
      this.preloadBar.anchor.setTo(0.5);
      this.preloadBar.scale.setTo(3);
      this.load.setPreloadSprite(this.preloadBar);
   
      //load game assets
      this.load.spritesheet('player', 'assets/images/playerv2.png', 80, 74);
      this.load.image('ground', 'assets/images/ground.jpg');
      this.load.image('sky', 'assets/images/sky.jpg');
      this.load.image('background-city', 'assets/images/background-city.png');
      this.load.image('background-forest', 'assets/images/background-forest.png');
      this.load.image('heart', 'assets/images/heart.png');
      this.load.image('restart', 'assets/images/button-restart.png');
      this.load.image('energy-bar', 'assets/images/energy-bar.png');

      //////
      // TODO: use sprite sheets //
      //////
      this.load.image('diploma', 'assets/images/diploma.png');
      this.load.image('passport', 'assets/images/passport.png');
      this.load.image('check', 'assets/images/check.png');
      this.load.image('suitcase', 'assets/images/suitcase.png');
      this.load.image('umbrella', 'assets/images/umbrella.png');
      this.load.image('barrel', 'assets/images/barrel.png');
      this.load.image('cactus', 'assets/images/cactus.png');
      this.load.image('snail', 'assets/images/snail.png');
      this.load.image('contract', 'assets/images/contract.png');
      this.load.image('block-wall', 'assets/images/block-wall.png');
      this.load.image('block-wood', 'assets/images/block-wood.png');
      this.load.image('heart', 'assets/images/heart.png', 40, 40);
      this.load.spritesheet('sheep', 'assets/images/sheep.png', 100, 62);
      this.load.spritesheet('witch', 'assets/images/witch.png', 106, 73);
      this.load.spritesheet('robot', 'assets/images/robot.png', 77, 89);
    },
    create: function() {
      this.state.start('Game');
    },
    update: function() {
    }
  };

  return PreloadState;
});