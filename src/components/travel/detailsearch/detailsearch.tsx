import React, { useState } from 'react';
import Preview from '@/components/main/preview/preview';
import SearchIcon from '@/assets/image/Search icon.png'
import './detailsearch.scss'
import Destinationmodal from '../destinationmodal/destinationmodal';
import Datemodal from '../datamodal/datemodal';
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';

const DetailSearch = () => {


    const [destinationmodal,setDestinationModal] = useState(false);
    const [datemodal,setDateModal] = useState(false);
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    const data = () =>{
    return (
      <DatePicker className='datemodallayout' selected={startDate} onChange={(date) => setStartDate(date)} />
    );
    }
  return (
    <div className='detailsearchlayout'>
        <button className='detailclicklayout' onClick={()=> destinationmodal ? setDestinationModal(false) :setDestinationModal(true)}>
            여행 지역
        </button>
        <div className='modaltest'>
            {destinationmodal === true? <Destinationmodal />:null}
        </div>
        <button className='dateclicklayout'>
            여행 기간 <DatePicker 
             className='dataPickerLayout'
             selected={startDate} 
             locale={ko}
             dateFormat="yyyy-MM-dd"
             onChange={(date) => setStartDate(date)} />
             
             <DatePicker
             className='dataPickerLayout'
             selected={endDate} 
             locale={ko}
             dateFormat="yyyy-MM-dd"
             onChange={(date) => setEndDate(date)} />
        </button>
        <div className='detailinputlayout'>
            <input placeholder='여행을 찾아보세요' className='input'/>
            <button>
                <img src={SearchIcon}/>
            </button>
        </div>
    </div>
  );
};

export default DetailSearch;
