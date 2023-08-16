from flask import Flask, jsonify
from utils import get_all_buckets, get_all_objects, get_object_permissions, get_s3_client
from flask_cors import CORS
from flask import session, request
from flask_session import Session

import botocore
from datetime import timedelta

app = Flask(__name__)
CORS(app)
# app.secret_key = 'MayarsSecretKey'
app.config['SESSION_TYPE'] = 'filesystem' 
Session(app)

@app.route('/', methods=['GET'])
def welcome():
    return 'Welcome!'

@app.route('/login', methods=['POST'])
def login():    
    data = request.json
    session['aws_access_key_id'] = data.get('aws_access_key_id')
    session['aws_secret_access_key'] = data.get('aws_secret_access_key')
    s3 = get_s3_client()
    try:
        s3.list_buckets()
        return jsonify({'message': 'Logged in successfully'})
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == 'InvalidAccessKeyId':
            return jsonify({'error': 'Invalid AWS credentials'})
        else:
            return jsonify({'error': 'An error occurred'})


@app.route('/buckets', methods=['GET'])
def get_buckets():
    buckets = get_all_buckets()
    return jsonify(buckets)

@app.route('/objects', methods=['GET'])
def get_objects():
    objects = get_all_objects()
    return jsonify(objects)

@app.route('/permissions', methods=['GET'])
def get_all_permissions():
    permissions = get_object_permissions()
    return jsonify(permissions)

if __name__ == '__main__':
    app.run()