import { Fragment, useState, useEffect } from 'react'
import axios from "axios";


const Coupon = ({carInfo}) => {
  const [selected, setSelected] = useState("")
  const [couponList, setCouponList] = useState([])
  const [couponInfo, setCouponInfo] = useState({})

  // get all Coupon
  const getCouponList = async () => {
    try {
        const results = await axios.get("http://localhost:3002/get_all_coupon")
        setCouponList(results.data);
        console.log(couponList);
    } catch (err) {
        console.log(err);
    }
  };

  // get Coupon by id
  const getCouponInfo = async (coupon_id) => {
    try {
        const results = await axios.post("http://localhost:3002/get_coupon", { coupon_id: coupon_id })
        setCouponInfo(results.data[0]);
        console.log(couponInfo);
    } catch (err) {
        console.log(err);
    }
  };

  const renderOrderDetail = () => (
    <div className='orderInfoContainer'>
      <label className='datatitle'> Customer ID #{couponInfo.coupon_id}</label>

      <div className='customerDetailContainer'>
        <div className='dataContainer'>
        
          <label className='dataDetail'> Valid From: {couponInfo.valid_from?.slice(0, 10) || "N/A"}</label>
          <label className='dataDetail'> Valid To: {couponInfo.valid_to?.slice(0, 10) || "N/A"}</label>
          <label className='dataDetail'> Discoint: {couponInfo.dis_per}% off</label>
        </div>
      </div>
    </div>
  )

  const handlCustomerIDclick = (coupon_id) => {
    setSelected(coupon_id);
    getCouponInfo(coupon_id);
  }

  
  useEffect(() => {
    getCouponList();
  }, []);


  return (
    <div>
      <div className='titleContainer' id='fontSize'>
          <label>Coupon</label>
      </div>

      <div className='modifyDatabaseSection'>
        <div className='datasearchSection'>
          
          {/*<input type="text" name="orderID" placeholder='Search Order ID... ' onChange={(newValue) => {setSearchID(newValue)}}/>*/}

          <div className='datasearchResultSection'>
            {couponList
            .sort((a, b) => a.coupon_id - b.coupon_id)
            .map((info) =>{
              return<button key={info.coupon_id} onClick={() => handlCustomerIDclick(info.coupon_id)}>
                    {selected === info.coupon_id && <img src='/right.png' width={"16px"}></img>}
                      <label>{info.coupon_id}</label>
                    </button>
            })}
          </div>
        </div>

          {selected != '' && renderOrderDetail()}
        </div>
    </div>
  )
};

export default Coupon;