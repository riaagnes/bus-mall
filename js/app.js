'use strict';
//array to store all instances of image constructor
var allImages = [];

//array to keep track of previously displayed image
var lastDisplayed =[];


//for chart
var imageVotes = [];
var imageNames = [];
//click tracker

Pic.totalClicks =0;

//access the image from DOM
var rightImage = document.getElementById('product1');
var centerImage =document.getElementById('product2');
var leftImage = document.getElementById('product3');


//acess div element from the DOM
var sectionElement = document.getElementById('images');
//acess the li element form DOM
console.log(sectionElement);
var listElement = document.getElementById('results');


//constructor function

function Pic (filepath,name){
  this.name =name;
  this.filepath=filepath;
  this.timesDisplayed=0;
  this.votes=0;
  allImages.push(this);
  imageNames.push(this.name);
}

//make all image instances

new Pic('images/bag.jpg','Bag');
new Pic('images/banana.jpg','Banana');
new Pic('images/bathroom.jpg','Bathroom');
new Pic('images/boots.jpg','Boots');
new Pic('images/breakfast.jpg','Breakfast');
new Pic('images/bubblegum.jpg','Bubblegum');
new Pic('images/chair.jpg','Chair');
new Pic('images/cthulhu.jpg','Cthulhu');
new Pic('images/dog-duck.jpg','Dog-duck');
new Pic('images/dragon.jpg','Dragon');
new Pic('images/pen.jpg','Pen');
new Pic('images/pet-sweep.jpg','Petsweep');
new Pic('images/scissors.jpg','Scissors');
new Pic('images/shark.jpg','Shark');
new Pic('images/sweep.png','Sweep');
new Pic('images/tauntaun.jpg','Tauntaun');
new Pic('images/unicorn.jpg','Unicorn');
new Pic('images/usb.gif','Usb');
new Pic('images/water-can.jpg','Water-can');
new Pic('images/wine-glass.jpg','Wine-glass');

//randomImages();

//randomly display 3 pics.

function randomImages(){


  //generate 2 random indices
  var randomLeft = Math.floor(Math.random() * allImages.length);
  var randomCenter = Math.floor(Math.random() * allImages.length);
  var randomRight = Math.floor(Math.random() * allImages.length);


  while(randomLeft === randomCenter || lastDisplayed.includes(randomLeft) ||lastDisplayed.includes(randomRight)||lastDisplayed.includes(randomCenter)||randomCenter === randomRight||randomLeft === randomRight) {
    console.log('Duplicate was caught!');
    randomLeft = Math.floor(Math.random() * allImages.length);
    console.log(randomLeft);
    randomRight = Math.floor(Math.random() * allImages.length);
    console.log(randomRight);
    randomCenter = Math.floor(Math.random() * allImages.length);
    console.log(randomCenter);
  }

  //now pics are unique,display 3 on screen

  rightImage.src=allImages[randomRight].filepath;
  rightImage.alt=allImages[randomRight].name;

  centerImage.src=allImages[randomCenter].filepath;
  centerImage.alt=allImages[randomCenter].name;

  leftImage.src=allImages[randomLeft].filepath;
  leftImage.alt=allImages[randomLeft].name;

  //incrementing the no:of times it displayed

  allImages[randomLeft].timesDisplayed++;
  allImages[randomRight].timesDisplayed++;
  allImages[randomCenter].timesDisplayed++;

  //to keep track on previous image

  lastDisplayed[0]=randomLeft;
  lastDisplayed[1]=randomCenter;
  lastDisplayed[3]=randomRight;
}

function clickHandler(event){
  //increment clickCounter
  Pic.totalClicks++;

  //increment click on specific image

  for(var i =0;i<allImages.length;i++){
    if(event.target.alt === allImages[i].name){
      allImages[i].votes++;
    }
  }
  //check the click counter
  //if greater than 25 then end event listner, show list,update the votes per Images,show chart

  if(Pic.totalClicks>25){


    sectionElement.removeEventListener('click',clickHandler);

    //show list
    showResult();
    //update votes per Images
    updateVotes();

    //display chart
    renderChart();

  }
  else{
    randomImages();
  }
}
function showResult(){
  for(var i = 0; i<allImages.length;i++){
    // target/create li element
    var liElement = document.createElement('li');
    //content
    liElement.textContent=allImages[i].name + ' has ' + allImages[i].votes + ' votes was displayed ' + allImages[i].timesDisplayed;
    //append
    listElement.appendChild(liElement);

  }
}


function updateVotes(){
  for(var i = 0;i<allImages.length;i++){
    imageVotes[i]=allImages[i].votes;
  }
}

sectionElement.addEventListener('click', clickHandler);

randomImages();


function renderChart(){
  var context = document.getElementById('busmall-chart').getContext('2d');
  var arrayOfColors=['red','green','blue','yellow','gray','red','green','blue','yellow','gray','red','green','blue','yellow','gray','red','green','blue','yellow','gray','red','green','blue','yellow','gray'];
  new Chart(context, {
    type: 'bar',
    data: {
      labels:imageNames,
      datasets: [{
        label: 'Votes Per Images',
        data: imageVotes,
        backgroundColor: arrayOfColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}