from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

# Load neighborhoods from JSON file
with open('neighborhoods.json') as f:
    neighborhoods = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/neighborhood')
def get_neighborhood():
    query = request.args.get('name', '').lower()
    for n in neighborhoods:
        if n['name'].lower() == query:
            return jsonify(n)
    return jsonify({'error': 'Neighborhood not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)