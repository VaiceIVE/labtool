import * as entities from 'src/database/entities-index';
export default 
{
    type: 'mongodb',
    entities: Object.values(entities),
    url: process.env.MONGO_CONNECTION_STRING,
    synchronize: true,
}
