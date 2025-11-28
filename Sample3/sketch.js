// --- 인터랙션을 위한 전역 변수 설정 ---

// 눈동자 위치 변수
let pupilOffsetX = 0;
let pupilOffsetY = 0;

// 눈 깜빡임 관련 변수
let isBlinking = false;
let blinkTimer = 0; // blinkEndTime 대신 사용할 타이머

// 꿀벌 위치 변수
let beeX, beeY;
let beeTargetX, beeTargetY; // 꿀벌이 이동할 목표 지점

// --- 인터랙션 변수 ---
let headAngle = 0; // 머리 기울기 각도
let isMouseHeldDown = false; // 마우스를 누르고 있는지 여부

// 하트 애니메이션 변수
let heartX, heartY;
let heartAlpha = 0; // 하트의 투명도
let isHeartActive = false; // 하트 애니메이션 활성화 여부

// 점프 애니메이션 변수
let characterYOffset = 0;
let jumpVelocity = 0;
const gravity = 0.5; // 중력
const jumpPower = -10; // 점프하는 힘
let isJumping = false; // 점프 중인지 여부

function setup() {
  // 과제 요구사항: 600x400 픽셀 캔버스
  createCanvas(600, 400);

  // 꿀벌 초기 위치 설정
  beeX = 380;
  beeY = 100;
  beeTargetX = beeX;
  beeTargetY = beeY;
}

function draw() {
  // 배경색 설정
  background(220);

  // --- 1. 인터랙션 값 업데이트 ---

  // 마우스 위치에 따라 눈동자 오프셋 계산
  pupilOffsetX = constrain(map(mouseX, 0, width, -5, 5), -5, 5);
  pupilOffsetY = constrain(map(mouseY, 0, height, -2, 2), -2, 2);

  // 마우스 x좌표에 따라 머리 각도 계산
  headAngle = map(mouseX, 0, width, -8, 8);

  // 1초마다 꿀벌의 목표 지점을 랜덤하게 변경
  if (frameCount % 60 === 0) {
    beeTargetX = random(width);
    beeTargetY = random(height / 2);
  }
  // lerp 함수를 이용해 꿀벌이 목표 지점으로 부드럽게 이동
  beeX = lerp(beeX, beeTargetX, 0.02);
  beeY = lerp(beeY, beeTargetY, 0.02);

  // 점프 물리 업데이트
  if (isJumping) {
    jumpVelocity += gravity; // 중력 적용
    characterYOffset += jumpVelocity; // 위치 업데이트

    // 바닥에 닿으면 멈춤
    if (characterYOffset >= 0) {
      characterYOffset = 0;
      isJumping = false;
    }
  }

  // 캐릭터 전체 그룹을 점프 오프셋만큼 이동
  push();
  translate(0, characterYOffset);

  // --- 2. 캐리커처 그리기 ---
  stroke(0);
  strokeWeight(2);

  // --- 몸통 그리기 ---
  fill(160, 110, 80);
  rect(width / 2 - 90, height / 2 + 90, 180, 120, 10);

  // 왼쪽 팔
  push();
  translate(width / 2 - 90, height / 2 + 90);
  rotate(radians(10));
  rect(-20, 0, 45, 210, 20);
  pop();

  // 오른쪽 팔
  push();
  translate(width / 2 + 90, height / 2 + 90);
  rotate(radians(-10));
  rect(-25, 0, 45, 210, 20);
  pop();

  fill(160, 110, 80);
  beginShape();
    vertex(width / 2, height / 2 + 90);
    vertex(width / 2 - 90, height / 2 + 90);
    vertex(width / 2 - 90, height / 2 + 210);
    vertex(width / 2, height / 2 + 210);
  endShape(CLOSE);
  beginShape();
    vertex(width / 2, height / 2 + 90);
    vertex(width / 2 + 90, height / 2 + 90);
    vertex(width / 2 + 90, height / 2 + 210);
    vertex(width / 2, height / 2 + 210);
  endShape(CLOSE);

  fill(240);
  strokeWeight(1.5);
  ellipse(width / 2, height / 2 + 130, 12, 12);
  ellipse(width / 2, height / 2 + 160, 12, 12);
  ellipse(width / 2, height / 2 + 190, 12, 12);
  strokeWeight(2);

  // 치마
  fill(30);
  beginShape();
    vertex(width / 2 - 90, height / 2 + 210);
    vertex(width / 2 + 90, height / 2 + 210);
    vertex(width / 2 + 100, height / 2 + 300);
    vertex(width / 2 - 100, height / 2 + 300);
  endShape(CLOSE);


  // 머리 그룹
  push();
  translate(width / 2, height / 2 + 40);
  rotate(radians(headAngle));
  translate(-width / 2, -(height / 2 + 40));

  // 머리카락
  fill(60, 45, 40);
  rect(width / 2 - 105, height / 2 - 35, 210, 105, 0, 0, 20, 20);

  // 얼굴
  fill(252, 227, 216);
  rect(width / 2 - 25, height / 2 + 60, 50, 30, 5);
  ellipse(width / 2, height / 2 - 20, 180, 200);

  // 터틀넥
  fill(255);
  ellipse(width / 2, height / 2 + 110, 70, 30);
  beginShape();
    vertex(width / 2 - 35, height / 2 + 110);
    vertex(width / 2 - 30, height / 2 + 80);
    vertex(width / 2 + 30, height / 2 + 80);
    vertex(width / 2 + 35, height / 2 + 110);
  endShape();

  fill(60, 45, 40);
  arc(width / 2, height / 2 - 50, 215, 185, PI - 0.5, TWO_PI + 0.5);

  // --- 이목구비 그리기 ---
  let eyeY = height / 2 - 15;

  // ★ 새로 수정된 눈 그리기 로직
  if (isBlinking && millis() - blinkTimer < 250) {
    // 감긴 눈
    stroke(0);
    strokeWeight(2);
    fill(252, 227, 216);
    arc(width/2 - 45, eyeY, 50, 15, PI-100, TWO_PI);
    arc(width/2 + 45, eyeY, 50, 15, PI, TWO_PI+100);
  } else {
    if (isBlinking) {
      isBlinking = false;
    }
    // 일반 눈
    fill(255);
    ellipse(width / 2 - 45, eyeY, 50, 15);
    ellipse(width / 2 + 45, eyeY, 50, 15);

    let pupilBaseX1 = width / 2 - 45;
    let pupilBaseX2 = width / 2 + 45;
    fill(0);
    ellipse(pupilBaseX1 + pupilOffsetX, eyeY + pupilOffsetY, 17, 15);
    ellipse(pupilBaseX2 + pupilOffsetX, eyeY + pupilOffsetY, 17, 15);
    fill(255);
    ellipse(pupilBaseX1 + pupilOffsetX, eyeY - 5 + pupilOffsetY, 5, 5);
    ellipse(pupilBaseX2 + pupilOffsetX, eyeY - 5 + pupilOffsetY, 5, 5);
  }

  strokeWeight(5);
  line(width / 2 - 70, height / 2 - 35, width / 2 - 25, height / 2 - 35);
  line(width / 2 + 25, height / 2 - 35, width / 2 + 70, height / 2 - 35);
  strokeWeight(2);

  fill(255, 170, 180, 150);
  noStroke();
  ellipse(width / 2 - 54, height / 2 + 26, 28, 18);
  ellipse(width / 2 + 54, height / 2 + 26, 28, 18);
  stroke(0);

  fill(240, 200, 180);
  ellipse(width / 2, height / 2 + 20, 12, 15);

  // 입
  if (isMouseHeldDown) {
    fill(230, 100, 120);
    strokeWeight(2);
    ellipse(width/2, height/2+45, 20, 25);
  } else {
    noFill();
    strokeWeight(3);
    arc(width / 2, height / 2 + 40, 50, 30, 0, PI);
  }
  strokeWeight(2);

  pop(); // 머리 그룹 종료
  pop(); // 캐릭터 점프 그룹 종료

  // 꿀벌
  drawBee(beeX, beeY);

  // 하트
  if (isHeartActive) {
    heartY -= 2;
    heartAlpha -= 3;
    if (heartAlpha <= 0) {
      isHeartActive = false;
    }
    drawHeart(heartX, heartY, heartAlpha);
  }

  // 안내 문구
  noStroke();
  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  //text("마우스 클릭: 깜빡이기\n마우스 누르고 있기: 표정 바꾸기\n'스페이스바': 하트 날리기\n'j': 점프하기\n's': 10초 GIF 저장",10, 10);
}

