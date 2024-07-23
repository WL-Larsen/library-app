import React from 'react'
import Carousel from '../../containers/homePageContainer/Carousel'
import ExploreTopBooks from '../../containers/homePageContainer/ExploreTopBooks'
import Heros from '../../containers/homePageContainer/Heros'
import LibraryServices from '../../containers/homePageContainer/LibraryServices'

const HomePage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    )
}

export default HomePage