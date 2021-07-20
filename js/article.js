const section = document.querySelector('.section');

fetch('http://localhost:3000/api/cameras')
.then(reponse => reponse.json())
.then(cameras => { 
    console.log(cameras)
    }
)
.catch(function(err) {
    alert('Une erreur est survenue');
  });



// fonction recuperer l'ID dans l'URL 
// function getId() { 
//     const param = window.location.search;
//     console.log(window.location); //tester la fonction 
//     const id = param.replace('?id=', ''); //Retire ?ID des parametres de l'url, recupere uniquement l'identifiant
//     return id;
//     }

    //Appel URL
const params = (new URL(document.location)).searchParams;
const id = params.get('id'); //Obtiens l'id du produit