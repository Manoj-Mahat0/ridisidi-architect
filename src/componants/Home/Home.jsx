import React from 'react'
import Heropage from './Heropage'
import Aboutus from '../Aboutus/Aboutus'
import WorkingSteps from './Workingsteps';
import Gallery from '../Gallery/Gallery';
import Contactus from "../Contactus/Contactus";
const Home = () => {
  return (
    <div>
      <Heropage />
      <Aboutus />
              <Gallery />
       <WorkingSteps />
<Contactus />
    </div>
  )
}

export default Home
