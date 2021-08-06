// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("../data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;

  // Slice the first 10 objects for plotting
  data = data.slice(0, 10);

  // Reverse the array due to Plotly's defaults
  data = data.reverse();

  // Trace1 for the Greek Data
  var bar_data = {
    x: data.map(row => row.sample_values),
    y: data.map(row => row.otu_ids),
    text: data.map(row => row.otu_labels),
    type: "bar",
    orientation: "h"    
  };

  var bar_layout = {
    title: 'Top 10 Bacteria Culters Found'
  };

//  // Plot the bar chart
// Plotly.newPlot("bar", bar_data, layout);

  var bubble_data = {
    x: data.map(row => row.id),
    y: data.map(row => row.sample_values),
    text: data.map(row => row.otu_labels),
    type: 'bubble',
};

  var bubble_layout = {
    title: {title: 'Bacteria Cultures Per Sample'},
    xaxis: 'OTU Id'
};


// Plotly.plot("bubble", bubble_data, LayoutBubble);
});


//type: "bar"
//orientation: "h"
//xaxis: sample_values
//yaxis: otu_ids

// d3.json("data/samples.json").then((importedData)
//     console.log(importedData);


// Fetch the JSON data and console log it
// d3.json("data/samples.json").then((data))
//     console.log(data);
//   });
  
  // Promise Pending
//   const dataPromise = d3.json("data/samples.json");
//   console.log("Data Promise: ", dataPromise);

// Plotly.newPlot("bar-plot", data, layout);

function init(){
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
   
    d3.json("../data/samples.json").then((importedData) => {
        console.log(importedData);
        var data = importedData;
     //get all id
        var ids = data.names;

        ids.forEach(id=>{
            dropdownMenu.append('option').text(id).property("value", id)
        })
    });

}
function optionChanged(id){
    console.log(id);
}

// Initialize the dashboard
init();

