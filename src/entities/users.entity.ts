import { BaseEntity, BigIntType, Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';

import Sections from './sections.entity';
import Fields from './fields.entity';

@Entity({ tableName: 'users' })
export default class Users extends BaseEntity<Users, 'id'> {
    @PrimaryKey({ type: BigIntType, nullable: false })
    id!: number;

    @Property({ fieldName: 'name', length: 225 })
    name!: string;

    @Property({ fieldName: 'job_title', length: 225 })
    job_title!: string;

    @Property({ fieldName: 'summary_profile', length: 225 })
    summary_profile!: string;

    @ManyToMany(() => Sections)
    sections = new Collection<Sections>(this);

    @ManyToMany(() => Fields)
    fields = new Collection<Fields>(this);

    @Property({ fieldName: 'created_by' })
    created_by!: string;

    @Property({ fieldName: 'created_at', type: Date })
    created_at: Date | null = new Date();

    @Property({ fieldName: 'updated_at', type: Date, onUpdate: () => new Date() })
    updated_at: Date | null = new Date();

    @Property({ fieldName: 'deleted_at', type: Date, nullable: true })
    deleted_at?: Date | null = new Date();
}
