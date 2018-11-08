<?php 
require_once './vendor/autoload.php'; 
/* On initialise un tableau vide qui contiendra le contenu (fichiers) du dossier 
qu'on lira par la suite avec readdir() */
$liste_fichier = array();

// Rendu du template
$loader = new Twig_Loader_Filesystem(__DIR__ . '/php/templates');
$twig = new Twig_Environment($loader, [
	// 'cache' => __DIR__ . '/tmp'
	'cache' => false
]);

// Routing
if (isset($_GET["fichier"])) { // Si la var existe
	// echo ($_GET["fichier"]);
		$chemin = realpath($_GET["fichier"]); // On assigne à une variable le chemin de la variable GET
		$mainDir = opendir($chemin); // On ouvre le dossier/fichier via son chemin
		if ($mainDir) { // Si le répertoire existe
			while(false !== ($fichier = readdir($mainDir))) { // fait la boucle tant qu'il n'y a pas d'erreurs
				if($fichier != '.' && $fichier != '..' && $fichier != 'index.php') { // gère les exceptions
					$liste_fichier[] = $fichier; // ajoute chaque itération au tableau

				} 
			}
        };
        // appelle grille.twig et lui passe le tableau
		$grille = $twig->render('grille.twig', array('liste_fichier' => $liste_fichier));
		$nav =  $twig->render('nav.twig', array('chemin' => $chemin));
        $sendToJS = array('grille' => $grille, 'chemin' => $nav);
        echo json_encode($sendToJS);

} else {
	echo $twig->render("index.twig"); // appelle l'index par défaut
}

?>