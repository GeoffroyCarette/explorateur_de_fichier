<?php 

require_once './vendor/autoload.php';



// Rendu du template
$loader = new Twig_Loader_Filesystem(__DIR__ . '/php/templates');
$twig = new Twig_Environment($loader, [
	// 'cache' => __DIR__ . '/tmp'
	'cache' => false

]);

// Routing
$page = 'home';
if (isset($_GET["page"])) {
	$page = $_GET["page"];
}

switch ($page) {
	case 'index':
		# code...
		echo $twig->render('index.twig', array('page' => $page));
		break;
	case 'dossier':
		# code...
		echo $twig->render('dossier.twig', array('page' => $page));
		break;
	default:
		# code...
		header('HTTP/1.0 404 Not Found');
		echo $twig->render('404.twig', array('page' => $page));
		break;
}


?>