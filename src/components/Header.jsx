import { BiMoon } from "react-icons/bi";
import logo from '../assets/logo-dappels-doffres.png'; // Original logo
import logoWhite from '../assets/logo-dappels-doffres-white.png'; // White logo for dark mode

const Header = ({ toggleDarkMode, isDarkMode, onLogout }) => {
  const loginApi = async (username, password) => {
    try {
      const res = await fetch('https://cors-anywhere.herokuapp.com/http://163.172.74.154:8003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log(data); // Log the response for debugging
      return { success: res.ok, message: data.message, token: data.token };
    } catch (error) {
      return { success: false, message: 'Échec de la connexion. Veuillez réessayer.' };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Username:", username); // Log the username
    console.log("Password:", password); // Log the password
    setLoading(true);
    const response = await loginApi(username, password);
    setMessage(response.message);
    if (response.success) {
      onLoginSuccess(response.token);
    }
    setLoading(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <img 
              src={isDarkMode ? logoWhite : logo} // Use white logo in dark mode
              alt="Logo d'Appels d'Offres"
            />
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-primary dark-btn" onClick={toggleDarkMode}>
              <BiMoon />
            </button>
            <button className="btn btn-outline-primary" onClick={onLogout}>Déconnecter</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

