//-------------------functions of buttons --------------------//

//the function of the first button: NEXT
function toSelect(){

  var inst=document.getElementById("instruction");
  inst.style.display="none";

  var traget=document.getElementById("selectPage");
  traget.style.display="block";
 }



  // var starI = "★";
   var t = document.getElementById("selectC");
  // var starColor= "red";


  //the function of the second button: GO
  function gameStart(){

  //get the selected color
  //starColor= t.options[t.selectedIndex].value;

   // display the game canvas to the website
   var c=document.getElementById("canvasContainer");
   c.style.display="block";


 //then remove the button
  var traget=document.getElementById("selectPage");
  traget.style.display="none";

 }


// function getSelectedText(name){
// var obj=document.getElementById(name);
// for(i=0;i<obj.length;i++){
//    if(obj[i].selected==true){
//     return obj[i].innerText;      //关键是通过option对象的innerText属性获取到选项文本
//    }
// }
// }


  var canvas = document.getElementById('canvasContainer');
  var context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

 // define the circle
 // (we need this info for hit-testing later)
  var radius = 50;
  var cx = Math.random() * (canvas.width-2*radius);
  var cy = Math.random() * (canvas.height-2*radius);
  draw ();



 // draw the circle so it appears onload
 function draw () {
 context.beginPath();

 cx = Math.random() * (canvas.width*0.8);
 cy = Math.random() * (canvas.height*0.8);
 context.arc(cx, cy, radius, 0, 2 * Math.PI);
 context.fillStyle = "white";
 context.fill();

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


 canvas.addEventListener('mousemove', function (evt) {
     var mousePos = getMousePos(canvas, evt);
     var message = 'Mouse position: ' + parseInt(mousePos.x) + ' , ' + parseInt(mousePos.y);
     writeMessage(canvas, message);

 }, false);

 var caughtStar = 0;
 var mousePos;
 function writeMessage(canvas, message) {
     context.clearRect(0, 0, canvas.width, 0.1*canvas.height);
     context.font = "24px Helvetica";
     context.textAlign = "left";
     context.textBaseline = "top";
     context.fillStyle = 'white';
     context.fillText(message, 0.5*canvas.width, 25);
     context.fillText(caughtStar + ' stars are caught', 30, 25);
 }


 canvas.addEventListener('mousedown', function (evt) {

     var mousePos = getMousePos(canvas, evt);
     var mouseX = mousePos.x;
     var mouseY = mousePos.y;

     // if the mouse is inside the circle
     if (mouseIsInsideCircle(mouseX, mouseY, cx, cy, radius)) {
         // erase the canvas
         context.clearRect(0, 30, canvas.width, canvas.height);
         caughtStar ++;
         draw ();
     }


 }, false);
