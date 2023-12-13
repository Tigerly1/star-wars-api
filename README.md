

# STAR WARS API GRAPHQL NEST PSQL TS

The Star Wars API provides comprehensive information about the Star Wars universe, including films, characters, species, starships, and planets. This GraphQL API allows clients to query for detailed data about each entity in the Star Wars universe, offering flexibility and customization in data retrieval

# Installation

## Create .env file and set variables

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `DB_HOST` - Database host (e.g., db) - Use `localhost` if you are not using Docker, and use db if you are using Docker (see `docker-compose.yml`)
- `DB_PORT` - Database port (e.g., 5432)
- `DB_USERNAME` - Database username (e.g., postgres)
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name (e.g., mydatabase)
- `TYPEORM_SYNC` - TypeORM Synchronization (should be `true` for development and `false` for production)


```bash
  docker compose -f "docker-compose.yml" up -d --build 
```



## Documentation

Now you should be able to access the GraphQL Playground on 
```http://localhost:3000/graphql```

Also there is standalone documentation in docs folder in index.html 

## TESTS

To run tests, run the following command
```bash
  npm test
```


