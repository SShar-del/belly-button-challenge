# belly-button-challenge

A project to build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site, which catalogs the microbes that colonize human navels.

The dataset revealed that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


## Acknowledgements

- Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.



## Features of the Interactive Dashboard

- Used the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

- Created a dropdown menu to select the OTUs with the first OTUs data on display on the landing page of the App.

- Displayed the sample's metadata, i.e., an individual's demographic information.

    - Looped through each key-value pair from the metadata JSON object and created a text string.
    - Appended an html tag with that text to the #sample-metadata panel.

- Created a horizontal bar chart to display the top 10 OTUs found in the individual selected from the dropdown menu.

  - Used sample_values as the values for the bar chart.
  - Used otu_ids as the labels for the bar chart.
  - Used otu_labels as the hovertext for the chart.

- Created a bubble chart to display each sample.

    - Used otu_ids for the x values.
    - Used sample_values for the y values.
    - Used sample_values for the marker size.
    - Used otu_ids for the marker colors.
    - Used otu_labels for the text values.

- Added functionality so that the Metadata updates when a new sample is selected.
 
- Successfully Deployed App to Github Pages.



