//***** Declaraton des variables *****//
const section = document.querySelector('.section'); 
const params = (new URL(document.location)).searchParams; //retourne l'objet permettant d'accéder aux arguments de la requête GET contenus dans l'URL.
const id = params.get('id'); //Obtiens l'id du produit 

//***** Appel API *****//

fetch('http://localhost:3000/api/cameras/' + id) //appel API + Id definit par le const id
   .then(function(res) {
	if (res.ok) {
	  return res.json();
	}
  })
  .then(function(element) {   

	createProduct(element);

  })
  .catch(function(err) {
	alert('Une erreur est survenue lors du chargement de la fiche produit');
  });

  //***** Fonction createProduct: création des different element de la section article *****//
  function createProduct(element){

        let article = document.createElement('article');
        article.className = 'article';

        let name = document.createElement('h2');
        name.className = 'article__nom';

        let description = document.createElement('p');
        description.className = 'article__description';

        let prix = document.createElement('p');
        prix.className = 'article__prix';

        let lien = document.createElement('a');
        lien.setAttribute('href', 'article.html?id=' + element._id);
        lien.className = 'article__lien';
 
        let img = document.createElement('img');
        img.className = 'article__image';
        img.setAttribute('src', element.imageUrl);
        img.setAttribute('width', '300');

        let button = document.createElement("button");	
		    button.setAttribute('class','product-link btn btn-dark'); 
		    button.setAttribute('data-id_product', element._id); 
		    button.setAttribute('data-name_product', element.name);
		    button.setAttribute('data-price_product', element.price); 
		    button.innerHTML = 'Ajouter au panier';
    
        name.innerText = element.name;
        description.innerText = element.description;
        prix.innerText = element.price / 100;
        lien.innerText = element._id; 
	 
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(prix);
        article.appendChild(lien);
        article.appendChild(img);
		    article.append(button);
		    section.appendChild(article);
   
//***************gestion du panier ****************/
//addEventListener  -  Ecouter le bouton et envoyer au panier
  button.addEventListener("click",(event) => {
//recuperation des valeurs choisi
let pdtSelec = {
  nomPdt: button.getAttribute('data-name_product'),
  idPdt: button.getAttribute('data-id_product'),
  prix: button.getAttribute('data-price_product') / 100
};
//*************stocker la recuperation des valeurs dans le LS **********************//
// VARIABLE pdtInLocalStorage dans laquelle on met les clé et valeur qui iront dans le LS
let pdtInLocalStorage = JSON.parse(localStorage.getItem("produit"));

//FONCTION fenetre pop up 
const popupConfirm = () =>{
  if(window.confirm( `${element.name} a bien été ajouté au panier
  Consultez le panier OK ou revenir à l'acceuil ANNULER`)){ 
  window.location.href = "panier.html";
}else{
  window.location.href = "panier.html";
} 
}
//si il y a deja des pdt dans le LS
if(pdtInLocalStorage){
  pdtInLocalStorage.push(pdtSelec); //cree une variable qui contien l'id le nom et le prix
  localStorage.setItem("article",JSON.stringify(pdtInLocalStorage));


//appel fonction popup confirmation user 
  popupConfirm(); 
}
//si il n'y a pas de pdt d'enregistré dans le local storage
else{
  pdtInLocalStorage = [];
  pdtInLocalStorage.push(pdtSelec); 
  localStorage.setItem("article",JSON.stringify(pdtInLocalStorage));

  console.log(pdtInLocalStorage);
  }
})


  
  }


  

  
 
 
