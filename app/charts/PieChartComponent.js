'use client'

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#34D399 ", "#FB923C"];

const PieChartComponent = ({data, yLabel, title, CustomTooltip}) => {
	return (
		<motion.div
			className='bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-2 py-4 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-sm font-medium text-center'>{title}</h2>
			<div className='h-40'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={data}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
                            innerRadius={40}
							outerRadius={70}
							fill='#8884d8'
							dataKey={yLabel}>
							{data.map((entry, index) => (
								<Cell key={index} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip content={<CustomTooltip/>}/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default PieChartComponent;

