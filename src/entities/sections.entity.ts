import {
    BaseEntity,
    BigIntType,
    Entity,
    PrimaryKey,
    Property,
    ManyToMany,
    Collection,
    OneToMany,
} from '@mikro-orm/core';

import Users from './users.entity';
import Fields from './fields.entity';

@Entity({ tableName: 'sections' })
export default class Sections extends BaseEntity<Sections, 'id'> {
    @PrimaryKey({ type: BigIntType, nullable: false })
    id!: number;

    @Property({ fieldName: 'name', length: 100 })
    name!: string;

    @Property({ fieldName: 'slug', length: 100 })
    slug!: string;

    @ManyToMany(() => Users, (user) => user.sections)
    users = new Collection<Users>(this);

    @Property({ fieldName: 'created_by' })
    created_by!: string;

    @Property({ fieldName: 'created_at', type: Date })
    created_at: Date | null = new Date();

    @Property({ fieldName: 'updated_at', type: Date, onUpdate: () => new Date() })
    updated_at: Date | null = new Date();

    @Property({ fieldName: 'deleted_at', type: Date, nullable: true })
    deleted_at?: Date | null = null;
}
