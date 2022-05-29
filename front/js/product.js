const queryString = window.location.search;
// console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id')
// console.log(productId);



function retrieveDataFromAPI(){
    return fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res)=> res.json())

}


// Product Page

async function infoProduct(){
    
    const products = await retrieveDataFromAPI()
    // console.log(products)

    const itemImg = document.getElementsByClassName('item__img')[0]
    const itemTitlePrice = document.getElementsByClassName('item__content__titlePrice')[0]
    const contentDesc = document.getElementsByClassName('item__content__description')[0];

    for(var i = 0, len = products.colors.length; i < len; i++){

        const colorSelect = document.getElementById('colors')

        const colorOption = document.createElement("option");
        colorOption.value = products.colors[i];
        colorOption.textContent = products.colors[i];
        colorSelect.appendChild(colorOption);

    }


    const productImg = document.createElement('img');
    productImg.src = products.imageUrl;
    productImg.alt = products.altTxt;
    itemImg.appendChild(productImg);

    const itemTitle = document.getElementById("title");
    itemTitle.textContent = products.name;
    itemTitlePrice.appendChild(itemTitle);

    const itemDesc = document.getElementById('description');
    itemDesc.textContent = products.description;
    contentDesc.appendChild(itemDesc);

    const productPrice = document.getElementById('price');
    productPrice.textContent = products.price;

  

}

infoProduct()



// // ajoutPanier


var confirmButton = document.getElementById("addToCart")
confirmButton.addEventListener("click", function(){

    const quantity = document.getElementById('quantity').value;
    const color = document.getElementById('colors').value;

    const id = urlParams.get('id')

    // const panierAlt = [
    //     {id: id, quantity: parseInt(quantity), color: color,}
    // ]

    let panier = getBasket();

    // function productOrdered(panier, id, color){

       // On vérifie si l'id et la couleur sont identique, si oui on augmente la quantité, 

       // Si le produit est déjà dans le panier on augmente sa quantité, si il ne l'es pas on l'ajoute dans le panier.

    for (let product of panier) {
        if (product.id == id && product.color == color){
            product.quantity = parseInt(quantity) + parseInt(product.quantity);
            saveBasket(panier);
            console.log(panier);
            return
        }
    }

    panierAjouter()

    function panierAjouter(){
        panier.push({id: id, quantity: parseInt(quantity), color: color,})
        //sinon on ajoute un nouveau produit  
        saveBasket(panier);
        console.log("Nouveau produit ajouté !")

        
    }
        
    // }

    console.log(panier);

    // productOrdered(id, color, panierAlt);



    

    // Enregistrer le panier
    function saveBasket(panier){

        localStorage.setItem("panier", JSON.stringify(panier));

    }

    function getBasket(){
        let panier = localStorage.getItem("panier");

        if(!panier) {
            panier = [];
        }
        
        else{
            panier = JSON.parse(panier);
        }
        return panier

    }    

        
    function checkBasket(color, quantity){
        if (color == null || color == "" || quantity == null || quantity == "")
        { alert ("Veuillez choisir une couleur et une quantité");}
    }

    checkBasket();

        window.location.assign("cart.html");




})








