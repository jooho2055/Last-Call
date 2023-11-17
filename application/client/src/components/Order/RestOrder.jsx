import React,{useEffect, useState} from 'react';



export default function RestOrder(orderInfo) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(false); 
      }, []);

    const OrderShows = () =>{
        setIsOpen(!isOpen);
    }  
    const {id, date, food} = orderInfo
    return (
<div>       
<div className="flex gap-8">  
     <li className='flex items-center justify-center rounded-xl shadow-md'>
    <div className='pd-2 pl-4'>
      <span>1</span>
    </div>
    <div className='pd-2 pl-72'>
      <span>Nov/17/2023</span>
    </div>
    <div className='pd-2 pl-72 flex gap-4 flex-row md:flex-col md:gap-4'>
      <span>
        <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4 md:mb-0">Confirm</button>
      </span>
      <span>
        <button className="text-black px-7 py-2 rounded border border-black p-2" onClick={OrderShows}>View</button>
      </span>
    </div>
  </li>
  </div>
        {isOpen && (
        <button
          onClick={OrderShows}
          className={`fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-black opacity-0 cursor-default transparent-overlay`}
        ></button>
        )} 
        {isOpen && (
            <div>
                Test
            </div>

        )}  
        </div>
    );
}

