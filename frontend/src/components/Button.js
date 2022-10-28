import React from 'react';
import '../styles/components/button.css';
export default function Button(props) {
  return (
    <button type="submit" className="btn btn-primary w-100" onClick={props.onClick}>{props.text}</button>
  )
}
