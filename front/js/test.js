// Stockage de l'url de l'API
const apiUrl = "http://localhost:3000/api/products";

// Stockage des éléments à ajouter au HTML
const htmlElement = `<a href=""> 
                <article> 
                        <img src="" alt=""> 
                        <h3 class="productName"> </h3> 
                        <p class="productDescription"> </p> 
                 </article> 
             </a>`;

// retrieveDataFromAPI
let retrieveDataFromAPI = fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })

  // Récupération des données de l'API
  .then(function (product) {
    // Boucle qui crée des éléments HTML pour chaque objet récupéré de l'API
    for (i = 0; i < product.length; i += 1) {

        document.querySelector("section").innerHTML =
        htmlElement + document.querySelector("section").innerHTML;

      // LIEN
      document
        .querySelector("section a")
        .setAttribute("href", `./product.html?id=${product[i]._id}`);

      // IMAGE
      document
        .querySelector("article img")
        .setAttribute("src", product[i].imageUrl);
      document
        .querySelector("article img")
        .setAttribute("alt", product[i].altTxt);

      // NOM
      document.querySelector("article h3").innerText = product[i].name;

      // DESC
      document.querySelector("article p").innerText = product[i].description;
    }
  });

retrieveDataFromAPI;
