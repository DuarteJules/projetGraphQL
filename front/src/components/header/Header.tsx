import "./header.css";
import React from "react";
import { Link } from "react-router";
import { House, User } from "lucide-react";
import userStore from "@/utils/store.ts";

interface UserType {
    id: string;
    username: string;
}

const Header: React.FC = () => {
    const user : UserType | null = userStore(state => state.user);
    const updateUser : (user : UserType | null) => void =  userStore(state => state.updateUser);
    const updateToken : (token : string | null) => void =  userStore(state => state.updateToken);

    interface UserIconProps {
        user: UserType | null
    }

    const UserIcon: React.FC<UserIconProps>  = ({user}) => {
        if(user){
            return(
                <>
                    <div onClick={() => {updateUser(null); updateToken(null);}} className="connect">
                        <p>Disconnect</p>
                        <User size={40} strokeWidth={1.25} />
                    </div>
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
          <UserIcon user={user} ></UserIcon>
      </div>
    </>
  );
};

export default Header;
