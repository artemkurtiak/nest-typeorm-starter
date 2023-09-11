import { DataSource } from 'typeorm';
import { join } from 'node:path';

import { Environment } from '@shared/variables/environment';

const isTypeorm = Environment.NODE_ENV === 'TYPEORM';
const filesExtension = isTypeorm ? '.ts' : '.js';

const cwd = process.cwd() + `/${isTypeorm ? 'src' : 'dist'}`;

const dataSource = new DataSource({
  type: 'postgres',
  host: Environment.DATABASE_HOST,
  port: Environment.DATABASE_PORT,
  username: Environment.DATABASE_USER,
  password: Environment.DATABASE_PASSWORD,
  database: Environment.DATABASE_NAME,

  migrationsRun: true,

  entities: [join(cwd, '/**/entities/*.entity' + filesExtension)],
  migrations: [join(cwd, '/**/migrations/*' + filesExtension)],
  subscribers: [join(cwd, '/**/subscribers/*' + filesExtension)],
});

export default dataSource;
