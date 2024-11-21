import { AppDataSource } from '../db'; // Asegúrate de tener la ruta correcta a donde defines AppDataSource
import { Products } from '../entities/Products'; // Asegúrate de tener la ruta correcta a la entidad Products

// Función para cargar productos predeterminados en la base de datos
export const loadDefaultProducts = async () => {
    try {
        const productRepository = AppDataSource.getRepository(Products); // Usar el repositorio correcto

        // Verificamos si ya existen productos en la base de datos
        const existingProducts = await productRepository.find();
        console.log('Productos existentes:', existingProducts);

        if (existingProducts.length > 0) {
            console.log('Los productos ya están cargados en la base de datos.');
            return;
        }

        console.log('Insertando productos predeterminados en la base de datos...');

        // Lista de productos predeterminados
        const defaultProducts = [
            {
                firstname: "Iphone-14-pro-max",
                Price: 1500,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1663364576311",
                active: true
            },
            {
                firstname: "Iphone-14-pro",
                Price: 1250,
                img: "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt5cf4d8674f42be4c/6319d97a8c6aa1311ba18f96/Carousel_iPhone14Plus_Blue_Placement01-PreOrder.png",
                active: true
            },
            {
                firstname: "Iphone-13",
                Price: 900,
                img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/legacy_bdt/iphone-13-pro-max-blue-select.png?tf=1200x",
                active: true
            },
            {
                firstname: "Iphone-13-green",
                Price: 900,
                img: "https://media.croma.com/image/upload/v1664009408/Croma%20Assets/Communication/Mobiles/Images/249840_0_ha9g80.png",
                active: true
            },
            {
                firstname: "Iphone-13-pro-green",
                Price: 900,
                img: "https://icenter.ar/wp-content/uploads/2023/06/Comprar-iPhone-12-en-Chivilcoy-e1685919546472.png",
                active: true
            }
        ];

        // Guardar los productos en la base de datos usando save() del repositorio
        await productRepository.save(defaultProducts);
        console.log('Productos predeterminados cargados con éxito.');

    } catch (error) {
        console.error('Error cargando los productos predeterminados:', error);
    }
};