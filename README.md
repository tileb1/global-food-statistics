# Planet Cluedo: who is killing mother Earth?

Skip the boring part and jump straight into the [Datastory](https://planet-cluedo.netlify.com/)!

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
