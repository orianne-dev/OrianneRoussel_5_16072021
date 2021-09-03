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
        
//brouillon fonction option produit

// function getSelectValue()
//         {
//             let selectedValue = document.getElementById("list").value;
//             console.log(selectedValue);
//         }
//         getSelectValue();

             //Fonction pour le tableau lenses
// const lenseList = () => {
//   for (let j = 0; j < camera.lenses.length; j++) {
//       let option = document.createElement("option") //Créé notre liste option
//       option.setAttribute("value", camera.lenses[j]) //Incrémente nos lenses à notre liste option               
//       option.innerHTML = camera.lenses[j]
//       option.appendChild(select)
//   }
// }
 //Fonction pour le tableau lenses
 //let tableauOption = [];

 let option = document.createElement("option");
 option.setAttribute("value", element.lenses);
 let nod = document.createTextNode(element.lenses);
 select.appendChild(option);
 option.appendChild(nod);
 document.getElementById("list").appendChild(option);

 let tableauOption = () => {
  for (let j = 0; j < camera.lenses.length; j++) {
      //let option = document.createElement("option") //Créé notre liste option
      option.setAttribute("value", camera.lenses[j]) //Incrémente nos lenses à notre liste option               
console.log(camera.lenses[j])
      option.innerHTML = camera.lenses[j]
      //option.appendChild(select)
console.log(j)

  }
}

console.log(element.lenses);




        //function selectionOption() {
            
//           let opttion = document.createElement("option");
//           opttion.setAttribute("value", element.lenses);
//           let nod = document.createTextNode(element.lenses);
//           opttion.appendChild(nod);
//           document.getElementById("MySelect").appendChild(opttion);
//       //}

//             //Fonction pour le tableau lenses
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

console.log('panier initial de la page produit : ', pdtInLocalStorage)

 let recupPanier = JSON.parse(localStorage.getItem('panier'));

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
 
