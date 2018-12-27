//-------- Delete portfolio --------//
import React, {Component} from 'react';
import ConfirmDeletePort from './confirm_port_delete';
import FaClose from 'react-icons/lib/fa/close'

class DeletePort extends Component{
    constructor() {
        super();
        this.state = { showPopup: false };
    }
    togglePopup() {
        this.setState({ showPopup: !this.state.showPopup });
    }
	
    render(){
        return(
            <div>
                <button className="unvisible" onClick={this.togglePopup.bind(this)}><FaClose  className="visible"></FaClose></button>
                {this.state.showPopup ?
                    <ConfirmDeletePort clicked_id={this.props.clicked_id}
                               closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default DeletePort;