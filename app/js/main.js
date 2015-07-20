'use strict';

requirejs.config({
    shim: {
      'phaser': {
          exports: 'Phaser'
      }
    },
    paths: {
        phaser: '../../bower_components/phaser/build/phaser.min',
    }
});

require(['PhaserGame', 'Boot', 'Preload', 'Game'], function (PhaserGame, BootState, PreloadState, GameState) {
	var game = new PhaserGame(640, 320);
	game.state.add('Boot', BootState);
	game.state.add('Preload', PreloadState);
	game.state.add('Game', GameState);

	game.state.start('Boot');

});