define([
  'phaser',
], function (phaser) {
	'use strict';
	
  var PhaserGame = function (w, h) {
    return new Phaser.Game(w, h, Phaser.AUTO, '');
  };

  return PhaserGame;
});