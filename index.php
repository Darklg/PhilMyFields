<?php
// On recupere l'url du dossier courant pour l'url du bookmarklet.
$uri_base = $_SERVER['REQUEST_URI'];
$uri_tmp = explode('/',$uri_base);
$url_finale = 'http://'.$_SERVER['HTTP_HOST'].'/';
foreach($uri_tmp as $uri_part){
	$uri_part = trim($uri_part);
	
	if(!empty($uri_part) && !preg_match('#\.#',$uri_part)){
		$url_finale .= $uri_part.'/';
	}
}
?><!DOCTYPE HTML>
<html lang="fr-FR">
	<head>
		<meta charset="UTF-8" />
		<title>Phil my Fields</title>
		<script src="phil.js"></script>
		
		<style>
		label {display:block;}
		</style>
	</head>
	<body>
		<h1>Phil my Fields</h1>
		
		<p>PhilMyFields est un bookmarklet permettant de remplir un formulaire d'inscription avec des données aléatoires. Et une adresse @<a href="http://yopmail.com">yopmail.com</a></p>
		
		<p>
			Clic-droit, puis ajouter aux favoris (ou bien un glisser-déposer vers votre barre de favoris) :
			<a href="javascript:if(typeof phil_my_fields != 'function'){function phillmyurls(url){var s=document.createElement('script');s.src=url+'?v='+Math.round(new Date().getTime()/1000);var x=document.getElementsByTagName('form')[0];x.parentNode.insertBefore(s,x);}phillmyurls('<?php echo $url_finale; ?>phil.js');}else{phil_my_fields();}">PhilMyFields</a>
		</p>
		
		<p>
			<button onclick="javascript:phil_my_fields();">Essayez-moi !</button>
		</p>

		<form action="" method="post">
			<div>
				<label for="username">Username</label>
				<input name="username" id="username" type="text" />
			</div>
			<div>
				<label for="email">Email</label>
				<input name="email" id="email" type="email" />
			</div>
			<div>
				<label for="adresse">Adresse</label>
				<input type="text" name="adresse" maxlength="35" value="" class="input180" size="18" />
			</div>
			<div>
				<label for="test_select">Valeur</label>
				<select name="test" id="test_select">
				    <option value="0">Trois</option>
				    <option value="1">Deux</option>
				    <option value="4">Une autre valeur</option>
				</select>
			</div>
			<div>
				<label for="message">Message</label>
				<textarea id="message" rows="3" cols="30"></textarea>
			</div>
		</form>
		
		<a href="http://github.com/darklg/PhilMyFields"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://a248.e.akamai.net/assets.github.com/img/7afbc8b248c68eb468279e8c17986ad46549fb71/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" /></a>
		
		
	</body>
</html>

