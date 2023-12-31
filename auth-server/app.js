const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3002;
var mysql = require("mysql");

var db_config = {
  host: "localhost",
  user: "root",
  password: "root", 
  port: "8889",
  database: "RENTAL_CAR",
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM customer WHERE cu_email = ? AND cu_password = ?";
  var params = [email, password];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("Error login");
      return;
    }

    console.log(result);
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Email or password is wrong");
    }
  });
});

// login
app.post("/emplogin", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM employee WHERE emp_id = ? AND emp_pwd = ?";
  var params = [email, password];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("Error emplogin");
      return;
    }

    console.log(result);
    if (result.length > 0) {
      res.status(200).send("login sucessfully!");
    } else {
      res.status(500).send("Email or password is wrong");
    }
  });
});

// indivual signup
app.post("/register_individual", (req, res) => {
    const {
      email,
      firstname,
      lastname,
      phonenumber,
      driverlicence,
      insurance,
      policy,
      password,
    } = req.body;
    
    const customerQuery =
      "INSERT INTO customer (cu_email, cu_phone, cu_type, address_id, cu_password) VALUES (?, ?, ?, ?, ?)";
    const individualQuery =
      "INSERT INTO individual (customer_id, in_fname, in_lname, dr_lic, insurance, policy) VALUES (?, ?, ?, ?, ?, ?)";

    const customerParams = [email, phonenumber, "I", 1, password];

    let customer_id = null;

    connection.query(customerQuery, customerParams, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("Error register_individual - 1");
        return;
      }
      //console.log("result: " + result.insertId);
      customer_id = result.insertId; // last insert customer_id
      //console.log("1 record inserted - !1");
      //console.log("customer_id: " + customer_id);

      const individualParams = [
          customer_id, // last insert customer_id
          firstname,
          lastname,
          driverlicence,
          insurance,
          policy,
          null,
      ];
    
      connection.query(individualQuery, individualParams, function (err, result) {
        if (err) {
          console.log("[SELECT ERROR] - ", err.message);
          res.send("Error register_individual - 2");
          return;
        }
        console.log(result);
        
        console.log("register_individual sucessfully ...")
        res.status(200).send("register sucessfully!");
      });
    });
});

// cor signㄧ
app.post("/register_corporate", (req, res) => {
  const { email, phonenumber, corporate, registration, empid, password } = req.body;
  const customerQuery =
    "INSERT INTO customer (cu_email, cu_phone, cu_type, address_id, cu_password) VALUES (?, ?, ?, ?, ?)";
  const corporateQuery =
    "INSERT INTO corporate (customer_id, corp_name, co_reg, emp_id, coupon_ID) VALUES (?, ?, ?, ?, ?)";
  const customerParams = [email, phonenumber, "C", 10, password];
  
  let customer_id = null;

  connection.query(customerQuery, customerParams, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("Error register_corporate - 1");
      return;
    }
    console.log("1 record inserted - C");

    customer_id = result.insertId; // last insert customer_id
    const corporateParams = [customer_id, corporate, registration, empid, 1];

    connection.query(corporateQuery, corporateParams, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("Error register_corporate - 2");
        return;
      }
      console.log(result);
      console.log("register_corporate sucessfully ...")
      res.status(200).send("register sucessfully!");
    });
  });
});

// get all vehicles
app.get("/vehicles", (req, res) => {
  var sql = "SELECT * FROM vehicle v, v_class c WHERE v.class_id = c.class_id";

  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error vehicles");
      return;
    }

    console.log(result);
    console.log("vehicles sucessfully ...")
    res.status(200).send(result);
  });
});

// search car based on location
app.post("/searchvehicle", (req, res) => {
  const { location } = req.body;

  var sql = `SELECT v.vin, v.make, v.model, v.year, v.odo, vc.cl_name, vc.daily_rate, vc.over_mlg_fee, vc.odo_limit
    FROM LOCATION loc
    JOIN V_CLASS_LOC vcl ON loc.LOC_ID = vcl.LOC_ID
    JOIN V_CLASS vc ON vcl.CLASS_ID = vc.CLASS_ID
    JOIN VEHICLE v ON vc.CLASS_ID = v.CLASS_ID
    WHERE loc.LOC_ID = ?`;
  var params = [location];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error searchvehicle");
      return;
    }
    console.log(result);
    console.log("searchvehicle sucessfully ...")
    res.status(200).send(result);
  });
});

// apply discount
app.post("/applydiscount", (req, res) => {
  const { discount } = req.body;

  var sql = "SELECT dis_per FROM coupon WHERE coupon_id = ?";
  var params = [discount];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error applydiscount");
      return;
    }
    console.log(result);
    console.log("couponBy applydiscount ...")
    res.status(200).send(result);
  });
});

// get all orders
app.get("/get_all_orders", (req, res) => {
  var sql = `SELECT rental_id FROM rental`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_all_orders");
      return;
    }
    console.log(result);
    console.log("get_all_orders sucessfully ...")
    res.status(200).send(result);
  });
});

// get orders by rental_id 
app.post("/get_order", (req, res) => {
  const { rental_id } = req.body;

  var sql = `SELECT * FROM rental where rental_id = ?`;
  var params = [rental_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_order");
      return;
    }
    console.log(result);
    console.log("get_order sucessfully ...")
    res.status(200).send(result);
  });
});

// get invoice by rental_id 
app.post("/get_invoice", (req, res) => {
  const { rental_id } = req.body;

  var sql = `SELECT * FROM invoice where rental_id = ?`;
  var params = [rental_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_invoice");
      return;
    }
    console.log(result);
    console.log("get_invoice sucessfully ...")
    res.status(200).send(result);
  });
});

