<?php 

// ---------- COPY/PAST TWIG DOC ----------------------------------------------------
require_once './vendor/autoload.php'; 
/* On initialise un tableau vide qui contiendra le contenu (fichiers) du dossier 
qu'on lira par la suite avec readdir() */

// Rendu du template
$loader = new Twig_Loader_Filesystem(__DIR__ . '/php/templates');
$twig = new Twig_Environment($loader, [
	// 'cache' => __DIR__ . '/tmp'
	'cache' => false
]);
//-----------------------------------------------------------------------------------

// Routing
/*
if (isset($_GET["fichier"])) { // Si la var existe
	$chemin = realpath($_GET["fichier"]); // On assigne à une variable le chemin de la variable GET
		// $splitString = explode("/", $chemin);
		// $spliceArr = array_splice($splitString, 5 , count($splitString));
		// $chemin = implode("/", $spliceArr);
		$mainDir = opendir($chemin); // On ouvre le dossier/fichier via son chemin
		if ($mainDir) { // Si le répertoire existe
			while(false !== ($fichier = readdir($mainDir))) { // fait la boucle tant qu'il n'y a pas d'erreurs
				if($fichier != '.' && $fichier != '..' && $fichier != 'index.php') { // gère les exceptions
					$liste_fichier[] = $fichier; // ajoute chaque itération au tableau
				} 
			}
		}
        // appelle grille.twig et lui passe le tableau
		$grille = $twig->render('grille.twig', array('liste_fichier' => $liste_fichier));
		$nav =  $twig->render('nav.twig', array('chemin' => $chemin));
        $sendToJS = array('grille' => $grille, 'chemin' => $nav);
        echo json_encode($sendToJS); */
/*
1 : Réception et Sécurité
2 : Open folder and list files
3 : Render
4 : Response to JS in JSON 
*/
if (isset($_GET["fichier"])) { // 1

	$regex = '/[(.)][(.)]/'; // 1
	$urlIsSecure = preg_match($regex, $_GET["fichier"]); // 1

	if (is_dir($_GET["fichier"]) && !$urlIsSecure) { // 1
		$chemin = realpath($_GET["fichier"]); 
		$splitString = explode("/", $chemin);
		$spliceArr = array_splice($splitString, 5 , count($splitString));
		$chemin = implode("/", $spliceArr);
		$liste_fichier = listFilesOfFolderIntoArray($_GET["fichier"]); // 2
		$grille = $twig->render('grille.twig', array('liste_fichier' => $liste_fichier)); // 3
		$nav =  $twig->render('nav.twig', array('chemin' => $chemin)); // 3
	    $sendToJS = array('grille' => $grille, 'chemin' => $nav); 
	    echo json_encode($sendToJS); // 4
	}
} else {
	echo $twig->render("index.twig"); // Si rien n'est reçu...
}

// Fonction qui retourne un array contenant les fichiers parcourus du dossier passer en 1er paramètre
function listFilesOfFolderIntoArray ($folder) {
	$path = realpath($folder); // On capte le chemin du fichier/dossier
	$mainDir = opendir($path); // On ouvre le dossier/fichier via son chemin
	if ($mainDir) { // Si le répertoire existe
		while(false !== ($fichier = readdir($mainDir))) { // fait la boucle tant qu'il n'y a pas d'erreurs
			if($fichier != '.' && $fichier != '..' && $fichier != 'index.php') { // gère les exceptions
				$liste[] = $fichier; // ajoute chaque itération au tableau
			} 
		}
		return $liste;
	}	
}

?>

