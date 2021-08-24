//******************** Déclaraton des variables *****************************//
const panierBody = document.querySelector('.panierBody'); 
const tbody = document.querySelector('tbody');

//Recuperation des données panier
console.log('voici mes données panier',JSON.parse(localStorage.getItem('panier')));

let products = JSON.parse(localStorage.getItem('panier'));

//\\//\\//\\//\\//\\//\\ MSG PANIER VIDE \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

const msgPanierVide = document.createElement('h2');
msgPanierVide.innerHTML = "Le panier est vide !";
msgPanierVide.className = "text-center";

// const msgPanierVide = () =>{
//recuperer info dans le panier
//const nomPdtDansPanier =  products.nomPdt;

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
if (products) { 
  for(let j=0; j < products.length ; j++){

    let ligneTableau = document.createElement('tr');

    let nomArticle = document.createElement('th');
    nomArticle.className = 'article__nom';  
    nomArticle.textContent = products[j].nomPdt;
  
    let prix = document.createElement('td');
    prix.className = 'article__prix';
    prix.textContent = products[j].prix + "€"; 

    let tdSupprimer = document.createElement('td');
    let btnSupprimeArticle = document.createElement('button');
    btnSupprimeArticle.setAttribute('class','btn-sup bg-dark text-light'); 
	  btnSupprimeArticle.innerHTML = '<i class="fas fa-trash-alt"></i> Supprimer';
		
    tbody.appendChild(ligneTableau);
    ligneTableau.appendChild(nomArticle);
    ligneTableau.appendChild(prix);
    ligneTableau.appendChild(tdSupprimer);
    tdSupprimer.appendChild(btnSupprimeArticle);
  
  }
}
else{
  panierBody.innerHTML ='<h2 class = "text-panierVide text-center">Le panier est vide </h2>'
}


let buttonDelete = document.createElement("button");	
buttonDelete.setAttribute('class','btnViderPanier product-link btn btn-dark');  
buttonDelete.textContent = 'Vider le panier';
const btnPanier = document.querySelector('.btn-panier');
btnPanier.appendChild(buttonDelete);

//document.querySelector('.panierRep').innerHTML = localStorage.getItem('panier');
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


//\\//\\//\\//\\//\\//\\ VIDER LE PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//vider tout le panier
let btn = document.querySelector(".btnViderPanier");

btn.addEventListener("click", () => {
  localStorage.removeItem('panier');
  panierBody.innerHTML ='<h2 class = "text-center">Le panier est vide </h2>'
})

//*********************  supprimer un article  **************************************

//selection des references de tous les boutons btnSupprimeArticle
let btnsSupprimeArticle = document.querySelectorAll('.btn-sup');
console.log(btnsSupprimeArticle);

for (let k = 0; k < btnsSupprimeArticle.length; k++){
  btnsSupprimeArticle[k].addEventListener('click' , (event) =>{
   event.preventDefault();

//Selection de l'id du produit qui va être supprimé en cliquant sur le bouton
let selectIdSupprime = products[k].idPdt;
//console.log(selectIdSupprime);

//Selectionner les element a garder et supp l'element cliqué
products = products.filter( el => el.idPdt !== selectIdSupprime);
  console.log(products);

//Supprimer les elements dans le LS
//mettre en format JSON et envoyer dans le ls
localStorage.setItem("panier", JSON.stringify(products));

//alert --> notifier que le produit a été supprimer et recharger la page
alert("Ce produit a été supprimé du panier");
window.location.href = "panier.html";
})
}

//fonction supprimer l'article
// function supprArticle(selectIdSupprime) {
//   for (let i = products.length - 1; i >= 0; --i) {
//     if (i === selectIdSupprime) {
//       alert('jai trouvé');
//       panier.splice(i, 1);
//     }
//   }
//   window.location.reload();
// }
// //console.log(supprArticle);
// supprArticle(selectIdSupprime);

// function supprimerArticle(index) {
//   panier.splice(index, 1);
//   showCart();
//   saveCart();
//   alert('Votre article est bien supprimé');
//   }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\ TOTAL PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//Declaration de la variable prixTotalCalcul pour y mettre les prix present dans le panier
 let prixTotalCalcul = [];

 //Aller chercher les prix dans le panier
 for (let m = 0; m < products.length; m++){
   let prixProduitDansLePanier = products[m].prix;

   //Mettre les prix du panier dans la variable "prixTotalCalcul"
   prixTotalCalcul.push(prixProduitDansLePanier);
   console.log(prixTotalCalcul);
 }

 //additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul" avec la methode .reduce
 const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer,0);

console.log(prixTotal);

//Le code HTML du prix total à afficher 
const  afficherPrixTotal = `<p class="afficherPrixTotal">Le prix total est de : ${prixTotal} € </p>`;

//injection HTML 
const d1 = document.querySelector('#one');
d1.insertAdjacentHTML('afterend', afficherPrixTotal);
//\\//\\//\\//\\//\\//\\ FIN TOTAL PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\//\\//\\//\\ FORMULAIRE //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//selection du bouton envoyer le formulaire
const btnForm = document.querySelector('.btn-form');

