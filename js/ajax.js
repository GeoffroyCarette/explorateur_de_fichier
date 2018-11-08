window.onload = () => { // Au chargement de la page, fais un premier fetch 
    let files;
    let grille;
    // FETCH INITIAL
    fetch(`/explorateur_de_fichier/index.php?fichier=./`) // passe la var fichier = dossier actuel
        .then((response) => { return response.text() })
        .then((response) => {
            grille = document.querySelector("#grille");
            grille.innerHTML = response;
            files = document.querySelectorAll(".fichier");
            attributeCorrectIcon();
        })
        .catch((error) => { console.log(error) })
}

let divPath = document.querySelector(".div_path");
let url_array = ["."];

window.addEventListener("dblclick", (event) => { // Si on double click sur un icon, fais un fetch
    url_array.push(event.target.getAttribute("data-path"));
    if (event.target.getAttribute("data-path") == ".." && url_array.length > 1) {
        url_array.splice(url_array.length - 2, url_array.length);
    } else if (event.target.getAttribute("data-path") == ".." && url_array.length == 1) {
        url_array.pop();
    }

    if (event.target.classList.contains("fichier")) {
        // console.log(event.target.getAttribute("data-path"));
        fetch(`/explorateur_de_fichier/index.php?fichier=${arrayToUrl(url_array)}`)
            .then((response) => { return response.text() })
            .then((response) => {
                grille = document.querySelector("#grille");
                grille.innerHTML = response;
                divPath.textContent = arrayToUrl(url_array);
                attributeCorrectIcon();
            })
            .catch((error) => { console.log(error) })
    }
})

/* Fonction qui permet de transformer notre tableau contenant les data-path cliqué en une url valide */
function arrayToUrl(array) {
    return array.toString().split(",").join("/");
}

window.addEventListener("click", (event) => { // Si on clique sur un élément à gauche , fais un fetch
    if (event.target.classList.contains("aside-elem")) {
        fetch(`/explorateur_de_fichier/index.php?fichier=${event.target.getAttribute("data-path")}`)
            .then((response) => { return response.text() })
            .then((response) => {
                grille = document.querySelector("#grille");
                grille.innerHTML = response;
                divPath.textContent = "./" + event.target.getAttribute("data-path");
                attributeCorrectIcon();
            })
            .catch((error) => { console.log(error) })
    } else if (event.target.classList.contains("home")) {
        fetch(`/explorateur_de_fichier/index.php?fichier=${event.target.getAttribute("data-path")}`)
            .then((response) => { return response.text() })
            .then((response) => {
                grille = document.querySelector("#grille");
                grille.innerHTML = response;
                url_array.splice(1, url_array.length);
                divPath.textContent = "./";
                attributeCorrectIcon();
            })
            .catch((error) => { console.log(error) })
    }

})

function attributeCorrectIcon() {
    let icons = document.querySelectorAll('.icon');
    for (let i = 0; i < icons.length; i++) {
        let extension = icons[i].getAttribute('data-path').split(".")[1];
        let iconPath = icons[i].getAttribute('src');

        switch (extension) {
            case undefined:
                icons[i].setAttribute('src', "./img/icones/document.svg");
                break;
            case "lock":
                icons[i].setAttribute('src', "./img/icones/fichier_rempli.svg");
                break;
            case "md":
                icons[i].setAttribute('src', "./img/icones/readme.svg");
                break;
            case "html":
                icons[i].setAttribute('src', "./img/icones/chromium_logo.svg");
                break;
            case "git":
                icons[i].setAttribute('src', "./img/icones/git_logo.svg");
                break;
            case "json":
                icons[i].setAttribute('src',  "./img/icones/json_logo.svg");
                break;
            case "css":
                icons[i].setAttribute('src', "./img/icones/fichier_css.svg");
                break;
            case "scss":
                icons[i].setAttribute('src', "./img/icones/fichier_scss.svg");
                break;
            case "svg":
                icons[i].setAttribute('src', "./img/icones/svg_logo.svg");
                break;
            case "twig":
                icons[i].setAttribute('src', "./img/icones/twig_logo.svg");
                break;                 
            default:
                
                break;
        }
    }
}