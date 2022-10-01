import React from "react"
import s from "./select.module.scss"

const Select = (props) => {

  let {value, onChange} = props.options;
  return (
    <select className={s.select} value={value} onChange={onChange}>
      {props.options.map((o, i) => {
        return <option key={i} value={o.value}>По {o.label}</option>
      })}
    </select>
  )
} 

export default Select;