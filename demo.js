var names_dict={}
var graph_names=[]
var full_graph_names=[]

num=0

function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = document.getElementById("host").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + '</span><br/>';
    //document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';


    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, 8000, clientID);
    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = document.getElementById("mqtt_topic").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe(topic);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    
    i=document.getElementsByClassName('single_graphs')

    if (i.length>0){
        num+=1
        let message_json=JSON.parse(message.payloadString)
        for (let j=0,len=graph_names.length;j<len;j++){
            //console.log(full_graph_names)
            //console.log(full_graph_names[j])
            //console.log(message_json['Cylinder heating zone 5, actual value'])
            names_dict[graph_names[j]].push([num,message_json[full_graph_names[j].substring(1,full_graph_names[j].length-1)]])
            //console.log(message_json[full_graph_names[j].substring(1,full_graph_names[j].length-1)])
            //console.log(names_dict[graph_names[j]])
            renderGraph(d3.select("#graph"+j), names_dict[graph_names[j]])
        }
   }
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}

function startgraphs(){
    text=document.getElementById("messages").innerHTML.split('{')[1].split('}')[0]
    let re = new RegExp('\"[aA-zZ ,1-9-]+\"','g')
    found=text.match(re)
    //alert(found)
    //alert(text)

    for(let i=0, len=found.length;i<len-1;i++){
        document.getElementById("graphs").innerHTML += '<div class=single_graphs id=g'+i+'>'+found[i]+'</div><br/>'
        names_dict[found[i].split(',')[0].substring(1)]=[]
        //console.log(names_dict[found[i].split(',')[0].substring(1)])
        graph_names.push(found[i].split(',')[0].substring(1))
        full_graph_names.push(found[i])
        //console.log(graph_names)
        document.getElementById("g"+i).innerHTML += '<svg id=graph'+i+"></svg>"
        setupGraph(d3.select("#graph"+i), "Graph", "Time", ""+found[i].split(',')[0].substring(1));
        //this.getElementById('plot_graph') 
    }

    //for 
    //i=document.getElementsByClassName('single_graphs')
    //console.log(i)
}

// Whenever you update your dataset, call renderGraph() with the graph to update + updated dataset 
// example update + renderGraph call
//setInterval(function () {
    //for (let j=0,len=graph_names.length;j<len;j++){
  //renderGraph(d3.select("#graph"+j), names_dict[graph_names[j]]);
  //}
//}, 2000);