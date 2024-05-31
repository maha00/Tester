import os

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
users_path = os.path.join(BASE_DIR, 'users.json')
data_path = os.path.join(BASE_DIR, 'data.json')
app = Flask(__name__, static_folder='../frontend/dist/frontend/browser')
CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/register', methods=['POST'])
def register():
    try:
        user_info = request.json
        data = read_users()
        if any(user['name'] == user_info['name'] for user in data):
            return jsonify({'status': 'error', 'message': 'nom deja existant'}), 409
        data.append(user_info)
        write_users(data)
        return jsonify({'status': 'success', 'message': 'Vous etes bien enregistre'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


def read_users():
    with open(users_path, 'r') as file:
        return json.load(file)


def write_users(data):
    with open(users_path, 'w') as file:
        json.dump(data, file, indent=4)


@app.route('/login', methods=['POST'])
def login():
    try:
        user_info = request.json
        username = user_info['username']
        password = user_info['password']
        users = read_users()
        # Check if the username exists and the password matches
        user = next((user for user in users if user['name'] == username and user['password'] == password), None)
        if user is not None:
            return jsonify({'message': 'Bienvenue ' + username, 'user': username})
        else:
            return jsonify({'status': 'error', 'message': 'Nom ou mot de passe incorrect'}), 401
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


def read_data():
    with open(data_path, 'r') as file:
        data = json.load(file)
    return data


def write_data(data):
    with open(data_path, 'w') as file:
        json.dump(data, file, indent=4)


@app.route('/data', methods=['GET'])
def get_data():
    data = read_data()
    return jsonify(data)
@app.route('/delete_data', methods=['POST'])
def delete_data():
    try:
        entry_to_delete = request.json
        data = read_data()
        data = [item for item in data if not (item['date'] == entry_to_delete['date'] and item['heure'] == entry_to_delete['heure'])]
        write_data(data)
        return jsonify({'status': 'success', 'message': 'Entry deleted successfully'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


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
