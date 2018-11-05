<?php 

require_once './vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('./php/templates');
$twig = new Twig_Environment($loader);

$bool = true;

echo $twig->render('index.html.twig', array(
	'title' => "Coucou"
));

echo $twig->render('navbar.html.twig', array(
	'name' => "Lucas",
	'name3' => "Geoffroy",
	'bool' => $bool
));

echo $twig->render('path_menu_left.html.twig', array(
	'name2' => "Jules"
	
));


?>