import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  function navToHomePage() {
    navigate('/');
  }
  return (
    <h1 id={styles.header} onClick={navToHomePage}>
      Pokèdex
    </h1>
  );
}
