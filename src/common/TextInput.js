import React from 'react'

const TextInput = (
  { name,
    handleChange,
    handleKeyUp,
    handleBlur,
    error,
    label="Text Input",
    value="",
    style={layout: "row form-group", inputDivClass: "col-md-6", inputClass: "form-control", labelClass:"col-md-3 form-label"},
    domReference
  }) => (
  <div className={style.layout}>
    <div className={style.labelClass}>
      {label}
    </div>
    <div className={style.inputDivClass}>
      <input
        type="text" className={style.inputClass}
        id={name} name={name}
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        ref={domReference}
      />
      {error && <div style={error}>{error}</div>}
    </div>
  </div>
);

export default TextInput;
