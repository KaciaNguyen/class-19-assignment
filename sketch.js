var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite (290,575);
  ghost.addImage("ghost-standing",ghostImg);
  ghost.scale = 0.5;
  doorsGroup = new Group();
  climbersGroup = new Group();

}

function draw() {
  background(0);
  
  if(gameState = "play"){
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
  
    ghost.velocityY = ghost.velocityY + 0.5;
  
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3
    }
  
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3
    }
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoor();
  }

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    ghost.destroy();
    gameState = "end";
  }

  drawSprites();

  if(gameState === "end"){
    stroke("red");
    fill("black");
    textSize(25);
    text("Game Over", 250, 250);
  }

}

function spawnDoor() {
if(frameCount%240===0){
  var door = createSprite(100,100);
  var climber = createSprite(100,150);

  door.addImage("door", doorImg);
  climber.addImage("climber", climberImg);

  door.x = Math.round(random(75,525));
  climber.x = door.x;
  door.velocityY = 1;
  climber.velocityY = 1;
  door.lifetime = 700;
  climber.lifetime = 700;

  doorsGroup.add(door);
  climbersGroup.add(climber);
}
}