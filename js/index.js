//***********appel API*************// 

const section = document.querySelector('.section');

fetch('http://localhost:3000/api/cameras')     //fetch appel le serveur
.then(reponse => reponse.json())               //La variable reponse est le resultat de l'appel -- reponse.json transforme la reponse en objet Json
.then(cameras => {                             //La variable cameras retourne reponse.json
// Boucle for qui permet Permet de créer les <article> avec la const section
    for(i = 0; i < cameras.length; i++) {

        let article = document.createElement('article');
        article.className = 'article';

        let name = document.createElement('h2');
        name.className = 'article__nom';

        let description = document.createElement('p');
        description.className = 'article__description';

        let prix = document.createElement('p');
        prix.className = 'article__prix';

        let link = document.createElement('a');
        link.setAttribute('href', 'article.html?id=' + section._id);
        link.className = 'article__lien';

        // let image = document.createElement('img');
        // image.className = 'article__image';
        // image.setAttribute('scr', reponse.imageUrl);
        // image.setAttribute('width', '100%');
    
        name.innerText = cameras[i].name;
        description.innerText = cameras[i].description;
        prix.innerText = cameras[i].price;
        link.innerText = cameras[i]._id;
        // image.innerText = cameras[i].imageUrl;
    
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(prix);
        // article.appendChild(lien);
        // link.appendChild(image);
        section.appendChild(article);
    }

  })
.catch(function(err) {
    alert('Une erreur est survenue');
  });

   //Appel URL
// const params = document.location;
// console.log("params", params)
// const id = params.get('id'); //Obtiens l'id du produit

/* <a href="./html/product.html?id=${camera._id}"> */

  
