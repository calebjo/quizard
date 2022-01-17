import React from "react";
import { Link } from "react-router-dom";
import "./session_form.scss";

// still need to add:
//   - error handling
//   - form submission
//   - window resizing
//   - background of wizard hats?

class SessionForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            handle: "",
            email: "",
            password: ""
        }
    }

    // componentWillUnmount - clear form errors

    update(field) {
        return (e) => {
            console.log(e.currentTarget);
            this.setState({[field]: e.currentTarget.value});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted!");
    }

    render () {
        let {handle, email, password} = this.state;
        const {formType, headerText, buttonText, altLink} = this.props;

        // differentiating login from signup
        const formHandleInput = (formType === "signup") ? (
            <>
                <div>
                    <input type="text"
                        value={handle}
                        className={handle ? "" : "empty"}
                        onChange={this.update('handle')}></input>
                    <label>Choose handle</label>
                </div>
                <br />
            </>
        ) : null;

        return (
            <div className="session-form-background">
                <div className="session-form-content">
                    <h1 className={formType === "signup" ? "orange" : "red"}>{headerText}</h1>
                    <form className="session-form">
                        <div>
                            <input type="text"
                                className={email ? "" : "empty"}
                                value={email}
                                onChange={this.update('email')}></input>
                            <label>E-mail</label>
                        </div>
                        <br />
                        {formHandleInput}
                        <div>
                            <input type="password"
                                className={password ? "" : "empty"}
                                value={password}
                                onChange={this.update('password')}></input>
                            <label>Password</label>
                        </div>
                        <br />

                        <button className={formType === "signup" ? "styled-button orange-bg" : "styled-button red-bg"} 
                            onClick={this.handleSubmit}>{buttonText}</button>
                    </form>
                    
                    <div className="session-form-footer">
                        <Link to="/">Cancel</Link>
                        {altLink}
                    </div>
                </div>
            </div>
        )
    }
}

export default SessionForm;