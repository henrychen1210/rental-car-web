import { Fragment, useState } from 'react'
import axios from "axios";


const Vehicles = ({carInfo}) => {
  const [selectedClassID, setSelectedClassID] = useState("")
  const [selectedVClass, setSelectedVClass] = useState("")
  const [allVehicle, setAllVehicle] = useState([])

  const [selectedVIN, setSelectedVIN] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [query, setQuery] = useState('')

  const [vehicle_class, setVehicle_class] = useState([
    {classID: '10001', cl_name:'Small', daily_rate: 35, over_mlg_fee: 2, odo_limit: 100},
    {classID: '10002', cl_name: 'Compact', daily_rate: 45, over_mlg_fee: 2, odo_limit: 120},
    {classID: '10003', cl_name: 'Midsize', daily_rate: 55, over_mlg_fee: 3, odo_limit: 140},
    {classID: '10004', cl_name: 'Fullsize', daily_rate: 65, over_mlg_fee: 3, odo_limit: 160},
    {classID: '10005', cl_name: 'SUV', daily_rate: 75, over_mlg_fee: 4, odo_limit: 180},
    {classID: '10006', cl_name: 'Luxury', daily_rate: 85, over_mlg_fee: 4, odo_limit: 200},
  ])

  const [vehicle, setVehicle] = useState([
    {vin: '0001', make: 'Toyota', model: 'Corolla', year: '2023', plate: 'ABC123', classID: '10001'},
    {vin: '0002', make: 'Honda', model: 'Civic', year: '2023', plate: 'XYZ456', classID: '10001'},
    {vin: '0003', make: 'Ford', model: 'Escape', year: '2023', plate: 'LMN789', classID: '10001'},
    {vin: '0004', make: 'Chevrolet', model: 'Malibu', year: '2023', plate: 'PQR101', classID: '10001'},
    {vin: '0011', make: 'Toyota', model: 'Corolla', year: '2023', plate: 'ABC123', classID: '10002'},
    {vin: '0012', make: 'Honda', model: 'Civic', year: '2023', plate: 'XYZ456', classID: '10002'},
    {vin: '0013', make: 'Ford', model: 'Escape', year: '2023', plate: 'LMN789', classID: '10002'},
    {vin: '0014', make: 'Chevrolet', model: 'Malibu', year: '2023', plate: 'PQR101', classID: '10002'},
    {vin: '0021', make: 'Toyota', model: 'Corolla', year: '2023', plate: 'ABC123', classID: '10003'},
    {vin: '0022', make: 'Honda', model: 'Civic', year: '2023', plate: 'XYZ456', classID: '10003'},
    {vin: '0023', make: 'Ford', model: 'Escape', year: '2023', plate: 'LMN789', classID: '10003'},
    {vin: '0024', make: 'Chevrolet', model: 'Malibu', year: '2023', plate: 'PQR101', classID: '10003'},
    {vin: '0031', make: 'Toyota', model: 'Corolla', year: '2023', plate: 'ABC123', classID: '10004'},
    {vin: '0032', make: 'Honda', model: 'Civic', year: '2023', plate: 'XYZ456', classID: '10004'},
    {vin: '0033', make: 'Ford', model: 'Escape', year: '2023', plate: 'LMN789', classID: '10004'},
    {vin: '0034', make: 'Chevrolet', model: 'Malibu', year: '2023', plate: 'PQR101', classID: '10004'},
    {vin: '0041', make: 'Toyota', model: 'Corolla', year: '2023', plate: 'ABC123', classID: '10005'},
    {vin: '0042', make: 'Honda', model: 'Civic', year: '2023', plate: 'XYZ456', classID: '10005'},
    {vin: '0043', make: 'Ford', model: 'Escape', year: '2023', plate: 'LMN789', classID: '10005'},
    {vin: '0044', make: 'Chevrolet', model: 'Malibu', year: '2023', plate: 'PQR101', classID: '10005'},
    {vin: '0051', make: 'Toyota', model: 'Corolla', year: '2023', plate: 'ABC123', classID: '10006'},
    {vin: '0052', make: 'Honda', model: 'Civic', year: '2023', plate: 'XYZ456', classID: '10006'},
    {vin: '0053', make: 'Ford', model: 'Escape', year: '2023', plate: 'LMN789', classID: '10006'},
    {vin: '0054', make: 'Chevrolet', model: 'Malibu', year: '2023', plate: 'PQR101', classID: '10006'},
  ])

    // ??
    const getVehicle = async () => {
        try {
            const results = await axios.get("http://localhost:3002/vehicles")
            setVehicle(results.data);
            //console.log(results);
        } catch (err) {
            console.log(err);
        }
    };

    const getVehicle_class = async () => {
        try {
            const results = await axios.get("http://localhost:3002/vehicles")
            setVehicle_class(results.data);
            //console.log(results);
        } catch (err) {
            console.log(err);
        }
    };

  const handleClassIDclick = (classID) => {
    setSelectedClassID(classID);

    setSelectedVClass();
    setAllVehicle();

    const selectedClass = vehicle_class.find(vehicle_class => vehicle_class.classID === classID);
    setSelectedVClass(selectedClass);

    const vehiclesMatchingClass = vehicle.filter(vehicle => vehicle.classID === classID);
    setAllVehicle(vehiclesMatchingClass);

    setSelectedVIN();
    setSelectedVehicle();
  };


  const handleVINclick = (vin) => {
    setSelectedVIN(vin);
  
    // Find the order
    const selectedVehicle = allVehicle.find(vehicel => vehicel.vin === vin);
    setSelectedVehicle(selectedVehicle);
  };


  const renderOrderDetail = () => {
    if (!selectedVehicle) {
      return null; // Or display a message indicating no vehicle is selected yet
    }
  
    return (
        <div className='vehicleInfoContainer'>
        <label className='datatitle'> VIN #{selectedVehicle.vin}</label>

        <form >
            <div className='vehicleDetailContainer'>
            <div className='dataContainer'>
                <label className='fontSize20'> Economy </label>
                <label className='dataDetail'> Daily Rate: {selectedVClass.daily_rate}</label>
                <label className='dataDetail'> Over milage fee: {selectedVClass.over_mlg_fee}</label>
                <label className='dataDetail'> Odometer Limits: {selectedVClass.odo_limit}</label>
            </div>

            <div className='dataContainer'>
                <label className='fontSize20'> Vehicle </label>
                <label className='dataDetail'> Make: {selectedVehicle.make} </label>
                <label className='dataDetail'> Model: {selectedVehicle.model} </label>
                <label className='dataDetail'> Year: {selectedVehicle.year} </label>
                <label className='dataDetail'> Plate: {selectedVehicle.plate} </label>
            </div>
            </div>
        </form>
        </div>
    );
  };

  return (
    <div>
        <div className='titleContainer' id='fontSize'>
            <label>Vehicle</label>
        </div>

        <div className='modifyDatabaseSection'>
          <div className='datasearchSection'>
            <div className='datasearchResultSection'>
                {vehicle_class.map((info) =>{
                    return<button key={`vehicel_class_${info.classID}`} onClick={() => handleClassIDclick(info.classID)}>
                        {selectedClassID === info.classID && <img src='/right.png' width={"16px"}></img>}
                            <label>{info.cl_name}</label>
                        </button>
                })}
            </div>
          </div>

            {selectedClassID && <div className='datasearchSection'>
                <div className='datasearchResultSection'>
                    {allVehicle.map((info) => {
                        return (
                            <button key={`vehicel_${info.vin}`} onClick={() => handleVINclick(info.vin)}>
                                {selectedVIN === info.vin && <img src='/right.png' width={"16px"}></img>}
                                <label>{info.vin}</label>
                            </button>
                        );
                    })}
                </div>
            </div>}

            {renderOrderDetail()}
        </div>
        
    </div>
)};

export default Vehicles;