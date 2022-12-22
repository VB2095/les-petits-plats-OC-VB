//window on load event
window.onload = () => {
  recipes.forEach((recipe) => {
    recipe.ustensils = recipe.ustensils.map(
      (ustensil) => ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
    );
    recipe.ingredients.forEach((ingredient) => {
      ingredient.ingredient =
        ingredient.ingredient.charAt(0).toUpperCase() +
        ingredient.ingredient.slice(1);
    });
    recipe.appliance =
      recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1);
  });

  //If there is an undefined value somewhere in the recipes.json file, replace it with an empty string
  recipes.forEach((recipe) => {
    recipe.name = recipe.name || "";
    recipe.description = recipe.description || "";
    recipe.ingredients.forEach((ingredient) => {
      ingredient.ingredient = ingredient.ingredient || "";
      ingredient.quantity = ingredient.quantity || "";
      ingredient.unit = ingredient.unit || "";
    });
    recipe.appliance = recipe.appliance || "";
    recipe.ustensils = recipe.ustensils || [];
  });

  let all_ingredients = recipes
    .map((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    )
    .flat();
  let all_ustensils = recipes.map((recipe) => recipe.ustensils).flat();
  let all_appliances = recipes.map((recipe) => recipe.appliance);

  let unique_ingredients = [...new Set(all_ingredients)];
  let unique_ustensils = [...new Set(all_ustensils)];
  let unique_appliances = [...new Set(all_appliances)];

  const details = document.querySelectorAll("details");

  details.forEach((targetDetail) => {
    targetDetail.addEventListener("toggle", closeDetails);
  });

  function closeDetails() {
    const summary = this.querySelector("summary");
    const input = summary.querySelector("input");
    const p = summary.querySelector("p");
    const span = summary.querySelector("span");
    if (this.open) {
      details.forEach((detail) => {
        if (detail !== this) {
          detail.removeAttribute("open");
        }
      });
      input.addEventListener("blur", () => {
        this.setAttribute("open", "");
      });
      span.classList.add("rotate");
      p.classList.add("hidden");
      input.classList.add("active");
      input.focus();
    } else {
      input.classList.remove("active");
      p.classList.add("active");
      p.classList.remove("hidden");
      span.classList.remove("rotate");
    }
  }

  function displayRecipes(recipes) {
    let html = "";
    recipes.forEach((recipe) => {
      html += `
            <div class="card">
              <img src="/placeholder.jpg" class="card-img-top" alt="${
                recipe.name
              }">
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
                        ${recipe.ingredients
                          .map(
                            (ingredient) =>
                              `<li><b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}</li>`
                          )
                          .join("")}
                        </ul>
                    </div>
                    <div class="col-6 line-clamp">
                        <p class="card-text line-clamp">${
                          recipe.description
                        }</p>
                    </div>
                </div>
              </div>
            </div>
        `;
    });
    document.querySelector("#recipes").innerHTML = html;
  }

  displayRecipes(recipes);

  //add the ingredients, ustensils and appliances arrays as a list of options to the ul list in the html file using unique_ingredients, unique_ustensils and unique_appliances
  function addOptionsToLists(
    unique_ingredients,
    unique_ustensils,
    unique_appliances
  ) {
    let html = "";
    unique_ingredients.forEach((ingredient) => {
      html += `
            <li class="select-ingredient" id="${ingredient}">${ingredient}</li>
        `;
    });
    document.querySelector("#ingredients").innerHTML = html;

    html = "";
    unique_ustensils.forEach((ustensil) => {
      html += `
            <li class="select-ustensil" id="${ustensil}">${ustensil}</li>
        `;
    });
    document.querySelector("#ustensils").innerHTML = html;

    html = "";
    unique_appliances.forEach((appliance) => {
      html += `
            <li class="select-appliance" id="${appliance}">${appliance}</li>
        `;
    });
    document.querySelector("#appliances").innerHTML = html;
  }

  addOptionsToLists(unique_ingredients, unique_ustensils, unique_appliances);

  //function createTag() to create a tag in the html file with the id of the selected ingredient, ustensil or appliance
  function createTag(e) {
    let tagSection = document.querySelector("#tag-section");
    let tag = document.createElement("span");
    if (e.target.classList.contains("select-ingredient")) {
      tag.classList.add(
        "rounded-pill",
        "tag-ingredients",
        "text-bg-primary",
        "tag"
      );
    } else if (e.target.classList.contains("select-ustensil")) {
      tag.classList.add(
        "rounded-pill",
        "tag-ustensils",
        "text-bg-primary",
        "tag"
      );
    } else if (e.target.classList.contains("select-appliance")) {
      tag.classList.add(
        "rounded-pill",
        "tag-appliances",
        "text-bg-primary",
        "tag"
      );
    }

    tag.id = e.target.id;
    tag.innerHTML = e.target.id + '<i class="bi bi-x-circle"></i>';
    tagSection.appendChild(tag);
  }

  //appeler la fonction createTag() quand on clique sur un ingredient, ustensil ou appliance
  const ingredients = document.querySelector("#ingredients");
  ingredients.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-ingredient")) {
      createTag(e);
      filterLists();
      filterRecipes();
      clearInputSearch();
    }
  });

  const ustensils = document.querySelector("#ustensils");
  ustensils.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-ustensil")) {
      createTag(e);
      filterLists();
      filterRecipes();
      clearInputSearchUstensils();
    }
  });

  const appliances = document.querySelector("#appliances");
  appliances.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-appliance")) {
      createTag(e);
      filterLists();
      filterRecipes();
      clearInputSearchAppliances();
    }
  });

  //remove the tag when we click on the cross
  const tagSection = document.querySelector("#tag-section");
  tagSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-x-circle")) {
      e.target.parentElement.remove();
      filterLists();
      filterRecipes();
    }
  });

  //filtrer les listes en ne gardant que les ingredients, ustensils et appliances qui sont contenus dans les recettes qui correspondent aux tags selectionnés et en retirant l'élément selectionné de la liste des options
  function filterLists() {
    let tagIngredients = document.querySelectorAll(".tag-ingredients");
    let tagUstensils = document.querySelectorAll(".tag-ustensils");
    let tagAppliances = document.querySelectorAll(".tag-appliances");
    let ingredients = document.querySelector("#ingredients");
    let ustensils = document.querySelector("#ustensils");
    let appliances = document.querySelector("#appliances");

    let filteredRecipes = recipes;

    if (tagIngredients.length > 0) {
      tagIngredients.forEach((tag) => {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.ingredients.some(
            (ingredient) => ingredient.ingredient === tag.id
          )
        );
      });
    }

    if (tagUstensils.length > 0) {
      tagUstensils.forEach((tag) => {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.ustensils.some((ustensil) => ustensil === tag.id)
        );
      });
    }

    if (tagAppliances.length > 0) {
      tagAppliances.forEach((tag) => {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.appliance === tag.id
        );
      });
    }

    let filteredIngredients = [];
    let filteredUstensils = [];
    let filteredAppliances = [];

    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!filteredIngredients.includes(ingredient.ingredient)) {
          filteredIngredients.push(ingredient.ingredient);
        }
      });
      recipe.ustensils.forEach((ustensil) => {
        if (!filteredUstensils.includes(ustensil)) {
          filteredUstensils.push(ustensil);
        }
      });
      if (!filteredAppliances.includes(recipe.appliance)) {
        filteredAppliances.push(recipe.appliance);
      }
    });

    ingredients.innerHTML = "";
    ustensils.innerHTML = "";
    appliances.innerHTML = "";

    addOptionsToLists(
      filteredIngredients,
      filteredUstensils,
      filteredAppliances
    );
  }

  //display the recipes that match the tags selected
  function filterRecipes() {
    let tagIngredients = document.querySelectorAll(".tag-ingredients");
    let tagUstensils = document.querySelectorAll(".tag-ustensils");
    let tagAppliances = document.querySelectorAll(".tag-appliances");

    let filteredRecipes = recipes;

    if (tagIngredients.length > 0) {
      tagIngredients.forEach((tag) => {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.ingredients.some(
            (ingredient) => ingredient.ingredient === tag.id
          )
        );
      });
    }

    if (tagUstensils.length > 0) {
      tagUstensils.forEach((tag) => {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.ustensils.some((ustensil) => ustensil === tag.id)
        );
      });
    }

    if (tagAppliances.length > 0) {
      tagAppliances.forEach((tag) => {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.appliance === tag.id
        );
      });
    }

    displayRecipes(filteredRecipes);
    removeSelectedIngredient();
    removeSelectedUstensils();
    removeSelectedAppliances();
  }

  //get the ingrdients list in ul with id ingredients and then search for the li with the same id as the tag id and remove it
  function removeSelectedIngredient() {
    let tagIngredients = document.querySelectorAll(".tag-ingredients");
    let ingredients = document.querySelector("#ingredients");
    let ingredientsList = ingredients.querySelectorAll("li");
    if (tagIngredients.length > 0) {
      tagIngredients.forEach((tag) => {
        ingredientsList.forEach((ingredient) => {
          if (ingredient.id === tag.id) {
            ingredient.remove();
          }
        });
      });
    }
  }

  function removeSelectedAppliances() {
    let tagAppliances = document.querySelectorAll(".tag-appliances");
    let appliances = document.querySelector("#appliances");
    let appliancesList = appliances.querySelectorAll("li");
    if (tagAppliances.length > 0) {
      tagAppliances.forEach((tag) => {
        appliancesList.forEach((appliance) => {
          if (appliance.id === tag.id) {
            appliance.remove();
          }
        });
      });
    }
  }

  function removeSelectedUstensils() {
    let tagUstensils = document.querySelectorAll(".tag-ustensils");
    let ustensils = document.querySelector("#ustensils");
    let ustensilsList = ustensils.querySelectorAll("li");
    if (tagUstensils.length > 0) {
      tagUstensils.forEach((tag) => {
        ustensilsList.forEach((ustensil) => {
          if (ustensil.id === tag.id) {
            ustensil.remove();
          }
        });
      });
    }
  }

