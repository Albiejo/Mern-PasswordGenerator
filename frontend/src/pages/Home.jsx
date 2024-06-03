
import PasswordCard from "../components/Password/PasswordCard";

const Home = () => {


  return (
    <div className="mx-auto mt-20 ">
      <h1 className="text-center mb-2 font-extrabold" style={{fontSize:"36px" ,color:"black"}}>PASSWORD GENERATOR</h1>
      <PasswordCard />
    </div>
  );
};

export default Home;