const CountyToolTip = ({ active, payload, label }) => 
{
	if (active && payload && payload.length) 
	{
		const state = payload[0].payload.State
		const county = payload[0].payload.County

	  	return (
		<div style={{ backgroundColor: 'white', color: 'black', padding: '5px', border: '1px solid #ccc', fontSize: '12px'  }}>
		  <h4>{label}</h4>
		  <p>County: {county}</p>
		  <p>State: {state}</p>
		  <p>Count: {(payload[0].value/500).toFixed(2)}%</p>
		</div>
	  );
	}
}

export default CountyToolTip