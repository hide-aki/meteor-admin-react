import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">

                    <div className="col-sm-12">
                        <div className="card">
                            
                            <div className="card-header">
                                <strong>Profile</strong> <small>Form</small>
                            </div>

                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter your name"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-dot-circle-o"></i> Submit</button>
                                <button type="reset" className="btn btn-sm btn-danger"><i className="fa fa-ban"></i> Reset</button>
                            </div>
                        </div>
                    </div>

                </div>    
            </div>
        )
    }
}

export default Profile; 