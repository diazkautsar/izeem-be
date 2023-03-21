import { Migration } from '@mikro-orm/migrations';

export default class Migrations_20230321_005_CreateTableUserFields extends Migration {
    async up(): Promise<void> {
        const knex = this.getKnex();
        const schema = knex.schema;

        schema.createTable('user_fields', async (t) => {
            t.bigIncrements('id').primary().notNullable();
            t.integer('user_id').notNullable();
            t.integer('field_id').notNullable();
            t.integer('order').notNullable();

            t.string('created_by', 150).notNullable();
            t.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('deleted_at').nullable();

            t.foreign('user_id').references('id').inTable('users');
            t.foreign('field_id').references('id').inTable('fields');
        });

        await this.addSql(schema.toQuery());
    }

    async down(): Promise<void> {
        const schema = this.getKnex().schema;
        schema.dropTableIfExists('user_fields');
        await this.addSql(schema.toQuery());
    }
}
