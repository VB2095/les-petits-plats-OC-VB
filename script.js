
//window on load event 
window.onload = () => {


console.log ('Recipes: ', recipes);

function displayRecipes(recipes) {
    let html = ''
    recipes.forEach(recipe => {
        html += `
            <div class="card">
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
            </div>

        `
    })
    document.querySelector('#recipes').innerHTML = html  
}

displayRecipes(recipes)

//get a list of all the ingredients in the recipes array and add the id of the recipe to the ingredient object as a property
function getIngredients(recipes) {
    let ingredients = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredient.recipeId = recipe.id
            ingredients.push(ingredient)
        })
    })
    return ingredients
}

//console log the ingredients array 
console.log('Ingredients: ', getIngredients(recipes))

//get a list of all the ustensils in the recipes array and add the id of the recipe to the ustensil object as a property
function getUstensils(recipes) {
    let ustensils = []
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensil.recipeId = recipe.id
            ustensils.push(ustensil)
        })
    })
    return ustensils
}

//get a list of all the appliances in the recipes array and add the id of the recipe to the appliance object as a property
function getAppliances(recipes) {
    let appliances = []
    recipes.forEach(recipe => {
        recipe.appliance.recipeId = recipe.id
        appliances.push(recipe.appliance)
    })
    return appliances
}

//console log the appliances array
console.log('Appliances: ', getAppliances(recipes))

//add the ingredients, ustensils and appliances arrays as a list of options to the ul list in the html file 
function addOptionsToSelects(ingredients, ustensils, appliances) {
    let html = ''
    ingredients.forEach(ingredient => {
        html += `
            <li class="list-group-item" id="${ingredient.ingredient}"><a>${ingredient.ingredient}</a></li>
        `
    })
    document.querySelector('#ingredients').innerHTML = html

    html = ''
    ustensils.forEach(ustensil => {
        html += `
            <li class="list-group-item" id="${ustensil}"><a>${ustensil}</a></li>
        `
    })
    document.querySelector('#ustensils').innerHTML = html

    html = ''
    appliances.forEach(appliance => {
        html += `
            <li class="list-group-item" id="${appliance}"><a>${appliance}</a></li>
        `
    })
    document.querySelector('#appliances').innerHTML = html
}

addOptionsToSelects(getIngredients(recipes), getUstensils(recipes), getAppliances(recipes))
//actualiser les listes des ingredients, ustensils et appareils avec les ingredients, ustensils et appareils qui sont contenus dans les recettes qui correspondent à la recherche et qui correspondent aux filtres sélectionnés 


function filterList() {
    let ingredients = []
    let ustensils = []
    let appliances = []
    recipes.forEach(recipe => {
        if (recipe.name.toLowerCase().includes(document.querySelector('#search').value.toLowerCase())) {  
            recipe.ingredients.forEach(ingredient => {
                ingredient.recipeId = recipe.id
                ingredients.push(ingredient)
            })
            recipe.ustensils.forEach(ustensil => {
                ustensil.recipeId = recipe.id
                ustensils.push(ustensil)
            })
            recipe.appliance.recipeId = recipe.id
            appliances.push(recipe.appliance)
        }
    })
    addOptionsToSelects(ingredients, ustensils, appliances)
}



//selectionner un ingredients de la liste des ingredients et actualiser la liste des ingrédients avec les ingrédients qui sont contenus dans les recettes qui correspondent aux filtres sélectionnés
document.querySelector('#ingredients').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        let ingredients = []
        let ustensils = []
        let appliances = []
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredient === e.target.textContent) {
                    ingredient.recipeId = recipe.id
                    ingredients.push(ingredient)
                }
            })
            recipe.ustensils.forEach(ustensil => {
                ustensil.recipeId = recipe.id
                ustensils.push(ustensil)
            })
            recipe.appliance.recipeId = recipe.id
            appliances.push(recipe.appliance)
        })
        addOptionsToSelects(ingredients, ustensils, appliances)
    }
})





//add the event listener to the search input to filter the list of ingredients, ustensils and appliances and display the matching recipes 
document.querySelector('#search', 'searchIngredients').addEventListener('keyup', () => {
    filterList()
    closeDetails()
})

//filter the list of ingredients with the matching value when user search on the input with id searchIngredients 
document.querySelector('#searchIngredients').addEventListener('keyup', () => {
    let ingredients = document.querySelectorAll('#ingredients li')
    ingredients.forEach(ingredient => {
        if (ingredient.textContent.toLowerCase().includes(document.querySelector('#searchIngredients').value.toLowerCase())) {
            ingredient.style.display = 'block'
        } else {
            ingredient.style.display = 'none'
        }
    })
})

//do the same for the ustensils and appliances
document.querySelector('#searchUstensils').addEventListener('keyup', () => {
    let ustensils = document.querySelectorAll('#ustensils li')
    ustensils.forEach(ustensil => {
        if (ustensil.textContent.toLowerCase().includes(document.querySelector('#searchUstensils').value.toLowerCase())) {
            ustensil.style.display = 'block'
        } else {
            ustensil.style.display = 'none'
        }
    })
})

document.querySelector('#searchAppliances').addEventListener('keyup', () => {
    let appliances = document.querySelectorAll('#appliances li')
    appliances.forEach(appliance => {
        if (appliance.textContent.toLowerCase().includes(document.querySelector('#searchAppliances').value.toLowerCase())) {
            appliance.style.display = 'block'
        } else {
            appliance.style.display = 'none'
        }
    })
})


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
    }
}


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
        //input focus 
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









//show dinamycally the recipes in the html page from the input search bar with id "search"
const search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    const filteredRecipes = recipes.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(searchString) ||
            recipe.description.toLowerCase().includes(searchString)      
        )
    })

//show the result in the html page with id "recipes" if the input search bar is more than 3 characters
    if (searchString.length > 2) {
    displayRecipes(filteredRecipes)
    } else {
        //show a message in the dom if the input search bar is less than 3 characters 
        document.querySelector('#recipes').innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`
    } //else if no recipes match the search criteria, display a message in the dom
    if (filteredRecipes.length === 0) {
        document.querySelector('#recipes').innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`
    }
})




}



