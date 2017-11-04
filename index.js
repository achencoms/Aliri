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
    url: "/pythoncode",
    data: {param : x},
    sucess: function(d){
      d = JSON.parse(d);
      return d.PLACEHOLDERresponse;
    }
  });
}

button.onclick = function() {
  var value = input.value
  if (value != "") {

    display.innerHTML += '<div class="media">'
    display.innerHTML += '<div class="media-body">'
    display.innerHTML += '<h4 class="text-left text-primary"> User </h4>'
    display.innerHTML += '<p class="text-left">' + value + '</p>'
    display.innerHTML += '</div></div>'

    display.innerHTML += '<div class="media">'
    display.innerHTML += '<div class="media-body">'
    display.innerHTML += '<h4 class="text-right text-success"> Bot </h4>'
    display.innerHTML += '<p class="text-right">' + postDATA(value) + '</p>'
    display.innerHTML += '</div></div>'

    document.getElementById("Message").value = ""
  }
}
