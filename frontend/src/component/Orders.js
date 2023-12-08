import { Fragment, useState, useEffect } from 'react'
import axios from "axios";



const Orders = ({}) => {
  const [selected, setSelected] = useState('')
  const [orderList, setOrderList] = useState([])

  const [orderInfo, setOrderInfo] = useState({
    rental_id: '',
    pick_date: '',
    drop_date: '',
    start_odo: '',
    end_odo: '',
    pick_loc: '',
    drop_loc: '',
    customer_id: '',
    vin: '',
    coupon_id: ''
  });

  const [invoiceInfo, setInvoiceInfo] = useState({
    inv_id: '',
    inv_date: '',
    inv_amt: '',
    rental_id: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    payment_id: '',
    pmt_date: '',
    pmt_method: '',
    start_odo: '',
    car_num: '',
    paid_amt: '',
    inv_id: '',
  });


  // get all order
  const getOrderList = async () => {
    try {
        const results = await axios.get("http://localhost:3002/get_all_orders")
        setOrderList(results.data);
        //console.log(orderList);
    } catch (err) {
        console.log(err);
    }
  };

  // get order by id
  const getOrderInfo = async (rental_id) => {
    try {
      const results = await axios.post("http://localhost:3002/get_order", { rental_id: rental_id });
      setOrderInfo(results.data[0]);
      //console.log(orderInfo);
    } catch (err) {
        console.log(err);
    }
  };

  // get invoice by rental_id 
  const getInvoiceInfo = async (rental_id) => {
    try {
      const results = await axios.post("http://localhost:3002/get_invoice", { rental_id: rental_id })

      setInvoiceInfo(results.data[0]);
      //console.log(invoiceInfo);

      const inv_id = results.data[0].inv_id; // Assuming inv_id is available in the response
      await getPaymentInfo(inv_id);

    } catch (err) {
      console.log(err);
    }
  };

  // get payment by inv_id 
  const getPaymentInfo = async (inv_id) => {
    try {
      const results = await axios.post("http://localhost:3002/get_payment", { inv_id: inv_id })
      setPaymentInfo(results.data[0]);
      //console.log(paymentInfo);
    } catch (err) {
      console.log(err);
    }
  };

  const handleorderIDclick = (rental_id) => {
    setSelected(rental_id);
    getOrderInfo(rental_id);
    getInvoiceInfo(rental_id);
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    //setOrder({ ...order, [name]: value });
  };

  const handleInvoiceInputChange = (e) => {
    const { name, value } = e.target;
    //setInvoice({ ...invoice, [name]: value });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    //setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleInsertOrder = () => {
    const lastOrderID = orderInfo.length > 0 ? parseInt(orderInfo[orderInfo.length - 1].orderID) : 0;
    const newOrderID = (lastOrderID + 1).toString();
    //setOrder();
    //setOrder({ ...order, orderID: newOrderID });

    //setInvoice();
    //setPayment();
    //setSelected(newOrderID);
  }

  const renderOrderDetail = () => (
    <div className='orderInfoContainer'>
      <label className='datatitle'> Order ID #{orderInfo.rental_id}</label>

      <form onSubmit={handleSubmit}>
        <div className='orderDetailContainer'>
          <div className='dataContainer'>
            <label className='fontSize20'> Customer </label>
            <label className='dataDetail'> ID: {orderInfo.customer_id}
              
            </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Vehicle </label>
            <label className='dataDetail'> VIN: {orderInfo.vin} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Coupon </label>
            <label className='dataDetail'> ID: {orderInfo?.coupon_id || 'N/A'} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Pick Up </label>
            <label className='dataDetail'> Date: {orderInfo.pick_date.slice(0, 10)} </label>
            <label className='dataDetail'> Location: {orderInfo.pick_loc} </label>
            <label className='dataDetail'> Start Odometer: {orderInfo.start_odo} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Drop Off </label>
            <label className='dataDetail'> Date: {orderInfo.drop_date.slice(0, 10)}</label>
            <label className='dataDetail'> Location: {orderInfo.drop_loc} </label>
            <label className='dataDetail'> End Odometer: {orderInfo.end_odo} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Invoice </label>
            <label className='dataDetail'> Date: {invoiceInfo?.inv_date.slice(0, 10) || 'N/A'} </label>
            <label className='dataDetail'> Amount: ${invoiceInfo?.inv_amt || 'N/A'} </label>
          </div>

          <div className='dataContainer' id='paymentSection'>
            <label className='fontSize20'> Payment </label>
            <label className='dataDetail'> Date: {paymentInfo?.pmt_date.slice(0, 10) || 'N/A'} </label>
            <label className='dataDetail'>Method: {paymentInfo?.pmt_method || 'N/A'} </label>
            <label className='dataDetail'> Card: {paymentInfo?.card_num || 'N/A'} </label>
            <label className='dataDetail'> Amount: ${paymentInfo?.paid_amt || 'N/A'} </label>
          </div>
          
        </div>
      </form>
    </div>
  )

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div>
        <div className='titleContainer' id='fontSize'>
            <label>Orders</label>
        </div>

        <div className='modifyDatabaseSection'>
          <div className='datasearchSection'>
            
            {/*<input type="text" name="orderID" placeholder='Search Order ID... ' onChange={(newValue) => {setSearchID(newValue)}}/>*/}

            <div className='datasearchResultSection'>
              {orderList
              .sort((a, b) => a.rental_id - b.rental_id)
              .map((info) =>{
                return<button key={info.rental_id} onClick={() => handleorderIDclick(info.rental_id)}>
                      {selected === info.rental_id && <img src='/right.png' width={"16px"}></img>}
                        <label>{info.rental_id}</label>
                      </button>
              })}
            </div>
          </div>

            {selected != '' && renderOrderDetail()}
          </div>
        
    </div>
  )
};

export default Orders;