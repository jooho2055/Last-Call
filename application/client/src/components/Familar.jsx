import "../App.css";

export default function Familar(){
return(
    <div className="familar_container">
        <h3 className='unfamilar_title'> Unfamilar Software Technology</h3>
       <br />
       <br />
        <table className="unfamilar_table">
            <tr>
                <th>Software Technology</th>
                <th>Average Familiar Scale (5)</th>
            </tr>
            <tr>
                <th>AWS:</th>
                <th>1.5</th>
            </tr>
            <tr>
                <th>JavaScript:</th>
                <th>3</th>
            </tr>
            <tr>
                <th>React:</th>
                <th>1.5</th>
            </tr>
            <tr>
                <th>MYSQL:</th>
                <th>1.6</th>
            </tr>
            <tr>
                <th>Nginx:</th>
                <th>1</th>
            </tr>
            <tr>
                <th>Express</th>
                <th>2</th>
            </tr>
        </table>
    </div>
    )

}