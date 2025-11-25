import { useNavigate } from 'react-router-dom';

import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  function navToHomePage() {
    navigate('/');
  }
  return (
    <h1 id="header" onClick={navToHomePage}>
      Pokèdex
    </h1>
  );
}
