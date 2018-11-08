window.onload = () => { // Au chargement de la page, fais un premier fetch 
    let files;
    let grille;
    renderResponse("./", "false");
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
        renderResponse(arrayToUrl(url_array), "false");
    }
})

/* Fonction qui permet de transformer notre tableau contenant les data-path cliqué en une url valide */
function arrayToUrl(array) {
    return array.toString().split(",").join("/");
}

window.addEventListener("click", (event) => { // Si on clique sur un élément à gauche , fais un fetch
    if (event.target.classList.contains("aside-elem")) {
        renderResponse(event.target.getAttribute("data-path"), "false");
    } else if (event.target.classList.contains("home")) {
        renderResponse(event.target.getAttribute("data-path"), "true");
    } else if (event.target.classList.contains("back")) {
        if (url_array.length > 1) {
            url_array.splice(url_array.length - 1, url_array.length);
        } else if (url_array.length == 1) {
            url_array.pop();
        }
        renderResponse(arrayToUrl(url_array), "false");
    }

})

function renderResponse(data, home) {
    fetch(`/explorateur_de_fichier/index.php?fichier=${data}&home=${home}`)
        .then((response) => { return response.json() })
        .then((response) => {
            grille = document.querySelector("#grille");
            grille.innerHTML = response.grille;
            divPath.innerHTML = response.chemin;
            attributeCorrectIcon();
        })
        .catch((error) => { console.log(error) })
}

// Fonction qui attribue un icone en fonction de l'extension 
function attributeCorrectIcon() {
    let icons = document.querySelectorAll('.icon');
    for (let i = 0; i < icons.length; i++) {
        let extension = icons[i].getAttribute('data-path').split(".")[1]; // On découpe la chaine afin de récupérer l'extension
        switch (extension) {
            case undefined:
                // On change le chemin de l'image en fonction de son extension
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
                icons[i].setAttribute('src', "./img/icones/json_logo.svg");
                break;
            case "css":
                icons[i].setAttribute('src', "./img/icones/fichier_css.svg");
                break;
            case "scss":
                icons[i].setAttribute('src', "./img/icones/fichier_scss.svg");
                break;
            case "svg":
                icons[i].setAttribute('src', "./img/icones/fichier_svg_logo.svg");
                break;
            case "twig":
                icons[i].setAttribute('src', "./img/icones/twig_logo.svg");
                break;
            case "php":
                icons[i].setAttribute('src', "./img/icones/php_logo.svg");
                break;
            case "js":
                icons[i].setAttribute('src', "./img/icones/fichier_js.svg");
                break;                   
            default:

                break;
        }
    }
}
