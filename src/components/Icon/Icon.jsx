import React from 'react';
import icons from '../../img/icons.svg';
import s from './Icon.module.css';


const Icon = ({className, name, onClick }) => {
  return (
    <svg className={`${className} ${s.icon}`} onClick={onClick}>
        <use xlinkHref={`${icons}#${name}`} />
    </svg>
  );
};

export default Icon;