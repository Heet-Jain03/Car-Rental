// Initialize an empty array to store rental history
let rentalHistory = [];

// Function to set the correct image path
function setImageSource(carImage) {
    const carImageElement = document.getElementById('car-image');
    carImageElement.src = `./images/${carImage}`;  // Set the relative path for images
    carImageElement.onerror = function () {
        alert('Error: Image not found!');  // Handle error if image doesn't exist
        carImageElement.src = '';  // Reset image source if not found
    };
}

// Add event listener to show car image when car selection changes
document.getElementById('car-model').addEventListener('change', function () {
    const carImage = this.value.split(',')[2];  // Get the image filename
    setImageSource(carImage);  // Set the image source dynamically
    document.getElementById('car-image').classList.remove('hidden');  // Show the image
});

// Add event listener to handle damage selection change
document.getElementById('damage-selection').addEventListener('change', function () {
    const damageContainer = document.getElementById('damage-container');
    if (this.value === "Damage") {
        damageContainer.classList.remove('hidden');  // Show the damage input field
    } else {
        damageContainer.classList.add('hidden');  // Hide the damage input field
    }
});

// Handle form submission to show the selected car image along with other details
document.getElementById('rental-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const carModel = document.getElementById('car-model').value;

    // Check if a valid car is selected
    if (!carModel) {
        alert("Please select a car.");
        return;
    }

    const duration = parseInt(document.getElementById('duration').value);
    let damageCost = 0;

    // If damage is not "NA", get the damage cost from the input field
    if (document.getElementById('damage-selection').value === "Damage") {
        damageCost = parseFloat(document.getElementById('damage').value) || 0;
    }

    const licenseNumber = document.getElementById('license').value;

    // Validate inputs
    if (duration < 1 || damageCost < 0 || !licenseNumber) {
        alert("Please enter valid values for duration, damage cost, and driving license number.");
        return;
    }

    const carDetails = carModel.split(',');
    const carName = carDetails[0];
    const hourlyRate = parseFloat(carDetails[1]);
    const carImage = carDetails[2];  // Get the image filename
    const totalCost = (hourlyRate * duration) + damageCost;

    // Update the total cost display
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
    document.getElementById('result').classList.remove('hidden');

    // Update rental summary
    document.getElementById('car-summary').textContent = `Car Model: ${carName}`;
    document.getElementById('duration-summary').textContent = `Rental Duration: ${duration} hour(s)`;
    document.getElementById('damage-summary').textContent = `Damage Cost: ₹${damageCost.toFixed(2)}`;
    document.getElementById('rental-summary').classList.remove('hidden');

    // Set the car image in the result section
    setImageSource(carImage);  // Show the image using the same method
    document.getElementById('car-image').classList.remove('hidden');  // Show the image

    // Store the rental entry in history
    rentalHistory.push({
        car: carName,
        duration: duration,
        damageCost: damageCost,
        totalCost: totalCost,
        license: licenseNumber
    });

    document.getElementById('rental-form').reset(); // Reset the form after submission
});

// Reset button functionality
document.getElementById('reset-button').addEventListener('click', function () {
    document.getElementById('rental-form').reset();
    document.getElementById('result').classList.add('hidden');
    document.getElementById('rental-summary').classList.add('hidden');
    document.getElementById('car-image').classList.add('hidden');  // Hide the car image
    document.getElementById('damage-container').classList.add('hidden');  // Hide the damage input field
});

// History button functionality
document.getElementById('history-button').addEventListener('click', function () {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear previous history

    if (rentalHistory.length === 0) {
        historyList.innerHTML = '<li>No rental history available.</li>';
    } else {
        rentalHistory.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = `Car Model: ${entry.car}, Rental Duration: ${entry.duration} hour(s), Damage Cost: ₹${entry.damageCost.toFixed(2)}, Total Cost: ₹${entry.totalCost.toFixed(2)}, License: ${entry.license}`;
            historyList.appendChild(listItem);
        });
    }

    document.getElementById('history').classList.toggle('hidden'); // Toggle visibility of history
});
