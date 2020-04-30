var PLAY=1;
var END=0;
var SERVE=2;
//var astronaut;
var gameState=SERVE;
var asteroids,fireball,backGround,oxygenPellet,oxyPellet,house,astronaut2;
var ground;
var astro;
var asteroidGroup,fireballGroup;
var powerPelletGroup;
var oxygenPelletGroup;
var groundGroup;
var oxyGroup;
var foodHouseGroup;
var obstacle1,obstacle3,astronautImg,powerImg,oxygenImg,hungryAstro,deadAstro;
var backgroundImg;
var oxygenLevel=10;
var gameOver,restart;
var overImg,restartImg;
var power;
var oxyImg
var introSong,gameOverSong,fireSong,powerUpSong,hungrySong;
var angle=0;

function preload(){
  
  sequenceAnimation = loadAnimation('walking1.png', 'walking2.png', 
  'walking3.png', 'walking4.png', 
  'walking5.png', 'walking6.png');  

obstacle1=loadImage("images/asteroid1.jpg");
obstacle2=loadImage("images/fireasteroid.png");
obstacle3=loadImage("images/asteroid2.jpg");
//astronautImg=loadImage("images/astro_nobg.png");
powerImg=loadImage("images/power.png");
oxygenImg=loadImage("images/oxygen.png");
backgroundImg=loadImage("images/space.jpg");
overImg=loadImage("images/gameOver.jpg");
restartImg=loadImage("images/resetbutton.png");
introSong=loadSound("sound/introsong.mp3");
gameOverSong=loadSound("sound/gameover.mp3");
fireSong=loadSound("sound/asteroid.mp3");
powerUpSong=loadSound("sound/powerup.mp3");
oxyImg=loadImage("images/oxygen.png");
//foodImg=loadImage("images/restaurant.jpg");
hungryAstro=loadImage("images/hungryastro.png");
hungrySong=loadSound("sound/hungry.mp3");
deadAstro=loadImage("images/deadastro.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
      backGround=createSprite(600,200,width,height);
 backGround.addImage("space",backgroundImg);
 backGround.x=width/2;
  astronaut=createSprite(50,height-50,20,80);
  astronaut.scale =  .5;
  astronaut.mirrorX(-1);
  //astronaut.debug = true;
  //add the animation to the sprite
  astronaut.addAnimation('walker', sequenceAnimation);
 
 astronaut.setCollider("circle",0,0,65);
 astronaut2=createSprite(50,height-50,20,80);
 astronaut2.scale =  1.0;
 astronaut2.addImage("dead",deadAstro);
 astronaut2.visible=false;
   ground=createSprite(width/2,height-10,width,2);
  ground.visible=false;
  gameOver=createSprite(width/2,height/2- 50);
  gameOver.addImage("over",overImg);
  restart=createSprite(width/2,height/2+30);
  restart.addImage("restart",restartImg);
  gameOver.visible=false;
  restart.visible=false;
 
 asteroidGroup=new Group();
 fireballGroup=new Group();
powerPelletGroup=new Group();
oxygenPelletGroup=new Group();
groundGroup=new Group();
oxyGroup=new Group();
foodHouseGroup=new Group();

}


function draw() 
{

  background("black"); 

 
  
 if(touches.length > 0 ||keyCode===13){
      gameState=PLAY;
      touches = []; 
 }
 
if(gameState===PLAY){
  
  backGround.velocityX=-4;
  
 
  if (backGround.x < 400){
    backGround.x =width/2;
  }
  //Astronaut();
  if((touches.length > 0 || keyDown("SPACE")) && astronaut.y  >= height-120) {
    //jumpSound.play( )
    astronaut.velocityY = -10;
     touches = [];
  }
  astronaut.velocityY=astronaut.velocityY+0.5;
    //console.log(astronaut.velocityY);
    astronaut.collide(ground);
 spawnAsteroids1(); 
 spawnAsteroids2(); 
spawnPowerPellet(); 
spawnOxygenPellet();
spawnGround();
spawnOxy();
spawnFood();

angle = angle+10; 
for( var i = 0; i<asteroidGroup.length;i++ ){
   asteroidGroup.get(i).rotation = 60+angle; 
  }

if(oxygenPelletGroup.isTouching(astronaut)){

powerUpSong.play();
oxygenPelletGroup.destroyEach();
oxygenLevel=oxygenLevel+2; 

  
}
if(oxyGroup.isTouching(astronaut)){

  powerUpSong.play();
  oxyGroup.destroyEach();
  oxygenLevel=oxygenLevel+1; 
  
    
  }
 else if(asteroidGroup.isTouching(astronaut)){

asteroidGroup.destroyEach();
oxygenLevel=oxygenLevel-1;



}
else if(fireballGroup.isTouching(astronaut)){
  
  fireSong.play();
  fireballGroup.destroyEach();
  oxygenLevel=oxygenLevel-1;
  
  
  }
  if(foodHouseGroup.isTouching(astronaut)){
        hungrySong.play();
       foodHouseGroup.destroyEach();
    
       
  }
 
  if(powerPelletGroup.isTouching(astronaut)){
    powerPelletGroup.destroyEach();
    if(touches.length > 0 ||  keyDown("space") && astronaut.y>=height-80){
    astronaut.velocityY=-17;
    touches = []; 
       }
         astronaut.velocityY=astronaut.velocityY+0.3;
  }
 
  if(oxygenLevel===0){
    gameOverSong.play();
    gameState=END;
    
  }



}
 if(gameState === END) {
 astronaut.visible=false;
 astronaut2.visible=true;
    //stopnthe movement of all groups and make them atay on the screen
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  backGround.velocityX=0;
  ground.velocityX = 0;
  astronaut.velocityY = 0;
  asteroidGroup.setVelocityXEach(0);
  fireballGroup.setVelocityXEach(0);
  powerPelletGroup.setVelocityXEach(0);
  oxygenPelletGroup.setVelocityXEach(0);
  groundGroup.setVelocityXEach(0);
  oxyGroup.setVelocityXEach(0);
  foodHouseGroup.setVelocityXEach(0);
  
 
  //set lifetime of the game objects so that they are never destroyed
  asteroidGroup.setLifetimeEach(-1);
  fireballGroup.setLifetimeEach(-1);
  powerPelletGroup.setLifetimeEach(-1);
  oxygenPelletGroup.setLifetimeEach(-1);
  groundGroup.setLifetimeEach(-1);
  oxyGroup.setLifetimeEach(-1);
  foodHouseGroup.setLifetimeEach(-1);

  if( touches.length>0 || mousePressedOver(restart)) {
    gameOverSong.stop();
    //introSong.stop();
    reset();
    touches = [];
  }
  
  
}
  drawSprites();
  if(gameState==SERVE){
    
    //introSong.play();
    textSize(30);
    textFont('Britannic Bold');
    fill("White");
    //text(windowWidth,200,200);
   // text(windowHeight,300,200);
    text("GALACTIC SPACE RANGERS!", 350,height-400);
     textSize(22);
    text("Use space bar to Jump and escape from the asteroids",350,height-320);
    text("Collect the power pellets and oxygen while you travel through space!!",350,height-270);
    text("Happy travelling!! ",350,height-240);
    text("Press ENTER to Start!!",450,height-190);

}

if(gameState==PLAY){
 // introSong.stop();
 if(oxygenLevel<=3){
  textSize(28);
  fill("red");
  text("Oxygen Level : "+oxygenLevel,1000,100);
}
else{
  textSize(28);
  fill("white");
  text("Oxygen Level : "+oxygenLevel,1000,100);
}
 
 // fill("white");
 
}


if(gameState==END){
    textSize(22);
    textFont('Britannic Bold');
    fill("White");
    text("Thanks For playing!!", 500,height-230);
    text("Game developed by : P Shraavya Hande",500,height-200);
}
}

/*function Astronaut(){

  if(touches.length > 0 || keyDown("space") && astronaut.y>=height-50){
    astronaut.velocityY=-12;
    touches = [];
     }
      astronaut.velocityY=astronaut.velocityY+0.5;
      //console.log(astronaut.velocityY);
      astronaut.collide(ground);
   
   


}*/

function spawnAsteroids1(){
 
    if(frameCount % 120 === 0) {
       asteroids = createSprite(width,height-80,40,10);
       asteroids.setCollider("circle",0,0,40);
      // asteroids.debug=true;
      asteroids.y=random(height-500,height);
      asteroids.velocityX = -(7+Math.round(getFrameRate()/3));
      // asteroids.addImage("asteroid1",obstacle1);
      var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: asteroids.addImage(obstacle1);
              break;
      case 2: asteroids.addImage(obstacle3);
              break;
      default: break;
    }
              
      //assign scale and lifetime to the obstacle           
      asteroids.scale = 0.5;
      asteroids.lifetime = 300;
      //add each obstacle to the group
      asteroidGroup.add(asteroids);
    }
  }
  function spawnAsteroids2(){
 
    if(frameCount % 280 === 0) {
       fireball = createSprite(width,height-80,40,10);
       fireball.setCollider("circle",0,0,40);
     //  fireball.debug=true;
      fireball.y=random(height-200,height)
      fireball.velocityX = -(7+Math.round(getFrameRate()/3));
      fireball.addImage("asteroid2",obstacle2);
            
      //assign scale and lifetime to the obstacle           
      fireball.scale = 0.5;
      fireball.lifetime = 300;
      //add each obstacle to the group
      fireballGroup.add(fireball);
    }
  }
  
  function spawnPowerPellet(){
 
    if(frameCount % 798 === 0 ) {
      var powerPellet = createSprite(width,height-80,40,10);
      powerPellet.y=random(height-120,height-90);
      powerPellet.velocityX = -6;
     powerPellet.addImage("power",powerImg);
    
      
      //assign scale and lifetime to the obstacle           
      powerPellet.scale = 0.5;
      powerPellet.lifetime = 300;
      //add each obstacle to the group
      powerPelletGroup.add(powerPellet);
    }
  }
  
  function spawnOxygenPellet(){
 
    if(frameCount % 800 === 0) {
       oxygenPellet = createSprite(width,height-80,40,10);
      oxygenPellet.y=random(height-300,height-260);

      oxygenPellet.velocityX = -6;
     oxygenPellet.addImage("oxygen",oxygenImg);
    
      //assign scale and lifetime to the obstacle           
      oxygenPellet.scale = 0.5;
      oxygenPellet.lifetime = 300;
      //add each obstacle to the group
      oxygenPelletGroup.add(oxygenPellet);
    }
  }

  function spawnOxy(){
 
    if(frameCount % 1800 === 0) {
      oxyPellet = createSprite(width,height-80,40,10);
      oxyPellet.y=random(height-150,height-230);

      oxyPellet.velocityX = -6;
     oxyPellet.addImage("oxygen",oxyImg);
   
      //assign scale and lifetime to the obstacle           
      oxyPellet.scale = 0.5;
      oxyPellet.lifetime = 300;
      //add each obstacle to the group
      oxyGroup.add(oxyPellet);
    }
  }

  function spawnGround(){
 
    if(frameCount % 800 === 0 ) {
      var miniatureGro = createSprite(width,height-80,200,20);
      miniatureGro.shapeColor="lightblue";
      miniatureGro.y=random(height-290,height-260);
      miniatureGro. velocityX = -6;
      console.log(miniatureGro.x);
    
      //assign scale and lifetime to the obstacle           
      miniatureGro.scale = 0.5;
      miniatureGro.lifetime = 300;
      //add each obstacle to the group
      
    
      groundGroup.add(miniatureGro);
     
    }

  }
  function spawnFood(){
 
    if(frameCount % 3000 === 0) {
       house = createSprite(width,height-100,40,10);
    

      house.velocityX = -6;
     house.addImage("house",hungryAstro);
          
      //assign scale and lifetime to the obstacle           
     // house.scale = 0.5;
      house.lifetime = 600;
      //add each obstacle to the group
      foodHouseGroup.add(house);
    }
  }

  function reset(){
    gameState = SERVE;
   //reset the game and destroy the groups
    gameOver.visible = false;
    restart.visible = false;
    astronaut2.visible=false;
    astronaut.visible=true;
    astronaut.x=50;
    astronaut.y=height-50;
    asteroidGroup.destroyEach();
    fireballGroup.destroyEach();
    powerPelletGroup.destroyEach();
    oxygenPelletGroup.destroyEach();
    groundGroup.destroyEach();
    oxyGroup.destroyEach();
    foodHouseGroup.destroyEach();
    
      oxygenLevel = 10;

      
   // asteroidGroup.setVelocityXEach= -(4+Math.round(frameCount/250));
  // fireballGroup.setVelocityXEach=-(4+Math.round(frameCount/270));
  }
 