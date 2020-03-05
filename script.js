

const apiKey = "b8eed9fc27f7efae2b8240a39fe1c949";
const cityId = 280; // New York
const cuisineId = 308; // Vegetarian
let restoInfo;
let averageCost;
const priceLow = document.getElementById("lowPrice");
const priceMedium = document.getElementById("mediumPrice");
const priceHigh = document.getElementById("highPrice");
const buttonFilter = document.getElementById("filterButton");

fetch(
  `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}?`,
  { headers: { "user-key": apiKey } }
)
  .then(response => {
    return response.json()

  })
  .then(info => {
    console.log(info)
    restoInfo = info.restaurants
    showRestaurant(info.restaurants);
  })
const showRestaurant = (array) => {
  console.log("show restau", array.length, array)
  restaurants.innerHTML = `<p></p>`
  array.forEach(item => {
    restaurants.innerHTML += `<section class="card">
    <img class="resto" src="${item.restaurant.thumb}">
    <p><span class="restoname">${item.restaurant.name}</span><br> <span class="rating">
    <img class="star" src="ic-star-sm.svg"> <span class="restorating">${item.restaurant.user_rating.aggregate_rating}/5 
    (${item.restaurant.user_rating.votes})</span></span></p>
    <p><span class="restocuisine"> ${item.restaurant.cuisines}</span>
    </p></section>`
  })
}

// FILTER FUNCTIONS FOR DELIVERY/TAKE AWAY
const filterFunction = () => {
  const filteredArray = restoInfo.filter(item => item.restaurant.highlights.includes("Takeaway Available"))
  console.log(filteredArray);
  showRestaurant(filteredArray);
};
const filterDeliveryFunction = () => {
  const filteredArray = restoInfo.filter(item => item.restaurant.highlights.includes("Delivery"))
  console.log(filteredArray);
  showRestaurant(filteredArray);
};

//filters restaurants on price range
const filterPrice = () => {
  if (priceLow.checked) {
    filteredArray = restoInfo.filter(
      item => item.restaurant.average_cost_for_two <= 35
    );
  } else if (priceMedium.checked) {
    filteredArray = restoInfo.filter(
      item =>
        item.restaurant.average_cost_for_two > 35 &&
        item.restaurant.average_cost_for_two < 60
    );
  } else if (priceHigh.checked) {
    filteredArray = restoInfo.filter(
      item => item.restaurant.average_cost_for_two >= 60
    );
  }

  showRestaurant(filteredArray);
};

document.getElementById('hasTakeaway').addEventListener('click', filterFunction)
document.getElementById('hasDelivery').addEventListener('click', filterDeliveryFunction)
buttonFilter.addEventListener("click", filterPrice);
