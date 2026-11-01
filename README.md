# Cabinet Sebti Assia

Application de gestion du cabinet de kinésithérapie Sebti Assia (Berrechid) : agenda, patients, caisse, charges et résultat.

Site : https://cabinet-sebti-assia.web.app — réservation en ligne pour les patients : https://cabinet-sebti-assia.web.app/rdv.html

## Données

Tout tient dans `index.html`. Les données sont dans **Firestore** (projet Firebase `cabinet-sebti-assia`, région `eur3`, protection contre la suppression activée) et restent consultables hors ligne grâce au cache du navigateur.

- Accès réservé aux comptes listés dans `firestore.rules` (seul endroit où figure la liste, jamais affichée ni présente dans la page), avec une adresse e-mail confirmée. Pour ajouter un compte : l'ajouter dans `firestore.rules` puis `firebase deploy --only firestore:rules`.
- Connexion : **Continuer avec Google** ou **QR code** (écran illustré, animé, aux couleurs du cabinet) — l'ordinateur affiche un QR code, le téléphone le scanne et se connecte avec Google ; l'autorisation Google passe chiffrée (AES-GCM, clé contenue seulement dans le QR code) par `liaisons/{id}`, puis l'ordinateur se connecte avec.
- Réservation en ligne (`rdv.html`, page publique) : les patients voient les créneaux libres (jamais de noms) et envoient une demande. L'application publie `public/agenda` et `occupation/{jour}` ; une demande (`demandes/{id}`) ne bloque pas le créneau : il ne se ferme qu'à la confirmation du cabinet, et `firestore.rules` refuse toute demande sur un créneau déjà confirmé. Les demandes s'affichent dans l'agenda et sous la cloche (Confirmer / WhatsApp / Refuser). Réglages › Réservation en ligne : activation, délai, lien, affiche QR code.
- Lien personnel du patient (`rdv.html#g=<clé>`) : envoyé avec la confirmation (ou depuis la fiche du rendez-vous), il permet au patient de changer la date / l'heure ou d'annuler lui-même, sauf le jour même. `gestion/{clé}` garde une copie minimale du rendez-vous (lisible avec la clé seulement) ; l'application applique le changement à l'agenda (ou le refuse si le créneau a été pris) et prévient le cabinet (cloche, message, notification).
- **Réglages › Données et compte** : télécharger une sauvegarde complète (JSON) ou en importer une.
- Les données saisies avec l'ancienne version (stockées dans le navigateur) sont proposées une fois à l'envoi en ligne.
- `exemple-cabinet-sebti-assia.json` est une sauvegarde d'exemple (patients fictifs) à importer depuis les Réglages.

## Application installable

Le site s'installe comme une application (PWA) : `manifest.webmanifest`, icônes dans `icons/`, `sw.js` (pages en ligne d'abord, copie hors ligne ; bibliothèques versionnées gardées en cache ; les données ne passent jamais par le service worker). Bouton « Installer l'application » sur l'écran de connexion, dans le menu, en bannière sur téléphone et dans Réglages (avec QR code).

## Mise en ligne

```sh
npm install -g firebase-tools
firebase login
firebase deploy --only hosting,firestore:rules,auth
```
