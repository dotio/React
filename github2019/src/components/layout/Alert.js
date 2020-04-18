import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { errors } = alertContext;

  return (
    errors !== null && (
      <div className={`alert alert-${errors.type}`}>
        <i className='fas fa-info-circle'> {errors.msg}</i>
      </div>
    )
  );
};

export default Alert;
