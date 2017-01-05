import sql from 'mssql';
import uuid from 'node-uuid';
import _ from 'lodash';
import Car from './car-model';
import Air from './air-model';
import Hotel from './hotel-model';

let config = {

    },
    models = {
        Air: Air,
        Car: Car,
        Hotel: Hotel
    },

    insertRequest = (segments) => {
        let id = uuid.v1(),
            table, keys, values,
            query = () => `insert into ${table} (${keys}) values (${_.map(values, (value) => JSON.stringify(value))})`;

        sql.connect(config).then(() => {
            console.log('connection');

            segments.map(segment => {
                table = segment.type;
                keys = _.keys(models[table]);
                values = _.values(_.pick(segment, keys));
                keys.unshift('id');
                values.unshift(id);
                let queryStr = query();
                console.log(queryStr);
                new sql.Request().query(queryStr).then(function(recordset) {
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
