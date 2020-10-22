import React from 'react'

function Category({ category }){
    return(
        <div className="col-lg-4 mb-4">
            <div className="card bg-info text-white shadow">
                <div className="card-body">
                    {category.name}
                </div>
            </div>
        </div>
    )
}

export default Category;