<?php 

require_once './vendor/autoload.php';
$liste_fichier = array();

// Rendu du template
$loader = new Twig_Loader_Filesystem(__DIR__ . '/php/templates');
$twig = new Twig_Environment($loader, [
	'cache' => false
]);

// Routing
if (isset($_GET["fichier"])) {
		if($mainDir = opendir($_GET["fichier"])) {
			while(false !== ($fichier = readdir($mainDir))) {
				if($fichier != '.' && $fichier != '..' && $fichier != 'index.php') {
					$liste_fichier[] = $fichier; 
				}
			}
		};
		echo $twig->render('grille.twig', array('liste_fichier' => $liste_fichier));
	
} else {
	echo $twig->render("index.twig");
}

	



?>