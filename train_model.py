import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load data
df = pd.read_excel("Ipl match data - enriched.xlsx", sheet_name="Sheet1")

# Filter first 2 innings only
df = df[df['inning'].isin([1, 2])]
df = df.dropna(subset=['batting_team', 'runs_total', 'stadium'])

# Sum runs by team in each match
innings = df.groupby(['match_id', 'inning', 'batting_team', 'stadium'])['runs_total'].sum().reset_index()

# Only keep matches with 2 innings
pivot = innings.pivot(index='match_id', columns='inning', values=['batting_team', 'runs_total'])
pivot.columns = ['team1', 'team2', 'runs1', 'runs2']
pivot = pivot.dropna()

# Re-attach venue
# Since stadium is repeated in both innings, we’ll just take the first occurrence
venue_map = df.groupby('match_id')['stadium'].first()
pivot['stadium'] = pivot.index.map(venue_map)

# Create target column
pivot['winner'] = pivot.apply(lambda x: x['team1'] if x['runs1'] > x['runs2'] else x['team2'], axis=1)

# Encode inputs
X = pivot[['team1', 'team2', 'stadium']]
y = pivot['winner']
X_encoded = pd.get_dummies(X)

# Train model
model = RandomForestClassifier()
model.fit(X_encoded, y)

# Save model and columns
joblib.dump((model, X_encoded.columns), 'winner_predictor.pkl')
print("✅ Model trained and saved with venue as input!")
