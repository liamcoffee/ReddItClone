import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

// Defining the DB "tables"

@Entity()
export class Post {
	@PrimaryKey()
	id!: string;

	@Property()
	createdAt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Property()
	title!: string;
}
