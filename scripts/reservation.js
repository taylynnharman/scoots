// Function that inputs rentalType based on click from Rental page

document.addEventListener('DOMContentLoaded', function () {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get rentalType from the URL
    var rentalType = getUrlParameter('rentalType');

    // Set the value of the rentalType input field
    document.getElementById('rentalType').value = rentalType;
});

// Function that keeps rental date span error free by keeping start and end date straight
    var startDateInput = document.getElementById('startDate');
    var endDateInput = document.getElementById('endDate');

    startDateInput.addEventListener('input', function () {
        endDateInput.min = startDateInput.value;
    });

// Function that estimates total cost
const url = "https://raw.githubusercontent.com/taylynnharman/wdd230/main/final/data/prices.json";

// async function getData() {
//   try {
//     console.log('calling');
//     const response = await fetch(url);
//     const data = await response.json();
//     console.table(data.rentals);
//     displayVehicles(data.rentals);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }
 
// getData();
// function calculateEstimatedTotal() {
//     // Get selected rentalType and rentalPeriod
//     var selectedRentalType = document.getElementById('rentalType').value;
//     var selectedRentalPeriod = document.getElementById('rentalPeriod').value;

//     // Find the corresponding vehicle in the JSON
//     var selectedVehicle = rentals.find(vehicle => vehicle.vehicle === selectedRentalType);

//     // Find the corresponding reservation title and price
//     var selectedReservation = selectedVehicle.reservation.find(option => option.title === selectedRentalPeriod);

//     // Calculate the estimated total
//     var estimatedTotal = selectedReservation.price;

//     // Display the estimated total
//     document.getElementById('total').textContent = 'Estimated Total: ' + estimatedTotal;
// }