import { Menu } from '../components/Menu';
import { useState } from "react";


export function About() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleToggleMenu = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };

    return (
        <div className="h-screen bg-gray-100">
            <Menu onToggleMenu={handleToggleMenu} />

            <div className={"flex-1 trasition-all duration-300 pl-14 pt-4"} style={{ marginLeft: isMenuOpen ? "11rem" : "1rem" }}>
            </div>
        </div>
    )
}