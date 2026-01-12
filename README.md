# Portail BDE SUPINFO

Refonte de la plateforme de gestion du BDE SUPINFO.

## Description

Ce projet est une application React (TypeScript) permettant de gérer les activités du BDE :

- Dashboard statistique
- Gestion des utilisateurs
- Gestion des produits
- Historique des commandes
- Carte de fidélité étudiante

## Technologies utilisées

- React (Create React App + TypeScript)
- Styled Components (Stylisation)
- Recharts (Graphiques)
- React Router DOM (Navigation)
- Lucide React (Icônes)

## Installation et Lancement

Pour lancer le projet localement, suivez ces étapes :

1. Assurez-vous d'avoir Node.js installé.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm start
   ```
4. L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

# Projet Voting App – Version réutilisable

Cette version propose une **nouvelle direction artistique** tout en conservant **le même fonctionnement applicatif** et **la même organisation de page** que le projet original.

## 1. Intégrer son propre logo et le nom du site

### Changer le nom du site

1. Ouvrir le fichier `templates/index.html` (ou équivalent)
2. Remplacer le titre affiché :

```html
<h1>Nom du site</h1>
```

3. Mettre à jour le titre HTML :

```html
<title>Nom du site</title>
```

### Ajouter un logo

1. Ajouter votre logo dans :

```
static/assets/logo.svg (ou .png)
```

2. Dans le HTML :

```html
<img src="/static/assets/logo.svg" alt="Logo du site" />
```

3. Ajuster la taille via le CSS :

```css
.logo {
  height: 48px;
}
```

---

## 2. Récupérer des données depuis une API (au lieu d’un JSON)

### Situation actuelle

Les données sont chargées depuis un fichier JSON local.

### Nouvelle approche (API REST)

#### Backend (Flask – exemple)

```python
import requests

@app.route('/data')
def get_data():
    response = requests.get("https://api.exemple.com/data")
    return response.json()
```

#### Frontend (JavaScript)

```js
fetch("/data")
  .then((res) => res.json())
  .then((data) => {
    // utiliser les données
  });
```

👉 Le format JSON retourné par l’API doit rester identique à celui utilisé auparavant.

---

## 3. Récupérer le rôle de connexion (user / admin)

### Exemple côté backend

```python
from flask import session

@app.route('/login', methods=['POST'])
def login():
    user = authenticate()
    session['role'] = user.role  # 'admin' ou 'user'
```

### Côté frontend

```js
fetch("/me")
  .then((res) => res.json())
  .then((user) => {
    if (user.role === "admin") {
      // afficher fonctionnalités admin
    }
  });
```

---

## 5. Supprimer la feature "test checkbox admin"

### Frontend

1. Supprimer la checkbox du HTML :

```html
<input type="checkbox" id="adminTest" />
```

2. Supprimer toute la logique JS associée :

```js
adminTest.addEventListener(...)
```

### Backend

- Supprimer toute condition basée sur cette checkbox
- Utiliser uniquement le rôle issu de la session ou du token

---

## 5. Projet réutilisable

Pour réutiliser ce projet :

1. Changer le logo et le nom du site
2. Brancher votre propre API
3. Adapter la DA via le CSS
4. Configurer l’authentification et les rôles

Le socle applicatif reste identique et peut être décliné pour plusieurs projets.

---

✅ Projet prêt pour production ou démonstration technique.
