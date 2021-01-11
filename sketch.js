var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage;
var grounded,groundedImage;

var highscore = 0 ;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gravity

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;
var totalbanana = 0;
var gameOver, restart, gameOverImg, restartImg;


function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_10.png");
  monkey_collided = loadImage("Monkey_02.png");

  groundedImage = loadImage("jungle.jpg")
  groundImage = loadImage("jungle.jpg");

  bananaImage = loadImage("banana.png");
  
  

  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("stone.png");
  obstacle3 = loadImage("stone.png");
  obstacle4 = loadImage("stone.png");
  obstacle5 = loadImage("stone.png");
  obstacle6 = loadImage("stone.png");

  gameOverImg = loadImage("game_over_PNG58.png");
  restartImg = loadImage("images (2).jfif");
}

function setup() {
  createCanvas(625, 450);
  
  grounded = createSprite(400,200,400,400); 
  grounded.addImage("ground", groundImage);

  ground = createSprite(200, 180, 400, 200);
  ground.addImage("ground", groundImage);

  gravity = createSprite(-400, 220, 10, 400);

  monkey = createSprite(50, 300, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;


  invisibleGround = createSprite(200, 430, 400, 10);
  invisibleGround.visible = false;

  //place gameOver and restart icon on the screen
  gameOver = createSprite(300, 200);
  restart = createSprite(300, 300);
  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);
  gameOver.scale = 0.1;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 
  monkey.setCollider("circle",0,0,100);
  
  bananaGroup = new Group();
  ObstaclesGroup = new Group();
  
  textSize(20);
  fill("blue")
  score = 0;
  banana = 0;
}

function draw() {

  background(180);


  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -15;


    if (mousePressedOver(ground) && monkey.y >= 359) {
      monkey.velocityY = -25;
    }



    monkey.velocityY = monkey.velocityY + 1;

    if (ground.isTouching(gravity)) {
      ground.x = 400
    }

    if (ObstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }
    if (bananaGroup.isTouching(monkey)) {
       bananaGroup.destroyEach();
       monkey.scale = monkey.scale + 0.01
       totalbanana = totalbanana + 1
    }

    monkey.collide(invisibleGround);
    spawnbanana();
    spawnObstacles();
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    

    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    //change the trex animation
    monkey.changeAnimation("collided", monkey_collided);

    //set lifetime of the game objects so that they are never     destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);


    if (mousePressedOver(restart)) {
      reset();
    }
  }
  
  if ( score > highscore) {
    highscore = score;
  }

  //console.log(trex.y);
  
  drawSprites();
  
  textFont("comic sans ms");
  
   text("Survival Time : " + score, 10, 50);
   text("Total Banana : " + totalbanana, 10, 80);
  
   text("Highscore  : " + highscore, 400, 50);
}

function reset() {
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  ObstaclesGroup.destroyEach();
  bananaGroup.destroyEach();

  monkey.changeAnimation("running", monkey_running);
  monkey.scale = 0.1
  
  score = 0;

  totalbanana = 0

}


function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    var banana = createSprite(600, 200, 40, 10);
    banana.y = Math.round(random(0, 250));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -15;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    bananaGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 380, 10, 40);
    obstacle.velocityX = -15;
    
    obstacle.y = Math.round(random(350,420))

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}