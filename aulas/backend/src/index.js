const express = require('express'); // importanto todas as funcionalidades do pacote express
const  cors = require('cors');
const routes = require('./routes'); // importando aquivo

const app = express(); // instanciando aplicação
app.use(cors());
app.use(express.json());// converte parametros da requisição em objs js
app.use(routes);


/**
 * Métodos HTTP
 * GET : Buscas uma info do backend
 * POST: Criar uma info no backend
 * PUT: Alterar uma info no backend
 * DELETE: Deletar uma indo no backend * 
 */

 /** Tipos de Parêmatros
  * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route Params: Parâmetros utilizados para indentificar recursos
  * Body Params:  Corpo da requisição, utilizado para criar  ou alterar recursos
  */

  /**
   * Banco de Dados
   * SQL: MySQL, SQLite, PostgreeSQL, Oracle, Microsoft SQL server
   * NoSQL: MongoDB, CouchDB, etc 
   */

app.listen(3333); // porta do localhost
