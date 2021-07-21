//***** Declaraton des variables *****//
const section = document.querySelector('.section');

//***** appel API *****// 

fetch('http://localhost:3000/api/cameras')     //fetch appel le serveur
.then(reponse => reponse.json())               //La variable reponse est le resultat de l'appel -- reponse.json transforme la reponse en objet Json
.then(cameras => {                             //La variable cameras retourne reponse.json

    for(i = 0; i < cameras.length; i++) {      // Boucle for qui permet Permet de créer les <article> avec la const section

        let article = document.createElement('article');
        article.className = 'article';

        let name = document.createElement('h2');
        name.className = 'article__nom';

        let description = document.createElement('p');
        description.className = 'article__description';

        let prix = document.createElement('p');
        prix.className = 'article__prix';

        let lien = document.createElement('a');
        lien.setAttribute('href', 'article.html?id=' + cameras[i]._id); //on appel l'index en cours dans la boucle de cameras
        lien.className = 'article__lien';

        let img = document.createElement('img');
        img.className = 'article__image';
        img.setAttribute('src', cameras[i].imageUrl);
        img.setAttribute('width', '300');
    
        name.innerText = cameras[i].name;
        description.innerText = cameras[i].description;
        prix.innerText = cameras[i].price;
        lien.innerText = cameras[i]._id;
    
        article.appendChild(name);
        article.appendChild(description);
        article.appendChild(prix);
        article.appendChild(lien);
        article.appendChild(img);
        section.appendChild(article);
    }

  })
.catch(function(err) {
    alert('Une erreur est survenue');
  });

