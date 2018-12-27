//-------- Add Portfolios --------//
import React,{Component} from 'react';
import {connect} from 'react-redux';
import PortForm from './port_form';
import ShowError from './show_error';


class AddPort extends Component{


    constructor() {
        super();
        this.state = {
            showPopup: false,
            showError:false,
			error:''
        };
    }

    //Check for portfolios limit
    togglePopup() {
        if(this.props.reducers.Number_port<10) this.setState({showPopup: !this.state.showPopup});
        else{this.setState({error:'error'});
        this.setState({showError: !this.state.showError});}
    }
	
	render() {
        return (
            <div>
                <div>
				<li className="nav-item">
					<button onClick={this.togglePopup.bind(this)} className="nav-link btn btn-success mr-1 mt-1 white" type="button" aria-haspopup="true" aria-expanded="false"><i className="icon-plus"></i>Add Portfolio</button>
				</li>

                {this.state.showPopup ?
                    <PortForm
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
                {
                    (this.state.error=='error' && this.state.showError) ?
                    <ShowError
                        error="10 portfolios max limit reached"
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {reducers:state.reducer};
}

export default connect(mapStateToProps,null)(AddPort);

