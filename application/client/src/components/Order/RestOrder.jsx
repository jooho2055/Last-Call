import React, {useState, useEffect} from 'react';
import { format } from 'date-fns';
import ViewOrder from '../Button/ViewOrder';
export default function RestOrder({ orderInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
      setIsOpen(false); 
    }, []); 

  const { invoice_id, created_at, customer_id, id } = orderInfo;
  const dateObject = new Date(created_at);
  const formattedDate = format(dateObject, 'yyyy-MM-dd HH:mm:ss');
  const OrderShows = () =>{
    setIsOpen(!isOpen);
}  
const handleConfirm = async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch("http://13.52.182.209/restaurants/order/confirm", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({orderIds:[id]}),
        });

        const result = await response.json();
        console.log("Success:", result);

  } catch (error) {
        console.error("Error:", error);
      }

}
  return (
  <div>       
   <div className="flex gap-8">  
     <li className='flex items-center justify-center rounded-xl shadow-md'>
    <div className='pd-2 pl-4'>
      <span className='italic text-2xl text-orange-600'>{invoice_id}</span>
    </div>
    <div className='pd-2 pl-32'>
      <span>{formattedDate}</span>
    </div>
    <div className='pd-2 pl-32'>
      <span>Customer Id: {customer_id}</span>
    </div>
    <div className='pd-2 pl-32 flex gap-4 flex-row md:flex-col md:gap-4'>
      <span>
        <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4 md:mb-0" onClick={handleConfirm}>Confirm</button>
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
            <div className="w-full">
             <li className='flex rounded-md'>
             <div className='pd-2 pl-2'>
            <span>Menu Id</span>
             </div>
             <div className='pd-2 pl-28'>
            <span>Menu name</span>
            </div>
            <div className='pd-2 pl-28'>
            <span className="monospaced">Quantity</span>
            </div>
            <div className='pd-2 pl-32'>
             <span className="monospaced">Price</span>
            </div>
            </li>
              <ViewOrder menuInfo={orderInfo}/>
            </div>

        )}  
        <br />
        </div>
    );
  }