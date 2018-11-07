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

// Fetch au click d'un fichier / dossier
let url_array = ["."];
window.addEventListener("dblclick", (event) => {
    url_array.push(event.target.getAttribute("data-path"));
    if (event.target.getAttribute("data-path") == ".." && url_array.length > 1) {
        url_array.splice(url_array.length - 2, url_array.length);
    } else if (event.target.getAttribute("data-path") == ".." && url_array.length == 1) {
		url_array.pop();
	}
    if (event.target.classList.contains("fichier")) {
        console.log(event.target.getAttribute("data-path"));
        fetch(`/explorateur_de_fichier/index.php?fichier=${arrayToUrl(url_array)}`)
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

