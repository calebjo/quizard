import React from "react";
import "./user.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class EditUserForm extends React.Component {

    constructor(props) {
        super(props);
        // const {currentUser} = this.props;
        // this.state = {
        //     email: currentUser.email,
        //     username: currentUser.username,
        //     password: ""
        // };

        //TEMP CODE FOR TESTING PURPOSES:
        this.state = {
            email: "fake@gmail.com",
            username: "test_user",
            password: ""
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.update = this.update.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
        // clear errors
    }

    toggleModal(e) {
        e.preventDefault();
        const modal = document.getElementsByClassName("delete-modal")[0];
        modal.classList.toggle("hidden");
        e.stopPropagation();
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        // update current user and redirect to show page
    }

    handleDelete(e) {
        e.preventDefault();
        // delete user, log out, redirect to splash
    }

    render () {
        const {email, username, password} = this.state;

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

                <div className="edit-flex">
                    <label>Password</label>
                    <input type="password" value={password} onChange={this.update("password")} />
                </div>

                <br/>
                <button className="styled-button red-bg">Save changes</button>
                <br/>
                <button className="styled-button greyed" onClick={this.toggleModal}>Delete account</button>
            </form>

            <div className="delete-modal hidden" onClick={this.toggleModal}>
                <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
                    <div onClick={this.toggleModal} className="close-button">
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </div>

                    <h1>Delete your account</h1>
                    <p>Once you delete your account, you can't get it back!<br/>Are you sure you want to delete your account forever?</p>

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