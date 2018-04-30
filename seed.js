const db = require('./models');
const Vegetable = db.model('vegetable');
const Gardener = db.model('gardeners');
const Plot = db.model('plot');


db.sync({force: true})
    .then(() => {
        return Promise.all([
            Vegetable.create({
                name: "tomatoe",
                color: 'red',
                planted_on: new Date()
            }),
            Vegetable.create({
                name: "cucumber",
                color: 'green',
                planted_on: new Date()
            }),
            Vegetable.create({
                name: "carrot",
                color: 'orange',
                planted_on: new Date()
            }),
        ])
    })
    .then(() => {
        return Promise.all([
            Gardener.create({
                name: 'Jenny',
                age: 25
            }),
            Gardener.create({
                name: 'Marisa',
                age: 25
            })
        ])
        .then((gardeners) => {
            return Promise.all([
                Plot.create({
                    size: 7,
                    shaded: false,
                    gardenerId: gardeners[0].id
                }),
                Plot.create({
                    size: 25,
                    shaded: true,
                    gardenerId: gardeners[1].id
                })
            ])
        })
    })
    .then(() => { 
        db.close();
    })
    .catch(err =>{
        console.error(err);
        db.close();
    });