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
      this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
      this.load.spritesheet('player', 'assets/images/player.png', 80, 80);
      this.load.image('playerDuck', 'assets/images/player_duck.png');
      this.load.image('playerDead', 'assets/images/player_dead.png');
      this.load.image('goldCoin', 'assets/images/goldCoin.png');
      this.load.audio('coin', 'assets/audio/coin.wav');
    },
    create: function() {
      this.state.start('Game');
    },
    update: function() {
    }
  };

  return PreloadState;
});