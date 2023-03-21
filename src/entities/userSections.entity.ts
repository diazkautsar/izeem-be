import { BaseEntity, BigIntType, Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';

import Users from './users.entity';
import Sections from './sections.entity';

@Entity({ tableName: 'user_sections' })
export default class UserSections extends BaseEntity<UserSections, 'id'> {
    @PrimaryKey({ type: BigIntType, nullable: false })
    id!: number;

    @Property({ fieldName: 'order' })
    order!: number;

    @Property({ fieldName: 'user_id' })
    user_id!: number;

    @Property({ fieldName: 'section_id' })
    section_id!: number;

    @ManyToMany(() => Users)
    users = new Collection<Users>(this);

    @ManyToMany(() => Sections)
    sections = new Collection<Sections>(this);

    @Property({ fieldName: 'created_by' })
    created_by!: string;

    @Property({ fieldName: 'created_at', type: Date })
    created_at: Date | null = new Date();

    @Property({ fieldName: 'updated_at', type: Date, onUpdate: () => new Date() })
    updated_at: Date | null = new Date();

    @Property({ fieldName: 'deleted_at', type: Date, nullable: true })
    deleted_at?: Date | null = null;
}