// get payment by inv_id 
app.post("/get_payment", (req, res) => {
  const { inv_id } = req.body;

  var sql = `SELECT * FROM payment where inv_id = ?`;
  var params = [inv_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_payment");
      return;
    }
    console.log(result);
    console.log("get_payment sucessfully ...")
    res.status(200).send(result);
  });
});

// get all vehivel class
app.get("/get_all_vclass", (req, res) => {
  var sql = `SELECT class_id, cl_name FROM v_class`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_all_vclass");
      return;
    }
    console.log(result);
    console.log("get_all_vclass sucessfully ...")
    res.status(200).send(result);
  });
});


// get all vehivel class
app.post("/get_vehicle_by_class", (req, res) => {
  const { class_id } = req.body;

  var sql = `SELECT * FROM vehicle WHERE class_id = ?`;
  var params = [class_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_vehicle_by_class");
      return;
    }
    console.log(result);
    console.log("get_vehicle_by_class sucessfully ...")
    res.status(200).send(result);
  });
});

// get vehivel and it's class
app.post("/get_vehicles", (req, res) => {
  const { vin } = req.body;

  var sql = `SELECT * FROM RENTAL_CAR.vehicle a JOIN RENTAL_CAR.v_class b ON a.class_id = b.class_id WHERE a.vin = ?`;
  var params = [vin];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_vehicles");
      return;
    }
    console.log(result);
    console.log("get_vehicles sucessfully ...")
    res.status(200).send(result);
  });
});

// get all customer
app.get("/get_all_customer", (req, res) => {
  var sql = `SELECT customer_id, cu_type FROM customer`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_all_customer");
      return;
    }
    console.log(result);
    console.log("get_all_customer sucessfully ...")
    res.status(200).send(result);
  });
});

// get individual customer by id
app.post("/get_customer_ind", (req, res) => {
  const { customer_id } = req.body;

  var sql = `SELECT * FROM RENTAL_CAR.customer a JOIN RENTAL_CAR.individual b ON a.customer_id = b.customer_id WHERE a.customer_id = ? ;`;
  var params = [customer_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_customer_ind");
      return;
    }
    console.log(result);
    console.log("get_customer_ind sucessfully ...")
    res.status(200).send(result);
  });
});

// get corporate customer by id
app.post("/get_customer_cor", (req, res) => {
  const { customer_id } = req.body;

  var sql = `SELECT * FROM RENTAL_CAR.customer a JOIN RENTAL_CAR.corporate b ON a.customer_id = b.customer_id WHERE a.customer_id = ? ;`;
  var params = [customer_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_customer_cor");
      return;
    }
    console.log(result);
    console.log("get_customer_cor sucessfully ...")
    res.status(200).send(result);
  });
});

// get all Coupon
app.get("/get_all_coupon", (req, res) => {
  var sql = `SELECT coupon_id FROM coupon`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_all_coupon");
      return;
    }
    console.log(result);
    console.log("get_all_coupon sucessfully ...")
    res.status(200).send(result);
  });
});

// get Coupon by id
app.post("/get_coupon", (req, res) => {
  const { coupon_id } = req.body;

  var sql = `SELECT * FROM coupon WHERE coupon_id = ?`;
  var params = [coupon_id];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_coupon");
      return;
    }
    console.log(result);
    console.log("get_coupon sucessfully ...")
    res.status(200).send(result);
  });
});

// get all Location
app.get("/get_all_location", (req, res) => {
  var sql = `SELECT distinct(city) name, a.loc_id id FROM RENTAL_CAR.location a JOIN RENTAL_CAR.address b ON a.address_id = b.address_id;`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.status(500).send("Error get_all_location");
      return;
    }
    console.log(result);
    console.log("get_all_location sucessfully ...")
    res.status(200).send(result);
  });
});


// insert rental
app.post("/insert_order", (req, res) => {
  const { pick_date, drop_date, start_odo, end_odo, pick_loc, drop_loc, customer_id, vin } = req.body;
  const formattedDate_pick = new Date(pick_date).toISOString().split("T")[0];
  const formattedDate_drop = new Date(drop_date).toISOString().split("T")[0];


  var sql = `INSERT INTO rental (pick_date, drop_date, start_odo, end_odo, pick_loc, drop_loc, customer_id, vin) 
    VALUES ( STR_TO_DATE('${formattedDate_pick}', '%Y-%m-%d'),STR_TO_DATE('${formattedDate_drop}', '%Y-%m-%d'), ?, ?, ?, ?, ?, ?);`;
  var params = [start_odo, end_odo, pick_loc, drop_loc, customer_id, vin];

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      res.status(500).send("Error insert_order");
      return;
    }
    console.log(result);
    console.log("insert_order sucessfully ...")
    res.status(200).send(result);
  });
});


// get invoice
app.post("/invoice", (req, res) => {
  const { inv_amt, rental_id } = req.body;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  var sql = `INSERT INTO invoice (inv_date, inv_amt, rental_id) 
  VALUES ( STR_TO_DATE('${formattedDate}', '%Y-%m-%d'), ?, ?);`;
  var params = [inv_amt, rental_id];



  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      res.status(500).send("Error invoice");
      return;
    }
    console.log(result);
    console.log("invoice sucessfully ...")
    res.status(200).send(result);
  });
});

// pay invoice ??????
app.post("/pay", (req, res) => {
  const { paymentMethod, cardNumber, amount, invID } = req.body;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  var sql = `INSERT INTO payment (pmt_Date, pmt_method, card_num, paid_amt, inv_id) 
    VALUES (STR_TO_DATE('${formattedDate}', '%Y-%m-%d'),?,?,?,?);`;
  var params = [paymentMethod, cardNumber, amount, invID];

  console.log(params)

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      res.status(500).send("Error register");
      return;
    }
    console.log(result);
    res.status(200).send("pay sucessfully!");
  });
});