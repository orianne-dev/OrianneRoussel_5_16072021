//******************** Déclaraton des variables *****************************//
const panierBody = document.querySelector('.panierBody'); 
const tbody = document.querySelector('tbody');
let recupPanier = JSON.parse(localStorage.getItem('panier'));
let validForm = 0;
//Recuperation des données panier
console.log('voici mes données panier',JSON.parse(localStorage.getItem('panier')));

//\\//\\//\\//\\//\\//\\ TABLEAU ID PRODUIT \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//boucle for in ou for of creer un tableau dynamique d'id produit
let products = [];
//Aller chercher les id dans products
for (let p = 0; p < recupPanier.length; p++){
let idProducts = recupPanier[p].idPdt;
//Mettre les id du panier dans la variable "idProductsTableau"
products.push(idProducts);
console.log(products);
console.log('metode set ---->',[...new Set(products)])
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\ MSG PANIER VIDE \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const msgPanierVide = document.createElement('h2');
msgPanierVide.innerHTML = "Le panier est vide !";
msgPanierVide.className = "text-center";
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\ FONCTION addPanier --> définition des elements du panier \\//\\//\\//\\//\\//\\//\\//\\
if (recupPanier) { 
  for(let j = 0; j < recupPanier.length ; j++){

    let ligneTableau = document.createElement('tr');

    let nomArticle = document.createElement('th');
    nomArticle.className = 'article__nom';  
    nomArticle.textContent = recupPanier[j].nomPdt;
  
    let prix = document.createElement('td');
    prix.className = 'article__prix';
    prix.textContent = recupPanier[j].prix + "€"; 

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
}else{
  panierBody.innerHTML ='<h2 class = "text-panierVide text-center">Le panier est vide </h2>'
}

//Bouton vider le panier
let buttonDelete = document.createElement("button");	
buttonDelete.setAttribute('class','btnViderPanier product-link btn btn-dark');  
buttonDelete.textContent = 'Vider le panier';
const btnPanier = document.querySelector('.btn-panier');
btnPanier.appendChild(buttonDelete);
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


//\\//\\//\\//\\//\\//\\ VIDER LE PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//vider tout le panier
let btn = document.querySelector(".btnViderPanier");

btn.addEventListener("click", () => {
  localStorage.removeItem('panier');
  panierBody.innerHTML ='<h2 class = "text-center">Le panier est vide </h2>'
})
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\//\\supprimer un article//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//selection des references de tous les boutons btnSupprimeArticle
let btnsSupprimeArticle = document.querySelectorAll('.btn-sup');
for (let k = 0; k < btnsSupprimeArticle.length; k++){
  btnsSupprimeArticle[k].addEventListener('click' , (event) =>{
   event.preventDefault();

//Selection de l'id du produit qui va être supprimé en cliquant sur le bouton
let selectIdSupprime = recupPanier[k].idPdt;

//Selectionner les element a garder et supp l'element cliqué
recupPanier = recupPanier.filter( el => el.idPdt !== selectIdSupprime);

//mettre en format JSON et envoyer dans le ls
localStorage.setItem("panier", JSON.stringify(recupPanier));

//alert --> notifier que le produit a été supprimer et recharger la page
alert("Ce produit a été supprimé du panier");
window.location.href = "panier.html";
})
}
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//\\//\\//\\//\\//\\//\\ TOTAL PANIER \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//Declaration de la variable prixTotalCalcul pour y mettre les prix present dans le panier
 let prixTotalCalcul = [];
//Aller chercher les prix dans le panier
 for (let m = 0; m < recupPanier.length; m++){
   let prixProduitDansLePanier = recupPanier[m].prix;
//Mettre les prix du panier dans la variable "prixTotalCalcul"
   prixTotalCalcul.push(prixProduitDansLePanier);
   //console.log(prixTotalCalcul);
 }

//additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul" avec la methode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer,0);

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
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value
}

//******************** Validation du formulaire ***********************/
//valider prenom
const firstNameValide = contact.firstName;
if(/^[A-Za-z]+$/.test(firstNameValide)){
  validForm++;
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer un prénom valide !");
};

//valider nom
const lastNameValide = contact.lastName;
if(/^[A-Za-z]+$/.test(lastNameValide)){
  validForm++;
  console.log("OK");
}else{
  console.log("KO");
  alert("Merci de rentrer un nom valide !");
};

//valider adress
const adressValide = contact.adress;
if(/^[A-Za-z]+$/.test(adressValide)){
  validForm++;
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer une adresse valide !");
};

//valider city
const cityValide = contact.city;
if(/[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(cityValide)){
  validForm++;
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer une ville valide !");
};

//valider email
const emailValide = contact.email;
if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValide)){
  validForm++;
  console.log("OK");
}else{
  console.log("ko");
  alert("Merci de rentrer un email valide !");
};

//Mettre l'objet "contact" dans le local storage
localStorage.setItem("contact", JSON.stringify(contact));

//Mettre les values du formulaire et mettre les produits selectionnés dans un objet à envoyer vers le serveur
const objetPost = {
  contact,
  products
}
console.log('objet contact :', objetPost);
console.log(validForm);
//******************** fin Validation du formulaire ***********************/
//condition pour que le formulaire soit valide avant l'envoi 
if(validForm !== 5){
  validForm = []
}else(validForm == 5);{

//envoi de l'objet objetPost au serveur
const promise01 = fetch("http://localhost:3000/api/cameras/order", {
  method: "POST",
  body: JSON.stringify(objetPost),
  headers: {
    "content-Type" : "application/json",
  },
});
console.log("promise01");

console.log(promise01);

//Pour voir le resultat du serveur dans la console
promise01.then(async(response)=>{
  try{
    console.log(response);

    const contenu = await response.json();
    console.log(contenu);

if(response.ok){
  console.log(`Resultat de response.ok : ${response.ok}`);
  //recuperation de l'id de la reponse serveur
  console.log('id de response');
  console.log(contenu.orderId);

  //Mettre l'id dans le local storage
  localStorage.setItem("orderId", contenu.orderId);

  //Aller vers la page confirmation
  window.location = "confirmation.html";
}else{
  console.log(`Reponse du serveur : ${response.status}`);

}


  }catch(erreur){
    console.log(erreur);
  }
})


}
})

//************************ Fin addEventListener ***********************/



//********************* gestion panier ne pas rajouter de doublon ***********/
// let products = [];
// let produit_exist = false;
// if (window.localStorage.getItem("products")) {
// let products = JSON.parse(window.localStorage.getItem("products"));
// console.log(JSON.stringify(products).indexOf(JSON.stringify(data)));
// //check if a product exist in cart
// console.log(products);
// products.forEach((produit) => {
// if (produit._id === data._id) {
// produit_exist = true;
// produit.count += 1;
// }
// });
// if (produit_exist) {
// window.localStorage.setItem("products", JSON.stringify(products));
// } else {
// products.push(data);
// window.localStorage.setItem("products", JSON.stringify(products));
// }
// } else {
// products.push(data);
// window.localStorage.setItem("products", JSON.stringify(products));
// }
//********************************************************************************************************/


