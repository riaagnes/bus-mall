'use strict';
//alert('hii');
var previousIndex1;
var previousIndex2;
var previousIndex3;


var allImages=[];
var totalClicks=0;

function Image(filepath,name){
  this.filepath =filepath;
  this.name=name;
  allImages.push(this);
  this.clickCount=0;
  this.noOfDisplay=0;
}
new Image('images/bag.jpg','Bag');
new Image('images/banana.jpg','Banana');
new Image('images/bathroom.jpg','Bathroom');
new Image('images/boots.jpg','Boots');
new Image('images/breakfast.jpg','Breakfast');
new Image('images/bubblegum.jpg','Bubblegum');
new Image('images/chair.jpg','Chair');
new Image('images/cthulhu.jpg','Cthulhu');
new Image('images/dog-duck.jpg','Dog-duck');
new Image('images/dragon.jpg','Dragon');
new Image('images/pen.jpg','Pen');
new Image('images/pet-sweep.jpg','Petsweep');
new Image('images/scissors.jpg','Scissors');
new Image('images/shark.jpg','Shark');
new Image('images/sweep.png','Sweep');
new Image('images/tauntaun.jpg','Tauntaun');
new Image('images/unicorn.jpg','Unicorn');
new Image('images/usb.gif','Usb');
new Image('images/water-can.jpg','Water-can');
new Image('images/wine-glass.jpg','Wine-glass');


var image1 =document.getElementById('product1');
var image2 =document.getElementById('product2');
var image3 =document.getElementById('product3');
var finalResult=document.getElementById('results');
image1.addEventListener('click',randomImage);
image2.addEventListener('click',randomImage);
image3.addEventListener('click',randomImage);


function renderlist(){
  for(var i=0;i<allImages.length;i++){
    var liElement =document.createElement('li');
    liElement.textContent= allImages[i].name+' was shown '+ allImages[i].noOfDisplay+' times. It got '+allImages[i].clickCount+'votes';
    finalResult.appendChild(liElement);
  }
}

function randomImage(event){
  totalClicks++;
  if(event !== null){
    event.preventDefault();
    console.log(event.target.id);

    //if product is 1 them take the previous index of one and increment the click count of that allImage[prevou indiex 1]
    if(event.target.id ==='product1'){
      allImages[previousIndex1].clickCount++;
    }
    else if(event.target.id ==='product2'){
      allImages[previousIndex2].clickCount++;
    }
    else if(event.target.id ==='product3'){
      allImages[previousIndex3].clickCount++;
    }
  }

  var randomIndex =(Math.floor(Math.random()*6)+0);
  console.log(randomIndex);
  image1.src=allImages[randomIndex].filepath;
  image1.alt=allImages[randomIndex].name;
  previousIndex1 = randomIndex;
  allImages[previousIndex1].noOfDisplay++;

  var randomIndex2 =(Math.floor(Math.random()*7)+6);
  console.log(randomIndex2);
  image2.src=allImages[randomIndex2].filepath;
  image2.alt=allImages[randomIndex2].name;
  previousIndex2 = randomIndex2;
  allImages[previousIndex2].noOfDisplay++;

  var randomIndex3=(Math.floor(Math.random()*7)+13);
  console.log(randomIndex3);
  image3.src=allImages[randomIndex3].filepath;
  image3.alt=allImages[randomIndex3].name;
  previousIndex3 = randomIndex3;
  allImages[previousIndex3].noOfDisplay++;
  console.log(allImages);
  if(totalClicks>=2){
    image1.removeEventListener('click',randomImage);
    image2.removeEventListener('click',randomImage);
    image3.removeEventListener('click',randomImage);
    renderlist();
  }

}

randomImage(null);
