import sql from 'mssql';
import uuid from 'node-uuid';
import _ from 'lodash';
import Car from './car-model';
import Air from './air-model';
import Hotel from './hotel-model';

let config = {
        user: "",
        password: "",
        server: "",
        domain: "",
        options: {
            encrypt: false
        },
        database: "Traxo-parser"
    },
    models = {
        Air: Air,
        Car: Car,
        Hotel: Hotel
    },

    insertRequest = (segments) => {
        let id = uuid.v1(),
            table, keys, values, request,
            query = () => `insert into ${table} (id, ${keys}) values (@id,${_.map(keys, (key) => '@' + key)})`;

        sql.connect(config).then(() => {
            console.log('connection');
            console.log('segment', segments)
            segments.map(segment => {
                table = segment.type;
                keys = _.keys(models[table]);

                request = new sql.Request();
                request.verbose = true;
                request.input('id', id);

                _.forEach(keys, (key) => {
                    request.input(key, segment[key]);
                });

                request.query(query()).then(function(recordset) {
                    console.dir(recordset);
                }).catch(function(err) {
                    console.log('Qerror', err);
                });

            });
        }).catch(function(err) {
            console.log('error', err);
        });
    };

export {insertRequest};
