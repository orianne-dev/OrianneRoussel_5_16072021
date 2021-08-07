//******************** Déclaraton des variables *****************************//

const section = document.querySelector('.section'); 
const params = (new URL(document.location)).searchParams; //retourne l'objet permettant d'accéder aux arguments de la requête GET contenus dans l'URL.
const id = params.get('id'); //Obtiens l'id du produit 
let pdtInLocalStorage =[]; //création du tableau ou seront stocké les articles
localStorage.setItem('panier',JSON.stringify(pdtInLocalStorage)); // envoi dans le ls panierList strignify et a comme key 'panier'


//************************ Appel API ***************************************//

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

        let buttonLenses = document.createElement('button');
        buttonLenses.className = 'btn buttonLenses btn-secondary btn-sm dropdown-toggle'
        buttonLenses.type = 'button';
        buttonLenses.toggleAttribute = "dropdown";
        buttonLenses.ariaExpanded = 'false';
        //Probleme pour afficher la liste des lentilles
        //S'affiche dans le DOM mais pas sur le navigateur

        let listLenses = document.createElement('ul');
        listLenses.className = 'dropdown-menu';

        let choixLenses = document.createElement('li');


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
    
        name.innerText = element.name;
        description.innerText = element.description;
        prix.innerText = element.price / 100 + "€";
        buttonLenses.innerText = 'Choix des lentilles'; 
        choixLenses.innerText = element.lenses;
	 
        article.appendChild(img);
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(buttonLenses);
        buttonLenses.appendChild(listLenses);
        listLenses.appendChild(choixLenses);
        article.appendChild(prix);
        article.appendChild(lien);
		    article.append(button);
		    section.appendChild(article);
   
//=============================== GESTION PANIER=================================/

//envoyer au panier : Déclenché au click sur button -->
  button.addEventListener("click",(event) => {

// produitSelection --> recuperation des valeurs choisis
let produitSelection = {                               
  nomPdt: button.getAttribute('data-name_product'),
  idPdt: button.getAttribute('data-id_product'),
  prix: button.getAttribute('data-price_product') / 100
};

//stocker la recuperation des valeurs dans le LS
// réafecter fonction  pdtInLocalStorage --> recuperer dans le ls 'panier' et le parser
pdtInLocalStorage = JSON.parse(localStorage.getItem('panier'));

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

//Si pdtInlocalStorage est dans le local storage
//Ajoute produitSelection à la fin du tableau pdtInLocalStorage
//envoi du LS panier en strignifiant pdtInlocalSorage
if(pdtInLocalStorage){
  pdtInLocalStorage.push(produitSelection); 
  localStorage.setItem('panier',JSON.stringify(pdtInLocalStorage));
  
  console.log('objet cliqué *************', localStorage.getItem('panier'));

//appel fonction popup confirmation user 
    popupConfirm(); 
}

//sinon (pas de pdt d'enregistré dans le local storage)
else{
  pdtInLocalStorage = [];
  pdtInLocalStorage.push(produitSelection); 
  localStorage.setItem('panier',JSON.stringify(produitSelection));

  console.log(produitSelection);
  }
})
//***************FIN gestion du panier ****************/
  }
//\\//\\//\\//\\//\\//\\//\\//\\//\\ FIN Fonction createProduct //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


//brouillon fais avec mentor///////////////////////////////////////////////////////////////////////////////////
                          
                          //réafecter fonction  pdtInLocalStorage --> recuperer dans le ls 'panier' et le parser
                          ///pdtInLocalStorage = JSON.parse(localStorage.getItem('panier')); 

                          //Ajoute produitSelection à la fin du tableau pdtInLocalStorage
                          ///pdtInLocalStorage.push(produitSelection);

                          //envoi du LS panier en strignifiant panierList
                          ///localStorage.setItem('panier',JSON.stringify(pdtInLocalStorage));
                          ///console.log('objet cliquer *************', localStorage.getItem('panier'));

                          //Envoi du panier vers panier.html
                          ///window.location.href='panier.html';

                          /////////////////////////////////////////////////////////////////////////////////////


  

  
 
 
