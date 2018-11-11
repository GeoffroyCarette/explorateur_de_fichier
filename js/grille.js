var dragImg = new Image(); // Il est conseillé de précharger l'image, sinon elle risque de ne pas s'afficher pendant le déplacement
    dragImg.src = '../img/icones/document.svg';

const selectGrid = document.querySelector("#grille");
let dragged;

window.addEventListener("dragstart", (event) => {
	let elems = document.querySelectorAll(".elem");
	dragged = event.target;
	for (let elem of elems) {
		if (elem.childNodes[3].innerText !== dragged.childNodes[3].innerText) {
			elem.style.opacity = 0.0;
		}
	}
})

window.addEventListener("dragend", (event) => {
	let elems = document.querySelectorAll(".elem");
	for (let elem of elems) {
		if (elem.childNodes[3].innerText !== dragged.childNodes[3].innerText) {
			elem.style.opacity = 1.0;
		}
	}

})