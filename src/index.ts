import "reflect-metadata";
import app from './app';
import { AppDataSource } from './db';
import { loadDefaultProducts } from "./controllers/loadDefaultProducts";


async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected')

        await loadDefaultProducts();
        console.log('Productos predeterminados cargados (si no existían)');

        app.listen(5000);
        console.log('Server is listening on port', 5000);
        
    } catch (error) {
        console.error(error);
    }
}


main();


