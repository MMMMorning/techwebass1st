//-------------------functions of buttons --------------------//

//---------variable color is set to store the selected color by user and transfor to the drawing on the canvas
  var color;
  var colorList = [];

//function to get the color(for above two variables)
//for var color
  function getSelectedValue(name){
  var obj=document.getElementById(name);
  return obj.value;
  }

//for var colorList
  function allColor(name,list){
   var obj=document.getElementById(name);
   for(var i = 1; i < obj.options.length; i++){
     var aColor = obj.options[i].value;
     if(aColor != color){
        list.push(aColor);
   }
  }
}


  //---------------------the function of the second button: GO
  function gameStart(){

    color = getSelectedValue('selectC');

 //this if statement will inform the user to choose a color if they haven't
    if(color == "none"){
         alert("Oh, you forget to choose a color.");
    } else {
      // display the game canvas to the website
      var c=document.getElementById("canvasPlace");
      c.style.display="block";
    //then remove the button
    var inst=document.getElementById("instruction");
    inst.style.display="none";

     allColor('selectC',colorList);
     draw();
     interval = setInterval("draw()", time);
   }
 }


//-----------------------------------function for RESTART button
  function backSelect(){

    var c=document.getElementById("canvasPlace");
    c.style.display="none";

    var traget=document.getElementById("instruction");
    traget.style.display="block";

    //restart means number of caughtCir should back to 0 and life back to 5
    caughtCir=0;
    life = 5;

    colorList = [];
  }



//---------------------functions of canvas and its elements--------------------------------


    //a set of important varables and their setting
    var canvas = document.getElementById('canvasContainer');
    var context = canvas.getContext('2d');

   // define the circle
    var radius;
    var cx;
    var cy;
    var numOfCir = 1;

    var caughtCir = 0;
    var life = 5;



 // draw the circle so it appears onload
 function draw () {


 canvas.width = window.innerWidth*0.9;
 canvas.height = window.innerHeight*0.8;

 writeMessage(canvas, "");

 //drawing one with the right color:
 radius = 30 + Math.random()*25;
 cx = radius + (Math.random() * (canvas.width - 2*radius));
 cy = 0.1*canvas.height + radius + (Math.random() * (0.9*canvas.height - 2*radius));
 context.beginPath();//making sure here will only display the new drawing
 context.arc(cx, cy, radius, 0, 2 * Math.PI);
 context.fillStyle = 'black';
 context.fill();
 context.strokeStyle = color;
 context.stroke();

 wrongCir();


 }


 function wrongCir(){

    for(i=1; i<=numOfCir; i++){
    var r = 30 + Math.random()*25;
    var wx = radius + (Math.random() * (canvas.width - 2*radius));
    var wy = 0.1*canvas.height + radius + (Math.random() * (0.9*canvas.height - 2*radius));
    context.beginPath();//making sure here will only display the new drawing
    context.arc(wx, wy, r, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();

    var num = Math.floor(Math.random() * (colorList.length));
    context.strokeStyle = colorList[num];
    context.stroke();
    }
 }

//function to add text on canvas:
//indicating how many circles are caught and how many lives left
 function writeMessage(canvas) {
     context.clearRect(0, 0, canvas.width, 0.1*canvas.height);
     context.font = "24px  'Architects Daughter'";
     context.textAlign = "left";
     context.textBaseline = "top";
     context.fillStyle = 'white';
     //drawHeart(life);
     context.fillText("○ caught: " + caughtCir + "        ||        ♥ left： " + drawHeart(life)  , 0.4*canvas.width, 25);
 }


 function drawHeart(num){
 var hearts = [];
   for(i=0; i<num; i++){
     hearts.push(' ♥ ');
   }
   return hearts;
 }

var time =3000;
var interval;

//function to increase the hardness of the game
//the more circles are caught, the more and faster there will be:
 function level(){
   switch(caughtCir){
     case 10:
       numOfCir = 3;
       time = 2300;
       break;
     case 20:
       numOfCir = 5;
       time = 1800;
       break;
     case 30:
       numOfCir = 7;
       time = 1200;
       break;
    case 40:
       numOfCir = 12;
       time = 700;
       break;
    case 40:
       numOfCir = 16;
       time = 350;
       break;
   }
}




 // this method does not use "expensive" Math.sqrt
 function mouseIsInsideCircle(mouseX, mouseY, cx, cy, radius) {
     var dx = mouseX - cx;
     var dy = mouseY - cy;
     return (dx * dx + dy * dy <= radius * radius);
 }


 function getMousePos(canvas, evt) {
     var rect = canvas.getBoundingClientRect();
     return {
         x: evt.clientX - rect.left,
         y: evt.clientY - rect.top
     };
 }


 var mousePos;


 canvas.addEventListener('mousedown', function (evt) {


     var mousePos = getMousePos(canvas, evt);
     var mouseX = mousePos.x;
     var mouseY = mousePos.y;


     // if the circle is clicked
     if (mouseIsInsideCircle(mouseX, mouseY, cx, cy, radius)) {
       clearInterval(interval);
         // erase the canvas
         context.clearRect(0, 30, canvas.width, canvas.height);
         caughtCir ++;
         level();
         draw ();
         interval = setInterval("draw()",time);
     } else {  //if the play didn't clicked on the circle
       context.clearRect(0, 30, canvas.width, canvas.height);
       life --;
       if(life ==0){

         alert('game over!' + ' You caught ' + caughtCir + ' ○ !');
         backSelect();
     }
       else {
         draw ();
     }

     }

 }, false);
