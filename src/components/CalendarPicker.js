import { IonButton } from '@ionic/react';
import React from 'react';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from "moment";
import 'moment/locale/ru';
import { ReactComponent as CloseIcon } from '../images/close-icon.svg';
import 'react-day-picker/lib/style.css';
import '../css/daypicker.css';
import i18next from 'i18next';

export default class CalendarPicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleSetClick = this.handleSetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleSetClick() {
    // console.log(moment(this.state.from).format("YYYY-MM-DD"));
    // console.log(this.props.historyDate);
    this.props.setHistoryDate({
      dateFrom: moment(this.state.from).format("YYYY-MM-DD"),
      dateTo: moment(this.state.to).format("YYYY-MM-DD")
    });
    this.props.setInnerSegmentValue('history');
    this.props.setShowCalendarPicker(false);
  }



  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        <div className="RangeExample-label">
          {!from && !to && i18next.t("Please select the first day")}
          {from && !to && i18next.t("Please select the last day")}
          {from && to &&
            `${i18next.t("Selected from")} ${from.toLocaleDateString()} ${i18next.t("to")} ${to.toLocaleDateString()}`}{' '}
          <CloseIcon
            className="close-icon"
            onClick={() => this.props.setShowCalendarPicker(false)}
          />
        </div>
        {from && to && (
          <div className="RangeExample-buttons flex">
            <IonButton className="logout-btn" onClick={this.handleSetClick}>
              {i18next.t("Set")}
            </IonButton>
            <IonButton className="logout-btn" onClick={this.handleResetClick}>
              {i18next.t("Reset")}
            </IonButton>
          </div>
        )}
        <DayPicker
          localeUtils={MomentLocaleUtils}
          locale={this.props.language}
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}
