// DOM 

// Convertit la NodeList des éléments '.button' en un tableau pour faciliter les manipulations
const touches = [...document.querySelectorAll('.button')];
// Crée un tableau contenant les valeurs des attributs 'data-key' de chaque touche
const tableau = touches.map(touche => touche.dataset.key);
// Sélectionne l'élément du DOM qui agit comme l'écran de la calculatrice
const ecran = document.querySelector('.ecran');
// Crée un tableau pour la fonction mémoire 
liste = [] ;

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
            case 'Escape' : // Si la touche est 'Escape', efface également l'écran
                ecran.textContent = "";
                break;

            case 'Enter': // Si la touche est Total, effectue le calcul
                const calcul = eval(ecran.textContent); // Utilise 'eval' pour calculer l'expression dans l'écran
                ecran.textContent = calcul; // Affiche le résultat du calcul sur l'écran
                break;

            case 'Digit2': // Si la touche est M+
                let memory = ecran.textContent.toString () ; // 
                liste.push(memory);
                ecran.textContent = "";
                break;

            case 'Digit3': // Si la touche est MR, affiche le résultat en mémoire
                 const somme = liste.reduce((acc, curr) => acc + Number(curr), 0);
                // Affiche le résultat dans l'élément HTML dédié
                ecran.textContent = somme.toString(); // Convertit le résultat en chaîne pour l'affichage
                console.log(somme); // Affiche également le résultat dans la console
                liste.length = 0; // Réinitialise la liste pour de futures opérations
                break;
            
            case 'Backquote': // Si la touche est Mc, efface le resultat en mémoire
            liste.length = 0;// Réinitialise la liste pour de futures opérations
                break;

            case 'Digit1': // Si la touche est M-, Elle soustraie le nombre au montant de la mémoire
                const negative = ecran.textContent
                const sommeneg = liste.reduce((acc, curr) => acc + Number(curr), 0);
                // Affiche le résultat dans l'élément HTML dédié
                ecran.textContent = sommeneg.toString() - negative; // Convertit le résultat en chaîne pour l'affichage
                //console.log(sommeneg); // Affiche également le résultat dans la console
                liste.length = 0; // Réinitialise la liste pour de futures opérations
                break;

            case 'Tab': // Si la touche est +/-, Elle change le symbole du chiffre
                let currentValue = Number(ecran.textContent); // Convertit le contenu de l'écran en nombre
                currentValue = currentValue * -1; // Change le signe du nombre
                ecran.textContent = currentValue.toString(); // Convertit le résultat en chaîne pour l'affichage
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
