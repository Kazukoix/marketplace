import { ShowCaseThree} from '../images';
import "../css/front.ad.styled.css";
const ShowCaseIII = () =>{

  return (
    //This will print out the data from the database using DOM
    <div className="front-ad">
      <img className="sole-box" src={ShowCaseThree} alt="" />
    </div>
  )
}

export default ShowCaseIII;