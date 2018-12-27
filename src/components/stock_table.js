//-------- For displaying stock list inside portfolio --------//
import React,{Component} from 'react';

class StockTable extends Component{
    render(){
        return(
			<table className="table table-striped">
				  <thead>
					<tr>
					  <th scope="col">Name</th>
					  <th scope="col">Unit Value</th>
					  <th scope="col">Quantity</th>
					  <th scope="col">Total Value</th>
					  <th scope="col">Select To Delete</th>
					</tr>
				  </thead>
				  <tbody>
					{this.props.listStocks.map(stock=>{
                        return(
                            <tr key={stock.id_stock}>
                                <td>{stock.name}</td>
                                <td>{(this.props.rate*stock.value).toFixed(3)}{this.props.currency}</td>
                                <td>{stock.quantity}</td>
                                <td>{(this.props.rate*stock.value*stock.quantity).toFixed(2)}{this.props.currency}</td>
                                <td><input type="checkbox" value={stock.id_stock} id={stock.id_stock} /></td>
                            </tr>
                        );
                    })}
				  </tbody>
			</table>
        );
    }
}

export default StockTable;