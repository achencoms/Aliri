var input = document.getElementById("Message")
var button = document.getElementById("Send")
var display = document.getElementById("display")

document.getElementById("Message")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("Send").click();
    }
});

function postDATA(x) {
  $.ajax({
    type: "GET",
    url: "/process",
    data: {'input' : x},
    success: function(d){
      d = JSON.parse(d);
      responsiveVoice.speak(d['out'], "US English Female");
      display.innerHTML += '<div class="media">'
      display.innerHTML += '<div class="media-body">'
      display.innerHTML += '<h4 class="text-left text-primary"> User </h4>'
      display.innerHTML += '<p class="text-left">' + x + '</p>'
      display.innerHTML += '</div></div>'

      display.innerHTML += '<div class="media">'
      display.innerHTML += '<div class="media-body">'
      display.innerHTML += '<h4 class="text-right text-success"> Bot </h4>'
      if(d['out'].includes('http')){
        var img = document.createElement("img");
        img.src = d['out'];
        img.className = "img-responsive float-right";
        img.style = "width: 100%;";
        display.appendChild(img);
      }
      else{
        display.innerHTML += '<p class="text-right">' + d['out'] + '</p>'
      }
      display.innerHTML += '</div></div>'
      document.getElementById("Message").value = ""
    }
  });
}



button.onclick = function() {
  var value = input.value
  if (value != "") {
    postDATA(value);
  }
}
