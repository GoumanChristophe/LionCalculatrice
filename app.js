// DOM 

// Convertit la NodeList des éléments '.button' en un tableau pour faciliter les manipulations
const touches = [...document.querySelectorAll('.button')];
// Crée un tableau contenant les valeurs des attributs 'data-key' de chaque touche
const tableau = touches.map(touche => touche.dataset.key);
// Sélectionne l'élément du DOM qui agit comme l'écran de la calculatrice
const ecran = document.querySelector('.ecran');

// Écoute les événements de frappe au clavier
document.addEventListener('keydown', (e) => {
    const valeur = e.code; // Récupère le code de la touche pressée
    calculer(valeur); // Appelle la fonction de calcul avec la valeur de la touche pressée
})
    
// Écoute les événements de clic sur la page
document.addEventListener('click', (e) => {
    const valeur = e.target.dataset.key; // Récupère la valeur 'data-key' de l'élément cliqué
    calculer(valeur); // Appelle la fonction de calcul avec cette valeur
})

// Définit la fonction de calcul
const calculer = (valeur) => {
    if (tableau.includes(valeur)){ // Vérifie si la valeur est dans le tableau des touches autorisées
        switch (valeur) {
            case 'Delete': // Si la touche est 'Delete', efface l'écran
                ecran.textContent = "";
                break;
            case 'Escape': // Si la touche est 'Escape', efface également l'écran
                ecran.textContent = "";
                break;
            case 'Enter': // Si la touche est 'Enter', effectue le calcul
                const calcul = eval(ecran.textContent); // Utilise 'eval' pour calculer l'expression dans l'écran
                ecran.textContent = calcul; // Affiche le résultat du calcul sur l'écran
                break;
            case 'Quote':
                try {
                    let contenuEcran = ecran.textContent;
                    // Vérifie si le contenu actuel de l'écran est une opération nécessitant un pourcentage
                    if (contenuEcran.includes('+') || contenuEcran.includes('-') || contenuEcran.includes('*') || contenuEcran.includes('/')) {
                        // implentation du pourcentage a faire ici..
                        alert('Le calcul de pourcentage dans une opération n\'est pas encore implémenté.');
                    } else {
                        // Pour un cas simple où le pourcentage est appliqué à un seul nombre
                        const resultat = eval(contenuEcran.slice(0, -1)) / 100;
                        ecran.textContent = resultat.toString();
                    }
                } catch (e) {
                    alert('Erreur de calcul du pourcentage');
                }
                break;
            default: // Pour toutes les autres touches, ajoute le symbole ou le nombre à l'écran
                const index = tableau.indexOf(valeur); // Trouve l'index de la valeur dans le tableau
                const touche = touches[index]; // Récupère l'élément du DOM correspondant à cette touche
                ecran.textContent += touche.innerHTML; // Ajoute le contenu de cette touche à l'écran
        }
    }
}

// Écoute les erreurs globales sur la fenêtre
window.addEventListener('error', (e) => {
    alert('Une erreur est survenue dans votre calcul :' + e.message); // Affiche une alerte en cas d'erreur de calcul
});
