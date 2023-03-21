import { BaseEntity, BigIntType, Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';

import Users from './users.entity';
import Fields from './fields.entity';

@Entity({ tableName: 'user_fields' })
export default class UserFields extends BaseEntity<UserFields, 'id'> {
    @PrimaryKey({ type: BigIntType, nullable: false })
    id!: number;

    @Property({ fieldName: 'user_id' })
    user_id!: number;

    @Property({ fieldName: 'field_id' })
    field_id!: number;

    @Property({ fieldName: 'order' })
    order!: number;

    @Property({ fieldName: 'value', nullable: true })
    value?: string | null;

    @ManyToMany(() => Users)
    users = new Collection<Users>(this);

    @ManyToMany(() => Fields)
    fields = new Collection<Fields>(this);

    @Property({ fieldName: 'created_by' })
    created_by!: string;

    @Property({ fieldName: 'created_at', type: Date })
    created_at: Date | null = new Date();

    @Property({ fieldName: 'updated_at', type: Date, onUpdate: () => new Date() })
    updated_at: Date | null = new Date();

    @Property({ fieldName: 'deleted_at', type: Date, nullable: true })
    deleted_at?: Date | null = null;
}
