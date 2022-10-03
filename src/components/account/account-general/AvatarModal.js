import { IonInput, IonItem, IonModal, IonRippleEffect, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../css/modal.css';
import { ReactComponent as CloseIcon } from '../../../images/close-icon.svg';
import QRCode from 'qrcode.react';
import i18next from "i18next";
import axios from 'axios';
import * as API from '../../../api/functions.js';
import url from '../../../axios.js';
import { getUserInfo, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from "../../../store/actions";
import { getCurrencyString } from '../../../utils/utils';
import useIonInput from '../../../hooks/useIonInput';
import ImageUploader from 'react-images-upload';
import Resizer from "react-image-file-resizer";

const AvatarModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const themeAccent = useSelector(state => state.settings.theme.accent);
  const [file, setFile] = useState('');

  const onDrop = async (data) => {
    try {
      const image = await resizeFile(data[0]);
      setFile(image);
    } catch (err) {
      console.log(err);
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        128,
        128,
        "JPEG",
        100,
        0,
        (uri) => resolve(uri),
        "base64",
        100,
        100,
      );
  });

  function updateAvatar() {
    if (file) {
      API.updateProfile(token, { avatar: file }).then(() => {
        API.getInfo(token).then(response => {
          dispatch(getUserInfo(response));
          dispatch(toggleToastText('Your personal data was updated.'));
          dispatch(toggleToast(true));
          props.close(false);
        })
      }).catch((err) => {
        console.log(err.response.data.error);
        dispatch(toggleErrorToastText(err.response.data.error))
        dispatch(toggleErrorToast(true));
      });
    }
  }

  function closeAll() {
    props.close(false);
  }

  return (
    <IonModal
      isOpen={props.open}
      onDidDismiss={() => closeAll()}
      cssClass={`auto-height ${themeAccent}`}
    >
      <div className={`modal-container ${themeAccent}`}>
        <div className="dashboard-head">
          <span>
            {i18next.t("Choose an avatar")}
          </span>
          <CloseIcon className="close-icon" onClick={() => props.close(false)} />
        </div>
        <div className="balance-fields-container dashboard-grid-item">          
          <ImageUploader
            className="image-uploader"
            withIcon={false}
            singleImage={true}
            withPreview={true}
            label={i18next.t("The image size will be converted to 128x128.")}
            fileSizeError={i18next.t("The maximum file size has been exceeded.")}
            fileTypeError={i18next.t("The file type is not supported.")}
            buttonText={i18next.t("Select an image")}
            buttonClassName="image-uploader-button"
            onChange={e => onDrop(e)}
            imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
            maxFileSize={5242880} 
          />

          {file && 
            <div
              onClick={() => updateAvatar()}
              className="take-loan ion-activatable deposit"
            >
              <IonRippleEffect />
              {i18next.t("Set avatar")}
            </div>
          }
        </div>
      </div>

    </IonModal>
  );
}

export default AvatarModal;
