// layout/DefaultLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar'
import ThemeSelector from '../theme/components/ThemeSelector';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const DefaultLayout = ({ children }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <div className={`main bg-${mode}`}>
        <Navbar/>
        <ThemeSelector />
   <div className="container">
    <div className="row">
      <div className="col">
      {children}
      </div>
    </div>
  </div>

    </div>
  );
};

export default DefaultLayout;
