// Build the metadata panel
function buildMetadata(sampleNum) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
      let metadata = data.metadata;
    

    // Filter the metadata for the object with the desired sample number
      filterMetadata = metadata.filter(metadataObj => metadataObj.id == sampleNum)[0];

      // console.log(filterMetadata);
 

    // Use d3 to select the panel with id of `#sample-metadata`

      let panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
      panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let key in filterMetadata) {
      console.log(`${key}: ${filterMetadata[key]}`);
      panel.append("p").text(`${key}: ${filterMetadata[key]}`);
    }
  });
}

// function to build both charts
function buildCharts(sampleNum) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesData = data.samples;

    // Filter the samples for the object with the desired sample number
    filterSamplesData = samplesData.filter(samplesDataObj => samplesDataObj.id == sampleNum)[0];

      console.log(filterSamplesData);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filterSamplesData.otu_ids;
    let otu_labels = filterSamplesData.otu_labels;
    let sample_values = filterSamplesData.sample_values;
    

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };

    let bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      margin: { t: 50 }
    };
    bubbleChartData = [bubbleTrace]
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleChartData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let mappedOtuIds = otu_ids.map(otu_id => `OTU ${otu_id}`);
    

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let slicedOtuIdData = mappedOtuIds.slice(0, 10);
    let yticks = slicedOtuIdData.reverse();
    let barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      margin: { t: 30, l: 120 }
    };
    barChartData = [barTrace]

    // Render the Bar Chart
    Plotly.newPlot('bar', barChartData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let namesData = data.names;
    // console.log(namesData);
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for(let i=0; i< namesData.length; i++){
      // console.log(i,namesData[i])
      dropdown.append("option").text(namesData[i]).property("value", namesData[i]);

  }

    // Get the first sample from the list
      let firstSample = namesData[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Call optionChanged() when a change event takes place
d3.selectAll("#selDataset").on("change", function() {
  // Get the selected value from the dropdown
  let newSample = d3.select(this).property("value");
  
  // Call optionChanged with the new sample value
  optionChanged(newSample);
});

// Function for event listener
// This function receives the selected sample as a parameter
function optionChanged(newSample) { 
  // Build charts and metadata panel with the selected sample
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
