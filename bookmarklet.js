javascript:
y   = document.getElementsByClassName("x")[0];
img = y.parentElement;
max_y = 0;
min_y = 0;
max_x = 0;
min_x = 0;
width = 500;

function getY(){
  y   = document.getElementsByClassName("x")[0];
  return parseInt(
    y.style["top"].split("px")[0]
  );
}
function getX(){
  x   = document.getElementsByClassName("y")[0];
  return parseInt(
    x.style["left"].split("px")[0]
  );
}
function getRelativeX(){
  return width - Math.ceil(width*1.00 * (getX() - min_x)/(max_x - min_x));
}
function getPercent(){
  return (1 - ((getY() * 1.0) / (min_y - max_y)));
}
document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  if(event.keyCode == 87){
    max_y = getY();
    max_x = getX();
  }else if (event.keyCode == 83){
    min_y = getY();
    min_x = getX();
  }

});

var div = document.createElement("div");
div.style["zIndex"] = 999999;
div.style["position"] = "fixed";
div.style["backgroundColor"] = "grey";
div.style["padding"] = "20px";
div.style["top"] = 0;

div.innerHTML = "<h3>Graph Information</h3>\n" +
                "<p>Locate your cursor in the top left of the graph(0, 1.0) and press W. Then in the bottom right and press S.</p><br \>" +
                "<label style='padding:5px;'>x:<input type='text' name='in-x' value='' /></label>" +
                "<label style='padding:5px;'>y:<input type='text' name='in-y' value='' /></label><br />" +
                "<label>actual width:<input type='text' name='x-width' value='' /></label><br />" +
                "<input style='background-color: lightgrey; border: 1px solid silver; border-radius: 5px;' type='submit' value='Adjust width' onclick='adjustWidth();' />" +
                "<input style='background-color: lightgrey; border: 1px solid silver; border-radius: 5px;' type='submit' value='Re-sync with graph' onclick='resync();' />";
function adjustWidth(){
  var w = document.getElementsByName("x-width")[0];
  width = w.value;
  return false;
}
function resync(){
  y   = document.getElementsByClassName("x")[0];
  img = y.parentElement;
  img.addEventListener("mousemove", function(){
      console.log("moving");
      x = document.getElementsByName("in-x")[0];
      y = document.getElementsByName("in-y")[0];
      x.value = getRelativeX();
      y.value = getPercent();
  });
  return false;
}
document.body.append(div);
img.addEventListener("mousemove", function(){
    console.log("moving");
    x = document.getElementsByName("in-x")[0];
    y = document.getElementsByName("in-y")[0];
    x.value = getRelativeX();
    y.value = getPercent();
});
