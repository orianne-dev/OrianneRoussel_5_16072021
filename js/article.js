//******************** Déclaraton des variables *****************************//
const section = document.querySelector('.section'); 
//retourne l'objet permettant d'accéder aux arguments de la requête GET contenus dans l'URL.
const params = (new URL(document.location)).searchParams; 
//Obtiens l'id du produit
const id = params.get('id');  

//************************ Appel API ***************************************//
//appel API + Id definit par le const id
fetch('http://localhost:3000/api/cameras/' + id) 
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

//\\//\\//\\//\\//\\//\\ FONCTION CREATPRODUCT: création des differents de la page article \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
  function createProduct(element){

        let article = document.createElement('article');
        article.className = 'article card article-articlePage mx-auto border-dark';

        let img = document.createElement('img');
        img.className = 'article__image card-img-top';
        img.setAttribute('src', element.imageUrl);
        img.setAttribute('width', '300');

        let name = document.createElement('h2');
        name.className = 'article__nom card-title text-center';

        let description = document.createElement('p');
        description.className = 'article__description card-text text-center';

        let prix = document.createElement('p');
        prix.className = 'article__prix text-center';

        let lien = document.createElement('a');
        lien.setAttribute('href', 'article.html?id=' + element._id);
        lien.className = 'article__lien';

        let button = document.createElement("button");	
		    button.setAttribute('class','product-link btn btn-dark'); 
		    button.setAttribute('data-id_product', element._id); 
		    button.setAttribute('data-name_product', element.name);
		    button.setAttribute('data-price_product', element.price); 
		    button.innerHTML = 'Ajouter au panier';

        let select = document.createElement("select");	 
        select.setAttribute("id", "list");
    
        name.innerText = element.name;
        description.innerText = element.description;
        prix.innerText = element.price / 100 + "€";

        article.appendChild(img);
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(prix);
        article.appendChild(lien);
        article.appendChild(select);
		    article.append(button);
		    section.appendChild(article);

        let features = element.lenses;

        features.forEach(feature => {

        let option = document.createElement("option");
        option.text = feature;
        option.value = feature;
        select.append(option);

        });	 

//=============================== GESTION PANIER =================================/
button.addEventListener("click",(event) => {
    // produitSelection --> recuperation des valeurs choisis
let produitSelection = {                               
  nomPdt: button.getAttribute('data-name_product'),
  idPdt: button.getAttribute('data-id_product'),
  prix: button.getAttribute('data-price_product') / 100
};
//////////////FONCTION fenetre pop up////////////
const popupConfirm = () =>{

  if(window.confirm( `${element.name} à bien été ajouté au panier
    Consultez le panier OK ou revenir à l'acceuil ANNULER`)){ 
      window.location.href = "panier.html";
  }else{
     window.location.href = "index.html";
        } 
}
/////////////////Fin Fonction pop up//////////////

//stocker la recuperation des valeurs dans le LS réafecter fonction  pdtInLocalStorage --> recuperer dans le ls panier et le parser
let pdtInLocalStorage = JSON.parse(localStorage.getItem('panier'));

//gestion des doublons
for (let i in pdtInLocalStorage) {
 
	// id ==> id en param url
		if(pdtInLocalStorage[i].idPdt == id)
		{  
			// produit existant déjà dans le panier => je le vire du panier
			console.log('trouvé');
			pdtInLocalStorage.splice(i,1);
			console.log('supprimé');
		}
	} 

if(!pdtInLocalStorage){
	pdtInLocalStorage = [];
}

// et je le remplace car je ne gère pas les quantités
pdtInLocalStorage.push(produitSelection); 
localStorage.setItem('panier',JSON.stringify(pdtInLocalStorage));
// ensuite je lance la popupConfirm
popupConfirm();

})
//***************FIN gestion du panier ****************/
  }
//\\//\\//\\//\\//\\//\\//\\//\\//\\ FIN Fonction createProduct //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
 
