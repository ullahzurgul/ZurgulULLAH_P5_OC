function retrieveDataFromAPI(){
    return fetch(`http://localhost:3000/api/products`)
    .then((res)=> res.json())
}

console.log(localStorage)

function getPanier(){
    let panier = localStorage.getItem('panier');


    if (panier == null){
        alert("Le panier est vide");
    }

    else {
        return JSON.parse(panier);
    }

}

function savePanier(panier){
    localStorage.setItem("panier", JSON.stringify(panier));
}



function removeProduct(product){
    let panier = getPanier();

    panier = panier.filter(
        (p) => p.id != product.id || p.option != product.option
    );

    savePanier(panier);
}


fetch("http://localhost:3000/api/products")
    .then(function (response){
        return response.json();
    })
    .then(function (retrieveDataFromAPI) {
        let panier = getPanier();
        for (let i = 0; i < panier.length; i += 1){
            const cartItems = document.getElementById("cart__items");


            const articleItem = document.createElement('article');
            articleItem.className = 'cart__item';
            articleItem.setAttribute('data-id' , '{product-ID}');
            articleItem.setAttribute('data-color' , '{product-color}');
            cartItems.appendChild(articleItem)
        
        
            const itemImg = document.createElement('div');
            itemImg.className = 'cart__item__img';
            articleItem.appendChild(itemImg)
        
        
            const imgUrl = document.createElement('img');
            imgUrl.src = '';
            imgUrl.alt = "Photographie d'un canapé";
            itemImg.appendChild(imgUrl)
        
            const itemContent = document.createElement('div');
            itemContent.className = 'cart__item__content';
            articleItem.appendChild(itemContent)
        
            // Content Description
        
            const itemContentDesc = document.createElement('div');
            itemContentDesc.className = 'cart__item__content__description';
            itemContent.appendChild(itemContentDesc)
        
            const contentDescTitle = document.createElement('h2');
            contentDescTitle.textContent = 'placeholderTitle';
            itemContentDesc.appendChild(contentDescTitle)
        
            const contentDescColor = document.createElement('p');
            contentDescColor.setAttribute('data-color', 'couleur');
            itemContentDesc.appendChild(contentDescColor)
        
            const contentDescPrice = document.createElement('p');
            contentDescPrice.textContent = 'placeholderPrice';
            contentDescColor.setAttribute('data-price', 'price');
            itemContentDesc.appendChild(contentDescPrice)
        
            //  End Content Description
        
        
            // contentSettings
        
            const itemContentSettings = document.createElement('div');
            itemContentSettings.className = 'cart__item__content__settings';
            itemContent.appendChild(itemContentSettings)
        
            const contentSettingsQty = document.createElement('div');
            contentSettingsQty.className = 'cart__item__content__settings__quantity';
            itemContentSettings.appendChild(contentSettingsQty)
        
            const contentSettingParagraph = document.createElement('p');
            contentSettingParagraph.textContent = 'Qté : ';
            contentSettingsQty.appendChild(contentSettingParagraph)
        
            const contentSettingInput = document.createElement('input');
            contentSettingInput.type = 'number';
            contentSettingInput.className = 'itemQuantity';
            contentSettingInput.name = 'itemQuantity';
            contentSettingInput.min = '1';
            contentSettingInput.max = '100';
            contentSettingInput.value = '0';
            contentSettingsQty.appendChild(contentSettingInput)
        
            // delete
        
            const contentSettingsDelete = document.createElement('div');
            contentSettingsDelete.className = 'cart__item__content__settings__delete'
            itemContentSettings.appendChild(contentSettingsDelete)
        
            const settingsDeleteButton = document.createElement('p');
            settingsDeleteButton.className = 'deleteItem';
            settingsDeleteButton.textContent = 'Supprimer';
            contentSettingsDelete.appendChild(settingsDeleteButton)
        
            // end contentSettings

            // -- 

            //Article - ID

            let articleId = document.querySelectorAll("section article")[i];
            articleId.setAttribute("data-id", panier[i].id)

            // Article - CLr

            let articleColor = document.querySelectorAll("section article")[i];
            articleColor.setAttribute("data-color", panier[i].option);

            // Color

            let couleur = document.querySelectorAll(
                ".cart__item__content_description > p[data-color]"
            )[i];
            couleur.innerText = panier[i].option;

            // Quantité

            let quantity = document.querySelectorAll(
                ".cart__item__content__settings__quantity > input"
            )[i];
            quantity.setAttribute("value", panier[i].quantity);

            // ----- Info API

            let foundProduct = retrieveDataFromAPI.find((p) => p._id == panier[i].id); 
        

            let imageSrc = document.querySelectorAll(".cart__item__img > img")[i];
            imageSrc.setAttribute("src", foundProduct.imageUrl);


            let nom = document.querySelectorAll(
                ".cart__item__content__description > h2"
            )[i];
            nom.innerText = foundProduct.name;


            let prix = document.querySelectorAll(
                ".cart__item__content__description > p[data-prix]"
            )[i];
            prix.innerHTML = `${foundProduct.price} €`;

        }
    })





    // -- form --



    //email

    const emailError = document.getElementById('emailErrorMsg');
    const emailInput = document.getElementById('email');

    function ValidateEmail(inputText){
    var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if(inputText.value.match(mailformat)){
            document.form1.text1.focus();
            return true;
        }else{
            emailError.textContent = "Veuillez saisir une adresse mail valide.";
            document.form1.text1.focus();
            return false;
        }
    }

    function addClickEventToButton(){

        const buttonOrder = document.getElementById('order');

        buttonOrder.addEventListener("click", function(){
            alert(containsNumber("58coucou"))
        })

    }

    function containsNumber(str) {
        return /\d/.test(str);
      }

    addClickEventToButton();

