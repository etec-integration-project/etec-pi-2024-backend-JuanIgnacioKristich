import { DataSource } from 'typeorm';
import { User } from './entities/User';
import express from 'express';
import { Products } from './entities/Products';
import {Cart} from './entities/Cart';
import { config } from 'dotenv';

const app = express();
const port = 3000;

config();
const database = process.env.DATABASE_NAME
console.log(database)
const username = process.env.DATABASE_USERNAME
console.log(username)
const password = process.env.DATABASE_PASSWORD
console.log(password)
const host = process.env.DATABASE_HOST
console.log(host)



export const AppDataSource = new DataSource({
    type: 'mysql',
    host: host,
    port: 3306,
    username: username,
    password: password,
    database: database,
    entities: [User, Products,Cart],
    logging: true,
    synchronize: true,
})


