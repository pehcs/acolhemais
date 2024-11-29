# Documentação do projeto

## Para rodar o APP
```
docker compose up -d
docker exec -it acolhemais sh -c "cd ./backend && npx prisma migrate deploy"
```
Para visualizar os logs, você pode ver diretamente pelo Docker Desktop, ou execute este comando
```
docker logs -f acolhemais
```
Caso precise entrar no container por algum motivo (Não esqueça que suas alterações lá não refletem no projeto, isso inclui as migrations)
```
docker exec -it acolhemais sh
```
"sh" te fará conectar com linha de comando, mas você pode apenas enviar um comando para o container substituindo o sh por algo como "echo 'helloworld'"