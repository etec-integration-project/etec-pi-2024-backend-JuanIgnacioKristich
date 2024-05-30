
Juan Ignacio Kristich

hacer los siguientes pasos
git clone "https://github.com/etec-integration-project/etec-pi-2024-backend-JuanIgnacioKristich.git"
    "si es necesario"
    username "JuanIgnacio"
    Password "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"


cd etec-pi-2024-backend-JuanIgnacioKristich.git
docker compose up --build -d
(si no ejecuta)
docker compose up --build 
(realizar hasta que levante el servidor)

ejecutar en otro bash
curl -X POST -H "Content-Type: application/json" -d '[
    {
        "id":1,
        "firstname":"Iphone-14-pro-max",
        "Price": 1500,
        "img": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1663364576311"
    },
    {
        "id":2,
        "firstname":"Iphone-14-pro",
        "Price": 1250,
        "img":"https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt5cf4d8674f42be4c/6319d97a8c6aa1311ba18f96/Carousel_iPhone14Plus_Blue_Placement01-PreOrder.png"
    },
    {
        "id":3,
        "firstname":"Iphone-13",
        "Price": 900,
        "img":"https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/legacy_bdt/iphone-13-pro-max-blue-select.png?tf=1200x"
    },
    {
        "id":4,
        "firstname":"Iphone-13-green",
        "Price": 900,
        "img":"https://media.croma.com/image/upload/v1664009408/Croma%20Assets/Communication/Mobiles/Images/249840_0_ha9g80.png"
    },
    {
        "id":5,
        "firstname":"Iphone-13-pro-green",
        "Price": 900,
        "img":"https://icenter.ar/wp-content/uploads/2023/06/Comprar-iPhone-12-en-Chivilcoy-e1685919546472.png"
    }
]' http://(SUIP):3000/api/products_array


Ejecutar el siguiente codigo para probar el controlador de "usuarios", con esto probamos el ingreso de datos "register"


curl -X POST -H "Content-Type: application/json" -d '{
  "firstname": "John",
  "Email": "john@example.com",
  "Password": "password123"
}' http://(SUIP):3000/api/users

ejecutar desde su navegador web 
http://(SUIP):3000/api/products

http://(SUIP):3000/api/users

