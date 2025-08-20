import { Outlet } from 'react-router-dom'
import Navbar from '../componants/Homefolder/Navbar'
import Footer from '../componants/Homefolder/Footer'
import ScrollToTop from './ScrollToTop'


const LayOut = () => {
    return (
        <div>
            <Navbar />
            <ScrollToTop />
            <Outlet />
               <div className="mt-10" >
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl font-semibold uppercase"></h2>
          <h2 className="text-2xl md:text-3xl font-semibold uppercase"></h2>
          <div className="flex-grow border-t border-black ml-4"></div>
        </div>
      </div>
            <Footer />
        </div>
    )
}

export default LayOut