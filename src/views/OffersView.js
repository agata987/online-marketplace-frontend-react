import React from 'react'

import CategoriesMenu from '../components/CategoriesMenu'
import { OffersCategories } from '../const/offersCategories'

class OffersView extends React.Component {

    render() {
        return (
            <div>
                <CategoriesMenu categories={OffersCategories} />
            </div>
        );
    }
}

export default OffersView