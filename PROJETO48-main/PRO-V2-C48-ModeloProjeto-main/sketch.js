var score =0;
var nave1,nave2,nave, raio, backBoard;

var nave1Img,bubbleImg, raioImg, blastImg, backBoardImg;

var naveGroup, nave2Group, raioGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  nave1Img = loadImage("nave1.png")
  blastImg = loadImage("blast.png")
  raioImg = loadImage("raio.png")
  nave2Img = loadImage("nave2.png")
  naveImg = loadImage("nave.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  nave1= createSprite(100, height/2, 50,50);
  nave1.addImage(nave1Img)
  nave1.scale=0.2
  
  raioGroup = createGroup();   
  nave2Group = createGroup();   
  naveGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#000000");
  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Pontuação: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    nave1.y=mouseY  

    if (frameCount % 80 === 0) {
      drawnave2();
    }

    if (frameCount % 100 === 0) {
      drawnave();
    }

    if(keyDown("space")){
      shootRaio();
    }

    if (nave2Group.collide(backBoard)){
      handleGameover(nave2Group);
    }
    
    if (naveGroup.collide(backBoard)) {
      handleGameover(naveGroup);
    }
    
    
    if(nave2Group.collide(raioGroup)){
      handleNavesCollision(nave2Group);
    }

    if(naveGroup.collide(raioGroup)){
      handleNavesCollision(naveGroup);
    }

    drawSprites();
  }
    
  
}

function drawnave2(){
  nave2 = createSprite(800,random(20,780),40,40);
  nave2.addImage(nave2Img);
  nave2.scale = 0.1;
  nave2.velocityX = -8;
  nave2.lifetime = 400;
  nave2Group.add(nave2);
}
function drawnave(){
  nave = createSprite(800,random(20,780),40,40);
  nave.addImage(naveImg);
  nave.scale = 0.1;
  nave.velocityX = -8;
  nave.lifetime = 400;
  naveGroup.add(nave);
}

function shootRaio(){
  raio= createSprite(150, width/2, 50,20)
  raio.y= nave1.y-20
  raio.addImage(raioImg)
  raio.scale=0.12
  raio.velocityX= 7
  raioGroup.add(raio)
}

function handleNavesCollision(navesGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(raio.x+60, raio.y, 50,50);
    blast.addImage(blastImg) 

    
    
    blast.scale=0.3
    blast.life=20
    raioGroup.destroyEach()
    navesGroup.destroyEach()
}

function handleGameover(navesGroup){
  
    life=life-1;
    navesGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu o jogo!",
        text: "Sua pontuação é: " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      });
    }
  
}