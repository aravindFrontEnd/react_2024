
import { useState, createContext,useContext } from "react";


const UserContxet = createContext();


const A1= () => {

const [user, setUser] = useState('Aravind Ganesh');
     return (
       <UserContxet.Provider value={{ user, setUser }}>
         <h1> {`Hi ${user}`}</h1>
         <A2 />
       </UserContxet.Provider>
     );
  }

  function A2() {
    return (
      <>
        <h1> component 2</h1>

        <A3 />
      </>
    );
  }

  function A3() {
    const {user} = useContext(UserContxet);
   return (
     <>
       <h1>component 3 </h1>
       <h2> {`hi ${user} again`}</h2>
     </>
   );
  }

export default A1;