

const apiKey = "b8eed9fc27f7efae2b8240a39fe1c949";
const cityId = 91; // Dublin
const cuisineId = 82; //Pizza
const resto = document.getElementById('restoInfo');

fetch(
  `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}?`,
  { headers: { "user-key": apiKey } }
)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log("API response:", json);

    json.restaurants.forEach(item => {

      resto.innerHTML += `
      <img src="${item.restaurant.thumb}">
      <p>${item.restaurant.name} 
      <img src="ic-star-sm.svg"> ${item.restaurant.user_rating.aggregate_rating}/5 
      (${item.restaurant.user_rating.votes})
      </p>`

    });
  });

  //console.log(`€${ item.restaurant.average_cost_for_two } `);
      //console.log(item.restaurant.name);
      //console.log(item.restaurant.user_rating.rating_text);
      //console.log(item.restaurant.user_rating.aggregate_rating);
      //console.log(item.restaurant.menu_url);
      //console.log(item.restaurant.phone_numbers)
      //console.log(item.restaurant.timings);