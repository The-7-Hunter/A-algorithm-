const colleges = [
    { name: "Gate", axis: [333, 55], links: [{ index: 1, G: 1000 }, { index: 2, G: 1300 }], heurestic: 1500 }, // 0
    { name: "Economic", axis: [220, 90], links: [{ index: 0, G: 1000 }, { index: 3, G: 200 }, { index: 4, G: 250 }], heurestic: 1120 }, // 1
    { name: "Hosbital", axis: [446, 90], links: [{ index: 0, G: 1300 }], heurestic: 1060 }, // 2
    { name: "Pharmacy", axis: [150, 180], links: [{index: 1, G: 200},{index: 10, G: 210}], heurestic: 910 }, //3
    { name: "Sicence", axis: [310, 200], links: [{index: 1, G: 250},{index: 5, G: 250}], heurestic: 1250 },//4
    { name: "Engineering", axis: [410 , 240], links: [{index: 4, G: 250},{index: 6, G: 600},{index: 7, G: 300}], heurestic: 1250 },//5
    { name: "Preparatory", axis: [470, 320], links: [{index: 5, G: 600}], heurestic: 1440 },//6
    { name: "Sharia", axis: [330, 320], links: [{index: 5, G: 300},{index: 8, G: 350}], heurestic: 1140 },//7
    { name: "Arabic", axis: [500, 450], links: [{index: 7, G: 350},{index: 9, G: 450}], heurestic: 1030 },//8
    { name: "Danticity", axis: [330, 505], links: [{index: 8, G: 450},{index: 10, G: 120}], heurestic: 1500 },//9
    { name: "Medicine", axis: [170, 280], links: [{index: 3, G: 210},{index: 9, G: 120},{index: 11, G: 1300}], heurestic: 930 },//10
    { name: "Conference", axis: [170, 385], links: [{index: 10, G: 1300},{index: 12, G: 550}], heurestic: 445 },//11
    { name: "Computer", axis: [170, 500], links: [{index: 11, G: 550}], heurestic: 0 }//12
  ]

let path = [];
let visited = [];
let funcG = [];
let funcF= [];
let list = [];
let counter = 0;

function Astar(){
    funcG[0] = 0;
    funcF[0] = 0;
    assignFCost(0);
    list = [0];
    path[0] = [0];
    travel(0);
    console.log(path[12]);
    let arr = path[12];
    for(let i = 0; i < path[12].length; i++){
      if(i == arr.length - 1){
        break;
      }
      let xaxis = lerp(colleges[arr[i]].axis[0], colleges[arr[i+1]].axis[0],0.5);
      let yaxis = lerp(colleges[arr[i]].axis[1], colleges[arr[i+1]].axis[1],0.5);

     push();
     stroke(0, 250, 0);
     strokeWeight(10)
     line(colleges[arr[i]].axis[0], colleges[arr[i]].axis[1], colleges[arr[i + 1]].axis[0], colleges[arr[i + 1]].axis[1]);
     pop();
     textAlign(CENTER, CENTER);
     temp = findIndex(arr[i],arr[i+1]);
     text(colleges[arr[i]].links[temp].G,xaxis,yaxis);
    }
    for (let i = 0; i < colleges.length; i++) {
      push()
      strokeWeight(0)
      textAlign(CENTER, CENTER)
      ellipse(colleges[i].axis[0], colleges[i].axis[1], size, size);
      text(colleges[i].name, colleges[i].axis[0], colleges[i].axis[1]);
      pop()
    }
  }
function findIndex(y,x){
  for(let i = 0 ; i < colleges[y].links.length ; i++){
    if(colleges[y].links[i].index === x){
      return i
    }
  }
}
  function comp2Cities(from, to){
    let temp = funcG[from] + colleges[from].heurestic + colleges[from].links[to].G;
    if (temp < funcF[to]){
      funcF[to] = temp;
    }
  }

  function assignFCost(location){
    funcF[location] = funcG[location] + colleges[location].heurestic;
  }

  function assignGCost(from, to){
    funcG[colleges[from].links[to].index] = funcG[from] + colleges[from].links[to].G;
  }

  function assignPath(from, to){
   let arr = path[from];
    path[to] = [...arr,to];
  }

  function travel(currLoc){
    console.log(currLoc);
  // counter++;
  // if(counter == 20){
  //   // console.log(funcF);
  //   // console.log(funcG);
  //   // console.log(list);
  //   // console.log(visited);
  //   // console.log(path);
  //   return;
  // }
  visited.push(currLoc);
  if (currLoc == 12){
    return;
  }
  for(let i = 0; i < colleges[currLoc].links.length; i++){
    if(list.includes(colleges[currLoc].links[i].index)){
      comp2Cities(currLoc, i);
    }
    else {
      if(!visited.includes(colleges[currLoc].links[i].index)){
        assignPath(currLoc, colleges[currLoc].links[i].index);
      }
      list.push(colleges[currLoc].links[i].index);
      assignGCost(currLoc, i);
      assignFCost(colleges[currLoc].links[i].index);
    }
  }
  let ind = list.indexOf(currLoc);
  list.splice(ind, 1);
  let destination = list[0];

  for(let i = 0; i <= list.length; i++){
    if(funcF[list[i]] < funcF[destination]){
      destination = list[i];
    }
  }
  travel(destination);
  }