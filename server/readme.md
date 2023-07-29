# Server

The server of the project is built with Node.js. It used Apollo server 4 to host the graphql server. The database used is MongoDB. Apollo server 4 is a powerful tool to build graphql servers. It is easy to use and has a lot of features. The complete backend has a schema definition structure. That means for type of operation there exist a resolver function inside resolver.js file which can make changes and retrieve data from the data base according to the corresponding schema. The Schemas are defined in the schema.js file. The schema defines the basic structure of the resolver function i.e its input and outputs. 

## Database

MongoDB is used here as the database to store the data in form of collections. All the data of this app is hosted on the MongoDB Atlas cloud service which makes it easier to access the data from anywhere. The database is hosted on the cloud and the connection string is stored in the .env file. The database is accessed using the mongoose library. The mongoose library is a wrapper around the MongoDB driver which makes it easier to access the database. The mongoose library also provides a lot of features like schema validation, data validation, etc. 

### Models

The models folders located inside the datasources folder contains the schema of the collections in the database. The schema is defined using the mongoose library. The schema defines the structure of the collection and also the validation of the data. The schema also defines the relationship between the collections. The schema is defined in the models folder. The schema is then exported and used in the resolvers to access the database.

## GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. The graphql server is hosted using apollo server 4 which provide powerful tools like the graphql playground where one can test the queries and mutations.

## Dependencies

- [@apollo/datasource-rest](https://www.npmjs.com/package/@apollo/datasource-rest): ^6.0.1
- [@apollo/server](https://www.npmjs.com/package/@apollo/server): ^4.7.4
- [bcrypt](https://www.npmjs.com/package/bcrypt): ^5.1.0
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.3.1
- [graphql](https://www.npmjs.com/package/graphql): ^16.7.1
- [graphql-tag](https://www.npmjs.com/package/graphql-tag): ^2.12.6
- [graphql-upload](https://www.npmjs.com/package/graphql-upload): ^16.0.2
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): ^9.0.0
- [mongoose](https://www.npmjs.com/package/mongoose): ^7.3.1
- [stripe](https://www.npmjs.com/package/stripe): ^12.13.0

## Tech Stack

**Server:** Node, GraphQL, Apollo Server 4

**Database** MongoDB

**Payment** Stripe



## Run Locally

Clone the project

```bash
  git clone https://github.com/somdev-hub/recipee/tree/master/server
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```