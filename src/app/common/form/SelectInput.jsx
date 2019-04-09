import React from 'react'
import { Form, Label, Dropdown } from 'semantic-ui-react'

function SelectInput({ input, type, placeholder, multiple, options, meta: { touched, error } }) {
  return (
    <Form.Field error={!!error && touched}>
      <Dropdown {...input} placeholder={placeholder} options={options} multiple={multiple} selection={true} value={input.value} onChange={(e, data) => input.onChange(data.value)} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default SelectInput