//************************ addEventListener ***********************/
btnForm.addEventListener('click', (e) =>{
  e.preventDefault();

//Creation de l'objet "contact" recuperation des valeurs du formulaire
const  contact = {
  firstName: document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  adress: document.querySelector("#adress").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value
}
//console.log(contact);

//******************** Validation du formulaire ***********************/
//valider prenom
const firstNameValide = contact.firstName;
if(/^[A-Za-z]+$/.test(firstNameValide)){
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer un nom valide !");
};

//valider nom
const lastNameValide = contact.lastName;
if(/^[A-Za-z]+$/.test(lastNameValide)){
  console.log("OK");
}else{
  console.log("KO");
  alert("Merci de rentrer un nom valide !");
};

//valider adress
const adressValide = contact.adress;
if(/^[a-zA-Z0-9\s,'-]*$/.test(adressValide)){
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer une adresse valide !");
};

//valider city
const cityValide = contact.city;
if(/[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(cityValide)){
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer une ville valide !");
};

//valider email
const emailValide = contact.email;
if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValide)){
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer un email valide !");
};

//controle validité formulaire avant envoi au local storage
// if (firstNameValide() && lastNameValide() && adressValide() && cityValide() && emailValide()) {
//   localStorage.setItem("contact", JSON.stringify(contact));
// }else{
//   alert("erreur");
// }

//Mettre l'objet "contact" dans le local storage
localStorage.setItem("contact", JSON.stringify(contact));

//Mettre les values du formulaire et mettre les produits selectionnés dans un objet à envoyer vers le serveur
const objetPost = {
  contact,
  products
}
console.log(objetPost);

//******************** fin Validation du formulaire ***********************/


//envoi de l'objet aEnvoyer au serveur
const promise01 = fetch("http://localhost:3000/api/cameras/order", {
  method: "POST",
  body: JSON.stringify(objetPost),
  headers: {
    "content-Type" : "application/json",
  },
});

console.log(promise01);

//Pour voir le resultat du serveur dans la console
promise01.then(async(response)=>{
  try{
    console.log(response);

    const contenu = await response.json();
    console.log(continu);

if(response.ok){
  console.log(`Resultat de response.ok : ${response.ok}`);
}else{
  console.log(`Reponse du serveur : ${response.status}`);

}


  }catch(erreur){
    console.log(erreur);
  }
})

})
//************************ Fin addEventListener ***********************/



//********************* mettre le contenu du localstorage dans les champs du formulaire ***********/
//Prendre la key dans le localStorage et la mettre dans une variable 
// const datalocalStorage = localStorage.getItem("contact");

// //convertir la chaine de caractere en objet javascript
// const datalocalStorageObjet = JSON.parse(datalocalStorage);
// console.log(datalocalStorage);

// //mettre les values du localstorage dans le formulaire
// document.querySelector('#firstName').setAttribute('value', datalocalStorageObjet.firstName);
// document.querySelector('#lastName').setAttribute('value', datalocalStorageObjet.lastName);
// document.querySelector('#adress').setAttribute('value', datalocalStorageObjet.adress);
// document.querySelector('#city').setAttribute('value', datalocalStorageObjet.city);
// document.querySelector('#email').setAttribute('value', datalocalStorageObjet.email);

//fonction " " --> le formulaire garde les donner meme si la page est rafraichis
// function remplirInputDepuisLocalStorage(){
//   document.querySelector("input").value = datalocalStorageObjet[input];
// };

// remplirInputDepuisLocalStorage("firstName");
// remplirInputDepuisLocalStorage("laststName");
// remplirInputDepuisLocalStorage("adress");
// remplirInputDepuisLocalStorage("city");
// remplirInputDepuisLocalStorage("email");

//********************************************************************************************************/









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


//************************************************** */

// const afficherformulaireHtml = () =>{

//   //selection ellement du DOM pour le positionnement du formulaire
//   const boxForm = document.querySelector('.boxForm');
//   const structureFormulaire = ` 

//     <div class="container-form">

//       <h2 class="titre-formulaire">Merci de valider le formulaire pour passer commande</h2>


//       <form action="http://google.com" metode="POST">

//         <label for="firstName" class="labelFlex">Entrez votre pénom</label>
//         <input id="firstName" name="contact" placeholder="Votre prénom" type="text" required maxlength="35"
//           class="flexInp">

//         <label for="lastName" class="labelFlex">Entrez votre nom</label>
//         <input id="lastName" name="contact" placeholder="Votre nom" type="text" required maxlength="35" class="flexInp">

//         <label for="address" class="labelFlex">Entrez votre adresse</label>
//         <input id="adress" name="contact" placeholder="Votre adresse" class="flexInp" type="text" required>

//         <label for="city" class="labelFlex">Entrez votre ville</label>
//         <input id="city" name="contact" placeholder="Votre ville" class="flexInp" type="text" required>

//         <label class="labelFlex" for="email">Entrez votre email</label>
//         <br>
//         <input id="email" name="contact" placeholder="Votre email" type="email" required class="flexInp" required
//           maxlength="50">

//         <button class="btn-form">Envoyer</button>

//       </form>
//     </div>` ;
    
// //injection HTML
// boxForm.insertAdjacentHTML("afterend", structureFormulaire);
// };

// //afficher le formulaire
// afficherformulaireHtml();