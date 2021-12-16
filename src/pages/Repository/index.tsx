import React from "react";
import { Link } from "react-router-dom";

import Card from '../../components/Card'

const Repository: React.FC = () => {
    return(
        <> 
            <h3>Repository</h3>
            <Link to={`/`}>Dashboard</Link>
        </>
    )
}
export default Repository;