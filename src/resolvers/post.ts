import { Post } from '../entities/Post';
import { MyContext } from 'src/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ObjectID } from 'mongodb';

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	posts(@Ctx() { em }: MyContext): Promise<Post[]> {
		return em.find(Post, {});
	}

	// Single post
	@Query(() => Post, { nullable: true })
	post(@Arg('id') id: string, @Ctx() { em }: MyContext): Promise<Post | null> {
		return em.findOne(Post, { _id: new ObjectID(id) });
	}

	// Create
	@Mutation(() => Post)
	async createPost(
		@Arg('title') title: string,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		const post = em.create(Post, { title });
		await em.persistAndFlush(post);
		console.log(`inserye the psot`, post);
		return post;
	}

	// Update
	@Mutation(() => Post)
	async updatePost(
		@Arg('id') id: string,
		@Arg('title', () => String, { nullable: true }) title: string,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		const post = await em.findOne(Post, { _id: new ObjectID(id) });
		if (!post) {
			return null;
		}
		if (typeof title !== 'undefined') {
			console.log(`oist`, post);
			post.title = title;
			await em.persistAndFlush(post);
		}
		return post;
	}

	// Delete
	@Mutation(() => Boolean)
	async deletePost(
		@Arg('id') id: string,
		@Ctx() { em }: MyContext
	): Promise<Boolean> {
		await em.nativeDelete(Post, { _id: new ObjectID(id) });
		return true;
	}
}
