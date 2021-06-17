const {db, Address} = require('./models');

async function seed(){
    await db.sync({force: true});

    console.log('db synced!!!');

    const address = await Promise.all([
        Address.create({zipcode: '10223'}),
        Address.create({zipcode: '10224'}),
        Address.create({zipcode: '10225'}),
        Address.create({zipcode: '39211'}),
        Address.create({zipcode: '30105'}),
        Address.create({zipcode: '30106'}),
        Address.create({zipcode: '30107'})
    ])

    console.log(`seeded ${address.length} address`);
};

async function runSeed(){
    console.log('seeding');
    try {
        await seed();
    } catch (error) {
        console.error(error);
    }finally{
        console.log('closing db connection');
        await db.close();
        console.log('db connection closed');
    }
}

runSeed();