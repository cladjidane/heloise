/* ***** edit.js *****
 * UTILITY : Allows to change value on doubleclick
             or cancel if clicked elsewhere
 * ****************** */

import React from 'react';

const Edit = (props) => {
    return (
        <div>
          {/* The text is passed to the Edit tag as children */}
          <div>{props.children}</div>
          {
          // active props = the value being editted
          props.active ?
            //onChange triggered when something is being typed
            //onBlur triggered when input element loses focus
            <input value = {props.value} onChange = {props.inputChange} onBlur = {props.blur} autoFocus/>
              :
            //if doubleClicked then the prop becomes active
            <div onDoubleClick = {props.doubleClick}>
              {props.value}
            </div>
          }
        </div>
      )
    }
  

export default Edit;