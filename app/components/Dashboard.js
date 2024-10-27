'use client'

import Papa from 'papaparse';
import { useEffect, useState } from "react"
import BarChartComponent from '../charts/BarChartComponent';
import AreaChartComponent from '../charts/AreaChartComponent';
import ModelTooltip from '../customTooltips/ModelToolTip';
import StateToolTip from '../customTooltips/StateToolTip';
import CountyToolTip from '../customTooltips/CountyToolTip';
import CityToolTip from '../customTooltips/CityToolTip';
import PieChartComponent from '../charts/PieChartComponent';
import MakeToolTip from '../customTooltips/MakeToolTip';
import UtilityToolTip from '../customTooltips/UtilityToolTip';
import IndicatorCard from './IndicatorCard';
import { CircularProgress } from '@mui/material';

const Dashboard = ( )=>
{
    const [ data, setData ] = useState(null);
    const [ makeData, setMakeData ] = useState(null);
    const [ modelYear, setModelYear ] = useState(null);
    const [ models, setModels] = useState(null);
    const [ state, setState ] = useState(null);
    const [ county, setCounty ] = useState(null);
    const [ city, setCity ] = useState(null);
    const [ utility, setUtility ] = useState(null);
    const [ district, setDistrict ] = useState(null);
    const [ range, setRange ] = useState(null);

    useEffect(()=>
    {
           
        fetch('/data/Electric_Vehicle_Population_Data.csv')         //Fetching EV Data from public data (.csv)
        .then(response => response.text())
        .then(csvData =>
        {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (results) =>
                {
                    const flattenedData = results.data.flat();      //Parse .csv to json
                    setData(flattenedData);


                    //Filtered data by make
                    let makeData = [];                              
                    flattenedData.forEach((data)=>
                    {
                        const make = data.Make;
                        if(make)                                    //checking valid data
                        {
                            const existingMake = makeData.find(record => record.Make === make)      //finding if particular make already exists 
                            if(existingMake)
                                existingMake.Count += 1;            //Incrementing existing count
                            else
                                makeData.push({ Make: make, Count: 1});     //New make
                        }
                    })
                    const topTenMakers = makeData.slice(0,10);
                    const totalMakersCount = makeData.reduce((acc, current)=> acc + current.Count, 0)
                    const topTenMakersCount = topTenMakers.reduce((acc, current)=> acc + current.Count, 0); 
                    const otherMakersCount = totalMakersCount - topTenMakersCount
                    setMakeData([...topTenMakers, { Make: 'Others', Count: otherMakersCount}]);


                    //Filtered data by year
                    const modelYear = [];                       
                    flattenedData.forEach((data)=>
                    {
                        const year = data["Model Year"];
                        if(year)
                        {
                            const existingYear = modelYear.find((record) => record.Year === Number(year));
                            if(existingYear)
                                existingYear.Count += 1;
                            else
                                modelYear.push({ Year: Number(year), Count: 1});
                        }
                    });
                    const sortByYear = modelYear.sort((a,b)=> a.Year - b.Year);
                    setModelYear(sortByYear);


                    //Filtered data by model
                    const models = [];                      
                    flattenedData.forEach((data)=>
                    {
                        const model = data.Model;
                        if(model)
                        {
                            const existingModel = models.find((record) => record.Model === model);
                            if(existingModel)
                                existingModel.Count += 1;
                            else
                                models.push({ Model: model, Count: 1, Make: data.Make});
                        }
                    });
                    const sortModelsByCount = models.sort((a,b)=> b.Count - a.Count)
                    const topTwoModels = sortModelsByCount.slice(0,2);
                    const topTwoModelsCount = topTwoModels.reduce((acc, current) => acc + current.Count, 0);
                    const othersMake = sortModelsByCount.slice(2).length
                    const othersCount = flattenedData.length - topTwoModelsCount;
                    setModels([...topTwoModels, { Model : 'Others', Count: othersCount, Make: `${othersMake} others`}]);   //Displaying only top 2 data share and bundling rest into other category 
                

                    //Filtered data by states
                    const states = [];              
                    flattenedData.forEach((data)=>
                    {
                        const state = data.State;
                        if(state)
                        {
                            const existingState = states.find((record) => record.State === state);
                            if(existingState)
                                existingState.Count += 1;
                            else
                                states.push({ State: state, Count: 1});
                        }
                    });
                    setState(states);


                    //Filtered data by county
                    const counties = [];        
                    flattenedData.forEach((data)=>
                    {
                        const county = data.County;
                        if(county)
                        {
                            const existingCounty = counties.find((record) => record.County === county);
                            if(existingCounty)
                                existingCounty.Count += 1;
                            else
                                counties.push({ County: county, Count: 1, State: data.State});
                        }
                    });
                    const topTwoCounties = counties.slice(0,2);
                    const otherCountiesCount = counties.length - topTwoCounties.length;
                    setCounty([...topTwoCounties, { County: 'Others', Count: otherCountiesCount, State: 'WA' }]);


                    //Filtered data by cities
                    const cities = [];          
                    flattenedData.forEach((data)=>
                    {
                        const city = data.City;
                        if(city)
                        {
                            const existingcity = cities.find((record) => record.City === city);
                            if(existingcity)
                                existingcity.Count += 1;
                            else
                                cities.push({ City: city, Count: 1, County: data.County, State: data.State});
                        }
                    });
                    const topTwoCities = cities.slice(0,2);
                    const otherCitiesCount = cities.length - topTwoCities.length;
                    setCity([...topTwoCities, { City: 'Others', Count: otherCitiesCount, County: `${counties.length} others`, State: 'WA' }]);
                
                    const utilities = [];           //Filtered data by utilities
                    flattenedData.forEach((data)=>
                    {
                        const utility = data["Electric Utility"];
                        if(utility)
                        {
                            const existingUtility= utilities.find((record) => record.Utility === utility);
                            if(existingUtility)
                                existingUtility.Count += 1;
                            else
                                utilities.push({ Utility: utility, Count: 1});
                        }
                    });
                    setUtility(utilities);


                    //Filtered data by legislative districts
                    const districts = [];           
                    flattenedData.forEach((data)=>
                    {
                        const district = data["Legislative District"];
                        if(district)
                        {
                            const existingDistrict = districts.find((record) => record.District === Number(district));
                            if(existingDistrict)
                                existingDistrict.Count += 1;
                            else
                                districts.push({ District: Number(district), Count: 1});
                        }
                    });
                    setDistrict(districts);
                

                    //Filtered data by electric range
                    const rangeData = [];           
                    flattenedData.forEach((data)=>
                    {
                        const range = data["Electric Range"];
                        if(range)
                        {
                            const existingRange = rangeData.find((record) => record.Range === Number(range));
                            if(existingRange)
                                existingRange.Count += 1;
                            else
                                rangeData.push({ Range: Number(range), Count: 1});
                        }
                    });

                    const interval = 30;            //Grouping into interval for better visualisation
                    const groupedData = [];
                    const sortedByRange = rangeData.sort((a,b)=> a.Range - b.Range);
                    sortedByRange.forEach((record) =>
                    {
                        const lowerLimit = Math.floor(record.Range/interval) * interval;
                        const upperLimit = lowerLimit + interval;

                        const range = `${lowerLimit}-${upperLimit}`;
                        const existingRange = groupedData.find(record => record.Range === range)
                        if(existingRange)
                            existingRange.Count += 1;
                        else
                            groupedData.push({ Range: range, Count: 1})
                    })

                    setRange(groupedData);
                }
            })
        })
    },[]) 
    
    if(!data)
        return(
            <div className='h-screen flex align-middle justify-center'>
                <CircularProgress color="#6366F1" />
            </div>)

    return(
        <div className="px-[5vw] py-8 grid gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <IndicatorCard title="EV Population" count={data.length}/>
                <IndicatorCard title="Unique VIN" count="9,529"/>
                <IndicatorCard title="Most Common VIN" count="7SAYGDEE9P" hightlight="+1%"/>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <PieChartComponent data={makeData} xLabel="Make" yLabel="Count" title="EV Distribution By Make" CustomTooltip={MakeToolTip}/>
                <PieChartComponent data={models} xLabel="Model" yLabel="Count" title="EV Distribution By Model" CustomTooltip={ModelTooltip}/>
                <PieChartComponent data={utility} xLabel="Utility" yLabel="Count" title="EV Distribution By Utility" CustomTooltip={UtilityToolTip}/>
            </div>

            <AreaChartComponent data={modelYear} xLabel="Year" yLabel="Count" title="EV Population Overview"/>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <PieChartComponent data={state} xLabel="State" yLabel="Count" title="EV Distribution By State" CustomTooltip={StateToolTip}/>
                <PieChartComponent data={county} xLabel="County" yLabel="Count" title="EV Distribution By County" CustomTooltip={CountyToolTip}/>
                <PieChartComponent data={city} xLabel="City" yLabel="Count" title="EV Distribution By City" CustomTooltip={CityToolTip}/>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <BarChartComponent data={range} xLabel="Range" yLabel="Count" title="EV Population By Electric Range"/>
                <BarChartComponent data={district} xLabel="District" yLabel="Count" title="EV Population By Legislative District"/>
            </div>                
        </div>
    )
}

export default Dashboard
