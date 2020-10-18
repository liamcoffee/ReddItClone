import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './consts';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';

const main = async () => {
	const orm = await MikroORM.init(microConfig);

	console.log(`hello there321`);

	const post = orm.em.create(Post, { title: 'my first post' });
	await orm.em.persistAndFlush(post);

	const test = await orm.em.find(Post, {});
	console.log(`test test`, test);
};

main();
