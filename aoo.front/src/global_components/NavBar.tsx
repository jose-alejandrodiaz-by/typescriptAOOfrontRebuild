import React from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

interface NavItem {
    value: string;
    label: string;
}

const items: NavItem[] = [
    { value: `/automation-hub//`, label: 'Automation Hub' },
    { value: '/projects/', label: 'Projects' },
    { value: '/tasks/', label: 'Tasks' },
    { value: '/create-project/', label: 'Create Project' }
];

const Navigation: React.FC = React.memo(() => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar">

            <ul className="nav-links">

                <a href="/" className='homeLink'><HomeOutlined rev={undefined} /></a>

                <div className="dropdown">

                    <button className="dropbtn"><MenuOutlined rev={undefined} /></button>

                    <div className="dropdown-content">
                        {items.map((item) => (
                            <a key={item.value} href={item.value}>{item.label}</a>
                        ))}
                    </div>

                </div>

                {user ? (
                    <button onClick={logout} className="logout">Logout</button>
                    ) : (
                    <Link to="/login" className='login'>Login</Link>
                )}

            </ul>
        </div>
    );
});

export default Navigation;