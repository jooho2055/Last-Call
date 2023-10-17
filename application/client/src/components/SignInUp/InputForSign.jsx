
export default function InputForSign(props){
    const{onChange, id, ...inputProps} = props;
    return(
        <div>
            <input {...inputProps} onChange={onChange}
            class="shadow appearance-none border border-black px-1.5 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
    );

}