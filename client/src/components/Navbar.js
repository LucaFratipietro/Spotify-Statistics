import '../styling/Navbar.css';

export default function NavBar({handler}) {

  //handle submission of form
  const handleSubmit = (e) => {
    e.preventDefault();

    //retreive data from form
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

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
            <option value="AllSongs">All</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="rnb">RnB</option>
          </select>
        </label>
        <label className="searchLabel"> Decade:
          <select id="genre" name="decade">
            <option value="AllYears">All</option>
            <option value="1980">1980</option>
            <option value="1990">1990</option>
            <option value="2000">2000</option>
          </select>
        </label>
        <button type="submit">Discover</button>
      </form>
    </nav>
  );

}
