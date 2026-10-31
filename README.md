# Cabinet Sebti Assia

Application de gestion du cabinet de kinésithérapie Sebti Assia (Berrechid) : agenda, patients, caisse, charges et résultat.

Site : https://cabinet-sebti-assia.web.app

## Données

Tout tient dans `index.html`. Les données sont dans **Firestore** (projet Firebase `cabinet-sebti-assia`, région `eur3`, protection contre la suppression activée) et restent consultables hors ligne grâce au cache du navigateur.

- Accès réservé au compte `cabinetkinesebti@gmail.com`, adresse e-mail confirmée. Pour ajouter un compte, l'ajouter à la fois dans `COMPTES` (`index.html`) et dans `firestore.rules`, puis déployer.
- **Réglages › Données et compte** : télécharger une sauvegarde complète (JSON) ou en importer une.
- Les données saisies avec l'ancienne version (stockées dans le navigateur) sont proposées une fois à l'envoi en ligne.
- `exemple-cabinet-sebti-assia.json` est une sauvegarde d'exemple (patients fictifs) à importer depuis les Réglages.

## Mise en ligne

```sh
npm install -g firebase-tools
firebase login
firebase deploy --only hosting,firestore:rules
```
