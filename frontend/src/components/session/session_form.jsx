import React from "react";
import { Link } from "react-router-dom";
import "./session_form.scss";

// still need to add:
//   - error handling
//   - form submission

class SessionForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: ""
        }
        this.update = this.update.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentWillUnmount - clear form errors

    update(field) {
        return (e) => {
            // console.log(e.currentTarget);
            this.setState({[field]: e.currentTarget.value});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const user = Object.assign({}, this.state);
        if (this.props.formType === "signup") {
            this.props.signup(user).then(() =>
                this.props.history.push("/quiz-sets"));
        } else { // login
            this.props.login(user).then(() =>
                this.props.history.push("/quiz-sets"));
        } // VK: Changed these to redirect to the quiz set index per discord convo
        
        console.log("form submitted!");
    }

    render () {
        let {username, email, password, password2} = this.state;
        const {formType, headerText, buttonText, altLink} = this.props;

        // differentiating login from signup
        const formUsernameInput = (formType === "signup") ? (
            <>
                <div>
                    <input type="text"
                        value={username}
                        className={username ? "" : "empty"}
                        onChange={this.update('username')}></input>
                    <label>Choose username</label>
                </div>
                <br />
            </>
        ) : null;

        const passwordExtra = (formType === "signup") ? (
            <>
                <div>
                    <input type="password"
                        className={password2 ? "" : "empty"}
                        value={password2}
                        onChange={this.update('password2')}></input>
                    <label>Confirm Password</label>
                </div>
                <br />
            </>
        ) : null;

        return (
        <main className="splash-page__main">
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
                        {formUsernameInput}
                        <div>
                            <input type="password"
                                className={password ? "" : "empty"}
                                value={password}
                                onChange={this.update('password')}></input>
                            <label>Password</label>
                        </div>
                        <br />
                        { passwordExtra }
                        <button className={formType === "signup" ? "styled-button orange-bg" : "styled-button red-bg"} 
                            onClick={this.handleSubmit}>{buttonText}</button>
                    </form>
                    
                    <div className="session-form-footer">
                        <Link to="/">Cancel</Link>
                        {altLink}
                    </div>
                </div>
            </div>
        </main>
        )
    }
}

export default SessionForm;