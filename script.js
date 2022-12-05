window.onload = () => {
for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];	
    
    document.getElementById("recipes").innerHTML += `<div class="card">
    <img src="/placeholder.jpg" class="card-img-top" alt="${recipe.name}">
    <div class="card-body">
      <div class="row justify-content-between">
          <div class="col-8 card-title">
          <h5 class="">${recipe.name}</h5>
          </div>
          <div class="col-4">
          <h5><i class="bi bi-clock"></i> ${recipe.time} min</h5>
          </div>
      </div>
      <div class="row justify-content-between">
          <div class="col-6">
              <ul class="list-unstyled">
              ${recipe.ingredients.map(ingredient => `<li><b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
              </ul>
          </div>
          <div class="col-6 line-clamp">
              <p class="card-text line-clamp">${recipe.description}</p>
          </div>
      </div>
    </div>
  </div>`
   
}


let all_ingredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat();
let unique_ingredients = all_ingredients.filter((ingredient, index) => all_ingredients.indexOf(ingredient) === index);


for (let i = 0; i < unique_ingredients.length; i++) {
    let ingredient = unique_ingredients[i];
    document.getElementById("ingredients").innerHTML += `<li class="list-group-item" id="${ingredient}">${ingredient}</li>`	
}

let all_appliance = recipes.map(recipe => recipe.appliance);
let unique_appliance = all_appliance.filter((appliance, index) => all_appliance.indexOf(appliance) === index);

for (let i = 0; i < unique_appliance.length; i++) {
    let appliance = unique_appliance[i];
    document.getElementById("appliances").innerHTML += `<li class="list-group-item" id="${appliance}">${appliance}</li>`
}

let ustensils = recipes.map(recipe => recipe.ustensils);
let all_ustensils = ustensils.flat();
let unique_ustensils = all_ustensils.filter((ustensil, index) => all_ustensils.indexOf(ustensil) === index);
unique_ustensils = unique_ustensils.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
console.log(unique_ustensils);

for (let i = 0; i < unique_ustensils.length; i++) {
    let ustensil = unique_ustensils[i];
    document.getElementById("ustensils").innerHTML += `<li class="list-group-item" id="${ustensil}">${ustensil}</li>`
}


//when user search in the search bar with id "search" filter the recipes. Also filter the ingredients, appliances and ustensils list to display only the ones that are contained in the matching recipes and use unique_ingredients, unique_appliance and unique_ustensils to display the list of ingredients, appliances and ustensils
document.getElementById("search").addEventListener("keyup", function(event) {
    let search = document.getElementById("search").value;
    let filtered_recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()) || recipe.description.toLowerCase().includes(search.toLowerCase()) || recipe.ingredients.map(ingredient => ingredient.ingredient).join(' ').toLowerCase().includes(search.toLowerCase()) || recipe.appliance.toLowerCase().includes(search.toLowerCase()) || recipe.ustensils.join(' ').toLowerCase().includes(search.toLowerCase()));
    document.getElementById("recipes").innerHTML = "";
    
    for (let i = 0; i < filtered_recipes.length; i++) {
        let recipe = filtered_recipes[i];
        document.getElementById("recipes").innerHTML += `<div class="card">
        <img src="/placeholder.jpg" class="card-img-top" alt="${recipe.name}">
        <div class="card-body">
          <div class="row justify-content-between">
              <div class="col-8 card-title">
              <h5 class="">${recipe.name}</h5>
              </div>
              <div class="col-4">
              <h5><i class="bi bi-clock"></i> ${recipe.time} min</h5>
              </div>
          </div>
          <div class="row justify-content-between">
              <div class="col-6">
                  <ul class="list-unstyled">
                  ${recipe.ingredients.map(ingredient => `<li><b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
                  </ul>
              </div>
              <div class="col-6 line-clamp">
                  <p class="card-text line-clamp">${recipe.description}</p>
              </div>
          </div>
        </div>
      </div>`
    }

    let filtered_ingredients = filtered_recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat();
    let filtered_unique_ingredients = filtered_ingredients.filter((ingredient, index) => filtered_ingredients.indexOf(ingredient) === index);
    document.getElementById("ingredients").innerHTML = "";
    for (let i = 0; i < filtered_unique_ingredients.length; i++) {
        let ingredient = filtered_unique_ingredients[i];
        document.getElementById("ingredients").innerHTML += `<li class="list-group-item" id="${ingredient}">${ingredient}</li>`
    }

    let filtered_appliance = filtered_recipes.map(recipe => recipe.appliance);
    let filtered_unique_appliance = filtered_appliance.filter((appliance, index) => filtered_appliance.indexOf(appliance) === index);
    document.getElementById("appliances").innerHTML = "";
    for (let i = 0; i < filtered_unique_appliance.length; i++) {
        let appliance = filtered_unique_appliance[i];
        document.getElementById("appliances").innerHTML += `<li class="list-group-item" id="${appliance}">${appliance}</li>`
    }

    let filtered_ustensils = filtered_recipes.map(recipe => recipe.ustensils);
    let filtered_all_ustensils = filtered_ustensils.flat();
    let filtered_unique_ustensils = filtered_all_ustensils.filter((ustensil, index) => filtered_all_ustensils.indexOf(ustensil) === index);
    filtered_unique_ustensils = filtered_unique_ustensils.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
    document.getElementById("ustensils").innerHTML = "";
    for (let i = 0; i < filtered_unique_ustensils.length; i++) {
        let ustensil = filtered_unique_ustensils[i];
        document.getElementById("ustensils").innerHTML += `<li class="list-group-item" id="${ustensil}">${ustensil}</li>`
    }
});





