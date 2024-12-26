import { ShowCaseOne} from '../images';
import "../css/front.ad.styled.css";
const ShowCase = () =>{

  return (
    //This will print out the data from the database using DOM
    <div className="front-ad">
      <img className="sole-box" src={ShowCaseOne} alt="" />
    </div>
  )
}

export default ShowCase;