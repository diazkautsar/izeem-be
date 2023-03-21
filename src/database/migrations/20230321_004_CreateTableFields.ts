import { Migration } from '@mikro-orm/migrations';

export default class Migrations_20230321_004_CreateTableFields extends Migration {
    async up(): Promise<void> {
        const knex = this.getKnex();
        const schema = knex.schema;

        schema.createTable('fields', async (t) => {
            t.bigIncrements('id').primary().notNullable();
            t.integer('section_id').notNullable();
            t.string('name', 100).notNullable();
            t.string('slug', 100).notNullable();
            t.string('icon_url', 225).nullable();
            t.boolean('show_icon_url').defaultTo(false).notNullable();

            t.unique(['slug', 'section_id']);

            t.string('created_by', 150).notNullable();
            t.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('deleted_at').nullable();

            t.foreign('section_id').references('id').inTable('sections');
        });

        await this.addSql(schema.toQuery());
    }

    async down(): Promise<void> {
        const schema = this.getKnex().schema;
        schema.dropTableIfExists('fields');
        await this.addSql(schema.toQuery());
    }
}
