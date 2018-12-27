//-------- Delete stocks --------//
import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteStocks} from '../controllers/controller';


class DeleteStocks extends Component{
    constructor(props){
        super(props);
        this.onFormSubmit=this.onFormSubmit.bind(this);
    }

    onFormSubmit(event){
        event.preventDefault();
        this.props.deleteStocks(this.props.stocks_checked,this.props.clicked_id);
        this.props.closePopup();
    }

    render() {
        return (	
		<div style={{display: 'block'}} className="modal popup" onClick={this.props.closePopup}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<form onSubmit={(event) => this.onFormSubmit(event)}>
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title" id="myModalLabel">Delete Stock?</h4>
					</div>
					<div className="modal-footer">
						<button className="btn btn-default" onClick={this.props.closePopup}>No</button>
						<button className="btn btn-danger" onClick={this.onFormSubmit.bind(this)} >Yes</button>
					</div>
					</form>
				</div>
			</div>
		</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteStocks},dispatch);
}

export default connect(null,mapDispatchToProps)(DeleteStocks);

