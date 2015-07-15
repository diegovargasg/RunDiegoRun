define([
  'phaser',
], function (phaser) {


  var GameState = function (game) {};

  GameState.prototype = {
    constructor: GameState,
    preload: function() {
      this.game.time.advancedTiming = true;
      this.conf = {minobstacleInterval: 1000, maxobstacleInterval: 3000};
    },
    createWorld: function(){

      // Create the Sky gradient
      var myBitmap = this.game.add.bitmapData(640, 320);
      var grd = myBitmap.context.createLinearGradient(0,0,0,320);

      grd.addColorStop(0,"#0a68b0");
      grd.addColorStop(1,"white");

      myBitmap.context.fillStyle = grd;
      myBitmap.context.fillRect(0, 0, 640, 320);
      this.game.add.sprite(0, 0, myBitmap);

      this.backgroundCity = this.game.add.tileSprite(0, 20, 1764,  400, 'background-city');
      this.backgroundCity.scale.set(0.65, 0.65);
      this.backgroundCity.fixedToCamera = true;

      this.backgroundForest = this.game.add.tileSprite(0, 142, 1517,  148, 'background-forest');
      this.backgroundForest.fixedToCamera = true;

      this.ground = this.game.add.tileSprite(0, 280, 640,  40, 'ground');
      this.ground.fixedToCamera = true;

      // Damaging Group
      this.damagingGroup = this.game.add.group();

      // Ground Groups
      this.groundGroup = this.game.add.group();

    },
    createEnegyLevel: function(){
      var text = 100;
      var style = { font: "28px Arial", fill: "#ff0044", align: "center" };

      this.t = this.game.add.text(this.game.world.centerX-300, 0, text, style);
    },
    updateEnergyLevel: function(){

    },
    createPlayer: function(){
      //create player
      this.player = this.game.add.sprite(200, 0, 'player');

      this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
      this.player.animations.add('jump', [110, 112, 113, 114, 115], 5, false);
      this.player.animations.add('dock', [17, 18, 19, 20, 21, 22, 23], 15, true);
      this.player.standDimensions = {width: this.player.width, height: this.player.height};
      this.player.dockedDimensions = {width: this.player.standDimensions.width, height: this.player.standDimensions.height/2};
      this.game.camera.follow(this.player);
      this.player.anchor.setTo(1, 1);

      this.blockWood = this.game.add.tileSprite(this.game.width, 160, 320, 40, 'block-wall');
      this.groundGroup.add(this.blockWood);
      this.groundGroup.add(this.ground);

    },
    createobstacles: function(){

      this.obstaclesRandom = ['diploma', 'passport', 'suitcase', 'umbrella'];
      this.obstaclesFixedPos = [{
                                obstacle:'barrel', 
                                pos: 231, 
                                speed: -1
                              },
                              {
                                obstacle:'heart', 
                                pos: '120', 
                                speed: -1
                              }];

      this.obstaclesAnim = [{
                            obstacle:'sheep', 
                            pos: 237, 
                            speed: -1,
                            scale: 0.7,
                            animationName: 'animation',
                            animationFrame: [0, 1, 2],
                            animationSpeed: 7,
                            animationLoop: true,
                          }];
      this.obstacles = []

      for (var i = 0; i < this.obstaclesAnim.length; i++) {
        this.obstacles.push({obstacle: this.game.add.sprite(this.game.width, this.obstaclesAnim[i].pos, this.obstaclesAnim[i].obstacle), 
                          status: 'noactive', 
                          pos: this.obstaclesAnim[i].pos, 
                          type: 'animated',
                          speed: 2.5
                        });

        this.obstacles[i].obstacle.scale.set(this.obstaclesAnim[i].scale);
        this.obstacles[i].obstacle.animations.add('animation', [0, 1, 2], this.obstaclesAnim[i].animationSpeed, this.obstaclesAnim[i].animationLoop);
        this.obstacles[i].obstacle.animations.play('animation');
        this.damagingGroup.add(this.obstacles[i].obstacle);
      };

      for (var i = 0; i < this.obstaclesRandom.length; i++) {
        this.obstacles.push({obstacle: this.game.add.sprite(this.game.width, 0, this.obstaclesRandom[i]), status: 'noactive', type: 'random'});
        this.damagingGroup.add(this.obstacles[i].obstacle);
      };

      for (var i = 0; i < this.obstaclesFixedPos.length; i++) {
        this.obstacles.push({obstacle: this.game.add.sprite(this.game.width, this.obstaclesFixedPos[i].pos, this.obstaclesFixedPos[i].obstacle), status: 'noactive', pos: this.obstaclesFixedPos[i].pos, type: 'fixed'});
        this.damagingGroup.add(this.obstacles[i].obstacle);
      };
    },
    obstaclesAssignProb: function(){

    },
    obstaclesSetTimeMove: function(){
      var i = (Math.random() * (this.conf.maxobstacleInterval - this.conf.minobstacleInterval + 1)) + this.conf.minobstacleInterval;
      var h = (Math.random() * (200 - 160 + 1)) + 160;
      var j = Math.floor(Math.random() * (this.obstacles.length));  

      /*do{
        var j = Math.floor(Math.random() * (this.obstacles.length));  
      }while( this.obstacles[j].status === 'active');*/

      var self = this;
      setTimeout(function(){
        self.obstacles[j].status = 'active';
        if( self.obstacles[j].type === 'random' ){
          self.obstacles[j].obstacle.y = h;
        }
        self.obstaclesSetTimeMove();
      }, i);
    },
    create: function() {

      this.createWorld();
      this.createPlayer();
      this.createobstacles();
      this.createEnegyLevel();

      this.onlyobstacles = [];
      for (var i = 0; i < this.obstacles.length; i++) {
        this.onlyobstacles.push(this.obstacles[i].obstacle);
      };
      this.game.physics.arcade.enable(this.onlyobstacles);

      this.game.physics.arcade.enable([this.player, this.ground, this.blockWood]);

      // Set ups collision between player and ground
      this.player.body.gravity.y = 1000;

      this.ground.body.immovable = true;
      this.ground.body.collideWorldBounds = true;
      this.blockWood.body.immovable = true;

      // Enables Cursor control for the player
      this.cursors = this.game.input.keyboard.createCursorKeys();

      // Starts moving the obstacles
      this.obstaclesSetTimeMove();
    },
    render: function(){
      /*this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");  
      this.game.debug.bodyInfo(this.player, 0, 80);  */
    },
    playerRunning: function(){ 
      if( this.playerStatus !== 'running' &&  (!this.cursors.down.isDown) ){ console.log('running');
        this.player.animations.stop('jump');
        this.player.animations.stop('dock');
        this.player.animations.play('run');
        this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);

        this.playerStatus = 'running';
      }
    },
    playerdock: function(){
      if( this.playerStatus !== 'docking' && this.playerStatus !== 'jumping' ){ console.log('docking');
        this.player.animations.stop('run');
        this.player.animations.stop('jump');
        this.player.animations.play('dock');
        this.player.body.setSize(this.player.dockedDimensions.width, this.player.dockedDimensions.height);

        this.playerStatus = 'docking';
      }
    },
    playerJump: function(){
      if( this.playerStatus !== 'jumping' && this.playerStatus !== 'docking' ){ console.log('jumping');
        this.player.animations.stop('run');
        this.player.animations.stop('dock');
        this.player.animations.play('jump');
        this.player.body.velocity.y -= 550;

        this.playerStatus = 'jumping';
      }
    },
    playerHurted: function(){
      // console.log('playerHurted');
      this.t.text -= 1;
    },
    update: function() {
      this.game.physics.arcade.collide(this.player, this.groundGroup, this.playerRunning, null, this);
      this.game.physics.arcade.overlap(this.player, this.damagingGroup, this.playerHurted, null, this);

      // Jump Detection & dock detection
      if(this.cursors.up.isDown) {
        this.playerJump();
      }else if(this.cursors.down.isDown){
        this.playerdock();
      }

      this.ground.tilePosition.x -= 1;
      this.backgroundCity.tilePosition.x -= 0.1;
      this.backgroundForest.tilePosition.x -= 0.2;

      this.blockWood.body.x -= 1;

      //restart the game if reaching the edge
      /*if(this.player.x >= this.game.world.width) {
        this.game.state.start('Game');
      }*/
      
      if(this.blockWood.x < -this.blockWood.width) {
        this.blockWood.body.x = this.game.width;
      }

      // Move Active obstacles
      for (var i = 0; i < this.obstacles.length; i++) {
        if( this.obstacles[i].status === 'active' ){

          if( this.obstacles[i].type === 'fixed' ){
            this.obstacles[i].obstacle.x -= 1;
          }else if( this.obstacles[i].type === 'animated' ){ //console.log('animated');
            this.obstacles[i].obstacle.x -= this.obstacles[i].speed;
          }else{
            this.obstacles[i].obstacle.x -= 2.5;
          }
        }

        if(this.obstacles[i].obstacle.x < -40) {
          this.obstacles[i].status = 'noactive';
          this.obstacles[i].obstacle.x = this.game.width;
        }
      };
    }
  };

  return GameState;
});