// document.getElementById("search-ingredients").addEventListener("keyup", function(event) {
//     let search = document.getElementById("search-ingredients").value;
//     let filtered_recipes = recipes.filter(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient).join(' ').toLowerCase().includes(search.toLowerCase()));
//     document.getElementById("recipes").innerHTML = "";

//     for (let i = 0; i < filtered_recipes.length; i++) {
//         let recipe = filtered_recipes[i];
//         document.getElementById("recipes").innerHTML += `<div class="card">
//         <img src="/placeholder.jpg" class="card-img-top" alt="${recipe.name}">
//         <div class="card-body">
//           <div class="row justify-content-between">
//               <div class="col-8 card-title">
//               <h5 class="">${recipe.name}</h5>
//               </div>
//               <div class="col-4">
//               <h5><i class="bi bi-clock"></i> ${recipe.time} min</h5>
//               </div>
//           </div>
//           <div class="row justify-content-between">
//               <div class="col-6">
//                   <ul class="list-unstyled">
//                   ${recipe.ingredients.map(ingredient => `<li><b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}</li>`).join('')}
//                   </ul>
//               </div>
//               <div class="col-6 line-clamp">
//                   <p class="card-text line-clamp">${recipe.description}</p>
//               </div>
//           </div>
//         </div>
//       </div>`
//     }

//     let filtered_ingredients = filtered_recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat();
//     let filtered_unique_ingredients = filtered_ingredients.filter((ingredient, index) => filtered_ingredients.indexOf(ingredient) === index);
//     document.getElementById("ingredients").innerHTML = "";
//     for (let i = 0; i < filtered_unique_ingredients.length; i++) {
//         let ingredient = filtered_unique_ingredients[i];
//         document.getElementById("ingredients").innerHTML += `<li class="list-group-item" id="${ingredient}">${ingredient}</li>`
//     }

//     let filtered_appliance = filtered_recipes.map(recipe => recipe.appliance);
//     let filtered_unique_appliance = filtered_appliance.filter((appliance, index) => filtered_appliance.indexOf(appliance) === index);
//     document.getElementById("appliances").innerHTML = "";
//     for (let i = 0; i < filtered_unique_appliance.length; i++) {
//         let appliance = filtered_unique_appliance[i];
//         document.getElementById("appliances").innerHTML += `<li class="list-group-item" id="${appliance}">${appliance}</li>`
//     }

//     let filtered_ustensils = filtered_recipes.map(recipe => recipe.ustensils);
//     let filtered_all_ustensils = filtered_ustensils.flat();
//     let filtered_unique_ustensils = filtered_all_ustensils.filter((ustensil, index) => filtered_all_ustensils.indexOf(ustensil) === index);
//     filtered_unique_ustensils = filtered_unique_ustensils.map(ustensil => ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
//     document.getElementById("ustensils").innerHTML = "";
//     for (let i = 0; i < filtered_unique_ustensils.length; i++) {
//         let ustensil = filtered_unique_ustensils[i];
//         document.getElementById("ustensils").innerHTML += `<li class="list-group-item" id="${ustensil}">${ustensil}</li>`
//     }
// });






const details = document.querySelectorAll("details");

details.forEach (targetDetail => {
    targetDetail.addEventListener("toggle", closeDetails);
});

function closeDetails() {
    if (this.open) {
        details.forEach(detail => {
            if (detail !== this) {
                detail.removeAttribute("open");
            }
        });

        const summary = this.querySelector("summary");
        const input = summary.querySelector("input");
        const p = summary.querySelector("p");
        const span = summary.querySelector("span");
        span.classList.add("rotate");
        p.classList.add("hidden");
        input.classList.add("active");
        input.focus();
    } else {
        const summary = this.querySelector("summary");
        const input = summary.querySelector("input");
        const span = summary.querySelector("span");
        const p = summary.querySelector("p");
        input.classList.remove("active");
        p.classList.add("active");
        p.classList.remove("hidden");
        span.classList.remove("rotate");
    }
}
}



