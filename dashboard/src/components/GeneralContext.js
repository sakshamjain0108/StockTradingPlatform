import React , {useState,useContext} from 'react';
import { createContext } from 'react';


export const BuyContext = createContext();
export const SelectedStockContext = createContext();

export default function GeneralContext({ children }) {
  const [buy, setBuy] = useState(false);
 
  const[UID,setUID] = useState(null)

  const ToggleBuyCard = (uid) => {
    setUID(uid)
    setBuy(true);
  };
  const closeBuyCard =()=>{
    setBuy(false);
    setUID(null)
  }

  return (
    <BuyContext.Provider value={{ buy, ToggleBuyCard , closeBuyCard,UID}}>
      {children}
    </BuyContext.Provider>
  );
}
