'use client'

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AreaChartComponent = ({data, xLabel, yLabel, title}) => 
{
	const [ lowerLimit, setLowerLimit ] = useState(null);
	const [ upperLimit, setUpperLimit] = useState(null);
	const [ areaData, setAreaData ] = useState(null)

	useEffect(()=>
	{
		if(!lowerLimit || !upperLimit)
			return

		const lower = Number(lowerLimit);
		const upper = Number(upperLimit);

		if(lower >= upper)
			return alert('Invalid input')	//Lower limit (year) cannot be more than upper

		const filteredData = data.slice(lower, upper+1);	//filtering from lower to upper limit
		setAreaData(filteredData);

	},[upperLimit, lowerLimit]);

	useEffect(()=>
	{
		setAreaData(data);
	},[])

	return (
		<motion.div
			className='backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}>

			<div className="flex flex-col align-middle justify-center gap-1">
				<h2 className='text-lg font-medium mb-4 text-center'>EV Population Overview</h2>
				<div className="flex justify-center mb-4 gap-2 w-full">
				<select className="border rounded-md text-black" onChange={(e)=> setLowerLimit(e.target.value)}>
					<option value="">Min Year</option>
					{data.map((input, index)=>
					(
						<option value={index}>{input.Year}</option>
					))}
				</select>

				<select className="border rounded-md text-black" onChange={(e)=> setUpperLimit(e.target.value)}>
					<option value="">Max Year</option>
					{data.map((input, index)=>
					(
						<option value={index}>{input.Year}</option>
					))}
				</select>

				{lowerLimit && upperLimit && <button className="px-2 rounded-md bg-#6366F1" onClick={()=> setAreaData(data)} style={{ backgroundColor: '#6366F1', color: 'white'}}>Clear</button>}
				</div>
			</div>
			{areaData && 
			<div className='h-60'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<AreaChart data={areaData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={xLabel} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip contentStyle={{color: 'black'}}/>
						<Area type="monotone" dataKey={yLabel} stroke="#6366F1" fill="#6366F1" fillOpacity={1} />
					</AreaChart>
				</ResponsiveContainer>
			</div>}
		</motion.div>
	);
};

export default AreaChartComponent;