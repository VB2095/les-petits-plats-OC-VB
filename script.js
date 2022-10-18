
//function displayRecipe to show the filtered recipes in the html page having id="recipes"
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




// //get the ingredients from the recipes and add it in a var called ingredients
const myIngredients = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat()
let ingredientInput = document.getElementById('searchIngredients')
var options = document.getElementById("ingredients");


filteredIngredients = myIngredients.filter((item, index) => myIngredients.indexOf(item) === index)

filteredIngredients.forEach(ingredient => {
    var opt = document.createElement('option');
    opt.value = ingredient;
    opt.innerHTML = ingredient;
    options.appendChild(opt);
});


// for (var i =0; i < myIngredients.length; i++) {
//     options += '<li value="' + myIngredients[i] + '">' + '<a>' + myIngredients[i] +'</a>' + '</li>';
// }
// document.getElementById("ingredients").innerHTML = options;

//on click of additionalSearch-ingredients show ul li list of ingredients 
document.getElementById("additionalSearch-ingredients").addEventListener("click", function(){
    document.getElementById("ingredients").style.display = "block";
    document.getElementById("searchIngredients").style.display = "block";

});



//filter dinamically the list of ingredients when user search in the input search bar with id "searchIngredients"
ingredientInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()

    const filteredIngredients = myIngredients.filter((ingredient) => {
        return (
            ingredient.toLowerCase().includes(searchString)
        )
    })
        displayIngredients(filteredIngredients)

})

//function displayIngredients to show the filtered ingredients in the html page having id="ingredients"
function displayIngredients(filteredIngredients) {
    let html = ''
    filteredIngredients.forEach(ingredient => {
        html += `
            <li value="${ingredient}">${ingredient}</li>
        `
    })
    document.querySelector('#ingredients').innerHTML = html  
}


//get the appliance from the recipes and add it in a var called appliances
const myAppliances = recipes.map(recipe => recipe.appliance)
let applianceInput = document.getElementById('searchAppliances')
var options = document.getElementById("appliances");


filteredAppliances = myAppliances.filter((item, index) => myAppliances.indexOf(item) === index)

filteredAppliances.forEach(appliance => {
    var opt = document.createElement('option');
    opt.value = appliance;
    opt.innerHTML = appliance;
    options.appendChild(opt);
} );

//on click of additionalSearch-appliances show ul li list of appliances
document.getElementById("additionalSearch-appliances").addEventListener("click", function(){
    document.getElementById("appliances").style.display = "block";
    document.getElementById("searchAppliances").style.display = "block";

});

//filter dinamically the list of appliances when user search in the input search bar with id "searchAppliances"

applianceInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()

    const filteredAppliances = myAppliances.filter((appliance) => {
        return (
            appliance.toLowerCase().includes(searchString)
        )
    })
        displayAppliances(filteredAppliances)

})

//function displayAppliances to show the filtered appliances in the html page having id="appliances"
function displayAppliances(filteredAppliances) {
    let html = ''
    filteredAppliances.forEach(appliance => {
        html += `
            <li value="${appliance}">${appliance}</li>
        `
    })
    document.querySelector('#appliances').innerHTML = html  
}


//get the ustensils from the recipes and add it in a var called ustensils
const myUstensils = recipes.map(recipe => recipe.ustensils).flat()
let ustensilInput = document.getElementById('searchUstensils')
var options = document.getElementById("ustensils");


filteredUstensils = myUstensils.filter((item, index) => myUstensils.indexOf(item) === index)

filteredUstensils.forEach(ustensil => {
    var opt = document.createElement('option');
    opt.value = ustensil;
    opt.innerHTML = ustensil;
    options.appendChild(opt);
} );

//on click of additionalSearch-ustensils show ul li list of ustensils
document.getElementById("additionalSearch-ustensils").addEventListener("click", function(){
    document.getElementById("ustensils").style.display = "block";
    document.getElementById("searchUstensils").style.display = "block";

});

//filter dinamically the list of ustensils when user search in the input search bar with id "searchUstensils"
ustensilInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()

    const filteredUstensils = myUstensils.filter((ustensil) => {
        return (
            ustensil.toLowerCase().includes(searchString)
        )
    })
        displayUstensils(filteredUstensils)

})

//function displayUstensils to show the filtered ustensils in the html page having id="ustensils"

