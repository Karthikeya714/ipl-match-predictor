# 🏏 IPL Match Winner Predictor

A machine learning web application that predicts IPL match winners based on team matchups and venue. Built with Flask backend and vanilla JavaScript frontend.


## ✨ Features

- **Machine Learning Predictions**: Random Forest classifier trained on historical IPL data
- **Confidence Scoring**: Shows prediction confidence percentage 
- **Low Confidence Warnings**: Alerts when predictions are below 50% confidence
- **Team Logos Display**: Visual team representation with official IPL logos
- **Home Advantage Detection**: Identifies when teams play at home venues
- **Match Summary Card**: Shows team matchup with venue and advantage info
- **Responsive Design**: Modern glassmorphism UI that works on all devices
- **Input Validation**: Prevents invalid team selections and missing data
- **Error Handling**: Graceful error messages for server issues

## 🏟️ Supported Teams

- Chennai Super Kings
- Mumbai Indians  
- Royal Challengers Bangalore
- Kolkata Knight Riders
- Delhi Capitals
- Sunrisers Hyderabad
- Rajasthan Royals
- Kings XI Punjab
- Gujarat Titans
- Lucknow Super Giants

## 📍 Supported Venues

- MA Chidambaram Stadium, Chepauk, Chennai
- Wankhede Stadium, Mumbai
- Dubai International Cricket Stadium
- Sharjah Cricket Stadium
- Narendra Modi Stadium, Ahmedabad
- Arun Jaitley Stadium, Delhi
- Eden Gardens, Kolkata
- M Chinnaswamy Stadium, Bengaluru
- Rajiv Gandhi International Stadium, Uppal, Hyderabad
- Sawai Mansingh Stadium, Jaipur
- Punjab Cricket Association IS Bindra Stadium, Mohali, Chandigarh
- Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow

## 🚀 Installation & Setup

### Prerequisites
- Python 3.7+
- Required Excel file: `Ipl match data - enriched.xlsx`

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karthikeya714/ipl-match-predictor.git
   cd ipl-match-predictor
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the model** (requires IPL data Excel file)
   ```bash
   python train_model.py
   ```
   This creates `winner_predictor.pkl` with the trained model.

4. **Start the Flask server**
   ```bash
   python app.py
   ```
   Server runs on `http://127.0.0.1:5000`

5. **Open the frontend**
   Open `index.html` in your browser

## 📁 Project Structure

```
ipl-match-predictor/
├── app.py                          # Flask API server
├── train_model.py                  # Model training script  
├── winner_predictor.pkl            # Trained model (generated)
├── index.html                      # Main frontend page
├── style.css                       # UI styling
├── script.js                       # Frontend JavaScript
├── requirements.txt                # Python dependencies
└── Ipl match data - enriched.xlsx  # Training data (required)
```

## 🔧 API Usage

### Prediction Endpoint

**POST** `/predict`

**Request:**
```json
{
  "team1": "Chennai Super Kings",
  "team2": "Mumbai Indians", 
  "venue": "Wankhede Stadium, Mumbai"
}
```

**Success Response:**
```json
{
  "winner": "Mumbai Indians",
  "confidence": 67.5,
  "low_confidence": false
}
```

**Error Response:**
```json
{
  "error": "Missing input"
}
```

### Input Validation
- Teams must be different
- All fields (team1, team2, venue) are required
- Teams and venues must match supported options

## 🤖 Model Details

**Training Process:**
1. Loads IPL match data from Excel file
2. Filters to first 2 innings only
3. Groups runs by match, inning, and batting team
4. Creates winner based on higher run total
5. Uses one-hot encoding for teams and venues
6. Trains Random Forest classifier

**Model Input:** Team1, Team2, Stadium (one-hot encoded)
**Model Output:** Winning team prediction with probability scores

## 🎨 Frontend Features

**UI Components:**
- Team selection dropdowns
- Venue selection dropdown  
- Prediction button with loading state
- Results display with confidence
- Match summary card with team logos
- Home advantage indicator

**Visual Design:**
- Glassmorphism effect with backdrop blur
- Gradient backgrounds and text effects
- Smooth animations and hover effects
- Mobile-responsive layout
- Team logo integration

**User Experience:**
- Form validation before submission
- Loading states during prediction
- Error message display
- Low confidence warnings
- Match summary with visual team info

## 📊 Data Requirements

The Excel file should contain:
- `match_id`: Unique identifier for each match
- `inning`: Inning number (1 or 2)
- `batting_team`: Name of batting team
- `runs_total`: Total runs scored
- `stadium`: Venue name

## ⚠️ Error Handling

**Backend:**
- Missing input validation
- Duplicate team detection
- Exception catching with error messages
- CORS enabled for cross-origin requests

**Frontend:**
- Network error handling
- Server error display
- Input validation
- Loading state management

## 🛠️ Dependencies

**Backend (Python):**
- Flask - Web framework
- Flask-CORS - Cross-origin requests
- pandas - Data manipulation
- scikit-learn - Machine learning
- joblib - Model serialization

**Frontend:**
- Vanilla JavaScript (no frameworks)
- Google Fonts (Montserrat)
- Team logos from Wikipedia

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📞 Contact

Project Link: [https://github.com/Karthikeya714/ipl-match-predictor](https://github.com/Karthikeya714/ipl-match-predictor)

---

⭐ **Star this repo if you found it helpful!**
