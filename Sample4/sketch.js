function setup() {
  createCanvas(400, 600);
  frameRate(20.6);
  pixelDensity(1)

  //saveGif('오지민20230525과제4', 10); 
}

function draw() {
  // 배경: 밤하늘 색 변화
  let col1 = color(30, 50, 80);
  let col2 = color(10, 20, 40);
  let amt = map(sin(frameCount * 0.02), -1, 1, 0, 1); 
  let bgColor = lerpColor(col1, col2, amt);
  background(bgColor); 

  // 옥수수: 둥실
  push();
  let cornY = sin(frameCount * 0.05) * 5; 
  translate(0, cornY); 

  // 옥수수 몸통
  fill(255, 220, 80);
  stroke(200, 180, 50);
  ellipse(200, 250, 80, 200);

  // 옥수수 알갱이
  fill(255, 200, 60);
  noStroke();
  drawCornKernels(); 

  // 옥수수 껍질
  drawHusks();
  pop(); 

  // 줄기
  push();
  let stemG = map(sin(frameCount * 0.1), -1, 1, 140, 200);
  fill(155, stemG, 0);
   
  rect(180, 345, 40, 40);
  rect(180, 365, 40, 40);
  rect(180, 395, 40, 40);
  rect(180, 435, 40, 40);
  rect(180, 475, 40, 45);
   
  // 땅: 색 변화
  colorMode(HSB, 360, 100, 100);
  let hueVal = (frameCount * 2) % 360;
  fill(hueVal, 60, 100 - random(3)); 
   
  rect(0, 520, 40, 40);
  rect(40, 520, 40, 40);
  rect(80, 520, 40, 40);
  rect(120, 520, 40, 40);
  rect(160, 520, 40, 40);
  rect(200, 520, 40, 40);
  rect(240, 520, 40, 40);
  rect(280, 520, 40, 40);
  rect(320, 520, 40, 40);
  rect(360, 520, 40, 40);
  pop(); 

  // 반딧불이: 둥실반짝
  drawFirefly(100, 120, color(255, 255, 150), 0);     
  drawFirefly(300, 120, color(150, 255, 150), 2);     
  drawFirefly(50, 200, color(255, 150, 255), 4);      
  drawFirefly(350, 200, color(150, 200, 255), 1);     
  drawFirefly(200, 80, color(255, 200, 100), 3);      

  fill(255);
  textSize(28);
  text("오지민_20230525", 20, 40);
   
}


function drawFirefly(x, y, c, offset) {
  push();
  let moveX = cos(frameCount * 0.03 + offset) * 10;
  let moveY = sin(frameCount * 0.03 + offset) * 10;
  translate(x + moveX, y + moveY);
  let pulse = map(sin(millis() * 0.005 + offset), -1, 1, 0.8, 1.2);
   
  fill(c); noStroke(); ellipse(0, 0, 10, 10);
  fill(red(c), green(c), blue(c), 100); ellipse(0, 0, 18 * pulse, 18 * pulse);
  fill(red(c), green(c), blue(c), 60); ellipse(0, 0, 28 * pulse, 28 * pulse);
  pop();
}

function drawHusks() {
  fill(120, 180, 80, 200); stroke(80, 140, 50);
  triangle(160, 230, 120, 180, 180, 350);
  fill(140, 200, 90, 180); triangle(165, 235, 135, 190, 175, 340);
  fill(100, 160, 70, 160); triangle(170, 240, 145, 200, 180, 350);
  fill(120, 180, 80, 200); triangle(240, 230, 280, 180, 220, 350);
  fill(140, 200, 90, 180); triangle(235, 235, 265, 190, 225, 340);
  fill(100, 160, 70, 160); triangle(230, 240, 255, 200, 220, 350);
}

function drawCornKernels() {
  // 알갱이: 씰룩씰룩
  let kW = 6 + sin(frameCount * 0.5) * 1.5;
  let kH = 8 + cos(frameCount * 0.5) * 1.5;

  ellipse(175, 190, kW, kH); ellipse(185, 190, kW, kH); ellipse(195, 190, kW, kH); ellipse(205, 190, kW, kH); ellipse(215, 190, kW, kH); ellipse(225, 190, kW, kH);
  ellipse(175, 210, kW, kH); ellipse(185, 210, kW, kH); ellipse(195, 210, kW, kH); ellipse(205, 210, kW, kH); ellipse(215, 210, kW, kH); ellipse(225, 210, kW, kH);
  ellipse(175, 230, kW, kH); ellipse(185, 230, kW, kH); ellipse(195, 230, kW, kH); ellipse(205, 230, kW, kH); ellipse(215, 230, kW, kH); ellipse(225, 230, kW, kH);
  ellipse(175, 250, kW, kH); ellipse(185, 250, kW, kH); ellipse(195, 250, kW, kH); ellipse(205, 250, kW, kH); ellipse(215, 250, kW, kH); ellipse(225, 250, kW, kH);
  ellipse(175, 270, kW, kH); ellipse(185, 270, kW, kH); ellipse(195, 270, kW, kH); ellipse(205, 270, kW, kH); ellipse(215, 270, kW, kH); ellipse(225, 270, kW, kH);
  ellipse(175, 290, kW, kH); ellipse(185, 290, kW, kH); ellipse(195, 290, kW, kH); ellipse(205, 290, kW, kH); ellipse(215, 290, kW, kH); ellipse(225, 290, kW, kH);
  ellipse(175, 310, kW, kH); ellipse(185, 310, kW, kH); ellipse(195, 310, kW, kH); ellipse(205, 310, kW, kH); ellipse(215, 310, kW, kH); ellipse(225, 310, kW, kH);
}

