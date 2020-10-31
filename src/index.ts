import { MikroORM } from '@mikro-orm/core';

import { __prod__ } from './consts';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';


const main = async () => {
	const orm = await MikroORM.init(microConfig);

	// create first post and user/ need this in upgrade step atm.
	await orm.em.create(Post, { title: 'my first post' });
	await orm.em.create(User, { username: 'admin'});


	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		// Can access context anywhere
		context: () => ({ em: orm.em }),
	});

	// Create grpahql endpoints on express, playground : /graphql
	apolloServer.applyMiddleware({ app });

	//Create express endpoint like this, but were using apollo
	app.get('/', (_, res) => {
		res.send('hello from express');
	});
	app.listen(4000, () => {
		console.log(`express has started`);
	});
};

main();
