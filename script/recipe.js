const recipeContainer = document.getElementById('recipe-container');

document.addEventListener('DOMContentLoaded', function (event) {
    //  get parameters from url
    const queryUrl = window.location.search;
    console.log(queryUrl);

    //  get value of parameter ID
    const urlParams = new URLSearchParams(queryUrl);
    const recipeInfo = urlParams.get('id')
    console.log(recipeInfo);

    // fetch function
    fetchRecipe(recipeInfo);


})

async function fetchRecipe(paramID) {
    let urlId = `https://api.spoonacular.com/recipes/${paramID}/information?includeNutrition=false&&apiKey=88d92ff445d6439db76553d692fa3495`;
    await fetch(urlId)
        .then(
            (response) => response.json()
        )
        .then(function (response) {
            const data = [response];
            console.log(data);
            createRecipeDiv(data);
        })

}

function createRecipeDiv(recipeInfos) {
    let createdDiv = "";
    recipeInfos.map((info) => {
        createdDiv += `
        <div class="recipe-image">
            <div class="image-content">
                <img src="${info.image}" alt="">
            </div>
        </div>
        <div class="recipe-infos">
            <div class="recipe-title">
                <h2>${info.title}</h2>
            </div>
            <div class="recipe-other">
                <h4>Ready in minutes: <span>${info.readyInMinutes}</span></h4>
                <h4>Servings: <span>${info.servings}</span></h4>
                <h4>Summary:</h4>
                <p>${info.summary}</p>
                <h4>Instructions:</h4>
                <p>${info.instructions}</p>

            </div>
        </div>`
    });
    recipeContainer.innerHTML = createdDiv;
}