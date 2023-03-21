import {
    BaseEntity,
    BigIntType,
    Entity,
    PrimaryKey,
    Property,
    ManyToMany,
    Collection,
    ManyToOne,
} from '@mikro-orm/core';
import Sections from './sections.entity';

import Users from './users.entity';

@Entity({ tableName: 'fields' })
export default class Fields extends BaseEntity<Fields, 'id'> {
    @PrimaryKey({ type: BigIntType, nullable: false })
    id!: number;

    @Property({ fieldName: 'section_id' })
    section_id!: number;

    @Property({ fieldName: 'name', length: 100 })
    name!: string;

    @Property({ fieldName: 'slug', length: 100 })
    slug!: string;

    @Property({ fieldName: 'icon_url', length: 225, nullable: true })
    icon_url?: string | null;

    @Property({ fieldName: 'show_icon_url' })
    show_icon_url?: boolean = false;

    @ManyToMany(() => Users, (user) => user.fields)
    users = new Collection<Users>(this);

    @ManyToOne(() => Sections)
    section!: Sections;

    @Property({ fieldName: 'created_by' })
    created_by!: string;

    @Property({ fieldName: 'created_at', type: Date })
    created_at: Date | null = new Date();

    @Property({ fieldName: 'updated_at', type: Date, onUpdate: () => new Date() })
    updated_at: Date | null = new Date();

    @Property({ fieldName: 'deleted_at', type: Date, nullable: true })
    deleted_at?: Date | null = new Date();
}
