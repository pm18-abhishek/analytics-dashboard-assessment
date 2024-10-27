const ModelTooltip = ({ active, payload, label }) => 
{
	if (active && payload && payload.length) 
	{
		let make = payload[0].payload.Make;
		const model = payload[0].payload.Model

	  	return (
		<div style={{ backgroundColor: 'white', color: 'black', padding: '5px', border: '1px solid #ccc', fontSize: '12px'  }}>
		  <h4>{label}</h4>
		  <p>Model: {model}</p>
		  <p>Make: {make}</p>
		  <p>Count: {(payload[0].value/500).toFixed(2)}%</p>
		</div>
	  );
	}
}

export default ModelTooltip