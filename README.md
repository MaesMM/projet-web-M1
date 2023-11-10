# projet-examen-m1

/* Tous droit réservée ISEN 2023*/

Membres du projet : 
  - Broage Nicolas
  - Maes Antoine
  - Monteil Mael
  - Vigneron Thomas

Référent de correction : 
  - Gallet Gérald

Répartitions de l'équipe : 
  - Broage Nicolas/ Monteil Mael/ Vigneron Thomas (Back-end)
  - Maes Antoine (Front-end)

Choix d'implémentation (Back-end) : 
  - Correction du Book 
  - Implémentation de Authors (Get, Create, Delete)
  - Implémentation de Genre (Get)
  - Implémentation de Users (Get)
  - Implémentaiton des Tests Unitaires
  - Documentation de l'API (Swagger)

Explication des choix (Back-end) : 
  - On corrige tout d'abord les relations du Book pour pouvoir avoir un exemple d'implémentation en back-end. On commence également l'implémentation de Create, Delete. 
  - On réalise l'implémentation de '/authors' qui ressemble en substance a Book. On utilise donc l'implémentation de Book pour faciliter la création de notre Authors. Et On continue en implémentant 'authors/:id' afin de pouvoir renvoyer un auteur en particulier.
  - Antoine, nous as communiqué un besoin vis-à-vis de Genre. Ainsi, on réalise l'implémentation de '/genres' qui nous permettra de récupérer l'ensemble des genres ainsi que leurs ID's.
  - En parallele de l'implémentation de Create et Delete Book, on commence l'implémentation de '/users' afin d'avoir l'ensemble de nos directories. Nous avons travaillé comme ceci car nous avons émis l'hypothèse que lorsqu'une fonction Create serait implémenté, on pourrait alors l'implémenter dans les autres en ayant la meme demarche en changeant tout de fois les dépendances. Pour Users, on a fait le choix de créer une table intermédiaire dans notre BDD afin de pouvoir mettre en relation un UserID et un BookId. Ainsi, on peut récupérer selon le besoin soit dans book pour avoir la liste de users possédant le livre ou dans users pour récupérer les livres qu'il possède. 
  - Enfin nous avons décidé de faire les tests untaires entre chaque implémentation mais avons décidé de ne pas les pushs tout de suite car ceci n'était pas encore fonctionnel.  
  - De plus, nous avons documenté l'API en utilisant Swagger qui nous permet de ne pas passer par un fichier yaml qui aurait été complexe. Nous avons documentés nos routes afin de rendre le tout lisible et de pouvoir decrire les formats qui sont communiqués au back et depuis le back. 

Choix d'implémentation (Font-end) :
- Je suis parti from scratch
- J'ai commencé par faire un layout du dashboard
- Pour le propager dans toute les pages, j'ai utilisé une fonctionnalité intrinsèque a l'app router de NextJS 13
- j'ai commencé par travailler sur les Books, j'ai d'abord utilisé un objet que je declarais dans la front et j'ai ensuite decomposé le tout dans un maximum de composant possible
- j'ai crée des fonctions de tri mais fautes de temps, je n'ai pas reussi a faire un hook reutilisable par toutes les pages.
- J'ai ensuite commencé a créer des formulaires pour que je puisse recuperer les données qui permettent de créer / update des row dans la DB.
- j'ai mis en place SVGR pour pouvoir utiliser des SVG comme des react component
- J'utilise React query pour recuperer mes données via l'API. Pourquoi utiliser react query ? https://www.kilukru.dev/demarrer-avec-react-query/
- une fois que tout étais bon pour les books j'ai reutilisé un maximum de composants pour les autres pages et j'ai adapté la logique de tri pour que ca corresponde aux consignes.



