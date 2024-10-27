const UtilityToolTip = ({ active, payload, label }) => 
{
	if (active && payload && payload.length) 
	{
		const utility = payload[0].payload.Utility

	  	return (
		<div style={{ backgroundColor: 'white', color: 'black', padding: '5px', border: '1px solid #ccc', fontSize: '12px' }}>
		  <h4>{label}</h4>
		  <p>Utility: {utility}</p>
		  <p>Count: {(payload[0].value/500).toFixed(2)}%</p>
		</div>
	  );
	}
}

export default UtilityToolTip