import Autocomplete from 'react-autocomplete';
import { useEffect, useState } from 'react';
import CorpsDetails from './CorpsDetails';
import CompletedModal from './CompletedModal';
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [selectedCorps, setSelectedCorps] = useState([])
  const [chosenCorps, setChosenCorps] = useState("")
  const [completed, setCompleted] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [corpsList, setCorpsList] = useState([
    // World Class
    {name: "The Academy"},
    {name: "Blue Knights"},
    {name: "Blue Devils"},
    {name: "Blue Stars"},
    {name: "Bluecoats"},
    {name: "Boston Crusaders"},
    {name: "Carolina Crown"},
    {name: "The Cavaliers"},
    {name: "Colts"},
    {name: "Crossmen"},
    {name: "Genesis"},
    {name: "Jersey Surf"},
    {name: "Madison Scouts"},
    {name: "Mandarins"},
    {name: "Music City"},
    {name: "Pacific Crest"},
    {name: "Phantom Regiment"},
    {name: "Santa Clara Vanguard"},
    {name: "Seattle Cascades"},
    {name: "Spirit of Atlanta"},
    {name: "Troopers"},

    // Open Class
    {name: "7th Regiment"},
    {name: "The Battalion"},
    {name: "Blue Devils B"},
    {name: "Blue Devils C"},
    {name: "Colt Cadets"},
    {name: "Columbians"},
    {name: "Gold"},
    {name: "Golden Empire"},
    {name: "Guardians"},
    {name: "Impulse!"},
    {name: "Les Stentors"},
    {name: "Raiders"},
    {name: "River City Rhythm"},
    {name: "Spartans"},
    {name: "Vessel"},

    // All-Age Class
    {name: "Atlanta CV"},
    {name: "Bushwackers Drum Corps"},
    {name: "Cincinnati Tradition"},
    {name: "Columbus Saints"},
    {name: "Fusion Core"},
    {name: "Governaires"},
    {name: "Hawthorne Caballeros"},
    {name: "Hurricanes"},
    {name: "New York Skyliners"},
    {name: "Reading Buccaneers"},
    {name: "Rogues Hollow Regiment"},
    {name: "Sunrisers"},
    {name: "White Sabers"},
    
  ])

  useEffect(() => {
    const corps = corpsList[Math.floor(Math.random() * corpsList.length)].name
    if (window.location.hostname === 'localhost') console.log(corps)
    setChosenCorps(corps)
  }, [])

  const corpsMap = createCorpsMap()

  const onSelect = (corpsName) => {
    if (!selectedCorps.includes(corpsName)) {
      setSelectedCorps([...selectedCorps.reverse(), corpsName].reverse())
    }

    setInput("")

    setCorpsList((prevList) =>
      prevList.filter((corps) => corps.name !== corpsName)
    );

    if (corpsName == chosenCorps) {
      setCompleted(true)
      setOpenModal(true)
    }
  }

  const closeModal = () => setOpenModal(false)

  return (
    <div>
      <div>
        <h1 className='text-center'>DCIDLE</h1>
      </div>
      <div className='dropdown mb-1 text-center'>
        <Autocomplete
          getItemValue={(item) => item.name}
          items={corpsList}
          shouldItemRender={(item, value) => !completed && corpsList.includes(item) && item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={(item, isHighlighted) =>
            <div key={item.name} style={{ background: isHighlighted ? '#eee' : 'white' }}>
              {item.name}
            </div>
          }
          value={input}
          onChange={e => setInput(e.target.value)}
          onSelect={onSelect}
        />
      </div>
      <div className="container text-center">
            <div className="row align-items-start mt-3 mb-3">
              <div className={`card text-black bg-light col`}>
                  <p>Name</p>
              </div>
              <div className={`card text-black bg-light col`}>
                  <p>Location</p>
              </div>
              <div className={`card text-black bg-light col`}>
                  <p>Class</p>
              </div>
              <div className={`card text-black bg-light col`}>
                  <p>Year Founded</p>
              </div>
              <div className={`card text-black bg-light col`}>
                  <p>Last Championship Won</p>
              </div>
            </div>
        </div>
      {selectedCorps.map(c => <CorpsDetails name={c} info={corpsMap.get(c)} chosenName={chosenCorps} chosenInfo={corpsMap.get(chosenCorps)} />)}
      {openModal && <CompletedModal close={closeModal}/>}
    </div>
  )
}

