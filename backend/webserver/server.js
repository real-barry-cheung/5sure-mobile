const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const app = express()
const port = 3001


// create application/json parser
var jsonParser = bodyParser.json()


app.post('/ride_requested', jsonParser, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log(req.body)
    let name = req.body.name
    let sunet = req.body.sunet
    let phone_number = req.body.phone_number
    let destination = req.body.destination
    let origin = req.body.origin
    let numPassengers = req.body.numPassengers
    let password = "TBD"
    let driver = "TBD"
    let time_requested = 100 //gettimestamp
    let eta_minutes = 30
    let status = 'REQUESTED'
    db.createRide([sunet, name, phone_number, origin, destination, password, driver, numPassengers, time_requested, eta_minutes, status])
        .then(res.sendStatus(200)).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

// POST request expects, (sunetid, driver), can optionally take updated ETA
app.post('/driver_assigned', jsonParser, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    let sunetid = req.body.sunet
    let driver = req.body.driver
    let eta = req.body.eta
    // if eta provided
    if (!eta) {
        db.updateRideDriver(sunetid, driver).then(db.updateDriverRider(driver, sunetid)).then(res.sendStatus(200))
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
        db.updateDriverRider(driver, sunetid)
    }
    // if eta not provided
    else {
        db.updateRideDriverAndETA(sunetid, driver, eta).then(res.send(200)).catch((err) => {
            console.log(err)
            res.send(400)
        })
    }
})

// POST request
app.post('/ride_status_update', jsonParser, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    let rider_sunetid = req.body.rider_sunetid
    let driver_sunetid = req.body.driver_sunetid
    let status = req.body.status
    let valid_status = ["REQUESTED", "DRIVER ASSIGNED", "IN PROGRESS", "COMPLETED"]
    if (!valid_status.includes(status)) {
        res.send("Update with status as one of: REQUESTED, DRIVER ASSIGNED, IN PROGRESS")
        res.sendStatus(400)
        return;
    }
    let status_enum = 0
    switch (status) {
        case "REQUESTED":
            // code block
            status_enum = 0;
            break;
        case "DRIVER ASSIGNED":
            // code block
            status_enum = 1;
            break;
        case "IN PROGRESS":
            status_enum = 2;
            break;
        default:
            status_enum = 0;
            break;
    }

    if (status == 'COMPLETED') {
        db.deleteRide(rider_sunetid).then(res.sendStatus(200)).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
        await db.updateDriverRider(driver_sunetid, "NONE");
    }
    else {
        console.log("ABOUT TO UPDATE")
        //console.log(sunetid)
        console.log(status)
        console.log(status_enum)
        db.updateRideStatus(rider_sunetid, status_enum).then(res.sendStatus(200)).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })

    }
})

app.get('/get_all_rides', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getAllRides()
        res.send(JSON.stringify(response))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})



app.post('/get_ride_info', jsonParser, async (req, res) => {
    console.log(req.body)
    let sunetid = req.body.sunet
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getRideBySunet(sunetid)
        res.send(JSON.stringify(response))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.get('/get_unassigned_rides', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getRideByStatus(0)
        console.log(response.rows)
        res.send(JSON.stringify(response.rows))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.get('/get_assigned_rides', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getRideByStatus(1)
        res.send(JSON.stringify(response.rows))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.get('/get_in_progress_rides', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getRideByStatus(2)
        res.send(JSON.stringify(response.rows))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.get('/get_drivers', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getAllDrivers()
        console.log(response)
        res.send(JSON.stringify(response))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.post('/get_driver_info', jsonParser, async (req, res) => {
    let sunetid = req.body.sunet
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getDriverInfo(sunetid)
        console.log(response)
        res.send(JSON.stringify(response))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.post('/update_driver_rider', jsonParser, async (req, res) => {
    let rider_sunetid = req.body.rider_sunetid
    let driver_sunetid = req.body.driver_sunetid
    console.log(rider_sunetid)
    console.log(driver_sunetid)
    res.setHeader("Access-Control-Allow-Origin", "*")
    db.updateDriverRider(driver_sunetid, rider_sunetid).then(res.sendStatus(200)).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })

})

//Request to update the ETA
app.post('/update_eta', jsonParser, async (req, res) => {
    let sunet = req.body.sunet
    let eta = req.body.eta
    console.log(sunet)
    console.log(eta)
    res.setHeader("Access-Control-Allow-Origin", "*")
    db.updateETA(sunet, eta).then(res.sendStatus(200)).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

/* TODO:
user credentials -> create, read, and validate ()
*/
app.post('/get_user_creds', jsonParser, async (req, res) => {
    let sunetid = req.body.sunetid
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.getUserCredentials(sunetid)
        console.log(response)
        res.send(JSON.stringify(response))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.post('/create_user_creds', jsonParser, async (req, res) => {
    let sunetid = req.body.sunetid
    let name = req.body.name
    let phoneNumber = req.body.phoneNumber
    let email = req.body.email
    let password = req.body.password
    let values = [sunetid, name, phoneNumber, email, password]
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.createUserCredentials(values)
        console.log(response)
        res.send(JSON.stringify(response))
        res.status(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.post('/validate_user_creds', jsonParser, async (req, res) => {
    let sunetid = req.body.sunetid
    let password = req.body.password
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        let response = await db.validateUserCredentials(sunetid, password)
        console.log(response)
        if (response.length == 0) {
            res.sendStatus(401)
        } else {
            res.sendStatus(200)
        }
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
