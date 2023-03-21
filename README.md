# Izeem

## Requirement
- Node.js `>= 18.0.0`
- Fastify `>= 4.13.0`
- Typescript
- PostgreSQL


# Installation
1. clone this repository to your localhost
2. Copy `.env.example` to `.env`
3. Install depedency
   ```bash
    npm install
   ```
4. Run the migration script
   ```bash
    npm run db-migration:up
   ```
   > ⚠️ Before running migration script, make sure your database connection is connected
4. Run the seeder script
   ```bash
    npm run db-seeder
   ```
   > ⚠️ Before running seeder script, make sure your database connection is connected
5. Run the scripts
   ```bash
   npm run dev
   ```
6. You are ready to go

# Writing migartion file
Migration file can be found on [`src/database/migrations/*.ts`](src/database/migrations/)

Use the following naming pattern for migration file
`${YYYYMMDD}_${sequencial_number}_${CamelCaseName}`

Example:

✅ `20230228_001_CreateUserTable.ts`

❌ `CreateUserTable_004_20230228.ts`


# API Dcoumentation
When you run `npm run dev`, you can access the API documentation by visiting `http://localhost:${PORT}/documentation`, where the value of PORT is specified in the .env file. For instance, if you set PORT to 3000, you can access the documentation at "http://localhost:3000/documentation".
