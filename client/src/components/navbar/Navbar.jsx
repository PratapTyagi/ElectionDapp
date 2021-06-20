import "./Navbar.css";
const Navbar = ({ currentAccount }) => {
  return (
    <div className="navbar">
      <h2>𝓔𝓵𝓮𝓬𝓽𝓲𝓸𝓷𝓓𝓪𝓹𝓹</h2>
      <div className="navbar__userAddress">
        <h5>{currentAccount}</h5>
      </div>
    </div>
  );
};

export default Navbar;
