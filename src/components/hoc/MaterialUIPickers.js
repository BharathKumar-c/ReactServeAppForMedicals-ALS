import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function MaterialUIPickers({
  labelText,
  handleDateChange,
  name,
  dateValue,
  minDate,
  maxValue,
  isError,
  isDisable = false,
  isRequired = false,
  format,
  readOnly
}) {
  const handleChange = date => {
    handleDateChange(name, date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disabled={isDisable}
        margin="none"
        label={labelText}
        format={format ? format : 'MM/dd/yyyy'}
        inputVariant="standard"
        value={dateValue ? dateValue : null}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxValue}
        required={isRequired}
        error={isError}
        fullWidth
        InputProps={{
          readOnly: readOnly
        }}
        KeyboardButtonProps={{
          disabled: readOnly,
          style: {display: readOnly ? 'none' : ''}
        }}
        FormHelperTextProps={{
          style: {
            color: 'red'
          }
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
