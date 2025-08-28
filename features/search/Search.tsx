import React from 'react'
// import { FaSearch } from 'react-icons/fa'

type SearchPropsType = {
    handleSearch: (value: string) => void;
    searchTerm: string;
    placeholder?: string
}
const Search: React.FC<SearchPropsType> = ({ searchTerm, handleSearch, placeholder = 'Search...' }) => {
    return (
        <div className='relative w-full'>
            <input type="text"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                value={searchTerm}
                className='border-b border-gray-400 p-2 outline-0 w-full text-black placeholder-gray-700 peer'
            />
            {/* {searchTerm === '' && (
                <FaSearch className='absolute left-3 top-3 text-gray-700 pointer-events-none' />
            )} */}
        </div>
    )
}

export default Search