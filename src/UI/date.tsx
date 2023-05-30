import React = require('react');
import moment from 'moment';
import { Calendar } from 'antd';
export default () => {
  const [up, setup] = React.useState<number>(0);
  const [showMore, setShowMore] = React.useState<boolean>(false);
  React.useEffect(() => {
    setTimeout(() => {
      setup(up + 1);
    }, 1000);
  }, [up]);
  return (
    <div id="date">
      {showMore && (
        <div className="CalendarPan">
          <div key={`k_${up}`}>
            <span className="fulltime">{moment().format('h:mm:ss')}</span>
            <span className="ampm">{moment().format('A')}</span>
          </div>
          <div className="datetime">
            {moment().format('dddd, MMMM DD, YYYY')}
          </div>
          <div className="line"></div>
          <Calendar className="Calendar" fullscreen={false} />
        </div>
      )}

      <div
        className="datetimeonbar"
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        <div key={`k_${up}`}>{moment().format('h:mm A')}</div>
        <div>{moment().format('DD/MM/YYYY')}</div>
      </div>
    </div>
  );
};
