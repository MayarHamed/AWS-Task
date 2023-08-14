import './OverviewBox.css'

function OverviewBox(props) {
    return (
        <div className="shadow-lg p-4 rounded square w-100 m-2 text-dark">
            <h4 className='text-center font-weight-bold'>{props.title}</h4>
            <h5 className='text-center mt-4'>{props.count}</h5>
        </div>
    )
}
export default OverviewBox;