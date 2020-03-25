const connection = require ('../database/connection');
const crypto = require ('crypto'); // pacote de criptografia

module.exports={
    async index (request, response){
        //const {page = 1} = require.query; // caso só existe registro para prencher uma pagina
        var page =1;
        page = require.query; // caso só existe registro para prencher uma pagina
       
        const [count] = await connection ('incidents').count(); //cont numero de registros
        console.log(count);//echo count
        //limit(5)//5 registros por pagina
      // offset((page-1)*5) começa contagem a partir do 0
        const incidents = await connection('incidents')
        .join('ongs', 'ong_id','=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);

        response.header('X-Total-Count',count['count(*)']);// retorna o numero de registros
        return response.json({incidents});
      
      },
    async create (request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id});
    },
    
    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization; // trazendo id da ong que esta no header, atraves da autentificação de longin 
       // query na tabela de incidents
        const  incident = await  connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();
       
        // verificando se o id da  ong que vai deletar o incidente é o mesmo  id da fk   
       /* if(incident.ong_id != ong_id){
           return response.status(401).jason({error:' Operation not permitted.'});
        }*/
        await connection('incidents').where('id',id).delete();
        return response.status(204).send(); //status "204", deu certo não retona conteudo, send() -> envia a resposta vazia

    }
};