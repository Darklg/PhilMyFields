
function phil_test(elname, elvalues, type) {
	if(type != 'or') type = 'and';
	var retour = (type == 'or') ? 0 : 1;
	elname = elname.toLowerCase();
	
	for (var i in elvalues){
		if(type == 'or' && elname.indexOf(elvalues[i]) >= 0 || elname == elvalues[i]) {
			retour = 1;
		}
		else if(type == 'and' && elname.indexOf(elvalues[i]) < 0){
			retour = 0;
		}
	}
	
	return retour;
}

function phil_random_string(str_type,str_length){
	var retour = '';
	var chars = "";
	
	if(str_type == 'alnum' || str_type == 'alpha' || str_type == 'mots'){
		chars += 'abcdefghiklmnopqrstuvwxyz';
	}
	
	if(str_type == 'alnum' || str_type == 'digit'){
		chars += '0123456789';
	}
	
	if(str_type == 'mots'){
		chars += 'ABCDE FGHIJ KLMNO PQRST UVWXYZ . , - !';
	}
	
	// http://www.mediacollege.com/internet/javascript/number/random.html
	for (var i=0; i<str_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		retour += chars.substring(rnum,rnum+1);
	}
	
	return retour;
}

function phil_rand_arr(tableau){
	return tableau[Math.floor(Math.random() * tableau.length)];
}

function phil_content_spinning(txt){
	var matches = txt.match(/{[^{]+}/g);
	if(matches[0]){
		for (i in matches) {
			spin = matches[i]+'';
			ori_spin = spin;
			spin = spin.replace("{", "").replace("}", "");
			spin_strs = spin.split('|');
			txt = txt.replace(ori_spin,phil_rand_arr(spin_strs));
		}
	}
	return txt;
}

function phil_random(type){
	var retour = '';
	var rnum = Math.floor(Math.random() * 10) + 3;
	var prenoms = ['Gerard','Bernadette','Philippe','Ginette','Mireille','Brigitte','Jacques','Georges'];
	var noms = ['Dupond','Durand','Chiraque','Sarquozie','Pompydoux','Haubama','BenneLadenne','Deppe'];
	var mails = ['yopmail.fr','yopmail.com','yopmail.net','cool.fr.nf','jetable.fr.nf','nospam.ze.tc'];
	
	switch(type){
		case 'pseudo':
			retour =  (phil_rand_arr(prenoms)+phil_rand_arr(noms)+phil_random_string('digit',3)).toLowerCase();
			break;
		case 'email':
		 	retour = phil_random('pseudo')+'@'+phil_rand_arr(mails);
		 	break;
		case 'mot':
		 	retour = phil_random_string('alpha',rnum);
		 	break;
		case 'prenom':
			retour = phil_rand_arr(prenoms);
		break;
		case 'nom':
			retour = phil_rand_arr(noms);
		break;
		case 'adresse' :
			retour = (Math.floor(Math.random() * 50)+3) + ' rue '+phil_rand_arr(noms);
		break;
		default:
	}
	return retour;
}

function phil_my_fields(){
	var tp = nm = el = '';
	var phil_these = [];
	var phil_inputs = document.getElementsByTagName('input');
	var phil_txta = document.getElementsByTagName('textarea');

	for (var i in phil_inputs){
		nm = phil_inputs[i].name;
		tp = phil_inputs[i].type;
		if(!nm || nm == '' || !tp || tp == '' || tp == 'checkbox' || tp == 'radio' || tp == 'submit'){}
		else {
			phil_these.push(phil_inputs[i]);
		}
	}
	
	for (var i in phil_txta){
		
		var txt_tmp = phil_content_spinning('{Bonjour|Hello}, {je vous contacte|je voudrais vous parler}');
		
		phil_txta[i].value = txt_tmp;
	}
	
	for (var i in phil_these){
		el = phil_these[i];
		// Champ email
		if(el.type == 'email' || phil_test(el.name,['email','mail'],'or')){
			el.value = phil_random('email');
		} else if(phil_test(el.name,['pseudo','username','author'],'or')){
			el.value = phil_random('pseudo');
		} else if(phil_test(el.name,['code','postal','zipcode'],'or') || el.name == 'cp'){
			el.value = '75001';
		} else if(phil_test(el.name,['telephone','tel_','mobile'],'or') || el.name == 'tel'){
			el.value = '014'+phil_random_string('digit',7);
		} else if(phil_test(el.name,['city','ville'],'or')){
			el.value = 'Paris';
		} else if(phil_test(el.name,['siteweb','url'],'or')){
			el.value = 'http://darklg.me';
		} else if(phil_test(el.name,['firstname','prenom','first_name'],'or')){
			el.value = phil_random('prenom');
		} else if(phil_test(el.name,['lastname','name','nom'],'or')){
			el.value = phil_random('nom');
		} else if(phil_test(el.name,['adresse','address'],'or')){
			el.value = phil_random('adresse');
		} else if(el.type == 'password'){
			el.value = 'phil1phil';
		}
		else {
			el.value = 'ok';
		}
	}
}

phil_my_fields();