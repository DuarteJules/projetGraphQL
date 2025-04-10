import "./header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { House, User } from "lucide-react";
import { useAuth } from "@/context/Auth.tsx";

const Header: React.FC = () => {
    const { isAuthenticated } = useAuth();

    const [isLogged , setIsLogged] = useState(isAuthenticated);

    useEffect(() => {
        setIsLogged(isAuthenticated);
    },[isAuthenticated]);

    const UserIcon: React.FC = () => {
        if(isLogged){
            return(
                <>
                    <Link to='/' onClick={() => {localStorage.removeItem('token'); localStorage.removeItem('user')}} className="connect">
                        <p>Disconnect</p>
                        <User size={40} strokeWidth={1.25} />
                    </Link>
                </>
            )
        }else {
            return(
                <>
                    <Link to='/signIn' className="connect">
                        <p>Connect</p>
                        <User size={40} strokeWidth={1.25} />
                    </Link>
                </>
            )
        }
    }
  return (
    <>
      <div className="headerDiv">
          <Link to="/" className="logo">
              <House size={40} strokeWidth={1.25} color={"wheat"} />
          </Link>
          <UserIcon ></UserIcon>
      </div>
    </>
  );
};

export default Header;
