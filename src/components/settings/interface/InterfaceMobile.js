import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import monkeyBlack from '../../../images/logo-aristocrat/monkey-black.png';
import monkeyWhite from '../../../images/logo-aristocrat/monkey-white.png';

const InterfaceMobile = ({ themeMob }) => {
   const themeDark = useSelector(state => state.settings.theme.darkMode);
   const [designTheme, setDesignTheme] = useState(themeMob[0]);


   return (
      <div className="interface-block">
         <div className="interface-block-inner">
            <div className="interface-design-list">
               <div className="interface-design-item">
                  <div className="interface-design-body interface-design-mobile-body">
                     {themeMob.map((mode, i) => {
                        return (
                           <div
                              key={i}
                              onClick={() => setDesignTheme(mode)}
                              className={`interface-design-mode  ${designTheme === mode ? 'active-theme' : ''} ${i === 2 ? 'gradient' : ''}`}
                           >
                              {i === 0 &&
                                 <div className="interface-design-mobile-image">
                                    {themeDark && <img src={monkeyBlack} alt="logo" />}
                                    {!themeDark && <img src={monkeyWhite} alt="logo" />}
                                 </div>}
                              <div className="interface-design-mode-name">
                                 {mode}
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

export default InterfaceMobile;
