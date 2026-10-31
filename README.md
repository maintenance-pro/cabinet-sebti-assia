# Cabinet Sebti Assia

Application de gestion du cabinet de kinésithérapie Sebti Assia (Berrechid) : agenda, patients, caisse, charges et résultat.

Site : https://cabinet-sebti-assia.web.app

## Données

Tout tient dans `index.html`. Les données sont dans **Firestore** (projet Firebase `cabinet-sebti-assia`, région `eur3`, protection contre la suppression activée) et restent consultables hors ligne grâce au cache du navigateur.

- Accès réservé aux comptes listés dans `COMPTES` (`index.html`) et dans `firestore.rules` (garder les deux listes identiques, puis déployer), avec une adresse e-mail confirmée.
- Connexion : **Continuer avec Google**, e-mail et mot de passe, ou **QR code** — l'ordinateur affiche un QR code, le téléphone le scanne et se connecte avec Google ; l'autorisation Google passe chiffrée (AES-GCM, clé contenue seulement dans le QR code) par `liaisons/{id}`, puis l'ordinateur se connecte avec.
- **Réglages › Données et compte** : télécharger une sauvegarde complète (JSON) ou en importer une.
- Les données saisies avec l'ancienne version (stockées dans le navigateur) sont proposées une fois à l'envoi en ligne.
- `exemple-cabinet-sebti-assia.json` est une sauvegarde d'exemple (patients fictifs) à importer depuis les Réglages.

## Mise en ligne

```sh
npm install -g firebase-tools
firebase login
firebase deploy --only hosting,firestore:rules,auth
```
