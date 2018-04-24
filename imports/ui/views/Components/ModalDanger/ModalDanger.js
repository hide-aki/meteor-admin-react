import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDanger extends Component {
  
  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggleShow} className={'modal-' + this.props.type + ' ' + this.props.className}>
        <ModalHeader toggle={this.toggleDanger}>{this.props.title}</ModalHeader>
        <ModalBody>
          {this.props.msg} <br />
          {this.props.detailError}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggleShow}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalDanger;
