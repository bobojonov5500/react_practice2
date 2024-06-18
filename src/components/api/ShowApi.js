import React from 'react'

export default function ShowApi({ data, inputvalue, text, time }) {
    console.log('hi everyone')
    const filteredData = text === '' ? data : data.filter((e) => e.title.includes(text) || e.userId.toString() === text)
    return (
        <div className='flex mt-4 px-8 justify-center items-center flex-col m-auto max-w-7xl'>
            <div>
                <span className='text-xl mr-4  font-mono'>{time.toLocaleString()}</span>
                <input onChange={inputvalue} type="text" className='border-2 w-60 pl-1   rounded-md mb-4' placeholder='search any...' />
                <span className='ml-4 text-xl font-mono'> {filteredData.length > 0 ? `all items: ${filteredData.length}` : 'not found ('}</span>
            </div>
            <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full'>
                {
                    filteredData.map((item) => (
                        <div key={item.id} className='border-2 max-w-96 py-2  text-center  rounded-xl '>
                            <div className='flex justify-center pb-2 gap-2 items-center'>
                                <h1 className=' p-1 font-mono  rounded-full bg-red-500'>userID:{item.userId}</h1>
                                <h2>{item.id}</h2>
                            </div>
                            <p className='bg-green-500'>{item.title}</p>
                            <p>{item.body}</p>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )

}
