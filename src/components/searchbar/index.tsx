import React from 'react'

import SearchIcon from '../../assets/icon/search.png'
import ISearchbarProps from './type'

const SearchBar = (props: ISearchbarProps) => {
    return (
        <div className="searchbar">
            <div className="searchbar__icon">
                <img src={SearchIcon} />
            </div>
            <div className="searchbar__input">
                <input {...props} placeholder="Search artist name" />
            </div>
        </div>
    )
}

export default SearchBar
