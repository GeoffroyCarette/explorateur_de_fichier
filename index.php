<?php 
require_once './vendor/autoload.php';
$liste_fichier = array();

// Rendu du template
$loader = new Twig_Loader_Filesystem(__DIR__ . '/php/templates');
$twig = new Twig_Environment($loader, [
	// 'cache' => __DIR__ . '/tmp'
	'cache' => false
]);

// Routing
if (isset($_GET["fichier"])) { // Si la var existe
		$chemin = realpath($_GET["fichier"]);
		if ($mainDir = opendir($chemin)) { // Si le répertoire existe
			while(false !== ($fichier = readdir($mainDir))) { // fait la boucle tant qu'il n'y a pas d'erreurs
				if($fichier != '.' && $fichier != 'index.php') { // gère les exceptions
					$liste_fichier[] = $fichier; // ajoute chaque itération au tableau
				} 
			}
        };
        // appelle grille.twig et lui passe le tableau
		echo $twig->render('grille.twig', array('liste_fichier' => $liste_fichier));
} else {
	echo $twig->render("index.twig"); // appelle l'index par défaut
}


?>