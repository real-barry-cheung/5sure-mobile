const { Client } = require('pg');

module.exports = {
    // read all
    async getAllRides() {
        const client = new Client({
            user: 'erickha',
            host: 'localhost',
            database: 'project',
            password: 'erickha',
            port: 5432,
        });
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let res = await client.query('SELECT * FROM rides');
            await client.end()
            return res.rows
        } catch (err) {
            console.log(err)
        }
    },

    //read one
    async getRideBySunet(sunetid) {
        const client = new Client({
            user: 'erickha',
            host: 'localhost',
            database: 'project',
            password: 'erickha',
            port: 5432,
        });
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let res = await client.query('SELECT * FROM rides WHERE sunetid=$1', [sunetid]);
            await client.end()
            return res.rows
        } catch (err) {
            console.log(err)
        }
    },

    //create
    async createRide(values) {
        const client = new Client({
            user: 'erickha',
            host: 'localhost',
            database: 'project',
            password: 'erickha',
            port: 5432,
        });
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('INSERT INTO rides(sunetid, start, destination, rider_password, driver, num_passengers, order_time) VALUES ($1, $2, $3, $4, $5, $6, $7)', values);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    //delete
    async deleteRide(sunet) {
        const client = new Client({
            user: 'erickha',
            host: 'localhost',
            database: 'project',
            password: 'erickha',
            port: 5432,
        });
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('DELETE FROM rides WHERE sunetid = $1', [sunet]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },
    //update
    async updateRideDriver(sunet, driver) {
        const client = new Client({
            user: 'erickha',
            host: 'localhost',
            database: 'project',
            password: 'erickha',
            port: 5432,
        });
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('UPDATE rides SET driver=$1 WHERE sunetid=$2', [driver, sunet]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    }
}
