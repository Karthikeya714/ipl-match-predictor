document.getElementById("predict-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const team1 = document.getElementById("team1").value;
  const team2 = document.getElementById("team2").value;
  const venue = document.getElementById("venue").value;
  const resultElem = document.getElementById("result");
  const summaryCard = document.getElementById("summary-card");
  const submitButton = this.querySelector("button");

  resultElem.innerHTML = "";
  summaryCard.classList.add("hidden");

  if (team1 === team2) {
    resultElem.textContent = "⚠️ Team 1 and Team 2 must be different.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Predicting...";

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team1, team2, venue }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    console.log("🔎 Server response:", data);

    if (data.winner) {
      const confidenceText = data.confidence !== undefined
        ? `(${data.confidence}% confidence)`
        : "(confidence unavailable)";
      resultElem.innerHTML = `🏆 Predicted Winner: ${data.winner} ${confidenceText}`;

      if (data.low_confidence) {
        const warning = document.createElement("p");
        warning.textContent = "⚠️ Low-confidence prediction. Please consider with caution.";
        warning.style.color = "#ffcc00";
        warning.style.fontWeight = "bold";
        warning.style.marginTop = "10px";
        resultElem.appendChild(warning);
      }

      showSummary(team1, team2, venue);
    } else {
      resultElem.textContent = data.error || "⚠️ Unexpected server response.";
    }
  } catch (err) {
    resultElem.textContent = `❌ ${err.message}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Predict";
  }
});

const teamLogos = {
  "Chennai Super Kings": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/345px-Chennai_Super_Kings_Logo.svg.png",
  "Mumbai Indians": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/345px-Mumbai_Indians_Logo.svg.png",
  "Royal Challengers Bangalore": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Royal_Challengers_Bengaluru_Logo.svg/320px-Royal_Challengers_Bengaluru_Logo.svg.png",
  "Kolkata Knight Riders": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/263px-Kolkata_Knight_Riders_Logo.svg.png",
  "Delhi Capitals": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Delhi_Capitals.svg/360px-Delhi_Capitals.svg.png",
  "Sunrisers Hyderabad": "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Sunrisers_Hyderabad_Logo.svg/390px-Sunrisers_Hyderabad_Logo.svg.png",
  "Rajasthan Royals": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/This_is_the_logo_for_Rajasthan_Royals%2C_a_cricket_team_playing_in_the_Indian_Premier_League_%28IPL%29.svg/345px-This_is_the_logo_for_Rajasthan_Royals%2C_a_cricket_team_playing_in_the_Indian_Premier_League_%28IPL%29.svg.png",
  "Kings XI Punjab": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Punjab_Kings_Logo.svg/255px-Punjab_Kings_Logo.svg.png",
  "Gujarat Titans": "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Gujarat_Titans_Logo.svg/375px-Gujarat_Titans_Logo.svg.png",
  "Lucknow Super Giants": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Lucknow_Super_Giants_IPL_Logo.svg/345px-Lucknow_Super_Giants_IPL_Logo.svg.png"
};

function isHomeAdvantage(team, venue) {
  const homeMap = {
    "Chennai Super Kings": "Chennai",
    "Mumbai Indians": "Mumbai",
    "Royal Challengers Bangalore": "Bengaluru",
    "Kolkata Knight Riders": "Kolkata",
    "Delhi Capitals": "Delhi",
    "Sunrisers Hyderabad": "Hyderabad",
    "Rajasthan Royals": "Jaipur",
    "Kings XI Punjab": "Mohali",
    "Gujarat Titans": "Ahmedabad",
    "Lucknow Super Giants": "Lucknow"
  };
  return venue.includes(homeMap[team]);
}

function showSummary(team1, team2, venue) {
  document.getElementById("team1-name").textContent = team1;
  document.getElementById("team2-name").textContent = team2;
  document.getElementById("team1-logo").src = teamLogos[team1];
  document.getElementById("team2-logo").src = teamLogos[team2];

  const homeAdv1 = isHomeAdvantage(team1, venue);
  const homeAdv2 = isHomeAdvantage(team2, venue);

  let matchType = "Neutral Ground";
  if (homeAdv1) matchType = `${team1} Home Advantage`;
  else if (homeAdv2) matchType = `${team2} Home Advantage`;

  document.getElementById("match-type").textContent = `🏠 ${matchType}`;
  document.getElementById("venue-summary").textContent = `📍 Venue: ${venue}`;
  document.getElementById("summary-card").classList.remove("hidden");
}
