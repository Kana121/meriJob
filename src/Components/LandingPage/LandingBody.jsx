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
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [inputText, setInputText] = useState('');
  
  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    setFilteredStates([]); // Reset filtered states when country changes
  };
  const handleInputTextChange = (event) => {
    const text = event.target.value;
    setInputText(text);

    // Filter states based on the selected country and input text
    const countryStates = states.filter(state => state.country_name === selectedCountry);
    const filteredStates = countryStates.filter(state =>
      state.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredStates(filteredStates);
    ToggleSuggestionListDisplay();    
  };
  function ToggleSuggestionListDisplay() {
    const stateSuggestionList = document.getElementById("stateSuggestionList");
    if(document.getElementById("bxStateSearch").value !==""){
      if(stateSuggestionList){
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
              <input type="text" id="bxStateSearch" placeholder='Enter location' className={style.lbinp2} value={inputText} onChange={handleInputTextChange}/>
              <ul id="stateSuggestionList" className={style.stateSuggestionList}>
                {filteredStates.map(state => (
                  <li key={state.id} className={style.listitem}>
                    {state.name}
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