from flask import Flask, jsonify
from utils import get_all_buckets, get_all_objects, get_object_permissions
from flask_cors import CORS

app = Flask('__main__')
CORS(app)

@app.route('/buckets', methods=['GET'])
def get_buckets():
    buckets = get_all_buckets()
    return jsonify(buckets)

@app.route('/objects', methods=['GET'])
def get_objects():
    objects = get_all_objects()
    return jsonify(objects)

# @app.route('/permissions/<bucket_name>/<object_key>', methods=['GET'])
# def get_permissions(bucket_name, object_key):
#     permissions = get_object_permissions(bucket_name, object_key)
#     return jsonify(permissions)

@app.route('/permissions', methods=['GET'])
def get_all_permissions():
    permissions = get_object_permissions()
    return jsonify(permissions)


app.run()