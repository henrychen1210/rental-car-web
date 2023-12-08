import { Fragment, useState, useEffect } from 'react'
import axios from "axios";


const Vehicles = ({carInfo}) => {
  const [selectedClassID, setSelectedClassID] = useState("")
  const [selectedVIN, setSelectedVIN] = useState("")

  const [vehicle_classList, setVehicle_classList] = useState([]);
  const [allVehicle, setAllVehicle] = useState([]);

  const [vehicle, setVehicle] = useState({
    vin: '',
    make: '',
    model: '',
    year: '',
    plate: '',
    class_id: '',
    cl_name: '',
    daily_rate: '',
    over_mlg_fee: '',
    odo_limit: ''
  });

    // get all vehivel class
    const getVehicle_class = async () => {
        try {
            const results = await axios.get("http://localhost:3002/get_all_vclass")
            setVehicle_classList(results.data);
            //console.log(results);
        } catch (err) {
            console.log(err);
        }
    };

    // get all vehivel class
    const getVehicleByClass = async (class_id) => {
        try {
            const results = await axios.post("http://localhost:3002/get_vehicle_by_class", {class_id: class_id})
            setAllVehicle(results.data);
            //console.log(allVehicle);
        } catch (err) {
            console.log(err);
        }
    };

    //
    const getVehicle = async (vin) => {
        try {
            const results = await axios.post("http://localhost:3002/get_vehicles", {vin: vin})
            setVehicle(results.data[0]);
            //console.log(results);
        } catch (err) {
            console.log(err);
        }
    };

  const handleClassIDclick = (class_id) => {
    setSelectedClassID(class_id);
    getVehicleByClass(class_id);
    setSelectedVIN('');
  };


  const handleVINclick = (vin, class_id) => {
    setSelectedVIN(vin);
    getVehicle(vin);
  };


  const renderOrderDetail = () => {
    if (selectedVIN == '') {
      return null; // Or display a message indicating no vehicle is selected yet
    }
  
    return (
        <div className='vehicleInfoContainer'>
        <label className='datatitle'> VIN #{vehicle.vin}</label>

        <form >
            <div className='vehicleDetailContainer'>
            <div className='dataContainer'>
                <label className='fontSize20'> Economy </label>
                <label className='dataDetail'> Daily Rate: {vehicle.daily_rate}</label>
                <label className='dataDetail'> Over milage fee: {vehicle.over_mlg_fee}</label>
                <label className='dataDetail'> Odometer Limits: {vehicle.odo_limit}</label>
            </div>

            <div className='dataContainer'>
                <label className='fontSize20'> Vehicle </label>
                <label className='dataDetail'> Make: {vehicle.make} </label>
                <label className='dataDetail'> Model: {vehicle.model} </label>
                <label className='dataDetail'> Year: {vehicle.year} </label>
                <label className='dataDetail'> Plate: {vehicle.plate} </label>
            </div>
            </div>
        </form>
        </div>
    );
  };

  useEffect(() => {
    getVehicle_class();
  }, []);

  return (
    <div>
        <div className='titleContainer' id='fontSize'>
            <label>Vehicle</label>
        </div>

        <div className='modifyDatabaseSection'>
          <div className='datasearchSection'>
            <div className='datasearchResultSection'>
                {vehicle_classList.map((info) =>{
                    return<button key={`vehicel_class_${info.class_id}`} onClick={() => handleClassIDclick(info.class_id)}>
                        {selectedClassID === info.class_id && <img src='/right.png' width={"16px"}></img>}
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