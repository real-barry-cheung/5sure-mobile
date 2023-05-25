const { Client } = require('pg');

const config = {
    user: 'britneyky',
    host: 'localhost',
    database: 'project',
    password: 'britneyky',
    port: 5432,
}

const STATUSES = ["REQUESTED", "DRIVER ASSIGNED", "IN PROGRESS"]

module.exports = {
    // read all
    async getAllRides() {
        const client = new Client(config);
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
        const client = new Client(config);
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
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('INSERT INTO rides(sunetid, name, phoneNumber, start, destination, rider_password, driver, num_passengers, order_time, eta_minutes, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', values);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    //delete
    async deleteRide(sunet) {
        const client = new Client(config);
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
    //update driver
    async updateRideDriver(sunet, driver) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('UPDATE rides SET driver=$1, status=\'DRIVER ASSIGNED\' WHERE sunetid=$2', [driver, sunet]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    // Update Driver and ETA for a ride
    async updateRideDriverAndETA(sunet, driver, eta) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('UPDATE rides SET driver=$1, eta_minutes=$3 WHERE sunetid=$2', [driver, sunet, eta]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    // Update ride status
    // 0 -> Requested
    // 1 -> Driver Assigned
    // 2 -> In Progress
    async updateRideStatus(sunet, status_enum) {
        const client = new Client(config);
        let status = STATUSES[status_enum]
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('UPDATE rides SET status=$1 WHERE sunetid=$2', [status, sunet]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    // get rides by status
    // 0 -> Requested
    // 1 -> Driver Assigned
    // 2 -> In Progress
    async getRideByStatus(status_enum) {
        const client = new Client(config);
        let status = STATUSES[status_enum]
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let response = await client.query('SELECT * FROM rides WHERE status=$1', [status]);
            await client.end()
            return response
        } catch (err) {
            console.log(err)
        }
    },

    async getAllDrivers() {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let res = await client.query('SELECT * FROM drivers');
            await client.end()
            return res.rows
        } catch (err) {
            console.log(err)
        }
    },

    async getDriverInfo(sunet) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let res = await client.query('SELECT * FROM drivers where sunetid=$1', [sunet]);
            await client.end()
            return res.rows
        } catch (err) {
            console.log(err)
        }
    },

    async updateDriverRider(driver_sunetid, rider_sunetid) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('UPDATE drivers SET rider_sunet=$1 WHERE sunetid=$2', [rider_sunetid, driver_sunetid]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    async updateETA(sunet, eta) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('UPDATE rides SET eta_minutes=$2 WHERE sunetid=$1', [sunet, eta]);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    //TODO

    async getUserCredentials(sunetid) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let res = await client.query('SELECT user_credentials.sunetid,user_credentials.name,user_credentials.phoneNumber FROM user_credentials where sunetid=$1', [sunetid]);
            await client.end()
            return res.rows
        } catch (err) {
            console.log(err)
        }
    },

    async createUserCredentials(values) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            await client.query('INSERT INTO user_credentials(sunetid,name,phoneNumber,email,password) VALUES ($1, $2, $3, $4, $5)', values);
            await client.end()
        } catch (err) {
            console.log(err)
        }
    },

    // this validates that there exists a user
    // with the given password
    async validateUserCredentials(sunetid, password) {
        const client = new Client(config);
        try {
            await client.connect();
        } catch (err) {
            console.log(err)
        } finally {
        }
        try {
            let res = await client.query('SELECT user_credentials.sunetid,user_credentials.name,user_credentials.phoneNumber FROM user_credentials where sunetid=$1 AND password=$2', [sunetid, password]);
            await client.end()
            return res.rows
        } catch (err) {
            console.log(err)
        }
    }


}
