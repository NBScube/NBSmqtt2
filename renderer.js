const am = require("async-mqtt");
let client = null;
let enabled = false;
let topic = "";

document.getElementById("text").addEventListener("click", function(){
  if(enabled){
    client.unsubscribe(topic).then((result) => {
      enabled = false;
      console.log("Unsubed");
      client.end();
    })
    
  }
  else{
    if(document.getElementById("topic").value.trim == ""){
      document.getElementById("message").innerHTML = "Please enter a topic";
      return;
    }
    else if(document.getElementById("broker").value.trim == ""){
      document.getElementById("message").innerHTML = "Please enter a broker: tcp://example.com:1883";
      return;
    }
    client = am.connect(document.getElementById("broker").value);
    client.on("error", function(){
      document.getElementById("message").innerHTML = "Failed to connect";
    })
    client.on("message", function(topic, message){
      document.getElementById("text").innerHTML += "\n" + topic + ": " + message;
      document.getElementById("text").scrollTop = document.getElementById("text").scrollHeight
    });
    topic = document.getElementById("topic").value;
    client.subscribe(topic).then((result) => {
      enabled = true;
      console.log("subbed");
    })
  }
});