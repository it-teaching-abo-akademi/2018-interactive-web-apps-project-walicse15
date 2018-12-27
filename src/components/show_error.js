//-------- Modal(popup) for showing errors --------//
import React,{Component} from 'react';

class ShowError extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
		<div style={{display: 'block'}} className="modal popup" onClick={this.props.closePopup}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 style={{color: 'red'}}className="modal-title" id="myModalLabel">Error!!!</h4>
					</div>
					<div className="modal-body">

						<div className="error">
                                {this.props.error}
                        </div>
						<br/>
					</div>
					<div className="modal-footer">
						<button onClick={this.props.closePopup} className="btn btn-default" >Close</button>
					</div>
				</div>
			</div>
		</div>
        );
    }
}

export default ShowError;