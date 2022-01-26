var names_dict={}
var graph_names=[]
var full_graph_names=[]

function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = document.getElementById("host").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + '</span><br/>';
    //document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';


    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, 8080, clientID);
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
    num=0
    if (i.length>0){
        num+=1
        message_json=JSON.parse(message.payloadString)
        for (let j=0,len=graph_names.length;j<len;j++){
            //
            console.log(full_graph_names[j])
            console.log(message_json["Cylinder heating zone 3, actual value"])
            //names_dict[graph_names[j]].push([message_json[full_graph_names[j]],num])
            //console.log(message_json[full_graph_names[j]])
            console.log(message_json)
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

    for(let i=0, len=found.length;i<len;i++){

            document.getElementById("graphs").innerHTML += '<div class=single_graphs>'+found[i]+'</div><br/>'
            names_dict[found[i].split(',')[0].substring(1)]=[]
            //console.log(names_dict[found[i].split(',')[0].substring(1)])
            graph_names.push(found[i].split(',')[0].substring(1))
            full_graph_names.push(found[i])
            //console.log(graph_names)
            //document.getElementsByClassName("single_graphs").innerHTML += '<span>'+names_dict[found[i]]+'</span><br/>'
            //this.getElementById('plot_graph') 
    }

    //for 
    //i=document.getElementsByClassName('single_graphs')
    //console.log(i)
}


function graph_draw(width,height){

    var dataset1 = [
        [1,1], [12,20], [24,36],
        [32, 50], [40, 70], [50, 100],
        [55, 106], [65, 123], [73, 130],
        [78, 134], [83, 136], [89, 138],
        [100, 140]
    ];

    // Step 3
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin, //300
        height = svg.attr("height") - margin //200

    // Step 4 
    var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
        yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);
        
    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    // Step 5
    // Title
    svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Line Chart');
    
    // X label
    svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Independant');
    
    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + height + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Dependant');

    // Step 6
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));
    
    g.append("g")
     .call(d3.axisLeft(yScale));
    
    // Step 7
    svg.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } )
    .attr("cy", function (d) { return yScale(d[1]); } )
    .attr("r", 3)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");

    // Step 8        
    var line = d3.line()
    .x(function(d) { return xScale(d[0]); }) 
    .y(function(d) { return yScale(d[1]); }) 
    .curve(d3.curveMonotoneX)
    
    svg.append("path")
    .datum(dataset1) 
    .attr("class", "line") 
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");

}