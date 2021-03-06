//***** Declaraton des variables *****//
const section = document.querySelector('.section');

//***** appel API *****// 

fetch('http://localhost:3000/api/cameras')     //fetch appel le serveur
.then(reponse => reponse.json())               //La variable reponse est le resultat de l'appel -- reponse.json transforme la reponse en objet Json
.then(cameras => {                             //La variable cameras retourne reponse.json

    for(i = 0; i < cameras.length; i++) {      // Boucle for qui permet Permet de créer les <article> avec la const section

        let article = document.createElement('article');
        article.className = 'article col-md-4 col-sm-6';

        let card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        let img = document.createElement('img');
        img.className = 'article__image img-fluid';
        img.setAttribute('src', cameras[i].imageUrl);

        let name = document.createElement('h2');
        name.className = 'article__nom text-center';

        let description = document.createElement('p');
        description.className = 'article__description';

        let prix = document.createElement('p');
        prix.className = 'article__prix text-center';

        let lien = document.createElement('a');
        lien.setAttribute('href', 'article.html?id=' + cameras[i]._id); //on appel l'index en cours dans la boucle de cameras
        lien.className = 'article__lien text-center btn btn-dark';


    
        name.innerText = cameras[i].name;
        description.innerText = cameras[i].description;
        prix.innerText = cameras[i].price / 100 + "€";
        lien.innerText = "Voir article";

        article.appendChild(card);
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(prix);
        card.appendChild(lien);
        section.appendChild(article);
    }

  })
.catch(function(err) {
    alert('Une erreur est survenue');
  });

