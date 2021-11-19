from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
import json

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def home():
    model = joblib.load('dt.joblib')
    build_dict = {}
    f = open('cols.json')
    data = json.load(f)

    pt = request.json.get('primary_type')
    ca = request.data.get('community_area')


    for i in data['column_names']:
        if 'Primary Type' in i:
            if pt in i:
                build_dict[f'Primary Type_{pt}'] = [1]
            else:
                build_dict[f'Primary Type_{pt}'] = [0]
        elif 'Community Area' in i:
            if ca in i:
                build_dict[f'Community Area_{ca}'] = [1]
            else:
                build_dict[f'Community Area_{ca}'] = [0]

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)