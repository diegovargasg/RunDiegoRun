define([
  'phaser',
], function (phaser) {

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
      this.load.spritesheet('player', 'assets/images/player.png', 80, 80);
      this.load.image('ground', 'assets/images/ground.jpg');
      this.load.image('sky', 'assets/images/sky.jpg');

      //////
      // TODO: use sprite sheets //
      //////
      this.load.image('diploma', 'assets/images/diploma.png');
      this.load.image('passport', 'assets/images/passport.png');
      this.load.image('suitcase', 'assets/images/suitcase.png');
      this.load.image('umbrella', 'assets/images/umbrella.png');
      this.load.image('barrel', 'assets/images/barrel.png');
    },
    create: function() {
      this.state.start('Game');
    },
    update: function() {
    }
  };

  return PreloadState;
});