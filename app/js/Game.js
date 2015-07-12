define([
  'phaser',
], function (phaser) {


  var GameState = function (game) {};

  GameState.prototype = {
    constructor: GameState,
    preload: function() {
      this.game.time.advancedTiming = true;
      this.conf = {minObjInterval: 1000, maxObjInterval: 1800};
    },
    createWorld: function(){
      // Create Ground and Sky
      this.sky = this.game.add.tileSprite(0, 0, 640,  320, 'sky');
      this.sky.fixedToCamera = true;
      this.ground = this.game.add.tileSprite(0, 280, 640,  40, 'ground');
      this.ground = this.game.add.tileSprite(0, 280, 640,  40, 'ground');
      this.ground.fixedToCamera = true;
    },
    createPlayer: function(){
      //create player
      this.player = this.game.add.sprite(200, 0, 'player');

      this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
      this.player.animations.add('jump', [110, 112, 113, 114, 115], 5, false);
      this.player.animations.add('duck', [17, 18, 19, 20, 21, 22, 23], 15, true);
      this.player.standDimensions = {width: this.player.width, height: this.player.height};
      this.player.duckedDimensions = {width: this.player.standDimensions.width, height: this.player.standDimensions.height/2};
      this.game.camera.follow(this.player);
      this.player.anchor.setTo(1, 1);
    },
    createObjects: function(){
      this.objects = ['diploma', 'passport', 'suitcase', 'umbrella', 'barrel'];

      for (var i = 0; i < this.objects.length; i++) {
        this.objects[i] = {object: this.game.add.sprite(this.game.width, 0, this.objects[i]), status: 'noactive'};
      };
    },
    objectsAssignProb: function(){

    },
    objectsSetTimeMove: function(){
      var i = (Math.random() * (this.conf.maxObjInterval - this.conf.minObjInterval + 1)) + this.conf.minObjInterval;
      var h = (Math.random() * (240 - 160 + 1)) + 160;
      var j = Math.floor(Math.random() * (this.objects.length));  
      /*do{
        var j = Math.floor(Math.random() * (this.objects.length));  
      }while( this.objects[j].status === 'active');*/

      var self = this;
      setTimeout(function(){
        self.objects[j].status = 'active';
        self.objects[j].object.y = h;
        self.objectsSetTimeMove();
      }, i);
    },
    create: function() {

      this.createWorld();
      this.createPlayer();
      this.createObjects();

      this.game.physics.arcade.enable([this.player, this.ground, this.objects]);

      // Set ups collision between player and ground
      this.player.body.gravity.y = 1000;

      this.ground.body.immovable = true;
      this.ground.body.collideWorldBounds = true;

      // Enables Cursor control for the player
      this.cursors = this.game.input.keyboard.createCursorKeys();

      // Starts moving the objects
      this.objectsSetTimeMove();
    },
    render: function(){
      this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");  
      this.game.debug.bodyInfo(this.player, 0, 80);  
    },
    playerHit: function(player, blockedLayer) {
      
    },
    playerRunning: function(){ 
      if( this.playerStatus !== 'running' &&  (!this.cursors.down.isDown) ){ console.log('running');
        this.player.animations.stop('jump');
        this.player.animations.stop('duck');
        this.player.animations.play('run');
        this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);

        this.playerStatus = 'running';
      }
    },
    playerduck: function(){
      if( this.playerStatus !== 'ducking' ){ console.log('ducking');
        this.player.animations.stop('run');
        this.player.animations.stop('jump');
        this.player.animations.play('duck');
        this.player.body.setSize(this.player.duckedDimensions.width, this.player.duckedDimensions.height);

        this.playerStatus = 'ducking';
      }
    },
    playerJump: function(){
      if( this.playerStatus !== 'jumping' ){ console.log('jumping');
        this.player.animations.stop('run');
        this.player.animations.stop('duck');
        this.player.animations.play('jump');
        this.player.body.velocity.y -= 550;

        this.playerStatus = 'jumping';
      }
    },
    playerHit: function(){
      console.log('hit');
    },
    update: function() {
      this.game.physics.arcade.collide(this.player, this.ground, this.playerRunning, null, this);

      // Jump Detection & duck detection
      if(this.cursors.up.isDown) {
        this.playerJump();
      }else if(this.cursors.down.isDown){
        this.playerduck();
      }

      this.ground.tilePosition.x -= 1;

      //restart the game if reaching the edge
      /*if(this.player.x >= this.game.world.width) {
        this.game.state.start('Game');
      }*/

      // Move Active Objects
      for (var i = 0; i < this.objects.length; i++) {
        if( this.objects[i].status === 'active' ){
          this.objects[i].object.x -= 2.5;
        }

        if(this.objects[i].object.x < -40) {
          this.objects[i].status = 'noactive';
          this.objects[i].object.x = this.game.width;
        }
      };
    }
  };

  return GameState;
});