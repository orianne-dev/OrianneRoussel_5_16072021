//Recuperer l'id de la commande (provenant du serveur) dans le local storage
const responseId = localStorage.getItem("orderId");
console.log(`responseId : ${responseId}`);

//La structure HTML de la page confirmation
const positionElement5 = document.querySelector('.box-recap-commande');

const confirmationPage = `
<div class="recap-commande justify-content-center">
            <h2 class="text-center">Merci pour votre commande</h2>
            <p class="text-center">Votre commande numéro: <span class="numero-commande">${responseId}</span> a bien été prise en
                compte.</p>
            <p class="text-center">A bientôt sur Orinoco !</p>
        </div>
`;

//injection HTML
positionElement5.insertAdjacentHTML("afterbegin", confirmationPage);

//Effacer tout le local storage
function enleverLocalStorage(key){
    localStorage.removeItem(key);
}

enleverLocalStorage("contact");
enleverLocalStorage("panier");
enleverLocalStorage("orderId");
