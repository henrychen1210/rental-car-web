import { Fragment, useState, useEffect } from 'react'
import axios from "axios";


const Customers = ({carInfo}) => {
  const [selected, setSelected] = useState("")
  const [accountList, setAccountList] = useState([])
  const [accountInfo, setAccountInfo] = useState({})

  // get all customer
  const getAccountList = async () => {
    try {
        const results = await axios.get("http://localhost:3002/get_all_customer")
        setAccountList(results.data);
       // console.log(accountList);
    } catch (err) {
        console.log(err);
    }
  };

  // get individual customer by id
  const getAcountInfo_ind = async (customer_id) => {
    try {
        const results = await axios.post("http://localhost:3002/get_customer_ind", { customer_id: customer_id })
        setAccountInfo(results.data[0]);
        //onsole.log(accountInfo);
    } catch (err) {
        console.log(err);
    }
  };

  // get corporate customer by id
  const getAcountInfo_cor = async (customer_id) => {
    try {
        const results = await axios.post("http://localhost:3002/get_customer_cor", { customer_id: customer_id })
        setAccountInfo(results.data[0]);
        //onsole.log(accountInfo);
    } catch (err) {
        console.log(err);
    }
  };

  const renderOrderDetail = () => (
    <div className='orderInfoContainer'>
      <label className='datatitle'> Customer ID #{accountInfo.customer_id}</label>

      <div className='customerDetailContainer'>
        {accountInfo.cu_type == 'I' && <div className='dataContainer'>
        
          <label className='dataDetail'> First Name: {accountInfo.in_fname}</label>
          <label className='dataDetail'> Last Name: {accountInfo.in_lname}</label>
          <label className='dataDetail'> Driver Licence: {accountInfo.dr_lic}</label>
          <label className='dataDetail'> Insurance Company: {accountInfo.insurance}</label>
          <label className='dataDetail'> Insurance Policy: {accountInfo.policy}</label>
          <br/>
          <label className='dataDetail'> Email: {accountInfo.cu_email}</label>
          <label className='dataDetail'> Phone: {accountInfo.cu_phone}</label>
          <label className='dataDetail'> Type: Individual</label>
          <label className='dataDetail'> Password: {accountInfo.cu_password}</label>

        </div>}

        {accountInfo.cu_type == 'C' && <div className='dataContainer'>

          <label className='dataDetail'> Corporate Name: {accountInfo.corp_name}</label>
          <label className='dataDetail'> Registration Number: {accountInfo.co_reg}</label>
          <label className='dataDetail'> Employee ID: {accountInfo.emp_id}</label>
          <label className='dataDetail'> Coupon Code: {accountInfo.coupon_id}</label>
          <br/>
          <label className='dataDetail'> Email: {accountInfo.cu_email}</label>
          <label className='dataDetail'> Phone: {accountInfo.cu_phone}</label>
          <label className='dataDetail'> Type: Corporate</label>
          <label className='dataDetail'> Password: {accountInfo.cu_password}</label>
          
        </div>}

        
      </div>
    </div>
  )

  const handlCustomerIDclick = (customer) => {
    setSelected(customer.customer_id);

    if (customer.cu_type == "I")
      getAcountInfo_ind(customer.customer_id);
    else if (customer.cu_type == "C")
      getAcountInfo_cor(customer.customer_id);
  }

  
  useEffect(() => {
    getAccountList();
  }, []);


  return (
    <div>
      <div className='titleContainer' id='fontSize'>
          <label>Customers</label>
      </div>

      <div className='modifyDatabaseSection'>
        <div className='datasearchSection'>
          
          {/*<input type="text" name="orderID" placeholder='Search Order ID... ' onChange={(newValue) => {setSearchID(newValue)}}/>*/}

          <div className='datasearchResultSection'>
            {accountList
            .sort((a, b) => a.customer_id - b.customer_id)
            .map((info) =>{
              return<button key={info.customer_id} onClick={() => handlCustomerIDclick(info)}>
                    {selected === info.customer_id && <img src='/right.png' width={"16px"}></img>}
                      <label>{info.customer_id}</label>
                    </button>
            })}
          </div>
        </div>

          {selected != '' && renderOrderDetail()}
        </div>
    </div>
  )
};

export default Customers;