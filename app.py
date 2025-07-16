from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Load trained model and columns
model, model_columns = joblib.load("winner_predictor.pkl")

@app.route("/")
def home():
    return "Welcome to the IPL Match Predictor API! Use the /predict endpoint."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        team1 = str(data.get('team1', '')).strip()
        team2 = str(data.get('team2', '')).strip()
        venue = str(data.get('venue', '')).strip()

        if not team1 or not team2 or not venue:
            return jsonify({"error": "Missing input"}), 400
        if team1 == team2:
            return jsonify({"error": "Team 1 and Team 2 must be different"}), 400

        input_df = pd.DataFrame([[team1, team2, venue]], columns=['team1', 'team2', 'stadium'])
        input_encoded = pd.get_dummies(input_df)

        for col in model_columns:
            if col not in input_encoded:
                input_encoded[col] = 0
        input_encoded = input_encoded[model_columns]

        probs = model.predict_proba(input_encoded)[0]
        predicted_winner = model.predict(input_encoded)[0]
        confidence = round(float(max(probs)) * 100, 2)
        low_conf = bool(confidence < 50)

        return jsonify({
            "winner": str(predicted_winner),
            "confidence": float(confidence),
            "low_confidence": low_conf
        })

    except Exception as e:
        print("❌ ERROR during prediction:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
