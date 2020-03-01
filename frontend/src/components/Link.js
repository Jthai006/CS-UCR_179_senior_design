import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";

class Link extends Component {
    constructor() {
        super();

        this.state = {
            transactions: [],
            temp: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        axios.post("http://localhost:9000/plaid/get_access_token", {
            public_token: public_token
        });
    }

    handleOnExit() {
        // handle the case when your user exits Link
        // For the sake of this tutorial, we're not going to be doing anything here.
    }

    handleClick(res) {

        fetch("http://localhost:9000/plaid/")
            .then(response => response.json())
            .then(res => {
                const t = res.transactions;
                this.setState({ transactions: t });
                this.forceUpdate();
                console.log(t);
            });
        console.log(this.state.transactions);
    }

    render() {
        return (
            <div>
                <PlaidLink
                    clientName="React Plaid Setup"
                    env="development"
                    product={["auth", "transactions"]}
                    publicKey="d393e49d5cd80df0a7d0ac6562875a"
                    onExit={this.handleOnExit}
                    onSuccess={this.handleOnSuccess}
                    className="test"
                >
                    Open Link and connect your bank!
        </PlaidLink>
                <div>
                    <button onClick={this.handleClick}>Get Transactions</button>
                </div>
            </div>
        );
    }
}

export default Link;