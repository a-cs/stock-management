# Desenvolvimento de um Aplicativo para Controle de Estoque

Esse projeto está sendo desenvolvido como projeto de conclusão do curso (TCC) para o curso de Engenharia de Mecatrônica do Instituto Federal de Educação, Ciência e Tecnologia do Ceará (IFCE).

O intuito do projeto é o desenvolvimento de um aplicativo para controle de estoque, para ser utilizado nos laboratórios do IFCE

No Back End será utilizado Node.JS, TypeORM, PostgreSQL, Docker.

No Front End será utilizado React.



## Instalar a imagem do postgres utilizando o docker:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
<br/>


## Para preparar as variaveis de ambiente

Entre na basta backend renomeie o arquivo ".env.example" para ".env"

<br/>

## Na primeira vez, é necessário criar as tabela do banco de dados:

```bash
yarn typeorm migration:run
```