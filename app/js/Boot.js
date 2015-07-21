define([
  'phaser',
], function (phaser) {
  'use strict';

  var BootState = function (game) {};

  BootState.prototype = {
    constructor: BootState,
    preload: function() {
      this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    },
    create: function() {
      this.game.stage.backgroundColor = '#000';

      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.NONE;
 
      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      
      //screen size will be set automatically
      this.scale.setScreenSize(true);

      //physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.state.start('Preload');

    },
    update: function() {

    }
  };

  return BootState;
});