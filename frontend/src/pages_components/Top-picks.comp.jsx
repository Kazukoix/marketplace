import {shoeOne, shoeTwo, shoeThree} from '../images/shoes';
import '../css/topPick.styled.css'; // Correct file name and path

const TopPicks = () =>{

  return (
    //This will print out the data from the database using DOM
    <div className="body">
      <div className="container">
        <div className="card-wrapper">
          <ul className="card-list"></ul>
            <li className="card-item">
              <a href="-" className="card-link">
                <img src={shoeOne} alt="showOne" class="card-image"/>
                <p class="shoe-name">Shoe 1</p>
                <h2 className="card-title">Shoe 1 Name Insert</h2>
              </a>
            </li>
            <li className="card-item">
              <a href="-" className="card-link">
                <img src={shoeTwo} alt="showOne" class="card-image"/>
                <p class="shoe-name">Shoe 2</p>
                <h2 className="card-title">Shoe 2 Name Insert</h2>
              </a>
            </li>
            <li className="card-item">
              <a href="-" className="card-link">
                <img src={shoeThree} alt="showOne" class="card-image"/>
                <p class="shoe-name">Shoe 3</p>
                <h2 className="card-title">Shoe 3 Name Insert</h2>
              </a>
            </li>
            <li className="card-item">
              <a href="-" className="card-link">
                <img src={shoeOne} alt="showOne" class="card-image"/>
                <p class="shoe-name">Shoe 4</p>
                <h2 className="card-title">Shoe 4 Name Insert</h2>
              </a>
            </li>
            <li className="card-item">
              <a href="-" className="card-link">
                <img src={shoeTwo} alt="showOne" class="card-image"/>
                <p class="shoe-name">Shoe 5</p>
                <h2 className="card-title">Shoe 5 Name Insert</h2>
              </a>
            </li>
        </div>
      </div>
    </div>
  )
}

export default TopPicks;