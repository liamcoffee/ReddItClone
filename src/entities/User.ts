import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

// Defining the DB "tables"
import { ObjectID } from 'mongodb';
@ObjectType()
@Entity()
export class User {
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
	@PrimaryKey()
	@Property({ type: 'text', unique: true })
	@Unique()
	username!: string;

    // Cannot select the password, removed field property
	@Property({ type: 'text' })
	password!: string;
}
