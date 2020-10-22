import React from 'react'

function Category({ category, title }){
    return(
        <div className="col-lg-4 mb-4">
            <div className="card bg-info text-white shadow">
                <div className="card-body">
                    {category.name + " " + category.count}
                </div>
            </div>
        </div>
    )
}

export default Category;