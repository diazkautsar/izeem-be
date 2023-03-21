import { Migration } from '@mikro-orm/migrations';

export class Migrations_20230320_002_CreateTableSections extends Migration {
    async up(): Promise<void> {
        const knex = this.getKnex();
        const schema = knex.schema;

        schema.createTable('sections', async (t) => {
            t.bigIncrements('id').primary().notNullable();
            t.string('name', 100).notNullable();
            t.string('slug', 100).notNullable().unique();

            t.string('created_by', 150).notNullable();
            t.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('deleted_at').nullable();
        });

        await this.addSql(schema.toQuery());
    }

    async down(): Promise<void> {
        const schema = this.getKnex().schema;
        schema.dropTableIfExists('sections');
        await this.addSql(schema.toQuery());
    }
}
