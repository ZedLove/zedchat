migrate((db) => {
  const collection = new Collection({
    "id": "2eei1n5erqtocz8",
    "created": "2023-02-22 14:50:23.398Z",
    "updated": "2023-02-22 14:50:23.398Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "51yhwfp8",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tbqmq7yu",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "user = @request.auth.id",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2eei1n5erqtocz8");

  return dao.deleteCollection(collection);
})
