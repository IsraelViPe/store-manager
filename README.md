
# Store Manager

Trata-se de uma API RESTful construida utilizando aquitetura (MSC) - (model-service-controller);

Além disso foi contruída uma interface em React para visualizar o 
funcionamento da Store Manager. 

A API é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.O banco de dados MySQL faz a gestão de dados.


## Tecnologias

* MySql  para gerenciamento 
* Express para criação de rotas;
* Mocha, Chai e Sinon para testes, usando TDD
* Docker para conteinerização de toda a aplicação
* ESlint para a padronização de código
## Deployment

Para rodar esse projeto

#### Clone o projeto 
```
git@github.com:IsraelViPe/store-manager.git
```

#### instale as dependências

```
npm install
```

#### Rodando com Docker

```
docker-compose-up -d
```


## Appendix

A aplicação React pode ser vizualizada em :
```
http://localhost:3000/
```
