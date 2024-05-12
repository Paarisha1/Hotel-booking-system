import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    room: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "-" ? Math.max(prev[name] - 1, 0) : prev[name] + 1,
    }));
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  const formatDate = (date) => {
    return format(date, "MM/dd/yyyy");
  };

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUmbrellaBeach} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <div className="headerTitle">
              A lifetime of Discounts? It's Genius
            </div>
            <p className="headerDesc">
              Get Rewards for your Travel. Unlock instant savings of 10% or more
              with a travel booking account
            </p>
            <button className="headerBtn">Sign in/ Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${formatDate(date[0].startDate)} to ${formatDate(
                    date[0].endDate
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >
                  {`${options.adults} adults, ${options.children} children, ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adults <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOptionChange("adults", "-")}
                        >
                          -
                        </button>
                        <button className="optionCounterButton">
                          {options.adults}
                        </button>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOptionChange("adults", "+")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOptionChange("children", "-")}
                        >
                          -
                        </button>
                        <button className="optionCounterButton">
                          {options.children}
                        </button>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOptionChange("children", "+")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOptionChange("room", "-")}
                        >
                          -
                        </button>
                        <button className="optionCounterButton">
                          {options.room}
                        </button>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOptionChange("room", "+")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
