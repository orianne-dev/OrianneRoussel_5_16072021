//  CREER UN ELEMENT DANS LE DOM 

//Creer l'element a 
let elemA = document.createElement('a');
//Changer l'attribut href de l'élement a
elemA.href = 'article.html';
//creer un texteNode
let linkLabel = document.createTextNode('Articles');
//Ajouter un texte à l'element a
elemA.appendChild(linkLabel);


