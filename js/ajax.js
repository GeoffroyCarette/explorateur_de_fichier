window.onload = () => {

    let files;
    let grille;

    // FETCH INITIAL
    fetch(`/explorateur_de_fichier/index.php?fichier=./`) // passe la var fichier = dossier actuel
        .then((response) => { return response.text() })
        .then((response) => {
            grille = document.querySelector("#grille");
            grille.innerHTML = response;
            files = document.querySelectorAll(".fichier");

        })
        .catch((error) => { console.log(error) })
}


// for (let i = 0; i < files.length; i++) {
//     let f = files[i];
//     // FETCH QUAND ON CLIQUE SUR UN DOSSIER / FICHIER
//     f.addEventListener('click', (event) => {
//         event.preventDefault();

//     })
// }

// Fetch au click d'un fichier / dossier

window.addEventListener("click", (event) => {

    if (event.target.classList.contains("fichier")) {
        fetch(`/explorateur_de_fichier/index.php?fichier=${event.target.getAttribute("data-path")}`)
            .then((response) => { return response.text() })
            .then((response) => {
                grille = document.querySelector("#grille");
                grille.innerHTML = response;
            })
            .catch((error) => { console.log(error) })
    }
})