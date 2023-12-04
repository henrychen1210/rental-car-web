const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

var mysql = require('mysql');

var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'test'
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM customer WHERE cu_email = ? AND password = ?';
    var params = [email, password];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send("Error login");
        }

        console.log(result);
        if (rows.length > 0) {
            res.status(200).send('login sucessfully!');
        } else {
            res.status(500).send('Email or password is wrong')
        }
    });

});

app.post('/register', (req, res) => {
    const { email, phonenumber, username, password } = req.body;
    const sql = 'INSERT INTO customer (cu_email, cu_name, cu_phone, password) VALUES (?, ?, ?, ?)';
    var params = [email, username, phonenumber, password];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send("Error register");
        }

        console.log(result);
        res.status(200).send('register sucessfully!');
    });
});

// get all vehicles
app.get('/vehicles', (req, res) => {

    var sql = 'SELECT * FROM vehicle v, v_class c WHERE v.class_id = c.class_id';

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send("Error register");
        }
        console.log(result);
        res.status(200).send(result)
    })

});

// search vehicle
app.post('/searchvehicle', (req, res) => {
    const { model, make } = req.body;

    var sql = 'SELECT * FROM vehicle where model = ? AND make = ?';
    var params = [model, make];

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send("Error register");
        }
        console.log(result);
        res.status(200).send(result)
    })
})


// add vehicle
app.post('/vehicles', (req, res) => {
    const {vin, make, model, year, plate, class_id} = req.body;

    var sql = 'INSERT INTO vehicle (vin, make, model, year, plate, class_id) VALUES (?, ?, ?, ?, ?, ?)';
    var params = [vin, make, model, year, plate, class_id];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send("Error add vehicle");
        }

        console.log(result);
        res.status(200).send('add vehicle sucessfully!');
    });
})

// delete a vehicle
app.delete('/vehicles', (req, res) => {
    const {vin} = req.body;
    
    var sql = 'DELETE FROM vehicle WHERE vin = ?';
    var params = [vin];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            res.send("Error delete vehicle");
        }

        console.log(result);
        res.status(200).send('delete vehicle sucessfully!');
    });
})

// get all rentals
app.get('/rentals', (req, res) => {
    var sql = 'SELECT * FROM rental r, customer c WHERE r.customer_id = c.customer_id';

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send("Error get rentals");
        }
        console.log(result);
        res.status(200).send(result)
    })
})

// get rental by customerid
app.post('/getRentalsByCustomer', (req, res) => {
    const {customerid} = req.body;

    var sql = 'SELECT * FROM rental WHERE customer_id = ?';
    var params = [customerid]

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[GET ERROR] - ', err.message);
            res.send("Error get vehicle");
        }

        console.log(result);
        res.status(200).send(result);
    });
})

// add rental
app.post('/rentals', (req, res) => {
    const {pick_date, drop_date, start_odo, end_odo, pick_loc, drop_loc, customer_id, vin} = req.body;
    var sql = 'INSERT INTO rental (pick_date, drop_date, start_odo, end_odo, pick_loc, drop_loc, customer_id, vin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    var params = [pick_date, drop_date, start_odo, end_odo, pick_loc, drop_loc, customer_id, vin];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send("Error add rentals");
        }

        console.log(result);
        res.status(200).send('add rental sucessfully!');
    });
})

// delete a rental
app.delete('/rentals', (req, res) => {
    const {rental_id} = req.body;

    var sql = 'DELETE FROM rental WHERE rental_id = ?';
    var params = [rental_id];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            res.send("Error rental vehicle");
        }

        console.log(result);
        res.status(200).send('delete rental sucessfully!');
    });
})

// get all locations
app.get('/locations', (req, res) => {
    var sql = 'SELECT * FROM location';

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send("Error get locations");
        }
        console.log(result);
        res.status(200).send(result)
    })
})

// get invoice by rental_id
app.post('/invoiceByRentalid', (req, res) => {
    const {rental_id} = req.body;

    var sql = 'SELECT * FROM invoice WHERE rental_id = ?';
    var params = [rental_id];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[GET ERROR] - ', err.message);
            res.send("Error get invoice");
        }

        console.log(result);
        res.status(200).send(result);
    });
})

// get all payments
app.get('/payments', (req, res) => {
    var sql = 'SELECT * FROM payment';

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(500).send("Error get locations");
        }
        console.log(result);
        res.status(200).send(result)
    })
})

// get payment by inv_id
app.post('/paymentByInvid', (req, res) => {
    const {inv_id} = req.body;

    var sql = 'SELECT * FROM payment WHERE inv_id = ?';
    var params = [inv_id];

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[GET ERROR] - ', err.message);
            res.send("Error get payment");
        }

        console.log(result);
        res.status(200).send(result);
    });
})