from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/neighborhood')
def get_neighborhood():
    query = request.args.get('name', '').strip()
    if not query:
        return jsonify({"error": "No neighborhood provided"}), 400

    wiki_api_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query.replace(' ', '_')}"

    try:
        response = requests.get(wiki_api_url)
        if response.status_code == 404:
            return jsonify({"error": "Neighborhood not found on Wikipedia"}), 404

        data = response.json()

        return jsonify({
            "title": data.get("title", query),
            "summary": data.get("extract", "No summary available."),
            "thumbnail": data.get("thumbnail", {}).get("source", ""),
            "wikipedia_url": data.get("content_urls", {}).get("desktop", {}).get("page", "")
        })

    except Exception as e:
        print("Wikipedia API error:", e)
        return jsonify({"error": "Failed to fetch data from Wikipedia"}), 500



if __name__ == '__main__':
    app.run(debug=True)