# Database Migrations

This directory contains Sequelize migrations for the InstaBids SEO Engine.

## Migration Pattern

Migrations follow a timestamp naming pattern: `YYYYMMDDHHMMSS-migration-name.js`

For example:
- `20250501000000-create-tasks-table.js`
- `20250501000100-create-workflows-table.js`
- `20250501000200-add-task-workflow-associations.js`

## Migration Commands

To create a new migration:
```bash
npx sequelize-cli migration:generate --name add-new-feature
```

To run all pending migrations:
```bash
npm run db:migrate
```

To undo the most recent migration:
```bash
npm run db:migrate:undo
```

To undo all migrations:
```bash
npm run db:migrate:undo:all
```

## Migration Structure

Each migration file exports an `up` function for applying the migration and a `down` function for reverting it.

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Apply migration
    await queryInterface.createTable('Tasks', { /* ... */ });
  },
  down: async (queryInterface, Sequelize) => {
    // Revert migration
    await queryInterface.dropTable('Tasks');
  }
};
```

## Migration Best Practices

1. **Atomic Changes**: Each migration should make one atomic change to the database schema.
2. **Reversible**: The `down` function should perfectly reverse the changes made by the `up` function.
3. **Independent**: Migrations should be independent and not rely on the state of data created by other migrations.
4. **Safe Defaults**: Always provide default values for new columns in existing tables.
5. **Indexing**: Add indexes for columns that will be frequently searched or joined.
6. **Transaction Support**: Use transactions for multi-step migrations to ensure atomic execution.
7. **Data Migrations**: Keep schema and data migrations separate when possible.
