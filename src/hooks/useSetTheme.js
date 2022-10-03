import { useDispatch, useSelector } from "react-redux";
import { getInfo, updateProfile } from "../api/functions";
import { changeTheme, toggleErrorToast, toggleErrorToastText, toggleToast, toggleToastText } from "../store/actions";

const useSetTheme = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const settings = useSelector(state => state.settings);
  const theme = useSelector(state => state.settings.theme);

  function setTheme(obj) {
    let data = {
      interface_settings: {
        ...settings,
        theme: {
          darkMode: obj ? obj.darkMode : !theme.darkMode,
          accent: obj ? obj.accent : (theme.darkMode ? 'light' : 'dark')
        }
      }
    };
  
    updateProfile(token, data).then((res) => {
      getInfo(token).then(response => {
        let settings = JSON.parse(response.player.settings);
        dispatch(changeTheme({ darkMode: settings.theme.darkMode, accent: settings.theme.accent }));
      })
    }).catch(() => {
      dispatch(toggleErrorToastText('Something went wrong.'));
      dispatch(toggleErrorToast(true));
    });
  }

  return { setTheme };
}

export default useSetTheme;
