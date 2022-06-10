import React from 'react'
import { RadioBrowserApi } from 'radio-browser-api';
import defaultLogo from './logo.jpg';
import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";


export default function Radio() {
  const [stations, setStations] = React.useState();
  const [stationCategory, setStationCategory] = React.useState('polish');

  React.useEffect(() => {
    setupApi(stationCategory).then(data => {
      setStations(data);
    })
  }, [stationCategory]);

  const setupApi = async (stationCategory) => {
    const api = new RadioBrowserApi(fetch.bind(window), 'Radio app');

    const stations = await api.searchStations({
      language: 'polish',
      tag: stationCategory,
      limit: 30,
    });
    return stations;
  }

  const categories = ['pop','rock','classical','dance','jazz','80s','90s','house','disco','polish'];

  const setDefaultLogo = (e) => {
    e.target.src = defaultLogo
  }

  return (
    <div className='radio'>
      <input type="text" className="input-field" placeholder='category' onKeyDown={(e) => setStationCategory(e.target.value)}></input>
      <div className='categories'>
        {categories.map(category => {
          return (
            <span className={stationCategory === category ? 'activated' : ''} onClick={() => setStationCategory(category)}>
              {category}
            </span>
          )
        })}
      </div>
      <div className='stations'>
        {stations && stations.map((station, index) => {
          return (
            <div className='station' key={index}>
              <div className='stationBrand'>
                <img className='stationLogo' src={station.favicon} alt='logo' onError={setDefaultLogo} />
                <div className='stationName'>{station.name}</div>
              </div>
              <AudioPlayer className='player' src={station.urlResolved} layout='stacked' showJumpControls={false} customProgressBarSection={[]} customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]} autoPlayAfterSrcChange={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}