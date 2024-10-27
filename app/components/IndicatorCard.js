const IndicatorCard = ({title, count, hightlight}) =>
{
    return(
        <div className='h-32 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'>
			<p className='text-md font-medium text-center' style={{color:"#6366F1" }}>{title}</p>
			<h1 className="text-3xl font-bold text-center mt-2">{count}</h1>
            <p className="absolute right-4 top-6 font-bold">{hightlight}</p>
		</div>
    )
} 

export default IndicatorCard