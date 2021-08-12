//******************** Déclaraton des variables *****************************//
const panierBody = document.querySelector('.panierBody'); 
const params = (new URL(document.location)).searchParams; //retourne l'objet permettant d'accéder aux arguments de la requête GET contenus dans l'URL.
//Recuperation des données panier
console.log('voici mes données panier',JSON.parse(localStorage.getItem('panier')));
//let recupPanier = [];
//localStorage.setItem('panier',JSON.stringify(recupPanier)); // envoi dans le ls panierList strignify et a comme key panier

let recupPanier = localStorage.getItem('panier');
console.log(recupPanier.nomPdt);

//\\//\\//\\//\\//\\//\\ MSG PANIER VIDE \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

const msgPanierVide = document.createElement('h2');
msgPanierVide.innerHTML = "Le panier est vide !";
panierBody.appendChild(msgPanierVide);
msgPanierVide.className = "text-center";

// const msgPanierVide = () =>{
//recuperer info dans le panier
//const nomPdtDansPanier = recupPanier.nomPdt;

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\ FONCTION CREATION DES ELEMENT DU PANIER \\//\\//\\//\\//\\//\\//\\//\\

    let nomArticle = document.createElement('h2');
    nomArticle.className = 'article__nom card-title text-center';
    nomArticle.setAttribute('data-name_product', recupPanier.nomPdt);

    let prix = document.createElement('p');
    prix.className = 'article__prix text-center';
    prix.setAttribute('data-price_product', recupPanier.prix); 

    let buttonDelete = document.createElement("button");	
        buttonDelete.setAttribute('class','btnViderPanier product-link btn btn-dark');  
        buttonDelete.innerHTML = 'Vider le panier';

    nomArticle.innerText = recupPanier.nomPdt;
    prix.innerText = recupPanier.prix / 100 + "€";
 
    panierBody.appendChild(nomArticle);
    panierBody.appendChild(prix);
    panierBody.appendChild(buttonDelete);

//document.querySelector('.panierRep').innerHTML = localStorage.getItem('panier');
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


//\\//\\//\\//\\//\\//\\ VIDER LE PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
let btn = document.querySelector(".btnViderPanier");

btn.addEventListener("click", () => {
  localStorage.clear();
})
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

