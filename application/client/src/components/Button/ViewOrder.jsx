export default function ViewOrder({ menuInfo }) {
    const { id, name, quantity, price } = menuInfo;
  
    return (
      <div className="w-[900px] relative">
        <li className='flex'>
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
      </div>
    );
  }
  
  
