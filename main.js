song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scorerightWrist = 0;


function setup()
{ 
    canvas = createCanvas(600, 500); 
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide(); poseNet = ml5.poseNet(video, modelLoaded);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses); 

}
function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {

    circle(rightWristX,rightWristY,20);
    if(scorerightWrist > 0 && scorerightWrist <= 100)
    {
      document.getElementById("speed").innerHTML = "speed = 0.5";
      song.rate(0.5);
    }
    else if(scorerightWrist > 100 && scorerightWrist <= 200)
    {
      document.getElementById("speed").innerHTML = "speed = 1";
      song.rate(1);
    }
    else if(scorerightWrist > 200 && scorerightWrist <= 300)
    {
      document.getElementById("speed").innerHTML = "speed = 1.5";
      song.rate(1.5);
    }
    else if(scorerightWrist > 300 && scorerightWrist <= 400)
    {
      document.getElementById("speed").innerHTML = "speed = 2";
      song.rate(2);
    }
    if(scorerightWrist > 400 && scorerightWrist <= 500)
    {
      document.getElementById("speed").innerHTML = "speed = 2.5";
      song.rate(2.5);
    }
   }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume ;
    song.setVolume(volume);
    }

}

function preload()
{
    song = loadSound("music.mp3");
}

function modelLoaded()
{
    console.log( 'PoseNet Is Initialized' );
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scorerightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log( "scorerightWrist = " + scorerightWrist + "scoreLeftWrist = " + scoreLeftWrist );

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
  }
}

function play()
{
  song.play();
  song.setVolume(1);
  song.rate(1);
}