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
        //Speak only on Wolfram Short Answers
        if(d['check'] == 'poke'){}
        else if(!d['out'].includes('http')) responsiveVoice.speak(d['out'], "US English Female");
        display.innerHTML += '<div class="media">'
        display.innerHTML += '<div class="media-body">'
        display.innerHTML += '<h4 class="text-left text-primary"> User </h4>'
        display.innerHTML += '<p class="text-left">' + x + '</p>'
        display.innerHTML += '</div></div>'

        display.innerHTML += '<div class="media">'
        display.innerHTML += '<div class="media-body">'
        display.innerHTML += '<h4 class="text-right text-success"> Bot </h4>'

        if(d['check'] == 'poke'){
         console.log(d['ability']);

         //Creating Div to help expand floated objects
         var div = document.createElement("div");
         div.style = "width: 100%; height: auto;";
         div.className = "clearfix";

         //Adding sprite
         var sprite = document.createElement("img");
         sprite.style = "float: right;";
         sprite.src = d['sprite'];
         div.appendChild(sprite);

         //Create List and get Stats
         var list = document.createElement("ul");
         list.style = " list-style-type: none; background-color: white; text-align: right;";
         stats = d['out'];

         //Adding Pokemon Name to top of List
         var poke = document.createElement('li');
         poke.style.color = 'green';
         var upperName = d['in'].charAt(0).toUpperCase() + d['in'].slice(1);
         poke.appendChild(document.createTextNode(upperName + "'s Base Stats:"));
         list.append(poke);

         //inputting stats to list
         for(stat in stats){
           var s = document.createElement('li');
           var text = document.createTextNode(stat + ": " + stats[stat]);
           s.appendChild(text);
           list.appendChild(s);
         }

         //Adding Pokemon Ability
         var title = document.createElement('li');
         title.style.color = 'green';
         var ab = document.createElement('li');
         var text = document.createElement('li');
         text.style.color = 'green'
         var t = document.createTextNode(upperName + "'s Ability:");
         var name = document.createTextNode(d['ability']['name']);
         var desc = document.createTextNode(d['ability']['desc']);
         title.appendChild(t);
         ab.appendChild(name);
         text.appendChild(desc);
         list.appendChild(title);
         list.appendChild(ab);
         list.appendChild(text);

         //append to div
         display.append(div);
         display.appendChild(list);
        }
        //Image If Block
        else if(d['out'].includes('http')){
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

        //Reset Input
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
