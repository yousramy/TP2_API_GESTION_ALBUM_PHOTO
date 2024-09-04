# API Users, Album et Photo

## Overview
Cette API permet de gérer des utilisateurs, des albums et des photos dans une application utilisant une architecture de microservices REST. Elle fournit des fonctionnalités CRUD (Create, Read, Update, Delete) pour chaque entité, permettant ainsi une gestion complète des données de l'application.

## Fonctionnalités Clés

1.Gestion des Utilisateurs :

  -Création, récupération, mise à jour et suppression des utilisateurs de l'application.
  -L'API permet aux utilisateurs de créer leur propre compte pour interagir avec la plateforme.
  -Les utilisateurs gérés par cette API ne sont pas liés aux utilisateurs collectés via le crawling de profils sur les réseaux sociaux.
  
2.Gestion des Albums :

  -Création, récupération, mise à jour et suppression d'albums.
  -Chaque album peut contenir plusieurs photos et sert à organiser les photos de manière structurée.
  -Les utilisateurs peuvent gérer leurs albums en créant des collections personnalisées.
  
3.Gestion des Photos :

  -Création, récupération, mise à jour et suppression de photos associées à des albums.
  -Les photos peuvent être ajoutées à des albums spécifiques et récupérées par album.
  -Cette API permet de gérer les métadonnées des photos telles que l'URL, la description, etc.

L'API est principalement utilisée pour gérer des comptes enregistrés et des entités associées (albums et photos) et est conçue pour offrir une intégration facile avec des applications frontales ou d'autres microservices.


### [POST] Create user
Allows the creation of a single user.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : POST → /user/

#### Parameters :
```javascript
{
  'firstname': String, // Optional
  'lastname': Number, // Optional
  'age': Number, // Optional
  'city': String // Optional
}
```

#### Response :
```javascript
  {
    _id: Object_ID,
    firstname: String,
    lastname: String,
    age: Number,
    city: String
  }
```

### [POST] Show user
Show an user by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

* HTTP request : GET → user/:id

#### Parameters :
```javascript
{
  id: String // Required
}
```

#### Response :
```javascript
  {
    _id: Object_ID,
    firstname: String,
    lastname: String,
    age: Number,
    city: String
  }
```

Endpoints Utilisateur

### [POST] Create user
Allows the creation of a single user.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : POST → /user/

### Parameters 
javascript
Copier le code
{
  'firstname': String, // Optional
  'lastname': String,  // Optional
  'age': Number,       // Optional
  'city': String       // Optional
}

### Response 

javascript
Copier le code
{
  _id: Object_ID,
  firstname: String,
  lastname: String,
  age: Number,
  city: String
}

### [GET] Show user
Show a user by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : GET → /user/:id

### Parameters 

```javascript
{
  id: String // Required
}
```

### Response 

```javascript
{
  _id: Object_ID,
  firstname: String,
  lastname: String,
  age: Number,
  city: String
}
```
Endpoints Album

### [POST] Create album

Allows the creation of a new album.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : POST → /album/

### Parameters 

```javascript
{
  'title': String,        // Required
  'description': String   // Optional
}
```

### Response 

```javascript
{
  _id: Object_ID,
  title: String,
  description: String
}
```

### [GET] Show album

Show an album by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : GET → /album/:id

### Parameters 

```javascript
{
  id: String // Required
}
```

### Response 
```javascript
{
  _id: Object_ID,
  title: String,
  description: String
}
```

### [DELETE] Delete album

Delete an album by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : DELETE → /album/:id

### Response 
```javascript
{
  message: "Album deleted successfully"
}
```javascript

### [PUT] Update album

Update an album by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

### Parameters 

```javascript
{
  'title': String,        // Optional
  'description': String   // Optional
}
```

### Response 

```javascript
{
  _id: Object_ID,
  title: String,
  description: String
}
```

### [GET] Get all albums

Retrieve all albums.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : GET → /albums

### Response 

```javascript
[
  {
    _id: Object_ID,
    title: String,
    description: String
  }
]
```

Endpoints Photo

### [POST] Create photo

Allows the creation of a new photo.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : POST → /photo/

### Parameters 
```javascript
{
  'albumId': Object_ID, // Required
  'url': String,        // Required
  'description': String // Optional
}
```

### Response 

```javascript
{
  _id: Object_ID,
  albumId: Object_ID,
  url: String,
  description: String
}
```

### [GET] Show photo
Show a photo by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : GET → /photo/:id

### Parameters 

```javascript
{
  id: String // Required
}
```
### Response 
```javascript
{
  _id: Object_ID,
  albumId: Object_ID,
  url: String,
  description: String
}
```

### [DELETE] Delete photo

Delete a photo by id.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : DELETE → /photo/:id

### [GET] Get all photos for album

Retrieve all photos for a specific album.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request : GET → /albums/:albumId/photos

### Parameters 

```javascript
{
  albumId: String // Required
}
```

### Response 

  ```javascript
{
    _id: Object_ID,
    albumId: Object_ID,
    url: String,
    description: String
  }
```

### [PUT] Update photo in album

Update a photo by id within a specific album.

|                            |                  |
|----------------------------|------------------|
| Requires authentication ?  | No               |
| Who can use it ?           | Owner and users  |
| Response formats           | application/json |

HTTP request: PUT → /albums/:albumId/photos/:photoId

### Parameters 

```javascript
{
  albumId: String,  // Required
  photoId: String,  // Required
  'url': String,    // Optional
  'description': String // Optional
}
```

### Response

```javascript
{
  _id: Object_ID,
  albumId: Object_ID,
  url: String,
  description: String
}
```

### Requirements
* node 16
* npm or yarn
* git
* mongodb (please configure config.js for link mongodb)

### Install
```yarn install```

### Production mode
```yarn prod```

### Dev mode
``` yarn dev```
