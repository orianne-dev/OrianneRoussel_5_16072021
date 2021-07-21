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

  //***** Fonction : création des different element de la section article *****//
  
  function createProduct(element)
  { 
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
    
        name.innerText = element.name;
        description.innerText = element.description;
        prix.innerText = element.price;
        lien.innerText = element._id; 
    
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(prix);
        article.appendChild(lien);
        article.appendChild(img);
		section.appendChild(article);
   
  }