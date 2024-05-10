
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
curl -X POST -H "Content-Type: application/json" -d '{"id":2,"firstname":"Iphone-13-pro-max","Price":1500,"img":"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1663364576311","active":true,"created":"2024-05-10T11:18:57.900Z","updated":"2024-05-10T11:18:57.900Z"}' http://(SUIP):3000/api/products

ejecutar desde su navegador web 
http://(SUIP):3000/api/products