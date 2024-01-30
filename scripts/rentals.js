const url = 'https://github.com/taylynnharman/scoots/blob/0acf2517d83aae784addde44ba6dcedabbfc46e6/data/rentals.json';
const rentalsContainer = document.querySelector('#rentals');

// Retrieve data from json file
async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.rentals);
    displayVehicles(data.rentals);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getData();

function createVehicleCard(rentalCategory, vehicle) {
  const div = document.createElement('div');
  div.classList.add('vehicle-card');

  const image = document.createElement('img');
  image.src = vehicle.image;
  image.alt = `${vehicle.vehicle} Image`;
  image.loading = 'lazy';
  image.width = '100';
  image.height = '200';

  const title = document.createElement('h3');
  title.textContent = vehicle.vehicle;

  const persons = document.createElement('p');
  persons.textContent = `Persons: ${vehicle.persons}`;

  const reservationPrices = vehicle.reservation.map(option => `${option.title}: ${option.price}`).join(', ');
  const reservation = document.createElement('p');
  reservation.textContent = `Max Reservation Prices: ${reservationPrices}`;

  const walkinPrices = vehicle.walkin.map(option => `${option.title}: ${option.price}`).join(', ');
  const walkin = document.createElement('p');
  walkin.textContent = `Max Walk-in Prices: ${walkinPrices}`;

  const reserveButton = document.createElement('button');
  reserveButton.textContent = 'Reserve';
  reserveButton.classList.add('primary-button');

  // Add an event listener to the reserve button
  reserveButton.addEventListener('click', function () {
    // Navigate to reservations.html and pass the rental type as a query parameter
    const rentalType = encodeURIComponent(rentalCategory.rentalType);
    window.location.href = `reservations.html?rentalType=${rentalType}`;
    console.log("rentaltype:", rentalType)
  });

  div.appendChild(image);
  div.appendChild(title);
  div.appendChild(persons);
  div.appendChild(reservation);
  div.appendChild(walkin);
  div.appendChild(reserveButton);

  return div;
}


function displayVehicles(rentals) {
  console.log('Data', rentals);
  rentalsContainer.innerHTML = '';
  rentals.forEach(rentalCategory => {
    const h2 = document.createElement('h2');
    h2.textContent = rentalCategory.rentalType;
    rentalsContainer.appendChild(h2);

    rentalCategory.vehicles.forEach(vehicle => {
      const vehicleCard = createVehicleCard(rentalCategory, vehicle);
      if (vehicleCard) {
        rentalsContainer.appendChild(vehicleCard);
      }
    });
  });
}
