import { Fragment, useState } from 'react'




const Orders = ({}) => {
  const [searchID, setSearchID] = useState('')
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState({
    orderID: '',
    pick_date: '',
    drop_date: '',
    start_odo: '',
    end_odo: '',
    pick_loc: '',
    drop_loc: '',
    customer_id: '',
    vin: '',
    coupon_id: '',
  });

  const [invoice, setInvoice] = useState({
    invID: '',
    inv_date: '',
    inv_amt: '',
    orderID: ''
  });

  const [payment, setPayment] = useState({
    paymentID: '',
    pmt_date: '',
    pmt_method: '',
    start_odo: '',
    car_num: '',
    paid_amt: '',
    invID: '',
  });

  const orderInfo = [
    {orderID: '10001', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10002', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '998q3', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10003', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99q23', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10004', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99123', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10005', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '92123', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10006', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '92123', vin: 'JJJJJJ87621', coupon_id: '12345'}
  ]

  const invoiceInfo = [
    {invID: '991', inv_date: '2023-12-01', inv_amt: 33002, orderID:'10001'},
    {invID: '992', inv_date: '2023-12-07', inv_amt: 3212, orderID:'10002'},
    {invID: '993', inv_date: '2023-12-02', inv_amt: 2002, orderID:'10003'},
    {invID: '994', inv_date: '2023-12-03', inv_amt: 1002, orderID:'10004'},
    {invID: '995', inv_date: '2023-12-06', inv_amt: 87112, orderID:'10005'},
  ]

  const paymentInfo = [
    {paymentID: '001', pmt_date: '2023-12-01', pmt_method: 'credit', card_num: '1234-5678-9012-3456', paid_amt: 33002, invID: '991'},
    {paymentID: '002', pmt_date: '2023-12-01', pmt_method: 'credit', card_num: '1234-5678-9012-3456', paid_amt: 3212, invID: '992'},
    {paymentID: '003', pmt_date: '2023-12-01', pmt_method: 'credit', card_num: '1234-5678-9012-3456', paid_amt: 2002, invID: '993'},
    {paymentID: '004', pmt_date: '2023-12-01', pmt_method: 'credit', card_num: '1234-5678-9012-3456', paid_amt: 1002, invID: '994'},
    {paymentID: '005', pmt_date: '2023-12-01', pmt_method: 'credit', card_num: '1234-5678-9012-3456', paid_amt: 87112, invID: '995'},
  ]

  const handleorderIDclick = (orderID) => {
    setSelected(orderID);
  
    // Find the order
    const selectedOrder = orderInfo.find(orderInfo => orderInfo.orderID === orderID);
    setOrder(selectedOrder);
  
    const selectedInvoice = invoiceInfo.find(invoiceInfo => invoiceInfo.orderID === orderID);
    if (selectedInvoice) {
      setInvoice(selectedInvoice);
      const selectedPayment = paymentInfo.find(paymentInfo => paymentInfo.invID === selectedInvoice.invID);
      setPayment(selectedPayment);
    } else {
      setInvoice();
      setPayment();
    }
    };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleInvoiceInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Order:", order);
    console.log("Submitted Invoice:", invoice);
    console.log("Submitted Payment:", payment);
  }

  const handleInsertOrder = () => {
    const lastOrderID = orderInfo.length > 0 ? parseInt(orderInfo[orderInfo.length - 1].orderID) : 0;
    const newOrderID = (lastOrderID + 1).toString();
    setOrder();
    setOrder({ ...order, orderID: newOrderID });

    setInvoice();
    setPayment();
    setSelected(newOrderID);
  }

  const renderOrderDetail = () => (
    <div className='orderInfoContainer'>
      <label className='datatitle'> Order ID #{order.orderID}</label>

      <form onSubmit={handleSubmit}>
        <div className='orderDetailContainer'>
          <div className='dataContainer'>
            <label className='fontSize20'> Customer </label>
            <label className='dataDetail'> ID: {order.customer_id}
              
            </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Vehicle </label>
            <label className='dataDetail'> VIN: {order.vin} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Coupon </label>
            <label className='dataDetail'> ID: {order.coupon_id} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Pick Up </label>
            <label className='dataDetail'> Date: {order.pick_date} </label>
            <label className='dataDetail'> Location: {order.pick_loc} </label>
            <label className='dataDetail'> Start Odometer: {order.start_odo} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Drop Off </label>
            <label className='dataDetail'> Date: {order.drop_date}
              
            </label>
            <label className='dataDetail'> Location: {order.drop_loc} </label>
            <label className='dataDetail'> End Odometer: {order.end_odo} </label>
          </div>

          <div className='dataContainer'>
            <label className='fontSize20'> Invoice </label>
            <label className='dataDetail'> Date: {invoice?.inv_date || 'N/A'} </label>
            <label className='dataDetail'> Amount: {invoice?.inv_amt || 'N/A'} </label>
          </div>

          <div className='dataContainer' id='paymentSection'>
            <label className='fontSize20'> Payment </label>
            <label className='dataDetail'> Date: {payment?.pmt_date || 'N/A'} </label>
            <label className='dataDetail'>Method: {payment?.pmt_method || 'N/A'} </label>
            <label className='dataDetail'> Card No.: {payment?.card_num || 'N/A'} </label>
            <label className='dataDetail'> Amount: {payment?.paid_amt || 'N/A'} </label>
          </div>
          
        </div>
      </form>
    </div>
  )

  return (
    <div>
        <div className='titleContainer' id='fontSize'>
            <label>Orders</label>
        </div>

        <div className='modifyDatabaseSection'>
          <div className='datasearchSection'>
            <input type="text" name="orderID" placeholder='Search Order ID... ' onChange={(newValue) => {setSearchID(newValue)}}/>

            <div className='datasearchResultSection'>
              {orderInfo.map((info) =>{
                return<button key={info.orderID} onClick={() => handleorderIDclick(info.orderID)}>
                      {selected === info.orderID && <img src='/right.png' width={"16px"}></img>}
                        <label>{info.orderID}</label>
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