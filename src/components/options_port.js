//-------- Options at bottom of portfolio --------//
import React, {Component} from 'react';
import StockForm from './stock_form';
import ShowError from './show_error';
import DeleteStocks from './delete_stocks';

var marked_for_deletion=[];

class FooterComponent extends Component{
    constructor() {
        super();
        this.state = {
            showPopup: false,
            showError:false,
            showDelete:false,
			error:''
        };
    }
    //Check 50 stock limit
    togglePopup() {
        if(this.props.nr_stocks<50) this.setState({showPopup: !this.state.showPopup});
        else{ this.setState({error:'error'});
			this.setState({showError: !this.state.showError});}
    }
	
    toggleDelete()
    {
        marked_for_deletion=[];
        if(this.props.listStocks.length==0) { this.setState({error: 'no_stock'});
            this.setState({showError: !this.state.showError}); }
        else { this.props.listStocks.map(stock => {
                if (document.getElementById(stock.id_stock).checked) marked_for_deletion.push(stock.id_stock); });
            if (marked_for_deletion.length == 0) {
                this.setState({error: 'error_selected'});
                this.setState({showError: !this.state.showError});
            }
            else{this.setState({showDelete: !this.state.showDelete});}
        }
    }

    render(){

        return(
        <div className="buttons_footer">
            <label className="button1" id="add_stock">
                <button className="btn btn-success" onClick={this.togglePopup.bind(this)}>Add Stock</button>
            </label>
            {this.state.showPopup ?
                <StockForm
                    listStocks={this.props.listStocks}
                    clicked_id={this.props.clicked_id}
                    closePopup={this.togglePopup.bind(this)} />
                : null
            }
            {
                (this.state.error=='error' && this.state.showError) ?
                    <ShowError
                        error="50 stocks limit reached"
                        closePopup={this.togglePopup.bind(this)} />
                    : null
            }
            <label className="button1">
                <button className="btn btn-danger" onClick={this.toggleDelete.bind(this)}>Remove Selected</button>
            </label>
            {this.state.showDelete ?
                <DeleteStocks
                    clicked_id={this.props.clicked_id}
                    stocks_checked={marked_for_deletion}
                    closePopup={this.toggleDelete.bind(this)}/>
                :null
            }
            {
                (this.state.error=='error_selected' && this.state.showError) ?
                    <ShowError
                        error="Select stocks to delete"
                        closePopup={this.toggleDelete.bind(this)} />
                    : null
            }
            {
                (this.state.error=='no_stock' && this.state.showError) ?
                    <ShowError
                        error="No stocks found to delete!"
                        closePopup={this.toggleDelete.bind(this)} />
                    : null
            }
		</div>
        );
    }
}

export default FooterComponent;
