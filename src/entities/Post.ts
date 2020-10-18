import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

// Defining the DB "tables"
import { ObjectID } from 'mongodb';
@ObjectType()
@Entity()
export class Post {
	@Field(() => String)
	@PrimaryKey()
	_id!: ObjectID;

	@Field(() => String)
	@Property({ type: 'date' })
	createdAt = new Date();

	@Field(() => String)
	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Field(() => String)
	@Property()
	title!: string;
}
