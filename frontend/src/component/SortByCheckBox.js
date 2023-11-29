import { Fragment, useState } from 'react'
import Select from 'react-select';

const options = [
  { value: 'Recommend', label: 'Recommend' },
  { value: 'PriceHightoLow', label: 'Price: High to Low' },
  { value: 'PriceLowtoHigh', label: 'Price: Low to High' },
  // Add more options as needed
];

// Define custom styles if needed
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    color: '#3C403F',
    border: '2px solid #D7D7D7',
    width: '200px',
    height: '30px',
    boxShadow: 'none',
    borderRadius: '8px',
    backgroundColor: '#F8F8F8',
    fontSize: '15px',
    '&:hover': { border: '2px solid #9D9D9D' }, // Border style on hover
    
  }),
  option: (provided, state) => ({
    ...provided,
    color: '#3C403F',
    fontSize: '15px',
    height: '30px',
    backgroundColor: state.isSelected ? '#F8F8F8' : 'white', // Set the background color for selected option
    '&:hover': {
      color: 'white',
      backgroundColor: '#9D9D9D', // Set the background color on hover
    },
    borderRadius: '5px',
    padding: '5px'
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '5px',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#3C403F'
  })
};

const SortByCheckBox = ({onChange}) => {
  const [sortBy, setSortBy] = useState("Recommend")

  const handleSelectChange = (newValue) => {
    setSortBy(newValue);
    onChange(newValue);
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      classNamePrefix="custom-select"
      defaultValue={options[0]}
      onChange={handleSelectChange}
      isSearchable={false} 
    />
  );
};

export default SortByCheckBox;