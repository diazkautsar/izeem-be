import { Migration } from '@mikro-orm/migrations';

export class Migrations_20230320_003_CreateTableUserSections extends Migration {
    async up(): Promise<void> {
        const knex = this.getKnex();
        const schema = knex.schema;

        schema.createTable('user_sections', async (t) => {
            t.bigIncrements('id').primary().notNullable();
            t.integer('order').notNullable();
            t.integer('user_id').notNullable();
            t.integer('section_id').notNullable();

            t.unique(['order', 'user_id']);
            t.unique(['user_id', 'section_id']);

            t.string('created_by', 150).notNullable();
            t.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('deleted_at').nullable();

            t.foreign('user_id').references('id').inTable('users');
            t.foreign('section_id').references('id').inTable('sections');
        });

        await this.addSql(schema.toQuery());
    }

    async down(): Promise<void> {
        const schema = this.getKnex().schema;
        schema.dropTableIfExists('user_sections');
        await this.addSql(schema.toQuery());
    }
}
