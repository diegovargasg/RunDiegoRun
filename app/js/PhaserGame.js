define([
  'phaser',
], function (phaser) {

  var PhaserGame = function (w, h) {
    return new Phaser.Game(w, h, Phaser.AUTO, '');
  };

  return PhaserGame;
});