import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import walletIcon from '../images/header-icons/wallet.png';

const WalletMobile = () => {
  const balance = useSelector(state => state.user.balance);
  const themeAccent = useSelector(state => state.settings.theme.accent);

  return (
    <div className={`home-wallet-container flex ${themeAccent}`}>
      <img src={walletIcon} alt="wallet" />
      <p>
        {/* <Link to="/wallet"> */}
          {balance}
        {/* </Link> */}
      </p>
    </div>
  )
}

export default WalletMobile;
