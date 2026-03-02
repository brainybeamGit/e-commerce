import React from 'react'

const ButtonComponent = ({btnName, color}) => {
  return (
    <>
    <button style={{background: color, color: "white"}}>{btnName}</button>
    </>
  )
}

export default ButtonComponent