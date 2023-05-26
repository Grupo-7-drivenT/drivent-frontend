import { createContext, useState } from 'react';

const HotelContext = createContext();
export default HotelContext;

export function HotelProvider({ children }) {
  const [hotelData, setHotelData] = useState(null);
  
  return (
    <HotelContext.Provider value={{ hotelData, setHotelData }}>
      {children}
    </HotelContext.Provider>
  );
}