function displayUstensils(filteredUstensils) {
    let html = ''
    filteredUstensils.forEach(ustensil => {
        html += `
            <li value="${ustensil}">${ustensil}</li>
        `
    })
    document.querySelector('#ustensils').innerHTML = html  
}


//when an ingredient, appliance or ustensil is selected, add it in the section with id="tagList" with a cross to delete it and a class "badge" to style it, and hide the ul li list of ingredients, appliances and ustensils. Remove the ingredient, appliance or ustensil from the list of ingredients, appliances and ustensils and remove the ones from the list that are not in the recipes matching with the selected ingredients, appliances and ustensils. Finally filter the recipe matching the selected ingredients, appliances and ustensils and display them in the html page with id="recipes"

document.getElementById("ingredients").addEventListener("click", function(e){
    if(e.target && e.target.nodeName == "LI") {
        document.getElementById("ingredients").style.display = "none";
        document.getElementById("searchIngredients").style.display = "none";
        document.getElementById("searchIngredients").value = "";
        var ingredient = e.target.innerHTML;
        var tagList = document.getElementById("tagList");
        var tag = document.createElement("span");
        tag.className = "badge";
        tag.innerHTML = ingredient + " x";
        tagList.appendChild(tag);
        var index = myIngredients.indexOf(ingredient);
        if (index > -1) {
            myIngredients.splice(index, 1);
        }
        var index = filteredIngredients.indexOf(ingredient);
        if (index > -1) {
            filteredIngredients.splice(index, 1);
        }
        var index = filteredAppliances.indexOf(ingredient);
        if (index > -1) {
            filteredAppliances.splice(index, 1);
        }
        var index = filteredUstensils.indexOf(ingredient);
        if (index > -1) {
            filteredUstensils.splice(index, 1);
        }
        var index = filteredRecipes.indexOf(ingredient);
        if (index > -1) {
            filteredRecipes.splice(index, 1);
        }
        var index = filteredRecipes.indexOf(ingredient);
        if (index > -1) {
            filteredRecipes.splice(index, 1);
        }
        var index = filteredRecipes.indexOf(ingredient);
        if (index > -1) {
            filteredRecipes.splice(index, 1);
        }
        var filteredRecipes = recipes.filter(recipe => recipe.ingredients.some(ingredient => myIngredients.includes(ingredient.ingredient)) && myAppliances.includes(recipe.appliance) && recipe.ustensils.some(ustensil => myUstensils.includes(ustensil)))
        displayRecipes(filteredRecipes)
    }
});

document.getElementById("appliances").addEventListener("click", function(e){
    if(e.target && e.target.nodeName == "LI") {
        document.getElementById("appliances").style.display = "none";
        document.getElementById("searchAppliances").style.display = "none";
        document.getElementById("searchAppliances").value = "";
        var appliance = e.target.innerHTML;
        var tagList = document.getElementById("tagList");
        var tag = document.createElement("span");
        tag.className = "badge";
        tag.innerHTML = appliance + " x";
        tagList.appendChild(tag);
        var index = myAppliances.indexOf(appliance);
        if (index > -1) {
            myAppliances.splice(index, 1);
        }
        var index = filteredAppliances.indexOf(appliance);
        if (index > -1) {
            filteredAppliances.splice(index, 1);
        }
        var index = filteredIngredients.indexOf(appliance);
        if (index > -1) {
            filteredIngredients.splice(index, 1);
        }
        var index = filteredUstensils.indexOf(appliance);
        if (index > -1) {
            filteredUstensils.splice(index, 1);
        }
        var index = filteredRecipes.indexOf(appliance);
        if (index > -1) {
            filteredRecipes.splice(index, 1);
        }
        var index = filteredRecipes.indexOf(appliance);
        if (index > -1) {
            filteredRecipes.splice(index, 1);
        }
        var index = filteredRecipes.indexOf(appliance);
        if (index > -1) {
            filteredRecipes.splice(index, 1);
        }
        var filteredRecipes = recipes.filter(recipe => recipe.ingredients.some(ingredient => myIngredients.includes(ingredient.ingredient)) && myAppliances.includes(recipe.appliance) && recipe.ustensils.some(ustensil => myUstensils.includes(ustensil)))
        displayRecipes(filteredRecipes)
    }
});