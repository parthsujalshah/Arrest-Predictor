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
The purpose of this application is to predict on the basis of the given circumstances, wether a criminal of a particular crime will be arrested or not. This information can be useful for the police since it can get the idea of how strong force will be required.

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
- Day
- Month

### PREPROCESSING
- Rename the column "Sales" to "Department"
- Combine "technical", "support", "IT" into "technical" department
- Create dummy variables for categorical variables ("Department" and "Salary")

### FEATURE SELECTION
Selecting the most important features using Recursive Feature Elimination (RFE) and Logistic Regression Model. The selected features are:
1. Satisfaction Level
2. Last Evaluation
3. Time Spent in the Company
4. Wether the employee has ever been in a Work Accident
5. Wether the employee has been promoted in the last 5 years
6. Department (Labelled as "Sales" in the dataset)
7. Salary

### NOVELTY: 
- **Optimization of Hyperparameters**
GridSearchCV is used to optimize the Hyperparameters. The best parameters and the best estimator are:
![Best parameters & estimators](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/best_p_e.jpeg)

- **Development of a new/hybrid methodology**
First the most important features are extracted and then the model is trained.

### Model Generation
SVM is being used and a pickle file is generated

### ACCURACY
![Accuracy](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/accuracy.jpeg)

### CONFUSION MATRIX
![Confusion Matrix](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/confusion_matrix.jpeg)

### CLASSIFICATION REPORT
![Classification Report](https://github.com/parthsujalshah/Employee-Turnover/blob/main/images/classification_report.jpeg)

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
- Open the model_build.ipynb notebook.

### SAMPLE INPUTS
- For result "Employee Leaving":
    - Employee satisfaction: 20%
    - Time since last evaluation: 1
    - Time spent at company: 5
    - Department: Marketing
    - Salary: Low
    - Uncheck both the checkboxes


- For result "Employee Staying":
    - Employee satisfaction: 80%
    - Time since last evaluation: 4
    - Time spent at company: 10
    - Department: R and D
    - Salary: High
    - Check "promoted in the last 5 years box"