window.onload = () => { // Au chargement de la page, fais un premier fetch 
    let files;
    let grille;
    renderResponse(".");
}

let divPath = document.querySelector(".div_path");
let url_array = ["."];
let url_array_stock = [""];
let previous_path;
let save_nav = [];

window.addEventListener("dblclick", (event) => { // Si on double click sur un icon, fais un fetch

    // S'assure que l'on ne puisse pas double cliquer sur les boutons de navigation et l'arborescence
    if (containsClass("fichier")) {

        // Ajoute le fichier au chemin
        isDir(event.target.getAttribute("data-path"), false);
        // Render
        renderResponse(arrayToUrl(url_array));

        console.log("double clique  : url_array_stock => " + url_array_stock);
        console.log("double clique  : url_array => " + url_array);
    }
})

/* Fonction qui permet de transformer notre tableau contenant les data-path cliqué en une url valide */
function arrayToUrl(array) {
    return array.toString().split(",").join("/");
}

window.addEventListener("click", (event) => { // Si on clique sur un élément à gauche , fais un fetch
    if (containsClass("aside-elem")) {
        // Réinitialise le chemin à la racine
        url_array = ["."];
        url_array_stock = ["."];
        // Ajoute l'élément à gauche dans le chemin 
        isDir(event.target.getAttribute("data-path"), true);
        // url_array.push(event.target.getAttribute("data-path"));
        // url_array_stock.push(event.target.getAttribute("data-path"));
        console.log("simple clique : url_array => " + url_array);
        console.log("simple clique : url_array_stock => " + url_array_stock);
        // renderResponse(event.target.getAttribute("data-path"));
    } else if (containsClass("home")) {
        url_array = ["."];
        url_array_stock = ["."];
        renderResponse(".");
    } else if (containsClass("back")) {
        if (url_array.length > 1) {

            url_array.pop();
            console.log("bouton back : url_array => " + url_array);
            console.log("bouton back : url_array_stock => " + url_array_stock);
        }
        renderResponse(arrayToUrl(url_array));
    } else if (containsClass("next")) {
        // Ne push que s'il y a quelque chose à pusher
        if (url_array.length < url_array_stock.length) {
            url_array.push(url_array_stock[url_array.length]);
            console.log("bouton next : url_array_stock => " + url_array_stock);
            console.log("bouton next : url_array => " + url_array);
            renderResponse(arrayToUrl(url_array))
        }


    }

})

function renderResponse(data) {
    fetch(`/explorateur_de_fichier/index.php?fichier=${data}`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            grille = document.querySelector("#grille");
            grille.innerHTML = response.grille;
            // let shortPath = response.chemin.split("/").splice(4).join("/");
            divPath.innerHTML = response.chemin;
            attributeCorrectIcon();
        })
        .catch((error) => {
            console.log(error)
        })
}

// Fonction qui vérifie si la cible possède une extension

function isDir(path, aside) {
    console.log(path.split("."));
    if (path.split(".").length <= 1) {
        url_array.push(path);
        url_array_stock.push(path);
    }

    if (aside) {
        renderResponse(event.target.getAttribute("data-path"));
    }
}

/* Fonction qui prend le nom d'une classe en paramètre et qui retourne un booléen
 selon l'occurence ou non de la classe sur l'event */

function containsClass(classNom) {
    return event.target.classList.contains(classNom);
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