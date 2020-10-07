const searchForm = document.getElementById('search-form');
const resultItems = document.getElementById('result-items');
const searchSelect = document.getElementById('search-select');
let searchQuery = "";

const api_key = 'Your_API';
const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?`;
const baserUrlIngr = `https://api.spoonacular.com/recipes/findByIngredients?`


searchSelect.addEventListener("change", (e) => {
    e.preventDefault();
    showType();
});

// get input from search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchApi(searchQuery);
})


function showType() {
    let typeOfRecipe = searchSelect.options[searchSelect.selectedIndex].value;
    return typeOfRecipe;
}

// fetch api function base from input
async function fetchApi(input) {

    // check options are selected
    if (searchSelect.selectedIndex === 0 || searchSelect.selectedIndex === 1) {
        let url = `${baseUrl}&apiKey=${api_key}&query=${input}&number=10&offset=0&minFat=0&minCarbs=0&minCalories=0`;
        await fetch(url)
            .then(
                (response) => response.json()
            )
            .then(function (response) {
                console.log(response.results);
                createDiv(response.results);
            })
    } else {
        let url = `${baserUrlIngr}&apiKey=${api_key}&ingredients=${input}&number=10`;
        await fetch(url)
            .then(
                (response) => response.json()
            )
            .then(function (response) {
                console.log(response);
                createDivIngredients(response);
            })
    }

}


// generate recipe div
function createDiv(recipes) {
    let createdDiv = "";
    recipes.map((recipe) => {
        createdDiv += `
        <div class="col-lg-6">
            <div class="result-content">
                <div class="image-content">
                    <img src="${recipe.image}" />
                </div>
                <div class="info-content">
                    <div class="info-title">
                        <a id="recipe-link" href="recipe.html?id=${recipe.id}"><h2>${recipe.title}</h2></a>
                    </div>
                    <div class="info-other">
                        <table>
                            <thead>
                                <tr>
                                    <th>Carbs</th>
                                    <th>Fats</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${recipe.nutrition.nutrients[0].amount.toFixed(2)}</td>
                                    <td>${recipe.nutrition.nutrients[1].amount.toFixed(2)}</td>
                                    <td>${recipe.nutrition.nutrients[2].amount.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    resultItems.innerHTML = createdDiv;
}

// generate ingredient div
function createDivIngredients(ingredients) {
    let createdDiv = "";
    ingredients.map((ingredient) => {
        createdDiv += `
        <div class="col-lg-6">
            <div class="result-content">
                <div class="image-content">
                    <img src="${ingredient.image}" />
                </div>
                <div class="info-content">
                    <div class="info-title">
                        <a id="recipe-link" href="recipe.html?id=${ingredient.id}"><h2>${ingredient.title}</h2></a>
                    </div>
                    <div class="info-other">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Unit</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${ingredient.usedIngredients[0].name}</td>
                                    <td>${ingredient.usedIngredients[0].unit}</td>
                                    <td>${ingredient.usedIngredients[0].amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    resultItems.innerHTML = createdDiv;
}
