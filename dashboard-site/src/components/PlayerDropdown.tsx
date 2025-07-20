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
    borderColor: state.isFocused ? '#ccc' : '#ccc', 
    boxShadow: 'none', 
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