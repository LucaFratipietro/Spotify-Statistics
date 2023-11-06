import '../styling/Navbar.css';

export default function NavBar({handler}) {

  //handle submission of form
  const handleSubmit = (e) => {
    e.preventDefault();

    //retreive data from form
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    //use handler to update genre and decade
    handler(formJson.genre, formJson.decade);
  };

  return (
    <nav>
      <p>
      Spotify Favourites
      </p>
      <form method="post" onSubmit={handleSubmit}>
        <label className="searchLabel"> Genre:
          <select id="genre" name="genre">
            <option value="AllGenres">All</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="edm">Edm</option>
            <option value="latin">Latin</option>
            <option value="rap">Rap</option>
            <option value="hiphop">Hiphop</option>
            <option value="r&b">R&B</option>
          </select>
        </label>
        <label className="searchLabel"> Decade:
          <select id="genre" name="decade">
            <option value="AllYears">All</option>
            <option value="1970">70s</option>
            <option value="1980">80s</option>
            <option value="1990">90s</option>
            <option value="2000">00s</option>
            <option value="2010">10s</option>
            <option value="2020">20s</option>
          </select>
        </label>
        <button type="submit">Discover</button>
      </form>
    </nav>
  );

}
