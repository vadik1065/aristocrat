import i18next from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';

const EmptyBetslip = () => {
  const is4k = useSelector(state => state.width >= 3400);

  return (
    <div className='empty-betslip flex'>
      <p className='empty-betslip-title'>
        {i18next.t("Empty betslip")}
      </p>
      <p className='empty-betslip-description'>
        {i18next.t("Select odds on the left side of page first")}
      </p>
      <div className='empty-betslip-img'></div>
    </div>
  )
}

export default EmptyBetslip;
