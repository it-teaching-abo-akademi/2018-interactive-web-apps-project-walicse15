//-------- Modal form for portfolio --------//
import React,{ Component } from 'react';
import {cPort} from "../controllers/controller";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PopupForm extends Component{

    constructor(props){
        super(props);
        this.state={ term : '', error:''};
        this.onInputChange=this.onInputChange.bind(this);
        this.onFormSubmit=this.onFormSubmit.bind(this);
    }
    onInputChange(event){
		this.setState({term:String(event.target.value)});
    }
    onFormSubmit(event){
        event.preventDefault();
		if(this.state.term!='') {
            this.props.cPort(this.state.term);
            this.props.closePopup();
            this.setState({term: ''});
        }
        else
            this.setState({error:'error'});
    }
    render() {
        return (           
		<div style={{display: 'block'}} className="modal popup" aria-labelledby="myModalLabel">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<form onSubmit={(event) => this.onFormSubmit(event)}>
					<div className="modal-header">
						<button type="button" className="close" onClick={this.props.closePopup} aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title" id="myModalLabel">Add New Portflio</h4>
					</div>
					<div className="modal-body">

						<div className="form-group">
							<label>Name</label>
							<input type="text" 
                              value={this.state.term}
                              onChange={this.onInputChange} className="form-control"/>
							<div className="error">
								{this.state.error=="error" ? "* Required" : ""}
							</div>
						</div>
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
    return bindActionCreators({cPort},dispatch);
}

export default connect(null,mapDispatchToProps)(PopupForm);