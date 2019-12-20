# Is humanity's gluttony killing the planet?

# Abstract
With rising life expectancies and a rapid increase in population across the globe, it is getting harder for humanity to sustain its nutritional needs. The inefficient upscale of food production is having a noticeable negative impact on the planet. Deforestation, increased livestock farming, and the excessive use of fertilisers, which are all related to food production, are the main causal factors behind rising emissions in greenhouse gasses and consequently, global warming. In an effort to further the advancements in battling climate change, we aim to reveal how food production and its necessary resources have evolved, and the relation to global warming. We will do so by carrying out an analysis of the data published by the Food and Agriculture Organization of the United Nations ([FAOSTAT](http://www.fao.org/faostat/en/#home)). We believe that by doing so, we could potentially increase general public awareness of this topic and compel people to keep the stated issue in mind when acting as consumers.

# Research questions
1. How has the world recenlty evolved in terms of factors that are relevant to agriculture and climate change (agricultural activity, CO2 emissions, deforestation, etc.)?
2. What are the most popular food types and their relative impact on CO2 emissions?
3. Are there any trends in the production of different food types and their efficiency in terms of CO2 emissions?
4. What countries are the most/least efficient in terms of meeting their nutritional needs?
5. How do countries collaborate in order to meet these needs?

# Dataset
We will be using the provided [Global Food & Agriculture Statistics](https://www.kaggle.com/unitednations/global-food-agriculture-statistics) dataset. Since the dataset on Kaggle is already in a nice format and mostly cleansed, we did not  perform much pre-processing on the data. Additionally, we re-extracted the FAOSTAT datasets directly from their website in certain cases as the copies provided on Kaggle were not up to date. Alternatively, information about minor cleaning is included in the notebook. Additionally, as the original dataset on kaggle included a wide variety of data we narrowed it down to the following in order to answer our research questions:
- Trade Detail Data
- Population Data
- Land Use Data
- Food Balance Data
- Fertilizer Data
- Crops Data
- Temperature Change Data
- Emissions Data

For more details check the `/data` folder.

# A list of internal milestones up until project milestone 2
* 21.10
    - [x] Download the datastets
    - [x] Set up the repository
    - [x] First look at the data
    - [x] Prepare deliverables for milestone 1
* 28.10
    - [x] Clean up data
    - [x] Exploratory data analysis
* 04.11
    - [x] Clean up data
    - [x] Exploratory data analysis
    - [x] Fix data-driven statistics
    - [x] Find relevant ways to communicate these statistics
* 11.11
    - [x] Exploratory data analysis
    - [x] Fix data-driven statistics
    - [x] Find relevant ways to communicate these statistics
* 18.11
    - [x] Final tweaks
    - [x] Clean-up repo
* 25.11
    - [x] Hand-in milestone 2
  

# Plans for milestone 3
As we have already performed thorough analyses in milestone 2, we plan to bring the data story to life in milestone 3 by including interactive plots and tying everything together in a coherent way. Additionally, we plan to complement our work done so far with some predictive and classification/clustering analyses . These will include: classifying countries based on their behaviours with respect to their use of resources and planet awareness; clustering together countries that relie on the same share of the world's resources.

# A list of internal milestones for milestone 3
* 02.12
    - [x] Convert plots to javascript
    - [x] ML clustering of countries
    - [x] Build Data Story flow
* 09.12
    - [x] Convert plots to javascript
    - [x] Write Data Story
* 16.12
    - [x] Convert plots to javascript
    - [x] Write Data Story
    
# Group member contributions:
- Ivan: Developing the data story website and presentation
- Tim: Plotting graph during data analysis and data analysis
- Timur: Problem formulation, premilinary data analysis and writing up the data story
- Thomas: Applied data analysis and writing up the data story
