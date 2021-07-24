var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bamboo,bambooImg,bambooGroup;

var panda, panda_running, panda_collided;
var  invisibleGround;

var groundImage;
var obstaclesGroup,obstacle1;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  panda_running =   loadAnimation("Panda.png");
  panda_collided = loadAnimation("panda crying.png");
  
  groundImage = loadImage("background.png");
  
 // cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("stone.png");

  bambooImg = loadImage("bamboo.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("reset.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //panda = createSprite(50,180,20,50);
  panda = createSprite(150,height-70,20,50);
  panda.addAnimation("running", panda_running);
  panda.addAnimation("collided", panda_collided);
  panda.scale = 0.3;
  
  //ground = createSprite(200,80,200,600);
  ground = createSprite(width/2,height,width,600);
  ground.addImage("background",groundImage);
  ground.x = width/2;
  //ground.scale = 2.7;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(750,400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(750,350);
  restart.addImage(restartImg);

  //bamboo = createSprite(100,180,20,100);
  //bamboo.addImage(bambooImg);
  //bamboo.scale = 0.3;
  
  gameOver.scale = 0.5;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;
  
  //invisibleGround = createSprite(200,190,400,10);
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  //cloudsGroup = new Group();
  obstaclesGroup = new Group();
  bambooGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(groundImage);
  
  
  if (gameState === PLAY){
    //score = score + Math.round(getFrameRate()/80);
    // ground.velocityX = -(6 + 3*score/100);
   
    if(keyDown("space") && panda.y >= 80) {
      panda.velocityY = -10;
    }
  
    panda.velocityY = panda.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (bambooGroup.isTouching(panda)){
       score = score+1;
      }

    panda.collide(invisibleGround);
    //spawnClouds();
    spawnObstacles();
    spawnBamboo();
  
    if(obstaclesGroup.isTouching(panda)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    panda.velocityY = 0;
    bambooGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    panda.changeAnimation("collided",panda_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bambooGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  spawnObstacles();
  spawnBamboo();
  drawSprites();
  text("Score: "+ score, 1400,70);
  fill("black");
  
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var ob = createSprite(1400,height-70,20,50);
    ob.y = Math.round(random(600,650));
    ob.addImage(obstacle1);
    ob.scale = 0.2;
    ob.velocityX = -3;
    
     //assign lifetime to the variable
    ob.lifetime = 1200;
    
    //adjust the depth
    ob.depth = panda.depth;
    panda.depth = panda.depth + 1;
    
    //add each cloud to the group
    obstaclesGroup.add(ob);

  }
  
}

function spawnBamboo() {
  //write code here to spawn the clouds
  if (frameCount % 260 === 0) {
    var bam = createSprite(1300,120,40,10);
    bam.y = Math.round(random(600,650));
    bam.addImage(bambooImg);
    bam.scale = 0.8;
    bam.velocityX = -3;
    
     //assign lifetime to the variable
    bam.lifetime = 1200;
    
    //adjust the depth
    bam.depth = panda.depth;
    panda.depth = panda.depth + 1;
    
    //add each cloud to the group
    bambooGroup.add(bam);
  }
  }
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bambooGroup.destroyEach();
  //cloudsGroup.destroyEach();
  
  panda.changeAnimation("running",panda_running);
  
  if(localStorage["HighestScore"]<score){
     localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}