import React, { useState } from 'react';

function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm); // Pass the search term to the parent component or perform the search logic here
        }
    };

    return (
        <nav className='flex justify-center items-center p-4 bg-indigo-900 text-white shadow-md                         '>  
            <form onSubmit={handleSearch} className='flex items-center justify-center px-10 gap-5'>
                <label htmlFor="book" className='text-xl font-serif'>Buscar Libro:</label>
                <input
                    type="text"
                    id="book"
                    placeholder="Introducir Búsqueda"
                    className='rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className='border-cyan-700'>Buscar</button>
            </form>
        </nav>
    );
}

export default Navbar;