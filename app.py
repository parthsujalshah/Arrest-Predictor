from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
import json

from pandas.core.algorithms import mode

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def home():
    build_dict = {}
    f = open('cols.json')
    data = json.load(f)
    print(request.json)

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)