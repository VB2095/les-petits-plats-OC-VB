window.onload = () => {

function displayRecipes (recipes) {
    let recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

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
}

//display all the recipes
displayRecipes(recipes);


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
    
    if (filtered_recipes.length === 0 || search.length < 3) {
        document.getElementById("recipes").innerHTML = `<div class="alert alert-warning" role="alert">
        Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.
        </div>`
    } else {
    displayRecipes(filtered_recipes);

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
}
});







document.getElementById("searchIngredients").addEventListener("keyup", function(event) {
   //search the ingredients list and display only the ones that match the search
    let search = document.getElementById("searchIngredients").value;
    let filtered_ingredients = unique_ingredients.filter(ingredient => ingredient.toLowerCase().includes(search.toLowerCase()));
    document.getElementById("ingredients").innerHTML = "";
    for (let i = 0; i < filtered_ingredients.length; i++) {
        let ingredient = filtered_ingredients[i];
        document.getElementById("ingredients").innerHTML += `<li class="list-group-item" id="${ingredient}">${ingredient}</li>`
    }


});

document.getElementById("searchAppliances").addEventListener("keyup", function(event) {
    //search the appliances list and display only the ones that match the search
    let search = document.getElementById("searchAppliances").value;
    let filtered_appliances = unique_appliance.filter(appliance => appliance.toLowerCase().includes(search.toLowerCase()));
    document.getElementById("appliances").innerHTML = "";
    for (let i = 0; i < filtered_appliances.length; i++) {
        let appliance = filtered_appliances[i];
        document.getElementById("appliances").innerHTML += `<li class="list-group-item" id="${appliance}">${appliance}</li>`
    }
});

document.getElementById("searchUstensils").addEventListener("keyup", function(event) {
    //search the ustensils list and display only the ones that match the search
    let search = document.getElementById("searchUstensils").value;
    let filtered_ustensils = unique_ustensils.filter(ustensil => ustensil.toLowerCase().includes(search.toLowerCase()));
    document.getElementById("ustensils").innerHTML = "";
    for (let i = 0; i < filtered_ustensils.length; i++) {
        let ustensil = filtered_ustensils[i];
        document.getElementById("ustensils").innerHTML += `<li class="list-group-item" id="${ustensil}">${ustensil}</li>`
    }
});


const ingredientList = document.getElementById("ingredients");
const applianceList = document.getElementById("appliances");
const ustensilList = document.getElementById("ustensils");

//get the li element that was clicked and add it to the tag-section 
ingredientList.addEventListener("click", function(event) {
    let ingredient = event.target.id;
    let tag = document.getElementById("tag-section");
    tag.innerHTML += `<span class="rounded-pill badge-primary tag-ingredients" id="${ingredient}">${ingredient}<i class="bi bi-x-circle"></i></span>`

//remove the selected ingredient from the list and filter the recipes accordingly 
    let index = unique_ingredients.indexOf(ingredient);
    unique_ingredients.splice(index, 1);
    document.getElementById("ingredients").innerHTML = "";
    for (let i = 0; i < unique_ingredients.length; i++) {
        let ingredient = unique_ingredients[i];
        document.getElementById("ingredients").innerHTML += `<li class="list-group-item" id="${ingredient}">${ingredient}</li>`
    }
    displayRecipes( recipes, unique_ingredients, unique_appliance, unique_ustensils);

});	

applianceList.addEventListener("click", function(event) {
    let appliance = event.target.id;
    let tag = document.getElementById("tag-section");
    tag.innerHTML += `<span class="rounded-pill badge-primary tag-appliances" id="${appliance}">${appliance}<i class="bi bi-x-circle"></i></span>`
});

ustensilList.addEventListener("click", function(event) {
    let ustensil = event.target.id;
    let tag = document.getElementById("tag-section");
    tag.innerHTML += `<span class="rounded-pill badge-primary tag-ustensils" id="${ustensil}">${ustensil}<i class="bi bi-x-circle"></i></span>`
});

//remove the tag when the user clicks on the x
document.getElementById("tag-section").addEventListener("click", function(event) {
    if (event.target.tagName === "I") {
        event.target.parentNode.remove();
    }
});

//filter the recipe with the matching tag 


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
const details = document.querySelectorAll("details");

details.forEach (targetDetail => {
    targetDetail.addEventListener("toggle", closeDetails);
});
}



