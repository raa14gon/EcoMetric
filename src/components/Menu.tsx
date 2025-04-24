import { Bars3Icon, ChevronLeftIcon, HomeIcon, InformationCircleIcon, CalculatorIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import shortLogo from "../assets/Image.png";
import longLogo from "../assets/logofull.png";



interface MenuProps {
    onToggleMenu: (isOpen: boolean) => void;
}

export function Menu({ onToggleMenu }: MenuProps) {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => {
            const newState = !prev;

            localStorage.setItem("isMenuOpen", JSON.stringify(newState));
            onToggleMenu(newState);


            return newState;
        });
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-20
        transition-all duration-400 ease-in-out border-t border-gray-900
        ${isMenuOpen ? "w-56" : "w-16"}`}
        >
            <div className="py-[0.4px] bg-gray-100"></div>

            <div className="relative">
                    <button className={`absolute top-1 trasition-all duration-300 bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-full flex items-center gap-2
                    ${isMenuOpen ? "left-44" : "left-1"}`}
                    onClick={handleToggleMenu}>
                        {isMenuOpen ? <ChevronLeftIcon className="w-6"/> : <Bars3Icon className="w-8 pl-1"/>}
                    </button>
            </div>

            <nav className="pt-12">
                <ul>
                    <li className="relative mb-4">
                        <Link to="/home"
                            className="flex intems-center py-2 px-2 rouded hover:bg-gray-900"
                            title="Página Inicial"
                            id="home"
                        >
                             <HomeIcon className="w-8 pl-2" />
                             <span className={`absolute left-12 whitespace-nowrap trasition-all duration-100 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 inivisible"
                             }`}>
                                Página Inicial
                             </span>
                        </Link>
                    </li>
                    <li className="relative mb-4">
                        <Link to="/about"
                            className="flex intems-center py-2 px-2 rouded hover:bg-gray-900"
                            title="Sobre"
                            id="about"
                        >
                             <InformationCircleIcon className="w-8 pl-2" />
                             <span className={`absolute left-12 whitespace-nowrap trasition-all duration-100 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 inivisible"
                             }`}>
                                Sobre
                             </span>
                        </Link>
                    </li>
                    <li className="relative mb-4">
                        <Link to="/calculator"
                            className="flex intems-center py-2 px-2 rouded hover:bg-gray-900"
                            title="Calculadora"
                            id="calculator"
                        >
                             <CalculatorIcon className="w-8 pl-2" />
                             <span className={`absolute left-12 whitespace-nowrap trasition-all duration-100 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 inivisible"
                             }`}>
                                Calculadora
                             </span>
                        </Link>
                    </li>
                </ul>
            </nav>
                
            
        </div>
    );
};