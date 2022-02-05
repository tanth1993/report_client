import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface IAutocompleteMUI {
    data?: any[]
    placeholder?: string
    inputValue?: string
    indexNameKey?: string
    indexValueKey?: string
    value?: any
    onChange?: (event: React.SyntheticEvent, value: any) => void
    onInputChange?: (event: React.SyntheticEvent, value: string, reason: string) => void
}

export const AutocompleteMUI: React.FC<IAutocompleteMUI> = (props) => {
    const { placeholder = 'unknown', data = [], children, indexNameKey = 'name',
        onChange, value, onInputChange, inputValue,
        indexValueKey = 'studentId' } = props
    const valueItem = data?.find(d => d[indexValueKey] === value);
    return (
        <Autocomplete
            disablePortal
            value={valueItem}
            isOptionEqualToValue={(opt, val) => opt[indexValueKey] === val[indexValueKey]}
            options={data}
            getOptionLabel={(opt) => opt[indexNameKey] || ''}

            sx={{ width: 400 }}
            inputValue={valueItem?.[indexNameKey]}
            onChange={onChange}

            onInputChange={onInputChange}
            renderInput={(params) => <TextField {...params} label={placeholder} inputProps={{ ...params.inputProps }} />}
        />
    )
}