function createCorpsMap() {
  const corpsMap = new Map()

  // World Class
  corpsMap.set("The Academy", {location: "Tempe, AZ", region: "West", class: "World", yearFounded: 2001, lastChampionship: 2006}) // won championship in Open Class
  corpsMap.set("Blue Devils", {location: "Concord, CA", region: "West", class: "World", yearFounded: 1957, lastChampionship: 2023})
  corpsMap.set("Blue Knights", {location: "Denver, CO", region: "West", class: "World", yearFounded: 1958, lastChampionship: 0})
  corpsMap.set("Blue Stars", {location: "La Crosse, WI", region: "Midwest", class: "World", yearFounded: 1964, lastChampionship: 2003}) // won championship in Division III
  corpsMap.set("Bluecoats", {location: "Canton, OH", region: "Midwest", class: "World", yearFounded: 1972, lastChampionship: 2024})
  corpsMap.set("Boston Crusaders", {location: "Boston, MA", region: "Northeast", class: "World", yearFounded: 1940, lastChampionship: 0})
  corpsMap.set("Carolina Crown", {location: "Fort Mill, SC", region: "South", class: "World", yearFounded: 1988, lastChampionship: 2013})
  corpsMap.set("The Cavaliers", {location: "Rosemont, IL", region: "Midwest", class: "World", yearFounded: 1948, lastChampionship: 2006})
  corpsMap.set("Colts", {location: "Dubuque, IA", region: "Midwest", class: "World", yearFounded: 1963, lastChampionship: 0})
  corpsMap.set("Crossmen", {location: "San Antonio, TX", region: "South", class: "World", yearFounded: 1974, lastChampionship: 0})
  corpsMap.set("Genesis", {location: "Austin, TX", region: "South", class: "World", yearFounded: 2009, lastChampionship: 0})
  corpsMap.set("Jersey Surf", {location: "Camden, NJ", region: "Northeast", class: "World", yearFounded: 1990, lastChampionship: 0})
  corpsMap.set("Madison Scouts", {location: "Madison, WI", region: "Midwest", class: "World", yearFounded: 1920, lastChampionship: 1988})
  corpsMap.set("Mandarins", {location: "Sacramento, CA", region: "West", class: "World", yearFounded: 1963, lastChampionship: 2001}) // won championship in Open Class
  corpsMap.set("Music City", {location: "Nashville, TN", region: "South", class: "World", yearFounded: 2009, lastChampionship: 0})
  corpsMap.set("Pacific Crest", {location: "City of Industry, CA", region: "West", class: "World", yearFounded: 1993, lastChampionship: 0})
  corpsMap.set("Phantom Regiment", {location: "Rockford, IL", region: "Midwest", class: "World", yearFounded: 1956, lastChampionship: 2008})
  corpsMap.set("Santa Clara Vanguard", {location: "Santa Clara, CA", region: "West", class: "World", yearFounded: 1967, lastChampionship: 2018})
  corpsMap.set("Seattle Cascades", {location: "Seattle, WA", region: "West", class: "World", yearFounded: 1966, lastChampionship: 0}) // won championship in Division III
  corpsMap.set("Spirit of Atlanta", {location: "Atlanta, GA", region: "South", class: "World", yearFounded: 1976, lastChampionship: 0})
  corpsMap.set("Troopers", {location: "Casper, WY", region: "West", class: "World", yearFounded: 1957, lastChampionship: 0})

  // Open Class
  corpsMap.set("7th Regiment", {location: "New London, CT", region: "Northeast", class: "Open", yearFounded: 2002, lastChampionship: 0})
  corpsMap.set("The Battalion", {location: "Salt Lake City, UT", region: "West", class: "Open", yearFounded: 2014, lastChampionship: 0})
  corpsMap.set("Blue Devils B", {location: "Concord, CA", region: "West", class: "Open", yearFounded: 1968, lastChampionship: 2016})
  corpsMap.set("Blue Devils C", {location: "Concord, CA", region: "West", class: "Open", yearFounded: 1973, lastChampionship: 0})
  corpsMap.set("Colt Cadets", {location: "Dubuque, IA", region: "Midwest", class: "Open", yearFounded: 1967, lastChampionship: 0})
  corpsMap.set("Columbians", {location: "Pasco, WA", region: "West", class: "Open", yearFounded: 2013, lastChampionship: 0})
  corpsMap.set("Gold", {location: "San Diego, CA", region: "West", class: "Open", yearFounded: 2005, lastChampionship: 0})
  corpsMap.set("Golden Empire", {location: "Bakersfield, CA", region: "West", class: "Open", yearFounded: 2014, lastChampionship: 0})
  corpsMap.set("Guardians", {location: "Dallas, TX", region: "South", class: "Open", yearFounded: 2012, lastChampionship: 0})
  corpsMap.set("Heat Wave", {location: "Tampa Bay, FL", region: "South", class: "Open", yearFounded: 2015, lastChampionship: 2003}) // won championship in DCA A Class
  corpsMap.set("Impulse!", {location: "Buena Park, CA", region: "West", class: "Open", yearFounded: 1998, lastChampionship: 2006}) // won championship in Division III
  corpsMap.set("Les Stentors", {location: "Sherbrooke, QC", region: "Canada", class: "Open", yearFounded: 1988, lastChampionship: 0})
  corpsMap.set("Raiders", {location: "Princeton, NJ", region: "Northeast", class: "Open", yearFounded: 1990, lastChampionship: 2005})
  corpsMap.set("River City Rhythm", {location: "Anoka, MN", region: "Midwest", class: "Open", yearFounded: 2009, lastChampionship: 0})
  corpsMap.set("Spartans", {location: "Nashua, NH", region: "Northeast", class: "Open", yearFounded: 1955, lastChampionship: 2004})
  corpsMap.set("Vessel", {location: "San Dimas, CA", region: "West", class: "Open", yearFounded: 2009, lastChampionship: 0})

  // All Age Class
  // All last championships were won in DCA, except for the Reading Buccaneers
  corpsMap.set("Atlanta CV", {location: "Atlanta, GA", region: "South", class: "All Age", yearFounded: 1997, lastChampionship: 2001})
  corpsMap.set("Bushwackers Drum Corps", {location: "Princeton, NJ", region: "Northeast", class: "All Age", yearFounded: 1980, lastChampionship: 1993})
  corpsMap.set("Cincinnati Tradition", {location: "Cincinatti, OH", region: "Midwest", class: "All Age", yearFounded: 1984, lastChampionship: 2017})
  corpsMap.set("Columbus Saints", {location: "Columbus, OH", region: "Midwest", class: "All Age", yearFounded: 2003, lastChampionship: 0})
  corpsMap.set("Fusion Core", {location: "Morris County, NJ", region: "Northeast", class: "All Age", yearFounded: 2006, lastChampionship: 2022})
  corpsMap.set("Governaires", {location: "St. Peter, MN", region: "Midwest", class: "All Age", yearFounded: 1927, lastChampionship: 2015})
  corpsMap.set("Hawthorne Caballeros", {location: "Hawthorne, NJ", region: "Northeast", class: "All Age", yearFounded: 1946, lastChampionship: 2021})
  corpsMap.set("Hurricanes", {location: "Seymour, CT", region: "Northeast", class: "All Age", yearFounded: 1932, lastChampionship: 2023})
  corpsMap.set("New York Skyliners", {location: "Southern Tier, NY", region: "Northeast", class: "All Age", yearFounded: 1945, lastChampionship: 2002})
  corpsMap.set("Reading Buccaneers", {location: "Reading, PA", region: "Northeast", class: "All Age", yearFounded: 1957, lastChampionship: 2024})
  corpsMap.set("Rogues Hollow Regiment", {location: "Doylestown, OH", region: "Midwest", class: "All Age", yearFounded: 2015, lastChampionship: 2023})
  corpsMap.set("Sunrisers", {location: "Kings Park, NY", region: "Northeast", class: "All Age", yearFounded: 1953, lastChampionship: 2007})
  corpsMap.set("White Sabers", {location: "Rochester, NY", region: "Northeast", class: "All Age", yearFounded: 1928, lastChampionship: 2013})

  return corpsMap
}

export default App;
