document.addEventListener("DOMContentLoaded", function () {
  // --- Expenditure Preference ---
  const expForm = document.getElementById("expenditure-form");
  if (expForm) {
    expForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const expValue = document.getElementById("preference").value;
      if (expValue < 0 || expValue > 100) {
        alert("Please enter a valid percentage between 0 and 100.");
        return;
      }
      localStorage.setItem("expenditurePreference", expValue);
      updateExpenditureDisplay();
      alert("Expenditure preference saved as " + expValue + "%");
    });
    // On load, update expenditure display
    const savedExp = localStorage.getItem("expenditurePreference");
    if (savedExp) {
      document.getElementById("preference").value = savedExp;
      updateExpenditureDisplay();
    }
  }
 
  // --- Dynamic Goal Addition ---
  const goalForm = document.getElementById("goal-form");
  if (goalForm) {
    goalForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const goalName = document.getElementById("goal-name").value;
      const goalAmount = document.getElementById("goal-amount").value;
      const goalList = document.getElementById("goal-list");
      if (goalList) {
        const li = document.createElement("li");
        li.textContent = goalName + ": " + goalAmount;
        goalList.appendChild(li);
      }
      goalForm.reset();
    });
  }
 
  // --- User Preferences (Gold & Mutual Fund) ---
  const prefForm = document.getElementById("preference-form");
  if (prefForm) {
    prefForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const goldPref = document.getElementById("gold-preference").value;
      const mfPref = document.getElementById("mf-preference").value;
      localStorage.setItem("goldPreference", goldPref);
      localStorage.setItem("mfPreference", mfPref);
      updatePreferenceList();
      alert("Preferences saved: Gold - " + goldPref + "%, Mutual Fund - " + mfPref + "%");
      prefForm.reset();
      updateGoldPreferenceDisplay();
      updateMfPreferenceDisplay();
    });
    // On load, populate saved values if they exist
    const savedGoldPref = localStorage.getItem("goldPreference");
    const savedMfPref = localStorage.getItem("mfPreference");
    if (savedGoldPref) {
      document.getElementById("gold-preference").value = savedGoldPref;
    }
    if (savedMfPref) {
      document.getElementById("mf-preference").value = savedMfPref;
    }
    updatePreferenceList();
  }
 
  // --- Gold Calculator on Gold Page ---
  const goldForm = document.getElementById("gold-form");
  if (goldForm) {
    goldForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("gold-amount").value);
      const goldPrice = 77.7; // Gold price per unit
      if (!isNaN(amount)) {
        const units = amount / goldPrice;
        document.getElementById("gold-result").textContent =
          "You can buy " + units.toFixed(2) + " units of gold.";
      } else {
        document.getElementById("gold-result").textContent =
          "Please enter a valid amount.";
      }
    });
    updateGoldPreferenceDisplay();
  }
 
  // --- Functions to update displays ---
  function updateExpenditureDisplay() {
    const expDisplay = document.getElementById("expenditure-display");
    const savedExp = localStorage.getItem("expenditurePreference");
    if (expDisplay) {
      expDisplay.textContent = savedExp
        ? "Saved Expenditure Preference: " + savedExp + "%"
        : "";
    }
  }
 
  function updatePreferenceList() {
    const prefList = document.getElementById("preference-list");
    if (prefList) {
      prefList.innerHTML = "";
      const savedGoldPref = localStorage.getItem("goldPreference");
      const savedMfPref = localStorage.getItem("mfPreference");
      if (savedGoldPref) {
        const liGold = document.createElement("li");
        liGold.textContent = "Gold Preference: " + savedGoldPref + "%";
        prefList.appendChild(liGold);
      }
      if (savedMfPref) {
        const liMf = document.createElement("li");
        liMf.textContent = "Mutual Fund Preference: " + savedMfPref + "%";
        prefList.appendChild(liMf);
      }
    }
  }
 
  function updateGoldPreferenceDisplay() {
    const goldPrefDisplay = document.getElementById("gold-preference-display");
    const savedGoldPref = localStorage.getItem("goldPreference");
    if (goldPrefDisplay) {
      goldPrefDisplay.textContent = savedGoldPref
        ? "Your Gold Preference: " + savedGoldPref + "%"
        : "Gold Preference not set.";
    }
  }
 
  function updateMfPreferenceDisplay() {
    const mfPrefDisplay = document.getElementById("mf-preference-display");
    const savedMfPref = localStorage.getItem("mfPreference");
    if (mfPrefDisplay) {
      mfPrefDisplay.textContent = savedMfPref
        ? "Your Mutual Fund Preference: " + savedMfPref + "%"
        : "Mutual Fund Preference not set.";
    }
  }
});