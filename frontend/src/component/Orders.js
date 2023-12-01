import { Fragment, useState } from 'react'




const Orders = ({carInfo}) => {
  const [searchID, setSearchID] = useState('')
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('')

  const exps = [
    {orderID: '10001', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10002', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '998q3', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10003', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99q23', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10004', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99123', vin: 'JJJJJJ87621', coupon_id: '12345'},
    {orderID: '10005', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '92123', vin: 'JJJJJJ87621', coupon_id: '12345'}
  ]

  const handleorderIDclick = (orderID) => {
    setSelected(orderID)
    setOrder(exps.find(exps => exps.orderID === orderID))
  }

  const renderOrderDetail = () => (
    <div className='orderInfoContainer'>
      <label className='datatitle'> Order ID #{order.orderID}</label>

      <div className='orderDetailContainer'>
        <div className='dataContainer'>
          <label className='fontSize20'> Customer </label>
          <label className='dataDetail'> ID: &nbsp;
            <input type="text" placeholder={order.customer_id}/>
          </label>
        </div>

        <div className='dataContainer'>
          <label className='fontSize20'> Vehicle </label>
          <label className='dataDetail'> VIN: &nbsp;
            <input type="text" placeholder={"????"}/>
          </label>
        </div>

        <div className='dataContainer'>
          <label className='fontSize20'> Coupon </label>
          <label className='dataDetail'> ID: 
            <input type="text" placeholder={order.coupon_id}/>
          </label>
        </div>

        <div className='dataContainer'>
          <label className='fontSize20'> Pick Up </label>
          <label className='dataDetail'> Date: &nbsp;
            <input type="text" placeholder={order.pick_date}/>
          </label>
          <label className='dataDetail'> Location: &nbsp;
            <input type="text" placeholder={order.pick_loc}/>
          </label>
          <label className='dataDetail'> Start Odometer: &nbsp;
            <input type="text" id='odoInput' placeholder={order.start_odo}/>
          </label>
        </div>

        <div className='dataContainer'>
          <label className='fontSize20'> Drop Off </label>
          <label className='dataDetail'> Date: &nbsp;
            <input type="text" placeholder={order.drop_date}/>
          </label>
          <label className='dataDetail'> Location: &nbsp;
            <input type="text" placeholder={order.drop_loc}/>
          </label>
          <label className='dataDetail'> End Odometer: &nbsp;
            <input type="text" id='odoInput' placeholder={order.end_odo}/>
          </label>
        </div>

        <div className='dataContainer'>
          <label className='fontSize20'> Invoice </label>
          <label className='dataDetail'> Date: &nbsp;
            <input type="text" placeholder={"????"}/>
          </label>
          <label className='dataDetail'> Amount: &nbsp;
            <input type="text" placeholder={"?????"}/>
          </label>
        </div>

        <div className='dataContainer' id='paymentSection'>
          <label className='fontSize20'> Payment </label>
          <label className='dataDetail'> Date: &nbsp;
            <input type="text" placeholder={"????"}/>
          </label>
          <label className='dataDetail'>Method: &nbsp;
            <input type="text" placeholder={"???"}/>
          </label>
          <label className='dataDetail'> Card No.: &nbsp;
            <input type="text" placeholder={"1234 5678 1234 5678"}/>
          </label>
          <label className='dataDetail'> Amount: &nbsp;
            <input type="text" placeholder={"????"}/>
          </label>
        </div>
        
      </div>
      
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
              {exps.map((exp) =>{
                return<button onClick={() => handleorderIDclick(exp.orderID)}>
                      {selected === exp.orderID && <img src='/right.png' width={"16px"}></img>}
                        <label>{exp.orderID}</label>
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