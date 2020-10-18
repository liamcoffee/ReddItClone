import { __prod__ } from './consts';
import { Post } from './entities/Post';

import { MikroORM } from '@mikro-orm/core';
import path from 'path';
export default {
	entities: [Post],
	dbName: 'sample',
	debug: !__prod__,
	type: 'mongo',
	migrations: {
		path: path.join(__dirname, './migrations'), // path from node to get absolute path
		pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files, matches ts and js
	},
} as Parameters<typeof MikroORM.init>[0]; //Extens mikro orm types

// export default {
// 	entities: [Post],
// 	dbName: 'sample',
// 	debug: !__prod__,
// 	type: 'mongo',
// } as const;
