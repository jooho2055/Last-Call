
export default function InputForSign(props){
    return(
        <div>
            <input type={props.type} placeholder={props.placeholder} name={props.name} class="shadow appearance-none border border-black px-1.5 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
    );

}