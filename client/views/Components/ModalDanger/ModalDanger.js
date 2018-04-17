import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDanger extends Component {
  // constructor(props) {
  //   super(props);
  //   this.toggleDanger= this.toggleDanger.bind(this);
  //   this.state = {
  //     danger: this.props.show
  //   };
  // }

  // toggleDanger() {
  //   this.setState({
  //     danger: !this.state.danger
  //   });
  // }

  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggleShow} className={'modal-danger ' + this.props.className}>
        <ModalHeader toggle={this.toggleDanger}>{this.props.title}</ModalHeader>
        <ModalBody>
          {this.props.msg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggleShow}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalDanger;
