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
$var = 'index';
if (isset($_GET["var"])) {
	$var = $_GET["var"];
}

if($mainDir = opendir(__DIR__)) {
	while(false !== ($fichier = readdir($mainDir))) {
		if($fichier != '.' && $fichier != '..' && $fichier != 'index.php') {
			$liste_fichier[] = $fichier; 
			// echo var_dump($list_fichier);
		}
	}

};
echo readdir($mainDir);

# code...
echo $twig->render('index.twig', array('var' => $var));
	
# code...
echo $twig->render('grille.twig', array('liste_fichier' => implode( ", ", $liste_fichier)));
	



?>