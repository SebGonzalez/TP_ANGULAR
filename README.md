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

Installation du "Back-end mock" : 

	<sudo npm install -g json-server>

Pour lancer le "Back-end mock" : 

Il faut ouvrir une invite de commande, se déplacer à la racine du fichier puis exécuter :

	<json-server --watch Database/bd.json>

Lancer un autre invite de commande en paralléle, se déplacer à la racine du fichier puis exécuter afin de lancer le projet angular : 

	<ng serve>

-------------------------------Utilisation du projet sur votre machine-------------------------------

Le site web est accessible à l'url :

http://localhost:4200

Le back-end mock est accessible à l'url :

http://localhost:3000

Les différentes ressources sont disponibles aux adresses suivantes :

  Resources
  http://localhost:3000/users
  http://localhost:3000/reference
  http://localhost:3000/departement
  http://localhost:3000/ville

La base de donnée stock ainsi la liste des utilisateurs (seulement le mail et le type), les références commerciales, la liste des départements et villes de france.

Le mot de passe des utilisateur et l'authentification est gérer à l'aide de l'API firebase.
Trois compte sont disponible :
	- chef@hotmail.fr azerty (compte chef de projet)
	- admin@hotmail.fr azerty (compte administrateur)
	- salarie@hotmail.fr azerty (compte salarié)
Les images des références commerciales sont également stocké et géré à l'aide de l'API storage de firebase

Les images du wireframe sont disponible dans le dossier Wireframe à la racine du projet


-------------------------------Architecture du projet ---------------------------------------------

Plusieurs services sont utilisés (dossier services):
	- ReferencesService (pour la gestion des références)
	- UserService (pour la gestion de l'utilisateur courant, connexion etc...)
	- UsersService (pour la gestion de l'ensemble des utilisateurs)
	- VillesService (pour la gestion des villes)

Deux component sont utilisés pour le menu et le footer afin de les appliquer à chaque page.

Trois component sont utilisés pour les références :
 - ReferenceListComponent pour afficher la liste des références.
 - SingleReferenceComponent pour afficher les détails d'une référence. Les informations privées sont affichées seulement si l'utilisateur est connecté (dialogue avec le service UserService).
 - ReferenceFormComponent pour la création ou l'édition d'une référence.

 Pour les utilisateurs deux component sont utilisés :
 - UserListComponent pour afficher la liste des utilisateurs
 - UserFormComponent pour la création ou l'édition d'un utilisateur.


--------------------------------------------Documentation-----------------------------------------

Angular  : https://github.com/johnpapa/heroes-angular
	   https://openclassrooms.com/fr/courses/4668271-developpez-des-applications-web-avec-angular

Sass     : https://openclassrooms.com/fr/courses/6106181-simplifiez-vous-le-css-avec-sass

Kindo ui : https://www.telerik.com/kendo-angular-ui/components/pdfexport/



 	 