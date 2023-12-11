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

  //Handle textinput changes and BackSpace changes
  const handleInputTextChange = (event) => {
    let hitKey = event.keyCode;
    let text = '';
    let stateNcities = "";
    // Check for backspace key
    if (event.keyCode === 8) {
      if(selectedCountry.length>0){
        //if we do have selectes state and seleceted cities
        if(selectedState.length > 0 && selectedCities.length > 0){
          let tempText = inputText;
          let x = tempText.split(" ");
          x = x[1];
          if(x.endsWith(",")){

          }
          else{
            let citiesSelected = x.slice(0, -1);
            citiesSelected = citiesSelected.split(",");
            let pickedCity = citiesSelected[-1];
            cityFiltering(pickedCity);

          }
        }
        //if we have only selected state but no cities where selected
        else if(selectedState.length > 0 && selectedCities.length <= 0){
          text = inputText.slice(0, -1);
          setInputText(text);
          let x = text.split(" ");
          if(x.length>1){
            let cityHint = x[-1];
            cityFiltering(cityHint);
          }
          else{
            return;
          }
        }
        // Case where we don't have both selected state and cities
        else if(selectedState.length <= 0 && selectedCities.length <= 0 && inputText === ""){
          return;
        }
        else{
          text = inputText.slice(0, -1);
          setInputText(text);
          if(text.length === 0 ){
            setSelectedState('');
            const stateSuggestionList = document.getElementById("stateSuggestionList");
            stateSuggestionList.style.display='none';
          }
          else{
            StateFiltering(text);
          }
        }
      }
      else{
        alert("Please select country first");
      }
    }
    else if(hitKey>=65 && hitKey <= 90){
      if(selectedCountry.length>0){
        if(selectedState.length > 0 && selectedCities.length > 0){
          text = text + event.key;
          setInputText(inputText + " " + event.key);
          cityFiltering(text);
        }
        //if we have only selected state but no cities where selected
        else if(selectedState.length > 0 && selectedCities.length <= 0){
          text = inputText +  event.key;
          let x = text.split(" ");
          let cityHint = x[1];
          setInputText(text);
          StateFiltering(selectedState);
          cityFiltering(cityHint);
        }
        // Case where we don't have both selected state and cities
        else if(selectedState.length <= 0 && selectedCities.length <= 0){
          text = inputText + event.key;
          setInputText(text);
          StateFiltering(text);
        }
      }
      else{
        alert("Please select country first");
      }      
    }
    else if(hitKey === 32){
      text = inputText + event.key;
      setInputText(text);
    }  
        
  };
  function StateFiltering(hint){
    var countryStates;
    // Filter states based on the selected country and input text
    countryStates = states.filter(state => state.country_name === selectedCountry);
    filteredStates = countryStates.filter(state =>
    state.name.toLowerCase().startsWith(hint.toLowerCase()));
    setFilteredStates(filteredStates);
    ToggleStateSuggestionListDisplay(hint);
    return filteredStates
  }
  function cityFiltering(hint){
    let stateCities;
    if(hint.length>0){
      // Filter states based on the selected country and input text
    stateCities = cities.filter(city => city.state_name === selectedState);
    filteredCities = stateCities.filter(city =>
    city.name.toLowerCase().startsWith(hint.toLowerCase()));
    setFilteredCities(filteredCities);
    }
    else{
      return;
    }    
    return filteredCities;
  }
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
        return;
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
                <input type="text" id="bxStateSearch" placeholder='State/City' onClick={handleSearchBoxClick} className={style.lbinp2} value={inputText} onKeyDown={handleInputTextChange}/>
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