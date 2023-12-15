const url = "../data/prices.json";
const rentalsContainer = document.querySelector('#rentals');

// Check viewport
function isMobileView() {
  const mediaQuery = window.matchMedia('(max-width: 600px)');
  
  if (mediaQuery.matches) {
    return true;
  } else {
    return false;
  }
}

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


if (isMobileView()) {
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
}

else{}
  // function createVehicleCard(rentalCategory, vehicle) {
  //   const div = document.createElement('div');
  //   div.classList.add('table-card');
    
  //   const table = document.createElement('table');
  //   table.classList.add('table');

  //   // Create the table header
    
  //   for (const key in vehicle) {

  //     const thead = document.createElement('thead');
  //     const headerRow = document.createElement('tr');
  //     headerRow.textContent = rentalCategory

  //   const image = document.createElement('img');
  //   image.src = vehicle.image;
  //   image.alt = `${vehicle.vehicle} Image`;
  //   image.loading = 'lazy';
  //   image.width = '100';
  //   image.height = '200';
  
  //   const title = document.createElement('h3');
  //   title.textContent = vehicle.vehicle;
  
  //   const persons = document.createElement('p');
  //   persons.textContent = `Persons: ${vehicle.persons}`;
  
  //   const reservationPrices = vehicle.reservation.map(option => `${option.title}: ${option.price}`).join(', ');
  //   const reservation = document.createElement('p');
  //   reservation.textContent = `Max Reservation Prices: ${reservationPrices}`;
  
  //   const walkinPrices = vehicle.walkin.map(option => `${option.title}: ${option.price}`).join(', ');
  //   const walkin = document.createElement('p');
  //   walkin.textContent = `Max Walk-in Prices: ${walkinPrices}`;
  
  //   const reserveButton = document.createElement('button');
  //   reserveButton.textContent = 'Reserve';
  //   reserveButton.classList.add('primary-button');
  
  //   // Add an event listener to the reserve button
  //   reserveButton.addEventListener('click', function () {
  //     // Navigate to reservations.html and pass the rental type as a query parameter
  //     const rentalType = encodeURIComponent(rentalCategory.rentalType);
  //     window.location.href = `reservations.html?rentalType=${rentalType}`;
  //     console.log("rentaltype:", rentalType)
  //   });
  
  //   div.appendChild(image);
  //   div.appendChild(title);
  //   div.appendChild(persons);
  //   div.appendChild(reservation);
  //   div.appendChild(walkin);
  //   div.appendChild(reserveButton);
  
  //   return div;
  // }



//   headerCells.forEach(cellText => {
//     const th = document.createElement('th');
//     th.textContent = cellText;
//     headerRow.appendChild(th);
//   });

//   thead.appendChild(headerRow);
//   table.appendChild(thead);

//   // Create the table body
//   const tbody = document.createElement('tbody');
//   vehicles.forEach(vehicle => {
//     const tr = document.createElement('tr');

//     const vehicleCell = document.createElement('td');
//     vehicleCell.textContent = vehicle.vehicle;
//     tr.appendChild(vehicleCell);

//     const personsCell = document.createElement('td');
//     personsCell.textContent = vehicle.persons;
//     tr.appendChild(personsCell);

//     const reservationCell = document.createElement('td');
//     const reservationPrices = vehicle.reservation.map(option => `${option.title}: ${option.price}`).join(', ');
//     reservationCell.textContent = reservationPrices;
//     tr.appendChild(reservationCell);

//     const walkinCell = document.createElement('td');
//     const walkinPrices = vehicle.walkin.map(option => `${option.title}: ${option.price}`).join(', ');
//     walkinCell.textContent = walkinPrices;
//     tr.appendChild(walkinCell);

//     tbody.appendChild(tr);
//   });

//   table.appendChild(tbody);

//   return table;
// }


function displayVehicles(rentals) {
  isMobileView();
  rentalsContainer.innerHTML = ''; 
  rentals.forEach(rentalCategory => {
        // Create a header to represent the rental type
        const h2 = document.createElement('h2');
        h2.textContent = rentalCategory.rentalType;
        rentalsContainer.appendChild(h2);
    // Assuming each rentalCategory has a 'vehicles' property
    rentalCategory.vehicles.forEach(vehicle => {
      const vehicleCard = createVehicleCard(rentalCategory, vehicle);
      if (vehicleCard) {
        rentalsContainer.appendChild(vehicleCard);
      }
    });
  });
}





// const h1 = document.createElement('h1');
// h1.textContent = 'Max Rental Pricing';

// const table = document.createElement('table');
// const thead



// <h1>Max Rental Pricing</h1>

//     <thead>
//         <tr>
//             <th>Rental Type</th>
//             <th>Max. Persons</th>
//             <th>Reservation</th>
//             <td>Half Day (3 hrs)</td>
//             <td>Full Day</td>
//             <th colspan="2 ">Walk-in</th>
//             <td>Half Day (3 hrs)</td>
//             <td>Full Day</td>

//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>Honda Metro Scooter</td>
//             <td>1</td>
//             <td>$20</td>
//             <td>$30</td>
//             <td>$25</td>
//             <td>$35</td>
//         </tr>
//         <tr>
//             <td>Honda Dio Scooter</td>
//             <td>2</td>
//             <td>$30</td>
//             <td>$40</td>
//             <td>$35</td>
//             <td>$45</td>
//         </tr>
//         <tr>
//             <td>Honda PCX150 Scooter</td>
//             <td>2</td>
//             <td>$40</td>
//             <td>$50</td>
//             <td>$45</td>
//             <td>$55</td>
//         </tr>
//         <tr>
//             <td>Honda Pioneer ATV</td>
//             <td>4</td>
//             <td>$50</td>
//             <td>$70</td>
//             <td>$60</td>
//             <td>$80</td>
//         </tr>
//         <tr>
//             <td>Jeep Wrangler - 4 door with a/c</td>
//             <td>5</td>
//             <td>$70</td>
//             <td>$100</td>
//             <td>$85</td>
//             <td>$125</td>
//         </tr>
//         <tr>
//             <td>Jeep Wrangler - 2 door</td>
//             <td>4</td>
//             <td>$60</td>
//             <td>$85</td>
//             <td>$70</td>
//             <td>$90</td>
//         </tr>
//     </tbody>
// </table>