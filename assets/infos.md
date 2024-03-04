# betaseries

Vous avez créé ce plugin en choisissant:
- Une seule action
- Une intention par la syntaxe de la phrase
- La possibilité d'avoir un nom de pièce dans la règle

Cette page d'information que vous lisez est au format [Markdown](https://fr.wikipedia.org/wiki/Markdown).
Elle a été générée automatiquement avec le plugin mais il est vivement recommandé de la modifier.

**Pour la modifier:** Allez dans l'onglet "Fichiers" et ouvrez le fichier _assets/info.md_

Markdown est le format d'écriture adopté par [GitHub](https://github.com/) pour les pages de Readme. 
Son format d'écriture est très simple et ne nécessite aucunes connaissances particulières.

Utilisez les fichiers d'informations de plugins existants comme exemples ou visitez le site 'http://demo.showdownjs.com' pour connaitre la syntaxe d'écriture.


### Règles pour tester le plugin
- test la commande
- test la commande dans le Salon
- test la commande dans la Cuisine

### Dans le fichier de propriétés:

#### L'objet "rules":
- "rules": ["test * (command|order)"]

La syntaxe (command|order) permet d'avoir une reconnaissance validée si Google renvoie "command" ou "order".
Pour connaitre les possibilités d'écriture des règles, référez-vous à la documentation de développement.

#### L'objet "tts":
Renvoie un tts à vocaliser en fonction de la pièce.

#### L'objet "clients":
Renvoie une action à exécuter en fonction de la pièce.

<br><br><br><br>