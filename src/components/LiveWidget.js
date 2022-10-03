import React, { useEffect, useState } from 'react';
import { memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLiveWidgetMatchId, toggleErrorToast, toggleErrorToastText } from '../store/actions';


const LiveWidget = memo((props) => {
  const dispatch = useDispatch();
  const liveWidgetMatchId = useSelector(state => state.liveWidgetMatchId);

  useEffect(() => {
    (function (d, sid) { if (!document.getElementById(sid)) { var s = d.createElement('script'); s.id = sid; s.src = 'https://live.statscore.com/livescorepro/generator'; s.async = 1; d.body.appendChild(s); } })(document, 'STATSCORE_LMP_GENERATOR_SCRIPT');

    function error() {
      dispatch(toggleErrorToastText('Something went wrong'));
      dispatch(toggleErrorToast(true));
      props.close(false);
    };

    window.addEventListener('statscore.livematchpro.tracker-1.error', error);

    // при закрытии удаляем скрипт
    return () => {
      window.removeEventListener('statscore.livematchpro.tracker-1.error', error);

      let script = document.getElementById('STATSCORE_LMP_GENERATOR_SCRIPT');
      script.remove();

      dispatch(setLiveWidgetMatchId(''));
    }
  }, []);

  return (
    <section
      id="tracker-1"
      className="STATSCORE__Tracker"
      data-event={liveWidgetMatchId}
      data-lang="en"
      data-config="1301"
      data-zone=""
      data-use-mapped-id="1">
    </section>
  )
})

export default LiveWidget;
