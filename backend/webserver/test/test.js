// this file is full of code that will test the webserver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//tests that ride can be requested
/*
fetch('http://localhost:3001/ride_requested', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "sunet": "erickha",
        "name": "Erick",
        "numPassengers": 3,
        "origin": "EVGR",
        "destination": "BOB",
        "phone_number": "8888888888"
    })
})
    .then(response => response.text())
    .then(data => { console.log(data); })

*/
// sleep(100)

// // test update with driver
// fetch('http://localhost:3001/driver_assigned', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunet": "erickha",
//         "driver": "Jimmy"
//     })
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })

// sleep(100)
// // test update with driver and ETA

// fetch('http://localhost:3001/driver_assigned', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunet": "erickha",
//         "driver": "Drake",
//         "eta": 5
//     })
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })


// sleep(100)
// // test ride status update

// fetch('http://localhost:3001/ride_status_update', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunet": "erickha",
//         "status": "DRIVER ASSIGNED"
//     })
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })


// sleep(100)
// // test  get ride info

// fetch('http://localhost:3001/get_ride_info', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunet": "erickha"
//     })
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })

// sleep(100)
// // test  get ride info

// fetch('http://localhost:3001/get_unassigned_rides', {
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })

// fetch('http://localhost:3001/get_drivers', {
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })


// fetch('http://localhost:3001/get_driver_info', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunet": "jimmy7"
//     })
// })
//     .then(response => response.json())
//     .then(data => { console.log(data); })

// fetch('http://localhost:3001/update_driver_rider', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "driver_sunetid": "jimmy7",
//         "rider_sunetid": "benliao"
//     })
// })
//     .then(response => response.text())
//     .then(data => { console.log(data); })


// fetch('http://localhost:3001/update_eta', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunet": "erickha",
//         "eta": 10
//     })
// })
//     .then(response => response.text())
//     .then(data => { console.log(data); })


// fetch('http://localhost:3001/create_user_creds', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunetid": "erickha",
//         "name": "Erick",
//         "phoneNumber": "16509998888",
//         "email": "erickha@stanford.edu",
//         "password": "password123",
//     })
// })
//     .then(response => response.text())
//     .then(data => { console.log(data); })

// This will fetch a users name and phoneNumber given sunetid
// fetch('http://localhost:3001/get_user_creds', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "sunetid": "erickha"
//     })
// })
//     .then(response => response.text())
//     .then(data => { console.log(data); })


// THIS WILL validate credenitals
// REPSONSE CODES
// 200 = OK
// 401 = UNAUTHTHORIZED
fetch('http://localhost:3001/validate_user_creds', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "sunetid": "erickha",
        "password": "password12"
    })
})
    .then(response => console.log(response.status))
