import "reflect-metadata";
import app from './app';
import { AppDataSource } from './db';
import { getUsers } from "./controllers/user.controllers";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected')
        app.listen(5000);
        console.log('Server is listening on port', 5000);
    } catch (error) {
        console.error(error);
    }
}


main();


