define([
  'phaser',
], function (phaser) {


  var BootState = function (game) {};

  BootState.prototype = {
    constructor: BootState,
    preload: function() {
      this.load.image('preloadbar', 'assets/img/preloader-bar.png');
    },
    create: function() {
      this.game.stage.backgroundColor = '#fff';

      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
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