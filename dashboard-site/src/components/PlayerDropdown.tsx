import React from 'react';

import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface PlayerDropdownProps {
  options: OptionType[];
  value?: OptionType;
  onChange?: (option: OptionType | null) => void;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: 44,
    fontSize: 18,
    borderColor: state.isFocused ? '#007bff' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 2px #007bff33' : provided.boxShadow,
    backgroundColor: '#fff',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: 18,
    color: state.isSelected ? '#fff' : '#222',
    backgroundColor: state.isSelected
      ? '#007bff'
      : state.isFocused
      ? '#e6f0ff'
      : '#fff',
    fontWeight: state.isSelected ? 700 : 400,
    cursor: 'pointer',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: 18,
    color: '#222',
    fontWeight: 600,
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const PlayerDropdown: React.FC<PlayerDropdownProps> = ({ options, value, onChange }) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      value={value}
      onChange={onChange}
      name="player"
      options={options}
      isClearable={false}
      isSearchable={true}
      styles={customStyles}
    />
  );
};

export default PlayerDropdown;




/***
 * 
 * 
 *  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);


 *   isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
 * 
 import { colourOptions } from '../data';

// const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
//   <label style={{ marginRight: '1em' }}>
//     <input type="checkbox" {...props} />
//     {children}
//   </label>
// );
 * <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
        <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Clearable
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading((state) => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
          RTL
        </Checkbox>
      </div>
 */