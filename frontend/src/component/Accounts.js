import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const Accounts = ({carInfo}) => {
  const [selected, setSelected] = useState("")
  const [query, setQuery] = useState('')

  return (
    <div>
        <div className='titleContainer' id='fontSize'>
            <label>Accounts</label>
        </div>

        <div className='modifyDatabaseSection'>


        </div>
        
    </div>
  )
};

export default Accounts;