import React from 'react'
import { Form } from 'semantic-ui-react'
import PlacesAutocomplete from 'react-places-autocomplete'

function PlaceInput({ onSelect = null, disabled, input: { value, onChange, ...restInput }, searchOptions = {}, placeholder, meta: { error, touched }, ...rest }) {
  return (
    <Form.Field error={!!error && touched}>
      <PlacesAutocomplete
        onChange={onChange}
        onSelect={(...args) => {
          // Parent onSelect
          onSelect && onSelect(...args)
          // Because onSelect overrides onChange
          onChange(...args)
        }}
        value={value}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div>
              <input
                {...getInputProps({
                  disabled: disabled,
                  placeholder: placeholder,
                  className: 'location-search-input mt-1 full-width input-form'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <div style={{ height: '40px', lineHeight: '40px', paddingLeft: '10px' }}>{suggestion.description}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }}
      </PlacesAutocomplete>
    </Form.Field>
  )
}

export default PlaceInput
