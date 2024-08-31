import React from 'react';

const TermsCheckbox = ({ refInput, error }) => (
  <div className='terms'>
    <label>Aceptación de Términos y Condiciones:</label>
    <input
      type='checkbox'
      ref={refInput}
      style={{
        borderColor: error && 'red',
        outline: error && 'red'
      }}
    />
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
);

export default TermsCheckbox;
