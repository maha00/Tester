import os

from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
import json

app = Flask(__name__,static_folder='../frontend/dist/frontend')
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/login', methods=['POST'])
def login():
    user = request.json['username']
    password = request.json['password']  # Not checking password in this simple example
    return jsonify({'message': 'Logged in successfully', 'user': user})

def read_data():
    with open('data.json', 'r') as file:
        data = json.load(file)
    return data

def write_data(data):
    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/data', methods=['GET'])
def get_data():
    data = read_data()
    return jsonify(data)

@app.route('/add_data', methods=['POST'])
def add_data():
    try:
        new_entry = request.json
        data = read_data()
        data.append(new_entry)
        write_data(data)
        return jsonify({'status': 'success', 'data': new_entry}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/update_data', methods=['POST'])
def update_data():
    try:
        updated_info = request.json
        data = read_data()
        for item in data:
            if item['date'] == updated_info['date'] and item['heure'] == updated_info['heure']:
                item.update(updated_info)
                write_data(data)
                return jsonify({'status': 'success', 'data': updated_info})
        return jsonify({'status': 'error', 'message': 'Item not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
