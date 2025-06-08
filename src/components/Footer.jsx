import { FaTint } from "react-icons/fa";
function Footer() {
    return (
        <footer className=" bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <FaTint className="text-2xl text-blue-400" />
                <span className="text-xl font-semibold">Smart Irrigation</span>
              </div>
              <p className="text-gray-400 mt-2">© 2023 All Rights Reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    );
}
export default Footer;