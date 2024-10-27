const CityToolTip = ({ active, payload, label }) => 
{
	if (active && payload && payload.length) 
	{
		const city = payload[0].payload.City
		const county = payload[0].payload.County
		const state = payload[0].payload.State

	  	return (
		<div style={{ backgroundColor: 'white', color: 'black', padding: '5px', border: '1px solid #ccc', fontSize: '12px' }}>
		  <h4>{label}</h4>
		  <p>City: {city}</p>
		  <p>County: {county}</p>
		  <p>State: {state}</p>
		  <p>Count: {(payload[0].value/500).toFixed(2)}%</p>
		</div>
	  );
	}
}

export default CityToolTip