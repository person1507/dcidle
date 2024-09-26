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
            </div>
        </div>
      {selectedCorps.map(c => <CorpsDetails name={c} info={corpsMap.get(c)} chosenName={chosenCorps} chosenInfo={corpsMap.get(chosenCorps)} />)}
      {openModal && <CompletedModal close={closeModal}/>}
    </div>
  )
}

function createCorpsMap() {
  const corpsMap = new Map()

  corpsMap.set("The Academy", {location: "Tempe, AZ", region: "West", class: "World", yearFounded: 2001})
  corpsMap.set("Blue Devils", {location: "Concord, CA", region: "West", class: "World", yearFounded: 1957})
  corpsMap.set("Blue Knights", {location: "Denver, CO", region: "West", class: "World", yearFounded: 1958})
  corpsMap.set("Blue Stars", {location: "La Crosse, WI", region: "Midwest", class: "World", yearFounded: 1964})
  corpsMap.set("Bluecoats", {location: "Canton, OH", region: "Midwest", class: "World", yearFounded: 1972})
  corpsMap.set("Boston Crusaders", {location: "Boston, MA", region: "Northeast", class: "World", yearFounded: 1940})
  corpsMap.set("Carolina Crown", {location: "Fort Mill, SC", region: "South", class: "World", yearFounded: 1988})
  corpsMap.set("The Cavaliers", {location: "Rosemont, IL", region: "Midwest", class: "World", yearFounded: 1948})
  corpsMap.set("Colts", {location: "Dubuque, IA", region: "Midwest", class: "World", yearFounded: 1963})
  corpsMap.set("Crossmen", {location: "San Antonio, TX", region: "South", class: "World", yearFounded: 1974})
  corpsMap.set("Genesis", {location: "Austin, TX", region: "South", class: "World", yearFounded: 2009})
  corpsMap.set("Jersey Surf", {location: "Camden, NJ", region: "Northeast", class: "World", yearFounded: 1990})
  corpsMap.set("Madison Scouts", {location: "Madison, WI", region: "Midwest", class: "World", yearFounded: 1920})
  corpsMap.set("Mandarins", {location: "Sacramento, CA", region: "West", class: "World", yearFounded: 1963})
  corpsMap.set("Music City", {location: "Nashville, TN", region: "South", class: "World", yearFounded: 2009})
  corpsMap.set("Pacific Crest", {location: "City of Industry, CA", region: "West", class: "World", yearFounded: 1993})
  corpsMap.set("Phantom Regiment", {location: "Rockford, IL", region: "Midwest", class: "World", yearFounded: 1956})
  corpsMap.set("Santa Clara Vanguard", {location: "Santa Clara, CA", region: "West", class: "World", yearFounded: 1967})
  corpsMap.set("Seattle Cascades", {location: "Seattle, WA", region: "West", class: "World", yearFounded: 1966})
  corpsMap.set("Spirit of Atlanta", {location: "Atlanta, GA", region: "South", class: "World", yearFounded: 1976})
  corpsMap.set("Troopers", {location: "Casper, WY", region: "West", class: "World", yearFounded: 1957})

  corpsMap.set("7th Regiment", {location: "New London, CT", region: "Northeast", class: "Open", yearFounded: 2002})
  corpsMap.set("The Battalion", {location: "Salt Lake City, UT", region: "West", class: "Open", yearFounded: 2014})
  corpsMap.set("Blue Devils B", {location: "Concord, CA", region: "West", class: "Open", yearFounded: 1968})
  corpsMap.set("Blue Devils C", {location: "Concord, CA", region: "West", class: "Open", yearFounded: 1973})
  corpsMap.set("Colt Cadets", {location: "Dubuque, IA", region: "Midwest", class: "Open", yearFounded: 1967})
  corpsMap.set("Columbians", {location: "Pasco, WA", region: "West", class: "Open", yearFounded: 2013})
  corpsMap.set("Gold", {location: "San Diego, CA", region: "West", class: "Open", yearFounded: 2005})
  corpsMap.set("Golden Empire", {location: "Bakersfield, CA", region: "West", class: "Open", yearFounded: 2014})
  corpsMap.set("Guardians", {location: "Dallas, TX", region: "South", class: "Open", yearFounded: 2012})
  corpsMap.set("Heat Wave", {location: "Tampa Bay, FL", region: "South", class: "Open", yearFounded: 2015})
  corpsMap.set("Impulse", {location: "Buena Park, CA", region: "West", class: "Open", yearFounded: 1998})
  corpsMap.set("Les Stentors", {location: "Sherbrooke, QC", region: "Canada", class: "Open", yearFounded: 1988})
  corpsMap.set("Raiders", {location: "Princeton, NJ", region: "Northeast", class: "Open", yearFounded: 1990})
  corpsMap.set("River City Rhythm", {location: "Anoka, MN", region: "Midwest", class: "Open", yearFounded: 2014})
  corpsMap.set("Spartans", {location: "Nashua, NH", region: "Northeast", class: "Open", yearFounded: 1955})
  corpsMap.set("Vessel", {location: "San Dimas, CA", region: "West", class: "Open", yearFounded: 2009})

  return corpsMap
}

export default App;
