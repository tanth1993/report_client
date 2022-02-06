import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface IAutocompleteMUI {
    data?: any[]
    placeholder?: string
    inputValue?: string
    indexNameKey?: string
    indexValueKey?: string
    value?: any[]
    onChange?: (event: React.SyntheticEvent, value: any) => void
    onInputChange?: (event: React.SyntheticEvent, value: string, reason: string) => void
    onBlur?: () => void
    onFocus?: () => void
}

export const AutocompleteMUI: React.FC<IAutocompleteMUI> = (props) => {
    const { placeholder = 'unknown', data = [], children, indexNameKey = 'name', indexValueKey = 'studentId',
        onChange, value, onInputChange, inputValue = '', onBlur, onFocus,
    } = props

    return (
        <Autocomplete
            // multiple
            disablePortal
            freeSolo={true}
            defaultValue={''}
            autoHighlight
            // value={valueItem}
            isOptionEqualToValue={(opt, val) => opt[indexValueKey] === val[indexValueKey]}
            options={data}
            getOptionLabel={(opt) => opt[indexNameKey] || ''}

            sx={{ width: 400 }}
            inputValue={inputValue}
            onChange={onChange}
            onInputChange={onInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onClose={onBlur}
            renderInput={(params) => <TextField {...params} label={placeholder} inputProps={{ ...params.inputProps }} />}

        />
    )
}
