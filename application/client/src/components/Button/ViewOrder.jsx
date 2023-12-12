export default function ViewOrder({ menuInfo }) {
    const { id, name, quantity, price } = menuInfo;
  
    return (
      <div className="w-[900px] relative">
         <li className='flex bg-white'>
            <div className='pd-2 pl-2 '>
            <span className=''>Menu Id</span>
             </div>
             <div className='pd-2 pl-28'>
            <span className=''>Menu name</span>
            </div>
            <div className='pd-2 pl-28'>
            <span className="monospaced ">Quantity</span>
            </div>
            <div className='pd-2 pl-32'>
             <span className="monospaced ">Price</span>
            </div>
            </li>
        <li className='flex shadow-md bg-white'>
          <div className='pd-2 pl-4'>
            <span>{id}</span>
          </div>
          <div className='pd-2 pl-40'>
            <span>{name}</span>
          </div>
          <div className='pd-2 absolute left-[400px]'>
            <span className="monospaced">{quantity}</span>
          </div>
          <div className='pd-2 absolute left-[580px]'>
            <span className="monospaced">{price}</span>
          </div>
        </li>
        <br/>
      </div>
    );
  }
  
  