function drawBee(x, y) {
  push();
  translate(x, y);
  fill(255, 204, 0);
  stroke(0);
  strokeWeight(1);
  ellipse(0, 0, 30, 20);
  fill(0);
  noStroke();
  rect(-8, -9, 5, 18);
  rect(-3, -9, 5, 18);
  ellipse(-18, 0, 15, 15);
  stroke(100, 70, 0);
  strokeWeight(1);
  line(-25, -5, -30, -10);
  line(-25, 5, -30, 10);
  noStroke();
  fill(100, 70, 0);
  ellipse(-30, -10, 3, 3);
  ellipse(-30, 10, 3, 3);
  let wingFlap = sin(frameCount * 0.5) * 5;
  fill(255, 255, 255, 150);
  stroke(150);
  strokeWeight(0.5);
  ellipse(0, -10 + wingFlap, 15, 10);
  ellipse(0, 10 - wingFlap, 15, 10);
  pop();
}

function drawHeart(x, y, alpha) {
  push();
  noStroke();
  fill(255, 80, 120, alpha);
  translate(x, y);
  beginShape();
  vertex(0, 0);
  bezierVertex(-20, -20, -30, 5, 0, 25);
  bezierVertex(30, 5, 20, -20, 0, 0);
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  if (!isBlinking) {
    isBlinking = true;
    blinkTimer = millis(); // ★ 타이머 로직 수정
  }
  isMouseHeldDown = true;
}
function mouseReleased() {
  isMouseHeldDown = false;
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('20230525 오지민 과제3', 10);
  }
  else if (key === ' ') {
    if (!isHeartActive) {
      isHeartActive = true;
      heartX = width / 2;
      heartY = height / 2 + 130;
      heartAlpha = 255;
    }
  }
  else if (key === 'j' || key === 'J') {
      if (!isJumping) {
          isJumping = true;
          jumpVelocity = jumpPower;
      }
  }
}
