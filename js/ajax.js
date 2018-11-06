files = document.querySelectorAll(".fichier");

window.onload = () => {
	 fetch(`/GitHub/ACS/explorateur_de_fichier/index.php?fichier=./`)
	.then((response) => { return response.text()})
	.then((response) => {console.log(response)})
	.catch((error) => { console.log(error)})
}

for (let i = 0; i < files.length; i++) {
	let f = files[i];
	f.addEventListener('click', (event) => {
		event.preventDefault();
		fetch(`/GitHub/ACS/explorateur_de_fichier/index.php?fichier=${f.getAttribute("href")}`)
.then((response) => { return response.text()})
.then((response) => {console.log(response)})
.catch((error) => { console.log(error)})
	})
}

