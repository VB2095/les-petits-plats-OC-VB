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

//get a list of all the ingredients in the recipes array and add the id of the recipe to the ingredient object as a property, capitalize the first letter of the ingredient name and remove the duplicates from the array
function getIngredients (recipes) {
    let ingredients = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredient.recipeId = recipe.id
            ingredient.ingredient = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)
            ingredients.push(ingredient)
        })
    })
    return ingredients.filter((ingredient, index, self) => self.findIndex(t => t.ingredient === ingredient.ingredient) === index)
}


//console log the ingredients array 
console.log('Ingredients: ', getIngredients(recipes))

//get a list of all the ustensils in the recipes array and add the id of the recipe to the ustensil object as a property and remove duplicates
function getUstensils(recipes) {
    let ustensils = []
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensil.recipeId = recipe.id
            ustensils.push(ustensil)
        })
    })
    return [...new Set(ustensils)]
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
            <li class="list-group-item" id="${ingredient.ingredient}">${ingredient.ingredient}</li>
        `
    })
    document.querySelector('#ingredients').innerHTML = html

    html = ''
    ustensils.forEach(ustensil => {
        html += `
            <li class="list-group-item" id="${ustensil}">${ustensil}</li>
        `
    })
    document.querySelector('#ustensils').innerHTML = html

    html = ''
    appliances.forEach(appliance => {
        html += `
            <li class="list-group-item" id="${appliance}">${appliance}</li>
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



//actualiser la liste des ingrédients, ustensils et appareils avec les tag contenu dans la section tag-section en comparant les id des tags avec les valeurs des ingrédiens, ustensils et appareils contenus dans les recettes
function filterListByTags() {
    let ingredients = []
    let ustensils = []
    let appliances = []

    recipes.forEach(recipe => {
        let ingredientMatch = 0
        let ustensilMatch = 0
        let applianceMatch = 0
        recipe.ingredients.forEach(ingredient => {
            ingredient.recipeId = recipe.id
            document.querySelectorAll('.tag').forEach(tag => {
                if (tag.id === ingredient.ingredient) {
                    ingredientMatch++
                }
            })
        })
        recipe.ustensils.forEach(ustensil => {
            ustensil.recipeId = recipe.id
            document.querySelectorAll('.tag').forEach(tag => {
                if (tag.id === ustensil) {
                    ustensilMatch++
                }
            })
        })
        recipe.appliance.recipeId = recipe.id
        document.querySelectorAll('.tag').forEach(tag => {
            if (tag.id === recipe.appliance) {
                applianceMatch++
            }
        })
        if (ingredientMatch === document.querySelectorAll('.tag').length || ustensilMatch === document.querySelectorAll('.tag').length || applianceMatch === document.querySelectorAll('.tag').length) {
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
    




    //remove the selected tag from the list of ingredients, ustensils and appliances
    document.querySelectorAll('.tag').forEach(tag => {
        ingredients = ingredients.filter(ingredient => ingredient.ingredient !== tag.id)
        ustensils = ustensils.filter(ustensil => ustensil !== tag.id)
        appliances = appliances.filter(appliance => appliance !== tag.id)
                                
    })

    addOptionsToSelects(ingredients, ustensils, appliances)
}




document.getElementById("ingredients").addEventListener("click", function(e){
    
    document.getElementById("tag-section").innerHTML += '<span class="rounded-pill text-bg-primary tag" id="' + e.target.id + '">' + e.target.id + '<i class="fas fa-times"></i></span>';
    //remove the tag when the user click on the cross 
    document.getElementById(e.target.id).addEventListener("click", function(e){
        document.getElementById(e.target.id).remove()
        filterListByTags()
        displayRecipes(filteredRecipes)
    })
    // //filter recipes with the tag selected
    const filteredRecipes = recipes.filter((recipe) => {
        return (
            recipe.ingredients.map(ingredient => ingredient.ingredient).includes(e.target.id)
            
        )
        
    })
    console.log(e.target.id)
    displayRecipes(filteredRecipes)
    //actualiser les listes des ingrédients, ustensils et appareils avec les ingrédients, ustensils et appareils qui sont contenus dans les recettes qui correspondent aux filtres sélectionnés
    filterListByTags()

console.log (filterListByTags())


});

document.getElementById("ustensils").addEventListener("click", function(e){

    document.getElementById("tag-section").innerHTML += '<span class="rounded-pill text-bg-primary tag" id="' + e.target.id + '">' + e.target.id + '<i class="fas fa-times"></i></span>';
    


    //filter recipes with the tag selected
    const filteredRecipes = recipes.filter((recipe) => {
        return (
            recipe.ustensils.includes(e.target.id)
        )
    })

    displayRecipes(filteredRecipes)
    //actualiser les listes des ingrédients, ustensils et appareils avec les ingrédients, ustensils et appareils qui sont contenus dans les recettes qui correspondent aux filtres sélectionnés
    filterListByTags()

});




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
