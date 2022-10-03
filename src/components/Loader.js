import React from 'react';
import { IonSpinner } from '@ionic/react';
import { useSelector } from 'react-redux';

const Loader = (props) => {
  const loader = useSelector(state => state.loader);
  const width = useSelector(state => state.width);
  const themeDark = useSelector(state => state.settings.theme.darkMode);

  return (
    <>
      {
        width > 1024 &&
        <div className={'spinner-loader ' + (loader ? 'activated' : 'inactive')}>
          <IonSpinner className="spinner-large" name="lines" />
        </div>
      }

      {
        width <= 1024 && props.loader &&
        <div className={'spinner-loader ' + (props.loader ? 'activated' : 'inactive')}>
          <IonSpinner color={themeDark ? 'light' : ''} className="spinner-large" name="lines" />
        </div>
      }
    </>
  )
}

export default Loader;
