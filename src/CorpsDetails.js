import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function CorpsDetails({ name, info, chosenName, chosenInfo }) {
    return (
        <div className="container text-center">
            <div className="row align-items-start mb-3">
                <NameCard name={name} chosenName={chosenName} />
                <LocationCard location={info.location} chosenLocation={chosenInfo.location} region={info.region} chosenRegion={chosenInfo.region} />
                <ClassCard corpsClass={info.class} chosenClass={chosenInfo.class}/>
                <YearFoundedCard year={info.yearFounded} chosenYear={chosenInfo.yearFounded}/>
                <LastChampionshipCard lastChampionship={info.lastChampionship} chosenLastChampionship={chosenInfo.lastChampionship} />
            </div>
        </div>
    )
}

function NameCard({name, chosenName}) {
    let cardType = ""
    if (name === chosenName) cardType = "success"
    else cardType = "danger"
    return (
        <div className={`card text-white bg-${cardType} col`}>
                <p>{name}</p>
        </div>
    )
}

function LocationCard({ location, chosenLocation, region, chosenRegion }) {
    let cardType = ""
    if (location === chosenLocation) cardType = "success"
    else if (region === chosenRegion) cardType = "warning"
    else cardType = "danger"
    return (
        <div className={`card text-white bg-${cardType} col`}>
                <p>{location}</p>
        </div>
    )
}

function ClassCard({ corpsClass, chosenClass }) {
    let cardType = ""
    if (corpsClass === chosenClass) cardType = "success"
    else cardType = "danger"
    return (
        <div className={`card text-white bg-${cardType} col`}>
                <p>{corpsClass}</p>
        </div>
    )
}

function YearFoundedCard({ year, chosenYear }) {
    let cardType = ""
    let arrow = null
    if (year === chosenYear) cardType = "success"
    else {
        if (Math.abs(year - chosenYear) <= 5) cardType = "warning"
        else cardType = "danger"
        if (year > chosenYear) {
            arrow = <FontAwesomeIcon className='mt-1' icon={faAngleDown} />
        }
        else {
            arrow = <FontAwesomeIcon className='mt-1' icon={faAngleUp} />
        }
    }

    return (
        <div className={`card text-white bg-${cardType} col align-items-center`}>
            <div className='d-flex'>
                <p className='me-2'>{year}</p>
                {arrow}
            </div>
        </div>
    )
}

function LastChampionshipCard({ lastChampionship, chosenLastChampionship }) {
    let cardType = ""
    let arrow = null
    if (lastChampionship === chosenLastChampionship) cardType = "success"
    else {
        if (Math.abs(lastChampionship - chosenLastChampionship) <= 5) cardType = "warning"
        else cardType = "danger"
        if (lastChampionship > chosenLastChampionship) {
            arrow = <FontAwesomeIcon className='mt-1' icon={faAngleDown} />
        }
        else {
            arrow = <FontAwesomeIcon className='mt-1' icon={faAngleUp} />
        }
    }

    return (
        <div className={`card text-white bg-${cardType} col align-items-center`}>
            <div className='d-flex'>
                <p className='me-2'>{lastChampionship === 0 ? "Never" : lastChampionship}</p>
                {chosenLastChampionship !== 0 && arrow}
            </div>
        </div>
    )
}