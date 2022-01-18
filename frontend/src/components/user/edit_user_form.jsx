import React from "react";
import "./user.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class EditUserForm extends React.Component {

    constructor(props) {
        super(props);
        const {currentUser} = this.props;
        this.state = {
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            password: "",
            password2: "",
            oldpassword: ""
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.revealPasswordChange = this.revealPasswordChange.bind(this);
        this.update = this.update.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
        this.props.clearUserErrors();
    }

    toggleModal(e) {
        e.preventDefault();
        const modal = document.getElementsByClassName("delete-modal")[0];
        modal.classList.toggle("hidden");
        e.stopPropagation();
    }

    revealPasswordChange (e) {
        e.preventDefault();

        const showButton = document.getElementById("show-password-change");
        showButton.classList.toggle("rotate-down");

        const passwordChange = document.getElementById("password-change");
        passwordChange.classList.toggle("hidden");
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.updateUser(this.state)
            .then(() => this.props.history.push(`/users/${this.props.currentUser.id}`))
            .catch(() => {return;});
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteUser(this.props.currentUser.id);
    }

    render () {
        if (!this.props.currentUser) return null;

        const {email, username, password, password2, oldpassword} = this.state;
        const {errors} = this.props;
        const iconLetter = username ? username[0].toUpperCase() : "?";

        return (
        <main className="user-show">
            <div className="back-arrow" onClick={() => this.props.history.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size="3x" />
            </div>

            <form className="edit-user-form">
                <h1>Update your information</h1>

                {/* user icon (will need to be updated to show photo instead if we add profile pics) */}
                <svg height="125" width="125">
                    <circle cx="50%" cy="50%" r="60" fill="#ffbc42" />
                    <text x="50%" y="63%" textAnchor="middle" fill="white" fontSize="50px" 
                        fontWeight="800" fontFamily="Podkova">{iconLetter}</text>
                </svg>

                <div className="edit-flex">
                    <label>Username</label>
                    <input type="text" value={username} onChange={this.update("username")} />
                </div>

                <div className="edit-flex">
                    <label>E-mail</label>
                    <input type="text" value={email} onChange={this.update("email")} />
                </div>

                {/* Update password fields- hidden until toggled */}
                <div className="edit-flex" onClick={this.revealPasswordChange}>
                    <h4 className="">Update password</h4>
                    <div id="show-password-change">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
                <div id="password-change" className="hidden">
                    <div className="edit-flex">
                        <label>Enter old password:</label>
                        <input type="password" value={oldpassword} onChange={this.update("oldpassword")} />
                    </div>
                    <div className="edit-flex">
                        <label>Enter new password:</label>
                        <input type="password" value={password} onChange={this.update("password")} />
                    </div>
                    <div className="edit-flex">
                        <label>Confirm new password:</label>
                        <input type="password2" value={password2} onChange={this.update("password2")} />
                    </div>
                </div>

                <br/>
                <button className="styled-button red-bg" onClick={this.handleUpdate}>Save changes</button>
                <br/>
                <button className="styled-button greyed" onClick={this.toggleModal}>Delete account</button>
            </form>

            <div className="delete-modal hidden" onClick={this.toggleModal}>
                <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
                    <div onClick={this.toggleModal} className="close-button">
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </div>

                    <h1>Delete your account</h1>
                    <p><span className="red">Once you delete your account, you can't get it back!</span>
                        <br/>Are you sure you want to delete your account forever?</p>

                    <div className="delete-buttons">
                        <button className="styled-button red-bg" 
                            onClick={this.handleDelete}>Delete</button>
                        <button className="styled-button orange-bg" 
                            onClick={this.toggleModal}>Never mind</button>
                    </div>
                </div>
            </div>
        </main>
        );
    }
}

export default EditUserForm;