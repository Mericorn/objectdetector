function back(){
    window.location = "index.html";
}
img = "";
statuss = "";
objects = [];
function preload(){
img=loadImage('PXL_20230221_234112626.jpg');
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw(){
    image(img, 0, 0, 380, 380);
    if(statuss !=""){
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "There are many objects(I'm not going to count that) from which the cocossd model has detected 2 objects"
            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    statuss = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}