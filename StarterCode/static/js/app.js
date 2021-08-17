//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
function buildMetadata(sample) {
  d3.json("../data/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultsarray = metadata.filter(dataobject =>
      dataobject.id == sample);
    var result = resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

function buildCharts(sample) {

d3.json("../data/samples.json").then((data) => {
  var samples = data.samples;
  var resultsarray = samples.filter(dataobject =>
      dataobject.id == sample);
  var result = resultsarray[0]

  var otu_labels = result.otu_labels;
  var otu_ids = result.otu_ids;
  var values = result.sample_values;

  // BUILD BUBBLE CHART WITH SIZE ON VALUE
  var bubble_layout = {
    margin: { t: 0 },
    xaxis: { title: "OTU ID's by Value Size" },
    yaxis: { title: "Value of Sample Data"},
    hovermode: "closest",
    };

    var bubble_data = [ 
    {
      x: otu_ids,
      y: values,
      text: otu_labels,
      mode: "markers",
      marker: {
      color: otu_ids,
      size: values,
        }
    }
  ];
// Plot the bar chart
Plotly.newPlot("bubble", bubble_data, bubble_layout);

// BUILD BAR CHART WITH REVERSE ORDER
var bar_data = [
  {
    y: otu_ids.slice(0,10).map(otu_ids => `OTU ${otu_ids}`).reverse(),
    x: values.slice(0,10).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    type: "bar",
    orientation: "h"
  }
];

var bar_layout = {
  title: 'Top 10 Bacteria Culters Found'
};

// Plot the bar chart
Plotly.newPlot("bar", bar_data, bar_layout);
});
}

function init() {
// Grab a reference to the dropdown select element
var dropdownMenu = d3.select("#selDataset");
  
// Use the list of sample names to populate the select options
d3.json("../data/samples.json").then((data) => {
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    dropdownMenu
      .append("option")
      .text(sample)
      .property("value", sample);
  });
  
  // Use the first sample from the list to build the initial plots
  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
});
}
  
function optionChanged(newSample) {
// Fetch new data each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample);
}
  
// Initialize the dashboard
init();

//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//

// OLD CODE -- WORKING ON NEW CODE
// d3.json("../data/samples.json").then((importedData) => {
//     console.log(importedData);
//     var data = importedData;

//     var samples = data.samples;

//     var filtered = samples.filter(object => object.id == 940);
//     var result = filtered[0]

//     console.log(result.sample_values)

    // console.log("data")
    // console.log(data)

  // Slice the first 10 objects for plotting
  // samples = data.samples.slice(0, 10);

  // // Reverse the array due to Plotly's defaults
  // data = data.samples.reverse();

//   var bar_data = [
//     {
//       x: result.sample_values,
//       y: result.otu_ids,
//       text: result.otu_labels,
//       type: "bar",
//       orientation: "h"
//     }
//   ];

//   var layout = {
//     title: 'Top 10 Bacteria Culters Found'
//   };

// //  // Plot the bar chart
//   Plotly.newPlot("bar", bar_data, layout);

//   var bubble_data = {
//     x: data.map(row => row.id),
//     y: data.map(row => row.sample_values),
//     text: data.map(row => row.otu_labels),
//     type: 'bubble',
// };

//   var bubble_layout = {
//     title: {title: 'Bacteria Cultures Per Sample'},
//     xaxis: 'OTU Id'
// };


//   Plotly.newPlot("bubble", [bubble_data], bubble_layout);
// });


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

// OLD CODE
// function init(){
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     // Initialize an empty array for the country's data
   
//     d3.json("../data/samples.json").then((importedData) => {
//         console.log(importedData);
//         var data = importedData;
//      //get all id
//         var ids = data.names;

//         ids.forEach(id=>{
//             dropdownMenu.append('option').text(id).property("value", id)
//         })
//     });

// }
// function optionChanged(id){
//     console.log(id);
// }

// // Initialize the dashboard
// init();

