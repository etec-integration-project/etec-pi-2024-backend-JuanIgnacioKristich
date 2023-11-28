import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Products } from './entities/Products';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'jk',
    entities: [User, Products],
    logging: true,
    synchronize: true,
})

