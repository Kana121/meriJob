import React, { useEffect, useState } from 'react';
import style from "./landingbody.module.css"
import JobList from './JobList'
import LandingPageBanner from './LandingPageBanner'
import Faqs from '../FAQs/Faqs'
import Countries from '../Assets/countries.json'
import States from '../Assets/states.json'
import Cities from '../Assets/cities.json'

const LandingBody = ({changealltohide}) => {
  const countries = Countries;
  const states = States;
  const cities = Cities;
  var [selectedCountry, setSelectedCountry] = useState('');
  var [inputText, setInputText] = useState('');
  var [selectedState, setSelectedState] = useState('');
  var [selectedCities, setSelectedCities] = useState([]);
  var [filteredCities, setFilteredCities] = useState([]);
  var [filteredStates, setFilteredStates] = useState([]);
      
  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    setFilteredStates([]); // Reset filtered states when country changes
  };
  const handleInputTextChange = (event) => {
    let text = event.key;
    // Check for backspace key
    if (event.keyCode === 8) {
      // Handle backspace logic here
      
      if(inputText.length<=0){
        return;
      }
      else{
        text = inputText.slice(0, -1);
        setInputText(text);
        return;
      } 
    }
    else if(/^[a-zA-Z]+$/.test(text)){
      setInputText(text);
      if(selectedState.length===0){
        // Filter states based on the selected country and input text
        const countryStates = states.filter(state => state.country_name === selectedCountry);
        const filteredStates = countryStates.filter(state =>
          state.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredStates(filteredStates);
        setSelectedState(''); // Reset selected state when input text changes
        setFilteredCities([]);
        ToggleStateSuggestionListDisplay(text); 
      }  
      else{
        let newfilteredCities = filteredCities.filter((city) => !selectedCities.includes(city.name));
        setFilteredCities(newfilteredCities);
        ToggleCitySuggestionListDisplay();
      }
    }
    else{
      return;
    }
        
  };
  const handleStateClick = (stateName) => {
    const stateSuggestionList = document.getElementById("stateSuggestionList");
    // Update the input text with the selected state and add a comma
    setInputText(`${stateName} `);
    setSelectedState(stateName);
    // Filter cities based on the selected state
    const selectedStateCities = cities.filter(
      (city) => city.state_name === stateName && city.country_name === selectedCountry
    );
    setFilteredCities(selectedStateCities);
    stateSuggestionList.style.display="none";
    ToggleCitySuggestionListDisplay();
  };
  const handleSearchBoxClick = () =>{
    if(selectedState.length > 0 && selectedCities.length>0){
      setInputText(`${selectedState} ${selectedCities},`);
      ToggleCitySuggestionListDisplay();
    }
    else if(selectedState.length > 0 && selectedCities.length === 0){
      ToggleCitySuggestionListDisplay();
    }
  }
  const handleCityClick = (cityName) => {
    let CityList = document.getElementById("citySuggestionList");
    let City = [cityName];
    if(selectedCities.length===0){
      setSelectedCities(City);
      setInputText(`${selectedState} ${cityName}`);
      let newfilteredCities = filteredCities.filter((city) => city.name !==cityName && city.state_name === selectedState);
      setFilteredCities(newfilteredCities);
      CityList.style.display="none";
    }
    else{
      let isSelected = selectedCities.includes(cityName);
      if(isSelected){
        selectedCities = selectedCities.filter((city) => city !== cityName);
        setInputText(`${selectedState} ${selectedCities}`)
        setSelectedCities(selectedCities);
        let newfilteredCities = filteredCities.filter((city) => !selectedCities.includes(city.name));
        setFilteredCities(newfilteredCities);
        CityList.style.display="none";
      }
      else{
        selectedCities = [...selectedCities, cityName];
        setInputText(`${selectedState} ${selectedCities}`)
        setSelectedCities(selectedCities);
        let newfilteredCities = filteredCities.filter((city) => !selectedCities.includes(city.name));
        setFilteredCities(newfilteredCities);
        CityList.style.display="none";
      }
    }
  };
  function ToggleCitySuggestionListDisplay() {
    const citySuggestionList = document.getElementById("citySuggestionList");
    if(document.getElementById("bxStateSearch").value !==""){
      if(citySuggestionList){
        citySuggestionList.style.display="block";
        
      }
      else{
        citySuggestionList.style.display="none";
      }
    }
    else{
      citySuggestionList.style.display="none";
    }
  }
  function ToggleStateSuggestionListDisplay(text) {
    const stateSuggestionList = document.getElementById("stateSuggestionList");
    if(stateSuggestionList){
      if(text !==""){
        stateSuggestionList.style.display="block";
        
      }
      else{
        stateSuggestionList.style.display="none";
      }
    }
    else{
      stateSuggestionList.style.display="none";
    }
  }
  return (
    <div onMouseEnter={changealltohide} className={style.lbody}>
      <LandingPageBanner/>
        <div className={style.lb1}>
            <h1>Find your dream job now with Meri Job</h1>
            <p>5 lakh+ jobs for you to explore</p>
            <div className={style.searchcarrier}>
              <i class="fas fa-search"></i>
              <input type="text" placeholder='skills / designations / companies' className={style.lbinp1}/>
              <select className={style.lbinp2}>
                <option value="" disabled selected hidden>
                Select experience
                </option>
                <option value="">Fresher <span>(Less than 1 year)</span></option>
                <option value="">1 Year</option>
                <option value="">2 Year</option>
                <option value="">3 Year</option>
                <option value="">4 Year</option>
                <option value="">5 Year</option>
                <option value="">6 Year</option>
                <option value="">7 Year</option>
              </select>
              <select value={selectedCountry} onChange={handleCountryChange} className={style.lbinp2}>
                <option value="" disabled selected>
                Select Country
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {`${country.name}`}
                  </option>
                ))}
              </select>
              <div id="stateNcity" className={style.stateNcity}>
                <input type="text" id="bxStateSearch" placeholder='Enter location' onClick={handleSearchBoxClick} className={style.lbinp2} value={inputText} onKeyDown={handleInputTextChange}/>
                <ul id="stateSuggestionList" className={style.stateSuggestionList}>
                  {filteredStates.map(state => (
                    <li key={state.id} className={style.listitem} onClick={() => handleStateClick(state.name)}>
                      {state.name}
                    </li>
                  ))}
                </ul>       
                <ul id="citySuggestionList" className={style.stateSuggestionList}>
                  {filteredCities.map((city) => (
                    <li key={city.id} className={style.listitem} onClick={() => handleCityClick(city.name)}>
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={style.lbbtn1}>Search</button>
            </div>
        </div>

        {/* <div className={style.lb2}>
           
            <button className={style.lbbtn2}>Register Now</button>
        </div> */}
        
        {/* <Landingslider1/> */}
        <JobList/>
        <Faqs/>
    </div>
  )
}

export default LandingBody