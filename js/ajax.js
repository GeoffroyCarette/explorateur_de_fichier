window.onload = () => {
    let files;
    let grille;
    // FETCH INITIAL
    fetch(`/GitHub/ACS/explorateur_de_fichier/index.php?fichier=./`) // passe la var fichier = dossier actuel
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
let url_array = [];
window.addEventListener("click", (event) => {
    url_array.push(event.target.getAttribute("data-path"));

    if (event.target.classList.contains("fichier")) {
        console.log(event.target.getAttribute("data-path"));
        fetch(`/GitHub/ACS/explorateur_de_fichier/index.php?fichier=${arrayToUrl(url_array)}`)
            .then((response) => { return response.text() })
            .then((response) => {
                grille = document.querySelector("#grille");
                grille.innerHTML = response;
            })
            .catch((error) => { console.log(error) })
    }
})

function arrayToUrl(array) {
    return array.toString().split(",").join("/");
}