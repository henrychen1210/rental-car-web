import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";

const SearchResult = ({carInfo, setIsCheckOut, setSelectCar}) => {
  const [selected, setSelected] = useState("")
  const [query, setQuery] = useState('')
  const [carClass, setCarClass] = useState('')

  const navigate = useNavigate();

  const handelSelect = () => {
    setIsCheckOut(true)
    setSelectCar(carInfo)
  }
  

  return (
    <div className='carInfoContainer'>
        <img src={`/${carInfo.model}.png`} id="carImage"></img>
        <div className='carInfoSection'>
          <label className='carInfoFontStyle' id='fontSize25'>{carInfo.make}</label>
          <label className='carInfoFontStyle' id='fontSize15'>{carInfo.model}</label>
          <label className='carInfoFontStyle' id='fontSize15'>{carInfo.cl_name}</label>
          <label className='carInfoFontStyle' id='fontSize15'>{carInfo.location}</label>
        </div>

        <div className='dailyRateSection'>
          <label  className='carInfoFontStyle' id='fontSize15'>Starting at</label>
          <label  className='carInfoFontStyle' id='fontSize25'>${carInfo.daily_rate.toFixed(2)}/day</label>
        </div>

        <button className='selectCarButton' onClick={handelSelect}>
          Select
        </button>
    </div>
  )
};

export default SearchResult;