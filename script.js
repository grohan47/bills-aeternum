// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Gold Calculator Logic
    const goldForm = document.getElementById('gold-form');
    if (goldForm) {
      goldForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('gold-amount').value);
        // Assume a fixed gold price per unit (77.7 per unit)
        const goldPricePerUnit = 77.7;
        const goldUnits = amount / goldPricePerUnit;
        document.getElementById('gold-result').textContent =
          `You can buy ${goldUnits.toFixed(2)} units of gold.`;
      });
    }
   
    // Dynamic Goal Addition
    const goalForm = document.getElementById('goal-form');
    if (goalForm) {
      goalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const goalName = document.getElementById('goal-name').value;
        const goalAmount = document.getElementById('goal-amount').value;
        const goalList = document.getElementById('goal-list');
        const li = document.createElement('li');
        li.textContent = `${goalName}: ${goalAmount}`;
        goalList.appendChild(li);
        goalForm.reset();
      });
    }
  });