from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import joblib
import pandas as pd
import json

app = Flask(__name__)
# CORS(app, support_credentials=True)


@app.route('/', methods=['POST'])
@cross_origin()
def home():
    build_dict = {}
    f = open('cols.json')
    data = json.load(f)

    pt = request.json.get('primary_type')
    ca = request.json.get('community_area')
    day = request.json.get('day')
    month = request.json.get('month')
    domestic = request.json.get('domestic')


    for i in data['column_names']:
        if 'Primary Type' in i:
            if pt in i:
                build_dict[i] = [1]
            else:
                build_dict[i] = [0]
        elif 'Community Area' in i:
            if ca in i:
                build_dict[i] = [1]
            else:
                build_dict[i] = [0]
        elif 'Day' in i:
            if day in i:
                build_dict[i] = [1]
            else:
                build_dict[i] = [0]
        elif 'Month' in i:
            if month in i:
                build_dict[i] = [1]
            else:
                build_dict[i] = [0]
        elif 'Domestic' in i:
            if domestic in i:
                build_dict[i] = [1]
            else:
                build_dict[i] = [0]
    df = pd.DataFrame.from_dict(build_dict)
    model = joblib.load('dt.joblib')
    pred = model.predict(df)
    return jsonify({'will_be_arrested': int(pred[0])})


@app.route('/getvalues', methods=['GET'])
@cross_origin()
def getvalues():
    f = open('cols.json')
    data = json.load(f)
    res = {
        "primary_type": [],
        "community_area": [],
        "day": [],
        "month": [],
        "domestic": []
    }
    for i in data['column_names']:
        if 'Primary Type' in i:
            res['primary_type'].append(i.split('_')[1])
        elif 'Community Area' in i:
            res['community_area'].append(i.split('_')[1])
        elif 'Day' in i:
            res['day'].append(i.split('_')[1])
        elif 'Month' in i:
            res['month'].append(i.split('_')[1])
        elif 'Domestic' in i:
            res['domestic'].append(i.split('_')[1])
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)