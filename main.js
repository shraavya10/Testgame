var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Oxylevel=10;
var trex;var trexImg;
//trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var asteroidGroup;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg;var backgroundImg1;
var score=0;
var jumpSound, collidedSound;
var angle=0;
var gameOver, restart;


function preload(){
  //jumpSound = loadSound("assets/sounds/jump.wav")
 // collidedSound = loadSound("assets/sounds/collided.wav")
 trexImg=loadImage("images/astro_nobg.png"); 
  backgroundImg1 = loadImage("images/spacebg.jpg");
  backgroundImg = loadImage("images/space3.jpg");
  //sunAnimation = loadImage("assets/sun.png");
  sequenceAnimation = loadAnimation('walking1.png', 'walking2.png', 
  'walking3.png', 'walking4.png', 
  'walking5.png', 'walking6.png');
  
  //trex_running = loadAnimation('walking1.png', 'walking2.png','walking3.png', 'walking4.png','walking5.png', 'walking6.png'); 
  //groundImage = loadImage("assets/ground.png");
  
  cloudImage = loadImage("images/oxygen.png");
  
  obstacle1=loadImage("images/asteroid1.jpg");
  obstacle2=loadImage("images/fireasteroid.png");
  obstacle3=loadImage("images/asteroid2.jpg");
  //obstacle4 = loadImage("assets/obstacle4.png");
  
  gameOverImg = loadImage("images/gameOver.jpg");
  restartImg = loadImage("images/resetbutton.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
   trex = createSprite(50,height-70,20,50);
  //trex.addImage("running", trexImg);

  trex.scale =  .5;
  trex.mirrorX(-1);
  //astronaut.debug = true;
  //add the animation to the sprite
  trex.addAnimation('walker', sequenceAnimation);
 // trex.scale = 0.8
     trex.visible=true;
  trex.setCollider('circle',0,0,22)
   trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  backGround=createSprite(width,height);
  backGround.addImage("space",backgroundImg);
   
  gameOver = createSprite(400,height-100,20,50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,height-100,20,50);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.8;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  asteroidGroup=new Group();
  //score = 10;
}

function draw() {
  //trex.debug = true;
  //(backgroundImg);
  
  background(backgroundImg1);
  
  if (gameState===PLAY){
   // score1=score;
    score = score + Math.round(getFrameRate()/60);

   // text("Space distance covered in Kms: "+ score,300,50);
       
       // fill("white");
       
    //ground.velocityX = -(6 + 3*score/100);
     backGround.velocityX=-4;
    // background(backgroundImg).velocityX=-4;
 
    if (backGround.x < 400){
      backGround.x =width/2;
   }
   
  
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      //jumpSound.play( )
      trex.velocityY = -10;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    /*if (ground.x < 0){
      ground.x = ground.width/2;
    }*/
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    /*spawnAsteroids();
    angle = angle+10; 
for( var i = 0; i<asteroidGroup.length;i++ ){
   asteroidGroup.get(i).rotation = 60+angle; 
  }*/

  
    if(cloudsGroup.isTouching(trex)){

        //powerUpSong.play();
        cloudsGroup.destroyEach();
        Oxylevel=Oxylevel+1; 
        
          
        }

       /* if(asteroidGroup.isTouching(trex)){

          //powerUpSong.play();
          asteroidGroup.destroyEach();
          Oxylevel=Oxylevel-1; 
          
            
          }*/

    if(obstaclesGroup.isTouching(trex)){
        //collidedSound.play()
        
            obstaclesGroup.destroyEach();
            Oxylevel=Oxylevel-1;
            if(Oxylevel==0){
             // gameOver.visible = true;
             // restart.visible = true; 
              gameState = END;
            }
  }
   if (gameState === END) {
    //background(backgroundImg).visible=false;
    trex.visible=false;
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    backGround.velocityX = 0;
   // background(backgroundImg).velocityX=0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
   // asteroidGroup.setVelocityXEach(0);
    //change the trex animation
    //trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
  // asteroidGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();

  textSize(20);
  fill("white");
  text("Space distance covered in Kms: "+ score,300,350);
  if (Oxylevel<4){
    fill("red");
    text("Oxygen:" +Oxylevel,300,400);

  }
  else{
    fill("white");
    text("Oxygen:" +Oxylevel,300,400);

  }
  

}

function spawnClouds() {
  //write code here to spawn the clouds
    
   if (frameCount % 600 === 0) {
   var cloud = createSprite(600,height-40,40,10);
   cloud.y = random(height-160,height-100);
   cloud.velocityX = -6;
  cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.lifetime = 300;
    //cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
/*function spawnAsteroids(){


  if (frameCount % 800 === 0) {
    var asteroid= createSprite(600,height-40,40,10);
    asteroid.y = random(height-160,height-100);
    asteroid.velocityX = -6;
    asteroid.addImage(obstacle3);
    asteroid.scale = 0.5;
    asteroid.lifetime = 300;
     //cloud.velocityX = -3;
     
      //assign lifetime to the variable
      asteroid.lifetime = 300;
     
     //adjust the depth
     asteroid.depth = trex.depth;
     asteroid.depth = trex.depth+1;
     
     //add each cloud to the group
     asteroidGroup.add(asteroid);
   }
}*/

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  //trex.visible=true;
  trex.loadImage("running",trexImg);
  
  score = 0;
  Oxylevel=10;
}
}
