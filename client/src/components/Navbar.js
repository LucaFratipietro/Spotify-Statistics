import '../styling/Navbar.css';

export default function NavBar({handler}) {

  function handleSubmuit(e){
    
  }

  return (
    <nav>
      <p>
      Spotify Favourites
      </p>
      <form id="searchForm">
        <label className="searchLabel"> Genre:
          <select id="genre" name="genrelist" form="searchform">
            <option value="AllSongs">All</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="rnb">RnB</option>
          </select>
        </label>
        <label className="searchLabel"> Decade:
          <select id="genre" name="genrelist" form="searchform">
            <option value="AllYears">All</option>
            <option value="1980">1980</option>
            <option value="1990">1990</option>
            <option value="2000">2000</option>
          </select>
        </label>
      </form>
    </nav>
  );

}
