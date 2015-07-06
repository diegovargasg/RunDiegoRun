define([
  'phaser',
], function (phaser) {


  var GameState = function (game) {};

  GameState.prototype = {
    constructor: GameState,
    preload: function() {
      this.game.time.advancedTiming = true;
      this.isPlayerRunning = false;
    },
    create: function() {

      this.map = this.game.add.tilemap('level1');
 
      //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
      this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
   
      //create layers
      this.backgroundlayer = this.map.createLayer('backgroundLayer');
      this.blockedLayer = this.map.createLayer('blockedLayer');
   
      //collision on blockedLayer
      this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
   
      //resizes the game world to match the layer dimensions
      this.backgroundlayer.resizeWorld();


      //create player
      this.player = this.game.add.sprite(50, 50, 'player');
      //this.player.frame = 24;
      
      this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
      this.player.animations.add('jump', [110, 112, 113, 114, 115], 5, false);

      this.player.animations.play('run');
      this.isPlayerRunning = true;

      //enable physics on the player
      this.game.physics.arcade.enable(this.player);
       
      //player gravity
      this.player.body.gravity.y = 1000;
       
      //the camera will follow the player in the world
      this.game.camera.follow(this.player);

      //  Moves the player with the key arrows
      this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {
      this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);

      // Jump Detection
      //this.player.body.velocity.x = 300; 
      if(this.cursors.up.isDown) {
          this.playerJump();
      }
    },
    render: function(){
      //this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");  
      //this.game.debug.bodyInfo(this.player, 0, 80);   
    },
    playerHit: function(player, blockedLayer) {
      //console.log('hir');
      if(this.isPlayerRunning === false){
        this.player.animations.stop('jump');
        this.player.animations.play('run');
        this.isPlayerRunning = true;
      }
    },
    playerJump: function(){
      if(this.player.body.blocked.down) {
        this.player.animations.stop('run');
        this.player.animations.play('jump');
        this.isPlayerRunning = false;
        this.player.body.velocity.y -= 600;
      }   
    }
  };

  return GameState;
});