import { Link } from 'react-router-dom';
const NotFound = () =>{
return(
    <div>
      <span className='circle'></span>
      <span className='circle'></span>
      <div className='title'>  
        <h1>404 - Not Found</h1>
        <h2>There is nothing here!</h2>
        <Link to="/">
            <button>Back</button>
        </Link>
      </div>
    </div>
)

}
export default NotFound