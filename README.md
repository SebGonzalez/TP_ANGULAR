------------------M2 Informatique spécialité "Ingénieurie du logiciel et des données"------------------

					
					Architecture logiciel 


Membre du groupe : Sébastien Gonzalez, Anthony Pinatel & Sébastien Lamblin


-----------------------------------------Description du projet-----------------------------------------



Réaliser une application Web de gestion des références commerciales d’une société d’ingénierie.

- Création et gestion d'une base de données 
- Création d'une interface
- Création des différents types d'utilisateurs
- Ajout/Modification/Suppression des références commerciales
- Exportation de documents en pdf




-----------------------------------------Technologie utilisé-----------------------------------------

Nous avons utilisé plusieurs technologies pour mener à bien ce projet :

- Angular JS
- Node/npm
- Kendo ui (PDF)
- Mock
- Sass
- NestJS

-------------------------------Installation du projet sur votre machine-------------------------------

En tout premier lieu, il faut cloner le projet sur votre machine : 

	<git clone https://github.com/SebGonzalez/TP_ANGULAR.git>

Se placer dans la racine du projet :

	<npm install>

Pour pouvoir lancer "Back-end mock serveur" : 

	<sudo npm install -g json-server>

Pour lancer la base de données : 

Il faut ouvrir une invite de commande, se déplacer à la racine du fichier puis exécuter :

	<json-server --watch Database/bd.json>

Lancer une autre invite de commande en paralléle, se déplacer à la racine du fichier puis exécuter : 

	<ng serve>

--------------------------------------------Documentation-----------------------------------------

Angular  : https://github.com/johnpapa/heroes-angular
	   https://openclassrooms.com/fr/courses/4668271-developpez-des-applications-web-avec-angular

Sass     : https://openclassrooms.com/fr/courses/6106181-simplifiez-vous-le-css-avec-sass

Kindo ui : https://www.telerik.com/kendo-angular-ui/components/pdfexport/



 	 