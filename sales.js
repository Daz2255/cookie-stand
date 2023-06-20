"use strict";
console.log("salmon cookies");

const container = document.getElementById("container");

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

function Location(
  storeName,
  minCustPerHour,
  maxCustPerHour,
  avgCookiesPerHour
) {
  this.storeName = storeName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerHour = avgCookiesPerHour;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
}

// make prototype for customers each hour

Location.prototype.calcCustomersEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(
      randomNum(this.minCustPerHour, this.maxCustPerHour)
    );
  }
};

// make prototype for cookies each hour

Location.prototype.calcCookiesEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    const oneHour = Math.ceil(
      this.customersEachHour[i] * this.avgCookiesPerHour
    );
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

// Function to make table

function renderTable(locations) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tfoot = document.createElement("tfoot");

  // Make the header row

  const headerRow = document.createElement("tr");
  const emptyHeaderCell = document.createElement("th");
  headerRow.appendChild(emptyHeaderCell);

  for (let i = 0; i < hours.length; i++) {
    const hourHeaderCell = document.createElement("th");
    hourHeaderCell.textContent = hours[i];
    headerRow.appendChild(hourHeaderCell);
  }

  const totalHeaderCell = document.createElement("th");
  totalHeaderCell.textContent = "Daily Location Sales";
  headerRow.appendChild(totalHeaderCell);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Make the table body rows
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    location.calcCustomersEachHour();
    location.calcCookiesEachHour();

    const row = document.createElement("tr");
    const locationNameCell = document.createElement("td");
    locationNameCell.textContent = location.storeName;
    row.appendChild(locationNameCell);

    for (let j = 0; j < hours.length; j++) {
      const cookiesCell = document.createElement("td");
      cookiesCell.textContent = location.cookiesEachHour[j];
      row.appendChild(cookiesCell);
    }

    const totalCookiesCell = document.createElement("td");
    totalCookiesCell.textContent = location.totalDailyCookies;
    row.appendChild(totalCookiesCell);

    tbody.appendChild(row);
  }

  // Make a footer row for hour totals

  const footerRow = document.createElement("tr");
  const footerLabelCell = document.createElement("td");
  footerLabelCell.textContent = "Total Cookies";
  footerRow.appendChild(footerLabelCell);

  let totalOfTotals = 0;

  for (let i = 0; i < hours.length; i++) {
    let totalCookies = 0;

    for (let j = 0; j < locations.length; j++) {
      totalCookies += locations[j].cookiesEachHour[i];
    }

    const footerValueCell = document.createElement("td");
    footerValueCell.textContent = totalCookies;
    footerRow.appendChild(footerValueCell);

    totalOfTotals += totalCookies;
  }

  // add a footer cell for total of totals

  const totalOfTotalsCell = document.createElement("td");
  totalOfTotalsCell.textContent = totalOfTotals;
  footerRow.appendChild(totalOfTotalsCell);

  tfoot.appendChild(footerRow);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  container.appendChild(table);
}

// Function for generating random customers

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// make each store

const seattle = new Location("Seattle", 23, 65, 6.3);
const tokyo = new Location("Tokyo", 3, 24, 1.2);
const dubai = new Location("Dubai", 11, 38, 3.7);
const paris = new Location("Paris", 20, 38, 2.3);

// render table

renderTable([seattle, tokyo, dubai, paris]);
