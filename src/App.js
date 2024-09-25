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

  const corpsList = [
    {id: 1, name: "The Academy"},
    {id: 2, name: "Blue Knights"},
    {id: 3, name: "Blue Devils"},
    {id: 4, name: "Blue Stars"},

    {id: 56, name: "7th Regiment"}
  ]

  useEffect(() => {
    const corps = corpsList[Math.floor(Math.random() * corpsList.length)].name
    console.log(corps)
    setChosenCorps(corps)
  }, [])

  const corpsMap = createCorpsMap()

  const onSelect = (corpsName) => {
    if (!selectedCorps.includes(corpsName)) {
      setSelectedCorps([...selectedCorps, corpsName].reverse())
    }

    setInput("")

    if (corpsName == chosenCorps) {
      console.log("You have chosen the right answer!")
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
          shouldItemRender={(item, value) => !completed && item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={(item, isHighlighted) =>
            <div key={item.id} style={{ background: isHighlighted ? '#eee' : 'white' }}>
              {item.name}
            </div>
          }
          value={input}
          onChange={e => setInput(e.target.value)}
          onSelect={onSelect}
        />
      </div>
      <div className="container text-center">
            <div className="row align-items-start mt-3">
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

  corpsMap.set("7th Regiment", {location: "New London, CT", region: "Northeast", class: "Open", yearFounded: 2002})

  return corpsMap
}

export default App;
