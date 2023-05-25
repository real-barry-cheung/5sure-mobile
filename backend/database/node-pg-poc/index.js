const db = require('./db');

async function getAllRides() {
    let rides = await db.getRideBySunet('erickha')
    for (i in rides) {
        console.log(rides[i])
    }

}


async function createRide() {
    await db.createRide(["erickha", "EVGR", "BOB", "ABCDED", "TBD", 5, 10000])
}

async function getRideExample() {
    let res = await db.getRideBySunet("erickha")
    console.log(res[0])
}

async function deleteRideExample() {
    await db.deleteRide("erickha")
}

async function updateDriver(driver) {
    await db.updateRideDriver("erickha", driver)
}

createRide()


// getRideExample()
// updateDriver("Smack")
