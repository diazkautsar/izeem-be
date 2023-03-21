import { Migration } from '@mikro-orm/migrations';

export class Migrations_20230320_001_CreateTableUser extends Migration {
    async up(): Promise<void> {
        const knex = this.getKnex();
        const schema = knex.schema;

        schema.createTable('users', (t) => {
            t.bigIncrements('id').primary().notNullable();
            t.string('name', 225).notNullable();
            t.string('job_title', 100).notNullable();
            t.string('summary_profile', 100).notNullable();
            t.string('image_url', 225).nullable();

            t.string('created_by', 150).notNullable();
            t.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
            t.timestamp('deleted_at').nullable();
        });

        await this.addSql(schema.toQuery());
    }

    async down(): Promise<void> {
        const schema = this.getKnex().schema;
        schema.dropTableIfExists('users');
        await this.addSql(schema.toQuery());
    }
}
