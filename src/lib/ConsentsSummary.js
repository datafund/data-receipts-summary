import React, {Component} from "react";
import _ from "lodash";
import moment from "moment";
import "./ConsentsSummary.css";
import jwt from 'jsonwebtoken';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import {ConsentViewer as ConsentViewer} from "@datafund/consent-viewer";

export default class ConsentsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data ? this.props.data : {},
            consentData: {},
            tokenModalVisible: false
        }

        console.log(this.props);
        console.log(props);

        this.decodeJwt = this.decodeJwt.bind(this);
        this.renderConsents = this.renderConsents.bind(this);
        this.showDetailsModal = this.showDetailsModal.bind(this);
        this.toggleTokenModal = this.toggleTokenModal.bind(this);
        this.renderPiiControllers = this.renderPiiControllers.bind(this);
        this.renderPurposes = this.renderPurposes.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data: nextProps.data
        })
    }

    renderConsents() {
        const _this = this;

        let consents = [];

        for (let k = 0; k < _this.state.data.length; k++) {
            let item = _this.state.data[k];
            let decodedItem = _this.decodeJwt(item);

            console.log(decodedItem);

            consents.push(
                <tr key={k}>
                    <td>{decodedItem.payload.sub}</td>
                    <td>{_this.renderPiiControllers(decodedItem.payload.piiControllers).toString()}</td>
                    <td>{_this.renderPurposes(decodedItem.payload.services).toString()}</td>
                    <td>{moment(new Date(decodedItem.payload.exp * 1000)).format('MM. DD. YYYY, HH:mm ')}</td>
                    <td>{decodedItem.payload.consentReceiptID}</td>
                    <td><a className="btn btn-sm btn-secondary text-white" onClick={(e) => {
                        _this.showDetailsModal(decodedItem);
                    }}>Details</a></td>
                </tr>
            );

        }
        ;

        return consents;
    }

    renderPiiControllers(piiControllers) {
        let piiControllersNames = [];
        _.each(piiControllers, function (val) {
            piiControllersNames.push(val.piiController);
        });

        return piiControllersNames;

    }

    renderPurposes(services) {
        let purposes = [];

        _.each(services, function (val) {
            _.each(val.purposes, function (val2) {
                purposes.push(val2.purpose);
            });
        });

        return purposes;

    }

    showDetailsModal(token) {
        const _this = this;

        _this.setState({consentData: token});

        _this.toggleTokenModal();


        console.log(token);
    }

    decodeJwt(token) {
        let decodedToken = jwt.decode(token, {complete: true});
        return decodedToken
    }

    toggleTokenModal() {
        const _this = this;

        _this.setState({tokenModalVisible: !_this.state.tokenModalVisible});
    }


    render() {
        const _this = this;

        return (
            <div>

                {!_.isEmpty(this.state.data) &&
                <div className="mt-5 table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>PII Controller</th>
                            <th>Purpose</th>
                            <th>Expiry Date</th>
                            <th>ID token</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>{_this.renderConsents()}</tbody>
                    </table>
                </div>
                }

                {_.isEmpty(this.state.data) &&
                <div className="mt-5"><em>Cosent Summary data not available.</em></div>
                }


                <Modal isOpen={_this.state.tokenModalVisible} toggle={this.toggleTokenModal} backdrop="static">
                    <ModalHeader toggle={this.toggleTokenModal}>Consent</ModalHeader>
                    <ModalBody>

                        <ConsentViewer type="text" data={_this.state.consentData}/>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleTokenModal}>Close</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )

    }

}
