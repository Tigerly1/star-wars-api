


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `DB_HOST` - Database host (e.g., db) - Use `localhost` if you are not using Docker, and use db if you are using Docker (see `docker-compose.yml`)
- `DB_PORT` - Database port (e.g., 5432)
- `DB_USERNAME` - Database username (e.g., postgres)
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name (e.g., mydatabase)
- `TYPEORM_SYNC` - TypeORM Synchronization (should be `true` for development and `false` for production)
