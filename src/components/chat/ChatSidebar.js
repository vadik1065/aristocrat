import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Doots } from '../../images/doots.svg';
import { ReactComponent as Filter } from '../../images/filter.svg';
import { ReactComponent as SearchIcon } from '../../images/search-mini.svg';
import { ReactComponent as Arrow } from '../../images/arrow-gray.svg';
import { ReactComponent as Clock } from '../../images/clock.svg';
import { ReactComponent as SelectArrows } from '../../images/select-arrows.svg';
import i18next from 'i18next';



const ChatSidebar = (props) => {
  const is4k = useSelector(state => state.width >= 3400);
  const [open, setOpen] = useState(true);
  // const [tab, setTab] = useState(1);



  return (
    <div className={`desktop-left-bar-wrapper ${is4k && 'ultra'}`}>
      <div className="desktop-left-bar">
        <div className='left-bar-header flex'>
          <Doots className="doots filters-icon" />
          <div className="calendar-container flex">
            <Clock className="filters-icon" />
            <div className="calendar-label">
              {i18next.t("Set time")}
            </div>
            <SelectArrows className="filters-icon" />
          </div>
          <div className="home-top-container-btns">
            <button className="btn-filter">
              <Filter className="filters-icon" />
            </button>
            <button className="btn-search">
              <SearchIcon className="filters-icon" />
            </button>
          </div>
        </div>
        <div className="desktop-left-bar-body">
          {/* <div className={`desktop-left-bar-element ${open && 'open'}`}>
          <div
            className={`desktop-left-bar-element-header flex`}
            onClick={() => setOpen(!open)}
          >
            <div className="desktop-left-bar-element-header-title">Text Chanels</div>
            <Arrow className="arrow-down" />
          </div>
          <div className="desktop-left-bar-element-list">
            {['General', 'Support', 'Finances'].map((el) =>
              <div
                key={el}
                className={`desktop-left-bar-element-list-item ${props.tab === el && 'activated'}`}
                onClick={() => props.setTab(el)}
              >
                {el}
              </div>
            )}
          </div>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar;
