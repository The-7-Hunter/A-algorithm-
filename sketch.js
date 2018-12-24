let size = 65;

function setup() {
  let screenHight = 550;
  let screenWidth = 550;

  createCanvas(screenWidth, screenHight);
  background(150);
  noSmooth();
  strokeWeight(4);

}

function draw() {
  textSize(12);

  for (let i = 0; i < colleges.length; i++) {
    for (let j = 0; j < colleges[i].links.length; j++) {
      let tem = colleges[i].links[j].index;
      let xaxis = lerp(colleges[i].axis[0], colleges[tem].axis[0],0.5);
      let yaxis = lerp(colleges[i].axis[1], colleges[tem].axis[1],0.5);
      push();
      stroke(1);
      line(colleges[i].axis[0], colleges[i].axis[1], colleges[tem].axis[0], colleges[tem].axis[1]);
      pop();
      push();
      fill(250, 250, 250);
      textAlign(CENTER, CENTER)
      text(colleges[i].links[j].G,xaxis,yaxis);
      pop();
    }
  }
  push();
  strokeWeight(0);
  for (let i = 0; i < colleges.length; i++) {
    stroke(1);
    textAlign(CENTER, CENTER)
    ellipse(colleges[i].axis[0], colleges[i].axis[1], size, size);
    text(colleges[i].name, colleges[i].axis[0], colleges[i].axis[1]);
  }
  pop();
  noLoop();
}