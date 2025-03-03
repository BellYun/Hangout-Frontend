import React, { useState, lazy, Suspense } from 'react';
import SearchIcon from '@/assets/image/Search icon.webp';
import './detailsearch.scss';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import Destinationmodal from '../destinationmodal/destinationmodal';

// const Destinationmodal = lazy(() => import('../destinationmodal/destinationmodal'));

const DetailSearch = () => {
  const [destinationmodal, setDestinationModal] = useState(false);
  const [datemodal, setDateModal] = useState(false);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  return (
    <div className="detailsearchlayout">
      <button
        className="detailclicklayout"
        onClick={() => setDestinationModal((prev) => !prev)}
      >
        여행 지역
      </button>
      <div className="modaltest">
        {destinationmodal && (
          <Suspense fallback={<div>Loading...</div>}>
            <Destinationmodal />
          </Suspense>
        )}
      </div>
      <button className="dateclicklayout">
        여행 기간
        <DatePicker
          className="dataPickerLayout"
          selected={startDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          className="dataPickerLayout"
          selected={endDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => setEndDate(date)}
        />
      </button>
      <div className="detailinputlayout">
        <input placeholder="여행을 찾아보세요" className="input" />
        <button>
          <img src={SearchIcon} alt="Search Icon" />
        </button>
      </div>
    </div>
  );
};

export default DetailSearch;
