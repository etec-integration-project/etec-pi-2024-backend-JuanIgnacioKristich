import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Products } from './entities/Products';
import Cart from './entities/Cart';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'jk',
    entities: [User, Products,Cart],
    logging: true,
    synchronize: true,
})

