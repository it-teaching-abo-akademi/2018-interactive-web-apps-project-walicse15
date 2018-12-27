//-------- Modal form for adding stock --------//
import React,{ Component } from 'react';
import {addStock} from "../controllers/controller";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class StockForm extends Component{
    constructor(props){
        super(props);
        this.state={ name : '',quantity:'', error:''};
        this.onQuantityChange=this.onQuantityChange.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onFormSubmit=this.onFormSubmit.bind(this);
    }

    onNameChange(event){
        this.setState({name:event.target.value});
    }
	
    onQuantityChange(event){
        this.setState({quantity:event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        var isAlready=0;
        if(this.state.name!='' && this.state.quantity!='') {
            this.props.listStocks.map(stock=>{
                if(this.state.name.toUpperCase()==stock.name){
                    this.setState({error:'error_stock'});
                    isAlready++;
                }
            });
            if(isAlready==0) {
                this.props.addStock(this.props.clicked_id, this.state.name, this.state.quantity);
                this.props.closePopup();
                this.setState({name: '', quantity: ''});
            }
        }
        else this.setState({error:'error'});
    }

    render() {
        return (			
		<div style={{display: 'block'}} className="modal popup" aria-labelledby="myModalLabel">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<form onSubmit={(event) => this.onFormSubmit(event)}>
					<div className="modal-header">
						<button type="button" className="close" onClick={this.props.closePopup}><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title" id="myModalLabel">Add New Stock</h4>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Stock Symbol</label>
							<input type="text" value={this.state.name} onChange={this.onNameChange} className="form-control"/>
						</div>
						<div className="form-group">
							<label>Stock Quantity</label>
							<input type="number" min="1" value={this.state.quantity}
                                   onChange={this.onQuantityChange} className="form-control"/>
						</div>
						<div className="errortext">
                                {this.state.error=="error" ? "*All fields are required!" : ""}
                                {this.state.error=="error_stock" ? "*This stock symbol already exists in portfolio!" : ""}
                        </div>
						<br/>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default" onClick={this.props.closePopup}>Cancel</button>
						<button type="submit" className="btn btn-success" >Add</button>
					</div>
					</form>
				</div>
			</div>
		</div>		
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addStock},dispatch);
}

export default connect(null,mapDispatchToProps)(StockForm);