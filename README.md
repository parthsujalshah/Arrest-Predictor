# Criminal Arrest Predictor


<!-- ### Live Link
[Live Link](https://employee-turnover-predictor.netlify.app/)

### INPUT OUTUT SCREENSHOTS
![sc1](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/Screenshot_110.png)
![sc2](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/Screenshot_111.png)
![sc2](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/Screenshot_112.png)
![sc4](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/Screenshot_114.png)
![sc5](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/Screenshot_115.png)
![sc6](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/Screenshot_116.png) -->

### INTRODUCTION
Arresting of criminals not only depend upon the criminal, but also depend upon other factors which influence the allotments of the police force. This application helps the police department by predicting wether the criminal will be arrested or not, based on the previous experience, considering certain circumstances.

### FLOW CHART OF METHODOLOGY
<!-- ![Methodology](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/methodology.jpg) -->

### USING THE APPLICATION
- The user fills a form displayed on the screen.
- The user clicks the "Submit" button.
- The result wether the criminal will be arrested or not will be made on the basis of the prediction.

**Note: Due to the free deployment, the first request (after clicking the submit button) may take time to respond.**

### DATASET
A CSV file having the following columns:
- Unnamed: 0
- ID
- Case Number
- Date
- Block
- IUCR
- Primary Type of the crime
- Description
- Location Description
- Arrest: wether the arrest was made or not
- Domestic: wether the crime was domestic or not
- Beat: Smallest police geographic area
- District
- Ward
- Community Area
- FBI Code
- Year
- Updated On
- Latitude
- Longitude
- Location

### PREPROCESSING
- Dropping Null value rows
- Keeping the first of all the duplicate entries
- Creating separate columns for the day of the week and the month
- Filtering out certain columns from the dataframe


### NOVELTY: 
- **Optimization of Hyperparameters**
GridSearchCV is used to optimize the Hyperparameters.


### Model Generation
DecisionTreeClassifier is being used

### ACCURACY
<!-- ![Accuracy](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/accuracy.jpeg) -->

### CONFUSION MATRIX
<!-- ![Confusion Matrix](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/confusion_matrix.jpeg) -->

### CLASSIFICATION REPORT
<!-- ![Classification Report](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/classification_report.jpeg) -->

### RUNNING THE APPLICATION LOCALLY
- Install python and node
- Clone the repo
- Go to the project root dir
- For python:
```bash
pip install -r requirements.txt
python app.py
```
- For node:
```bash
cd frontend/
npm install
npm start
```
### SAVING A NEW MODEL
- Open the model_generate.ipynb notebook.