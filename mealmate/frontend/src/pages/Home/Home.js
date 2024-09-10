import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to MealMate!</h1>
      <Link to="/Login">
        <button>Login</button>
      </Link>
      <Link to="/SignUp">
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default Home;
