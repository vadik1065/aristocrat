import { useDispatch, useSelector } from "react-redux";
import { getInfo, updateProfile } from "../api/functions";
import { setAllInterfaceSettings, toggleErrorToast, toggleErrorToastText } from "../store/actions";

const useUpdateSettings = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const settings = useSelector(state => state.settings);

  function updateSettings(obj) {
    let data = {
      interface_settings: {
        ...settings,
        ...obj
      }
    };

    updateProfile(token, data).then(() => {
      getInfo(token).then(response => {
        dispatch(setAllInterfaceSettings(response));
      })
    }).catch(() => {
      dispatch(toggleErrorToastText('Something went wrong.'));
      dispatch(toggleErrorToast(true));
    })
  }

  return { updateSettings };
}

export default useUpdateSettings;
