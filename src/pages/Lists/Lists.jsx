import "./Lists.css";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItems from "../../Components/SearchItems/SearchItems";

const List = () => {
  const location = useLocation();

  // phele header ki line 53 padho 
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || [{ startDate: new Date(), endDate: new Date() }]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || { adults: 1, children: 0, room: 1 });

  // Define formatDate function to format dates
  const formatDate = (date) => {
    return format(date, "MM/dd/yyyy");
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
          {/* destination ki value {} me access ki hai */}
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)}> {`${formatDate(date[0].startDate)} to ${formatDate(
                    date[0].endDate
                  )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={[...date]} 
                />
              )}
            </div>
        
              <div className="lsItem"> 
                <label>Options</label>
                <div className="lsOptions">
                <div className="lsOptionsItems">
                  <span className="isOptionText">
                    Min Price<small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput"/>
                </div>
                <div className="lsOptionsItems">
                  <span className="isOptionText">
                    Max Price<small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput"/>
                </div>
                <div className="lsOptionsItems">
                  <span className="isOptionText">
                  Adult
                  </span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.adults}/>
                </div>
                <div className="lsOptionsItems">
                  <span className="isOptionText">
                   Children
                  </span>
                  <input type="number"  min={0} className="lsOptionInput"placeholder={options.children}/>
                </div>
                <div className="lsOptionsItems">
                  <span className="isOptionText">
                   Room
                  </span>
                  <input type="number"  min={1} className="lsOptionInput" placeholder={options.room}/>
                </div>
              </div>
              </div>
            <button>Search</button>
          </div>
          <div className="listResult">
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
<SearchItems/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