const searchIngredients = document.querySelector("#searchIngredients");
searchIngredients.addEventListener("input", searchInList);

const searchUstensils = document.querySelector("#searchUstensils");
searchUstensils.addEventListener("input", searchInListUstensils);

const searchAppliances = document.querySelector("#searchAppliances");
searchAppliances.addEventListener("input", searchInListAppliances);

 //function qui permet de chercher dans les differentes listes dans n'importe quel cas (ingredients, ustensils, appareils)
  function searchInList() {
    let search = document.querySelector("#searchIngredients");
    let list = document.querySelectorAll("#ingredients li");
    let searchValue = search.value.toLowerCase();
    list.forEach((item) => {
      if (item.textContent.toLowerCase().indexOf(searchValue) > -1) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }

  function searchInListUstensils() {
    let search = document.querySelector("#searchUstensils");
    let list = document.querySelectorAll("#ustensils li");
    let searchValue = search.value.toLowerCase();
    list.forEach((item) => {
      if (item.textContent.toLowerCase().indexOf(searchValue) > -1) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }

  function searchInListAppliances() {
    let search = document.querySelector("#searchAppliances");
    let list = document.querySelectorAll("#appliances li");
    let searchValue = search.value.toLowerCase();
    list.forEach((item) => {
      if (item.textContent.toLowerCase().indexOf(searchValue) > -1) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }




  //clear input search function
  function clearInputSearch() {
    let search = document.querySelector("#searchIngredients");
    search.value = "";
    let list = document.querySelectorAll("#ingredients li");
    list.forEach((item) => {
      item.classList.remove("hide");
    });
  }

  function clearInputSearchUstensils() {
    let search = document.querySelector("#searchUstensils");
    search.value = "";
    let list = document.querySelectorAll("#ustensils li");
    list.forEach((item) => {
      item.classList.remove("hide");
    });
  }

  function clearInputSearchAppliances() {
    let search = document.querySelector("#searchAppliances");
    search.value = "";
    let list = document.querySelectorAll("#appliances li");
    list.forEach((item) => {
      item.classList.remove("hide");
    });
  }


  const searchInput = document.querySelector("#search");
const ingredientsList = document.querySelectorAll("#ingredients li");
const ustensilsList = document.querySelectorAll("#ustensils li");
const appliancesList = document.querySelectorAll("#appliances li");

// Créez un tableau pour chaque type de liste qui ne contient que les éléments qui sont actuellement visibles
const visibleIngredients = Array.from(ingredientsList).filter((ingredient) => !ingredient.classList.contains("hide"));
const visibleUstensils = Array.from(ustensilsList).filter((ustensil) => !ustensil.classList.contains("hide"));
const visibleAppliances = Array.from(appliancesList).filter((appliance) => !appliance.classList.contains("hide"));

function searchInLists(searchText, ingredients, ustensils, appliances) {
  // Filtrez les éléments de liste qui ne contiennent pas le texte de recherche et masquez-les
  ingredients.forEach((ingredient) => {
    if (ingredient.textContent.toLowerCase().indexOf(searchText) > -1) {
      ingredient.classList.remove("hide");
    } else {
      ingredient.classList.add("hide");
    }
  });

  ustensils.forEach((ustensil) => {
    if (ustensil.textContent.toLowerCase().indexOf(searchText) > -1) {
      ustensil.classList.remove("hide");
    } else {
      ustensil.classList.add("hide");
    }
  });

  appliances.forEach((appliance) => {
    if (appliance.textContent.toLowerCase().indexOf(searchText) > -1) {
      appliance.classList.remove("hide");
    } else {
      appliance.classList.add("hide");
    }
  });
}

searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  searchInLists(searchText, visibleIngredients, visibleUstensils, visibleAppliances);
});

  

 


  //show dinamycally the recipes in the html page from the input search bar with id "search"

  search.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    let filteredRecipes;
    
    // Get the tags that are currently present in the tag section
    const tags = document.querySelectorAll('.tag');
    
    // If there are no tags present, search through all recipes
    if (tags.length === 0) {
      filteredRecipes = recipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(searchString) ||
          recipe.description.toLowerCase().includes(searchString) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchString)
          ) ||
          recipe.appliance.toLowerCase().includes(searchString) ||
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(searchString)
          )
        );
      });
    } else {
      // Otherwise, search only through recipes that have the selected tags
      filteredRecipes = recipes.filter((recipe) => {
        // Check if the search string is present in the recipe name, description, appliance, or any ingredient or utensil
        let searchStringMatch =
          recipe.name.toLowerCase().includes(searchString) ||
          recipe.description.toLowerCase().includes(searchString) ||
          recipe.appliance.toLowerCase().includes(searchString);
  
        // Check if any selected tag is present in the ingredients or utensils of the recipe
        let tagMatch = Array.from(tags).some((tag) =>
  recipe.ingredients.some((ingredient) => tag.id === ingredient.ingredient)) || Array.from(tags).some((tag) => recipe.ustensils.some((ustensil) => tag.id === ustensil)
);
        // Return true if the search string or a selected tag is present in the recipe
        return searchStringMatch || tagMatch;
      });
    }
    
    if (searchString.length >= 3) {
      if (filteredRecipes.length > 0) {
        displayRecipes(filteredRecipes);
      } else {
        document.querySelector(
          "#recipes"
        ).innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`;
      }
    }
  });
};
