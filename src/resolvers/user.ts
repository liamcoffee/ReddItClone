import { User } from '../entities/User';
import { MyContext } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import argon2 from 'argon2';


@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}


@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

// reutrn object type. the ? allows undefined. have to spully tpye cause its nulable
@ObjectType() 
class UserResponse {
	@Field(() => [FieldError], {nullable: true})
	errors?: FieldError[]

	@Field(() => User, {nullable: true})
	user?:User
}

@Resolver()
export class UserResolver {

    @Query(() => [User])
	users(@Ctx() { em }: MyContext): Promise<User[]> {
		return em.find(User, {});
	}
	
	// Create
	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em }: MyContext
	): Promise<UserResponse | null> {

		if (options.username.length <=3) {
			return {
				errors: [{
					field: 'username',
					message: 'username must be greater than 3 characters'
				}]
			}			
		}
		if (options.password.length <=3) {
			return {
				errors: [{
					field: 'username',
					message: 'username must be greater than 3 characters'
				}]
			}			
		}
		const hashedPassword = await argon2.hash(options.password);
		const user = em.create(User, { username: options.username, password: hashedPassword });
		await em.persistAndFlush(user);
		console.log(`inserye the psot`, user);
		return {user};
	}

	// Create
	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: UsernamePasswordInput,
		@Ctx() { em }: MyContext
	): Promise<UserResponse | null> {

		const user = await em.findOneOrFail(User, {username: options.username})
		if(!user) {
			return {
				errors: [{
					field: "username",
					message: "username not found"
				}]
			}
		}
		const valid = await argon2.verify(user.password, options.password);
		console.log(`isvalid`, valid);
		if(!valid) {
			return {
				errors: [{
					field: "username/password",
					message: "incorrect login details"
				}]
			}
		}
		return {user};
	}
	
}
