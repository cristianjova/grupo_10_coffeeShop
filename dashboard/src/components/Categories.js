import React from 'react';
import Category from './Category'

function Categories({ categories }) {
    const { countByToast, countByRoast, countBySize } = categories
    return (
        <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
            </div>
            <div className="card-body">
                <div className="row">
                        <div className="col-lg-12"> Torrado</div>
                        { countByRoast ? countByRoast.map(roast=> {
                            return(<Category 
                            category = { roast } 
                            title = "Torrado" 
                            />)
                        }) : null}
                        <div className="col-lg-12"> Tostado</div>
                        { countByToast ? countByToast.map(toast=> {
                            return(<Category 
                            category = { toast } 
                            title = "tostado" 
                            />)
                        }) : null}
                        <div className="col-lg-12"> Tamaño</div>
                        { countBySize ? countBySize.map(size=> {
                            return(<Category 
                            category = { size } 
                            title = "tostado" 
                            />)
                        }) : null}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Categories;