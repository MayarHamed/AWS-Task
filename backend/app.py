from flask import Flask, jsonify
from utils import get_all_buckets, get_all_objects, get_object_permissions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def welcome():
    return 'Welcome!'

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

@app.errorhandler(Exception)          
def basic_error(e):          
    return "an error occured: " + str(e)

if __name__ == '__main__':
    app.run()