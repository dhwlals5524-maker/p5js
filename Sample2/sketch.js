let saved=false
function setup() {
  // 과제 요구사항: 600x400 픽셀 캔버스
  createCanvas(600, 400);
  noLoop()
  setTimeout(function() {
    if (!saved) {
      saveCanvas('20230525_오지민_과제2', 'png');
      saved = true;
    }
  }, 1000); // 1초 뒤 자동 저장 (반복 저장 방지)

}

function draw() {
  // 배경색 설정
  background(220);
  
  // 모든 도형에 검은색 테두리, 두께는 2로 기본 설정
  stroke(0);
  strokeWeight(2);

  // --- 1. 몸통 그리기 (아래에서부터 순서대로) ---

  // 갈색 가디건 몸통 (사각형)
  fill(160, 110, 80);
  rect(width / 2 - 90, height / 2 + 90, 180, 120, 10); // rect(x, y, w, h, [border_radius])

// --- 팔 그리기 ---

  // 왼쪽 팔 (살짝 바깥쪽으로 기울임)
  push();
  translate(width / 2 - 90, height / 2 + 90); // 왼쪽 어깨를 기준으로 회전
  rotate(radians(10)); // 10도 회전
  rect(-20, 0, 45, 210, 20); // 회전된 위치에 팔 그리기
  pop();

  // 오른쪽 팔 (살짝 바깥쪽으로 기울임)
  push();
  translate(width / 2 + 90, height / 2 + 90); // 오른쪽 어깨를 기준으로 회전
  rotate(radians(-10)); // 반대 방향으로 -10도 회전
  rect(-25, 0, 45, 210, 20); // 회전된 위치에 팔 그리기
  pop();


  // V넥을 만들기 위해 가디건 앞섶을 따로 그림
  fill(160, 110, 80);
  // 왼쪽 가디건
  beginShape();
    vertex(width / 2, height / 2 + 90);
    vertex(width / 2 - 90, height / 2 + 90);
    vertex(width / 2 - 90, height / 2 + 210);
    vertex(width / 2, height / 2 + 210);
  endShape(CLOSE);
  // 오른쪽 가디건
  beginShape();
    vertex(width / 2, height / 2 + 90);
    vertex(width / 2 + 90, height / 2 + 90);
    vertex(width / 2 + 90, height / 2 + 210);
    vertex(width / 2, height / 2 + 210);
  endShape(CLOSE);

  // 단추
  fill(240);
  strokeWeight(1.5);
  ellipse(width / 2, height / 2 + 130, 12, 12);
  ellipse(width / 2, height / 2 + 160, 12, 12);
  ellipse(width / 2, height / 2 + 190, 12, 12);
  strokeWeight(2); // 테두리 두께 원상복구



  // --- 3. 머리카락 그리기 (얼굴 위에 덮어씌움) ---
  fill(60, 45, 40);

  // 옆머리
  rect(width / 2 - 105, height / 2-35, 210, 105, 0, 0, 20, 20);
  // --- 2. 얼굴 그리기 (머리카락보다 먼저 그려야 함) ---
  fill(252, 227, 216); // 피부색 설정
  rect(width / 2 - 25, height / 2 + 60, 50, 30);      // 목
  ellipse(width / 2, height / 2 - 20, 180, 200);      // 얼굴 윤곽
  // 흰색 터틀넥
  fill(255);
  ellipse(width / 2, height / 2 +110, 70, 30);
  fill(255);
  beginShape();
    vertex(width / 2 - 35, height / 2 + 110); // 왼쪽 아래
    vertex(width / 2 - 30, height / 2 + 80);  // 왼쪽 위
    vertex(width / 2 + 30, height / 2 + 80);  // 오른쪽 위
    vertex(width / 2 + 35, height / 2 + 110); // 오른쪽 아래  
  endShape();
  fill(60, 45, 40);
  // 윗머리
  arc(width / 2, height / 2-50, 215, 185, PI - 0.5, TWO_PI + 0.5);
  fill(60, 45, 40);
  // 가르마
  stroke(30); // 배경색과 비슷한 색으로 선을 그어 파인 느낌을 줌
  strokeWeight(1.5);
//  line(width / 2, height / 2 - 110, width / 2, height / 2 - 70);
  stroke(0); // 테두리 색 원상복구
  strokeWeight(2);

  // --- 4. 이목구비 그리기 (가장 위에 그려짐) ---

  // 눈
  fill(255); // 흰자
  ellipse(width / 2 - 45, height / 2-10-5, 50, 15);
  ellipse(width / 2 + 45, height / 2-10-5, 50, 15);
  //fill(40, 60, 80); // 눈동자 (남색)
  //ellipse(width / 2 - 45, height / 2-10-5, 30, 25);
  //ellipse(width / 2 + 45, height / 2-10-5, 30, 25);
  fill(0); // 검은자
  ellipse(width / 2 - 45, height / 2-10-5, 17, 15);
  ellipse(width / 2 + 45, height / 2-10-5, 17, 15);
  fill(255); // 하이라이트
  ellipse(width / 2 - 45, height / 2-5-10-5, 5, 5);
  ellipse(width / 2 + 45, height / 2-5-10-5, 5, 5);

  // 눈썹
  strokeWeight(5); // 굵게
  line(width / 2 - 70, height / 2 - 35, width / 2 - 25, height / 2 - 35);
  line(width / 2 + 25, height / 2 - 35, width / 2 + 70, height / 2 - 35);
  strokeWeight(2); // 원상복구
  
  fill(255, 170, 180, 150); // 투명도 살짝
  noStroke();
  ellipse(width / 2 - 54, height / 2 + 26, 28, 18);
  ellipse(width / 2 + 54, height / 2 + 26, 28, 18);
  stroke(0);

  // 코
  fill(240, 200, 180);
  ellipse(width / 2, height / 2 + 20, 12, 15);

  // 입
  noFill();
  strokeWeight(3);
  arc(width / 2, height / 2 + 50-10, 50, 30, 0, PI); // 0부터 PI(180도)까지 호
  strokeWeight(2);

  // 몸통 (노란색)
  fill(255, 204, 0); // 밝은 노란색
  stroke(0);
  strokeWeight(1);
  ellipse(100+280, 100, 30, 20); // 꿀벌 몸통

  // 줄무늬 (검은색)
  fill(0);
  rect(100-8+280, 100-9, 5, 18);
  rect(103+280, 100-9, 5, 18);

  // 머리 (검은색)
  ellipse(100-18+280, 100, 15, 15);

  // 더듬이 (갈색)
  stroke(100, 70, 0);
  line(100-25+280, 100-5, 100-30+280, 100-10);
  line(100-25+280, 105, 100-30+280, 110);
  noStroke(); // 더듬이 끝에는 점 (테두리 없음)
  fill(100, 70, 0);
  ellipse(100-30+280, 100-10, 3, 3);
  ellipse(100-30+280, 110, 3, 3);

  // 날개 (투명한 흰색)
  fill(255, 255, 255, 150); // 투명도 150
  stroke(150);
  strokeWeight(0.5);
  ellipse(100+280, 100-10, 15, 10); // 위쪽 날개
  ellipse(100+280, 110, 15, 10);  // 아래쪽 날개


  fill(255);            // 흰색 글자
  textSize(28);         // 글자 크기
  text("오지민_20230525", 20, 40); // 좌측 상단 위치에 이름
}
