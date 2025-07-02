# **Pior Filme** do *Golden Raspberry Awards* 

## Descrição do projeto

O projeto é um backend para um site de filmes, onde você pode consultar informações sobre os melhores filmes do Golden Raspberry Awards.
## Tecnologias utilizadas

Backend:
- NestJS
- TypeORM
- TypeScript
- Sqlite

Frontend:
- Angular
- Angular Material 


## Iniciando

```bash
cd backend
npm install
npm run start
npm run test
```

```bash
cd frontend
npm install
npm run start
npm run test
```

## Banco de dados

O banco de dados utilizado é SQLite.
Sao usadas 3 tabelas: `movies`, `producers` e `studios`.
O arquivo csv contém os dados dos filmes, onde cada linha representa um filme.

* `movies`: contém os dados dos filmes contendo produtres e estudios horizontalizados.
* `producers`: contém os dados dos produtores verticalizados.
* `studios`: contém os dados dos estúdios verticalizados.


## Especificação do teste
Desenvolva uma API RESTful para possibilitar a leitura da lista de indicados e vencedores da
categoria Pior Filme do Golden Raspberry Awards.
## Requisitos do sistema
1. Ler o arquivo CSV dos filmes e inserir os dados em uma base de dados ao iniciar a aplicação.
## Requisitos da API
1. Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois
prêmios mais rápido, seguindo a especificação de formato definida na página 2.
## Requisitos não funcionais do sistema
1. O web service RESTful deve ser implementado com base no nível 2 de maturidade de
Richardson;
2. Devem ser implementados somente testes de integração. Eles devem garantir que os dados
obtidos estão de acordo com os dados fornecidos na proposta;
3. O banco de dados deve estar em memória utilizando um SGBD embarcado (por exemplo, H2).
Nenhuma instalação externa deve ser necessária;
4. A aplicação deve conter um readme com instruções para rodar o projeto e os testes de
integração.
5. O código-fonte deve ser disponibilizado em um repositório git (Github, Gitlab, Bitbucket, etc).

##  Formato da API

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
      },
      {
      "producer": "Producer 2",
      "interval": 1,
      "previousWin": 2018,
      "followingWin": 2019
    }
  ],
  "max": [
    {
      "producer": "Producer 1",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    },
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 2000,
      "followingWin": 2099
    }
  ]
}
```
