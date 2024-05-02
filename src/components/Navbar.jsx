import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
function Navbar() {
    const { id, isAdmin } = useParams();
    const [isAdminState, setIsAdminState] = useState(isAdmin === 'true');

    return (
        <div className='navbar'>
            <Link
                to={`/index/${isAdminState}`}
                className='link'
            >
                Početna
            </Link>
            <Link
                to={`/aktivnost/${isAdminState}`}
                className='link'
            >
                Aktivnost
            </Link>
            <Link to={`/udruge/${isAdminState}`} className='link'>Udruge</Link>
            <Link to={`/volonter/${isAdminState}`} className='link'>Volonter</Link>

            <label>
                ADMIN
                <input
                    type="checkbox"
                    checked={isAdminState}
                    readOnly
                />
            </label>
            <Link to={`/login`} className='logout'>Logout</Link>
        </div>
    );
}

export default Navbar;
