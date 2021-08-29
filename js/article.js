//******************** Déclaraton des variables *****************************//
const section = document.querySelector('.section'); 
const params = (new URL(document.location)).searchParams; //retourne l'objet permettant d'accéder aux arguments de la requête GET contenus dans l'URL.
const id = params.get('id'); //Obtiens l'id du produit 

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


        let buttonOption = document.createElement("button");	
		    buttonOption.setAttribute('class','btn'); 
		    buttonOption.innerHTML = 'Voir option'; 
    
        name.innerText = element.name;
        description.innerText = element.description;
        prix.innerText = element.price / 100 + "€";

        article.appendChild(img);
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(prix);
        article.appendChild(lien);
        article.appendChild(buttonOption);
		    article.append(button);
		    section.appendChild(article);
        
//brouillon fonction option produit

      //   function selectionOption() {
      //     let select = document.createElement("Select");
      //     select.setAttribute("id", "mySelect");
      //     document.buttonOption.appendChild(select);
            
      //     let opttion = document.createElement("option");
      //     opttion.setAttribute("value", element.lenses);
      //     let nod = document.createTextNode(element.lenses);
      //     opttion.appendChild(nod);
      //     document.getElementById("MySelect").appendChild(opttion);
      // }

            //Fonction pour le tableau lenses
// const lenseList = () => {
//   for (let i = 0; i < camera.lenses.length; i++) {
//       const option = document.createElement("option") //Créé notre liste option
//       option.setAttribute("value", camera.lenses[i]) //Incrémente nos lenses à notre liste option               
//       option.innerHTML = camera.lenses[i]
//       option.appendChild(buttonOption)
//   }
// }

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

//appel fonction popup confirmation user 
popupConfirm();

//Si pdtInlocalStorage est dans le local storage
//Ajoute produitSelection à la fin du tableau pdtInLocalStorage
//envoi du LS panier en strignifiant pdtInlocalSorage
console.log('panier initial de la page produit : ', pdtInLocalStorage)

if(pdtInLocalStorage){
  pdtInLocalStorage.push(produitSelection); 
  localStorage.setItem('panier',JSON.stringify(pdtInLocalStorage));
  
  console.log('objet cliqué *************', localStorage.getItem('panier'));

 
}

//sinon (pas de pdt d'enregistré dans le local storage)
else{
  pdtInLocalStorage = [];
  pdtInLocalStorage.push(produitSelection); 
  localStorage.setItem('panier',JSON.stringify(pdtInLocalStorage));

  console.log(produitSelection);
  }
})
//***************FIN gestion du panier ****************/
  }
//\\//\\//\\//\\//\\//\\//\\//\\//\\ FIN Fonction createProduct //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

  

  
 
 
