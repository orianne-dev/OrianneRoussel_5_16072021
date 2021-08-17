//******************** Déclaraton des variables *****************************//
const panierBody = document.querySelector('.panierBody'); 
//const params = (new URL(document.location)).searchParams; //retourne l'objet permettant d'accéder aux arguments de la requête GET contenus dans l'URL.
//Recuperation des données panier
console.log('voici mes données panier',JSON.parse(localStorage.getItem('panier')));

////////Creation du panier sous forme de tableau 

//let recupPanier = [];

//function showCart()
//panier = JSON.parse(localStorage.getItem('panier))
//showCart();

//localStorage.setItem('panier',JSON.stringify(recupPanier)); // envoi dans le ls panierList strignify et a comme key panier

let recupPanier = JSON.parse(localStorage.getItem('panier'));

//\\//\\//\\//\\//\\//\\ MSG PANIER VIDE \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

const msgPanierVide = document.createElement('h2');
msgPanierVide.innerHTML = "Le panier est vide !";
msgPanierVide.className = "text-center";

// const msgPanierVide = () =>{
//recuperer info dans le panier
//const nomPdtDansPanier = recupPanier.nomPdt;

// // function pour un panier vide
// function showCart() {
//   //si le panier est égale à 0
//   if (panier.length == 0) {
//     //mise forme css annulé avec display none
//     //insertion message dans le html
//     //("Votre panier est vide");
//     return;
//   }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\ FONCTION addPanier --> définition des elements du panier \\//\\//\\//\\//\\//\\//\\//\\
if (recupPanier) { 
  for(let j=0; j < recupPanier.length ; j++){

    let nomArticle = document.createElement('h2');
      nomArticle.className = 'article__nom card-title text-center';
      nomArticle.textContent = recupPanier[j].nomPdt;
  
      let prix = document.createElement('p');
      prix.className = 'article__prix text-center';
      prix.textContent = recupPanier[j].prix + "€"; 
  
  
      // nomArticle.innerText = recupPanier.nomPdt;
      // prix.innerText = recupPanier.prix / 100 + "€";
   
      panierBody.appendChild(nomArticle);
      panierBody.appendChild(prix);
      
  
  }
}else{
  panierBody.innerHTML ='<h2 class = "text-center">Le panier est vide </h2>'
}


let buttonDelete = document.createElement("button");	
buttonDelete.setAttribute('class','btnViderPanier product-link btn btn-dark');  
buttonDelete.textContent = 'Vider le panier';

panierBody.appendChild(buttonDelete);

//document.querySelector('.panierRep').innerHTML = localStorage.getItem('panier');
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


//\\//\\//\\//\\//\\//\\ VIDER LE PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
let btn = document.querySelector(".btnViderPanier");

btn.addEventListener("click", () => {
  localStorage.removeItem('panier');
  panierBody.innerHTML ='<h2 class = "text-center">Le panier est vide </h2>'
})

//brouillon 
// supprimer un article

// function supprimerArticle(index) {
//   panier.splice(index, 1);
//   showCart();
//   saveCart();
//   alert('Votre article est bien supprimé');
//   }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//////// Brouillon 

// création de l'object javascript item

// let article = {
//   Product: nomArticle,
//   Price: prix,
// };

// function saveCart() {
// if (window.localStorage) {
// //récupération du localStorage
//   localStorage.panier = JSON.stringify(panier);
// }
// }

// //ajout du produit au panier
// panier.push(article);
// saveCart();
// showCart();
// }

//\\//\\//\\//\\//\\//\\//\\//\\//\\ FORMULAIRE //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// envoyer du JSON a l'API il faut transformer l'objet javaScript en JSON --> JSON.stringify()
// effectuer une requete de type POST avec la fonction fetch()

//creation objet contact

// const contact = {
//   firstName: neant,
//   lastName: neant,
//   adress: neant,
//   city: neant,
//   email: neant
// };

// const promisePost = fetch("http://localhost:3000/api/cameras/order", {
//   method: "POST",
//   body: JSON.stringify(contact),
//   headers: {
//     "content-type": "application/json"
//   },
// });

// promisePost.then(response) => {
//   try{
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// };

// const firstName = document.getElementById('firstName');
// firstName.setCustomValidity('Pour valider, renseigner votre prénom');

// const lastName = document.getElementById('lastName');
// lastName.setCustomValidity('Pour valider, renseigner votre nom');

// const adress = document.getElementById('adress');
// adress.setCustomValidity('Pour valider, renseigner votre adresse');

// const city = document.getElementById('city');
// city.setCustomValidity('Pour valider, renseigner votre ville');

// const email = document.getElementById('email');
// email.setCustomValidity('Pour valider, renseigner votre email');
