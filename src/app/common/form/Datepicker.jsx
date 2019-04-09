import React from 'react'
import DatePicker from 'react-datepicker'
import { Form, Label } from 'semantic-ui-react'

import 'react-datepicker/dist/react-datepicker.css'

function Datepicker({ input: {value, onChange, ...restInput}, width, placeholder, showTimeSelect = true, meta: { touched, error }, ...rest }) {
  return (
    <Form.Field error={!!error && touched} width={width}>
      <DatePicker
        {...rest}
        {...restInput}
        locale='fr'
        showTimeSelect={showTimeSelect}
        dateFormat="dd/MM/yyyy HH:mm"
        timFormat="HH:mm"
        placeholderText={placeholder}
        selected={value ? new Date(value) : null}
        onChange={onChange}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default Datepicker
