const liste = document.querySelector('.liste');

fetch('http://localhost:3000/api/cameras')
.then(reponse => reponse.json())
.then(cameras => { 

    for(i = 0; i < cameras.length; i++) {

        let newLi = document.createElement('li');
        let newName = document.createElement('h2');
        let newDescription = document.createElement('p');
        let newPrice = document.createElement('p');
    
        newName.innerText = cameras[i].name;
        newDescription.innerText = cameras[i].description;
        newPrice.innerText = cameras[i].price;
    
        newLi.appendChild(newName);
        newLi.appendChild(newDescription);
        newLi.appendChild(newPrice);
        liste.appendChild(newLi);
    }

  })
.catch(function(err) {
    alert('Une erreur est survenue');
  });

