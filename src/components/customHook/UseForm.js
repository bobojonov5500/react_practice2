import React, { useState } from 'react'

function UseForm(inputdatas) {
  const [value, inputValues] = useState(inputdatas)

  return (
    [
      value,
      (e) => {
        inputValues({ ...value, [e.target.name]: e.target.value })
      }
    ]
  )
}

export default UseForm
