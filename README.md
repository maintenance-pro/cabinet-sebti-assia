# Cabinet Sebti Assia

Application de gestion du cabinet de kinésithérapie Sebti Assia (Berrechid) : agenda, patients, caisse, charges et résultat.

Tout tient dans `index.html`. Les données sont enregistrées dans le navigateur de chaque poste : utiliser **Réglages › Sauvegarde** pour exporter et restaurer.

`exemple-cabinet-sebti-assia.json` est une sauvegarde d'exemple (patients fictifs) à importer depuis les Réglages.

## Mise en ligne (Firebase Hosting)

```sh
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```
