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

console.log(hours.length);

const seattle = {
  storeName: "Seattle",
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerHour: 6.3,
  customersEachHour: [],
  cookiesEachHour: [],
  totalDailyCookies: {},
  calcCustomersEachHour: function () {
    for (let i = 0; i < hours.length; i++) {
      this.customersEachHour.push(
        randomNum(this.minCustPerHour, this.maxCustPerHour)
      );
    }
  },
  calcCookiesEachHour: function () {
    for (let i = 0; i < hours.length; i++) {
      const oneHour = Math.ceil(
        this.customersEachHour[i] * this.avgCookiesPerHour
      );
      this.cookiesEachHour.push(oneHour);
      this.totalDailyCookies += oneHour;
    }
  },

  render: function () {
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();

    const article = document.createElement("article");
    container.appendChild(article);

    const h3 = document.createElement("h3");
    h3.textContent = this.storeName;
    article.appendChild(h3);

    const ul = document.createElement("ul");
    article.appendChild(ul);

    for (let i = 0; i < hours.length; i++) {
      const li = document.createElement("li");
      li.textContent = `${hours[i]}: ${this.cookiesEachHour[i]} cookies`;
      ul.appendChild(li);
    }
  },
};

seattle.render();

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(totalDailyCookies);

/*for (let hour = 0; hour < 14; hour++) {
  let randomCustomers =
    Math.floor(
      Math.random() *
        (seattle.maxCustomersPerHour - seattle.minCustomersPerHour + 1)
    ) + seattle.minCustomersPerHour;
  seattle.customersPerhour.push(randomCustomers);
}

for (let i = 0; i < seattle.customersPerhour.length; i++) {
  seattle.cookiesEachHour.push(
    seattle.customersPerhour[i] * seattle.avgCookiesPerCustomer
  );
}

seattle.render();
console.log(seattle.cookiesEachHour);

console.log(seattle.customersPerhour);


*/
