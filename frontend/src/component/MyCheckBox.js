import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const MyCheckbox = ({options, placeholder, width, onChange }) => {
  const [selected, setSelected] = useState("")
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? options
      : options.filter((option) =>
        option.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  const handleCheckboxChange = (newValue) => {
    setSelected(newValue);
    onChange(options.find(item => item.name === newValue));
  };

  return (
    <div className="myCheckboxContainer">
      <Combobox value={selected} onChange={handleCheckboxChange}>
        <div className="relative mt-1">
          <div className="checkboxCoantier" style={width = {width}}>
            <Combobox.Input
              className="comboboxBox"
              placeholder={placeholder}
              displayValue={(option) => option}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="comboboxButton">
              <ChevronUpDownIcon
                aria-hidden="true"
                height={"20px"}
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="comboboxoptionbar">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="comboboxoptionNothing" style={width = {width}}>
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `${active ? 'comboboxoptionActive' : 'comboboxoption'}`
                    }
                    value={option.name}
                  >
                    {({ selected, active }) => (
                      <span>
                        {selected? (
                          <span className={`${active ? 'comboboxCheckContainer' : 'comboboxHideDot'}`}>
                            <CheckIcon height={"20px"} aria-hidden="true" />
                          </span>
                        ) : 
                          <span className={`${active ? 'comboboxCheckContainer' : 'comboboxHideDot'}`}>
                          </span>}
                        <span className='comboboxItem'>
                          {option.name}
                        </span>
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
};

export default MyCheckbox;