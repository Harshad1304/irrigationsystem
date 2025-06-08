 import { FaTint } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
function Navbar() {
   const {pathname} = useLocation();
        return (
      <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaTint className="text-3xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Smart Irrigation</h1>
        </div>
        <nav>
            <div className="flex gap-4">
            {
  ["Home", "About", "Contact"].map((item, index) => {
 
    return (
      <Link
        to={`/${item.toLowerCase()==="home"?"":""}`} //We dont have any other pages expect home so we are keepting this blank
        key={index}
        className={`text-xl font-medium hover:text-blue-600 ${pathname === `/${item.toLowerCase()==="home"?"":item.toLowerCase()}` ? "text-blue-600" : "text-gray-600"}`}
      >
        {item}
      </Link>
    );
  })
}
            </div>   
        </nav>
      </div>
    </header>
        );
}
export default Navbar;
