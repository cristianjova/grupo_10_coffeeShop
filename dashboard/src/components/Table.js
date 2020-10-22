import React from 'react';

function Table(props) {
    const products = props.products;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Origen</th>
                    <th scope="col">Tostado</th>
                    <th scope="col">Torrado</th>
                    <th scope="col">Tamaño</th>
                    <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product,index)=>{
                return(
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.toast}</td>
                        <td>{product.roast}</td>
                        <td>{product.size}</td>
                        <td>{product.price}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}

export default Table;