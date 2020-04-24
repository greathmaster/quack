import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions/ui_actions";
import { InlineIcon } from "@iconify/react";
import outlineClose from "@iconify/icons-ic/outline-close";
import userImage from "../../app/assets/images/user.jpg";
import {updateCurrentUser} from "../actions/session_actions"

function mSTP(state, ownProps) {
	return {
		currentUser: state.entities.users[state.session.id],
	};
}

function mDTP(dispatch) {
	return {
		updateCurrentUser: (userInfo) => dispatch(updateCurrentUser(userInfo)),
		closeModal: () => dispatch(closeModal()),
	};
}

export default connect(
	mSTP,
	mDTP
)(
	class Profile extends Component {
		constructor(props) {
			super(props);
			this.handleInput = this.handleInput.bind(this);

			this.state = {
				loading: true,
				username: "",
				nickname: "",
				profession: "",
				photoFile: "",
				photoUrl: "",
			};
			this.handleSubmit = this.handleSubmit.bind(this);
		}

		componentDidMount() {
			this.setState({
				loading: false,
				username: this.props.currentUser.username,
				nickname: this.props.currentUser.nickname
					? this.props.currentUser.nickname
					: this.props.currentUser.username,
				profession: this.props.currentUser.profession,
				photoUrl: this.props.currentUser.avatar,
			})
		}

		handleInput(field) {
			return (e) => this.setState({ [field]: e.target.value });
		}

		handleFile(e) {
			const file = e.currentTarget.files[0];
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
				this.setState({ photoFile: file, photoUrl: fileReader.result });
			};
			if (file) {
				fileReader.readAsDataURL(file);
			}
		}

		handleSubmit(e) {
			e.preventDefault();
			const formData = new FormData();
			formData.append("user[username]", this.state.username);
			formData.append("user[nickname]", this.state.nickname);
			formData.append("user[profession]", this.state.profession);

			if (this.state.photoFile) {
				formData.append("user[avatar]", this.state.photoFile);
			}

			$.ajax({
				url: `/api/users/${this.props.currentUser.id}`,
				method: "PATCH",
				data: formData,
				contentType: false,
				processData: false,
			}).then(
				(response) => {
					// debugger
						this.props.closeModal()
						this.props.updateCurrentUser(response)
				},
				(response) => {
					console.log("error?");
					console.log(response);
				}
			);
		}

		render() {
			const preview = (
				<img
					className="modal-image"
					src={this.state.photoUrl ? this.state.photoUrl : userImage}
				/>
			);

			return this.state.loading ? (
				<>Loading</>
			) : (
				<>
					<form onSubmit={this.handleSubmit}  className="modal-content">
						<div className="modal-header">
							<div>Edit your profile</div>
							<div
								className="info-bar-header-close-button"
								onClick={this.props.closeModal}
							>
								<InlineIcon icon={outlineClose} />
							</div>
						</div>
						<div className="modal-content-inner">
							<div className="modal-content-inner-columns-outter">
								<div className="modal-content-inner-columns">
									<div className="modal-content-column-primary">
										<div className="modal-first-name-container">
											<div
												style={{ color: "lightgrey" }}
												className="modal-label"
											>
												Username
											</div>
											<input
												style={{ color: "lightgrey" }}
												disabled={true}
												type="text"
												className="modal-input"
												value={this.state.username}
												// onChange={this.handleInput(
												// 	"username"
												// )}
											/>
										</div>

										<div className="modal-nickname-container">
											<div className="modal-label">
												Nickname
											</div>

											<input
												type="text"
												className="modal-input"
												value={this.state.nickname}
												onChange={this.handleInput(
													"nickname"
												)}
											/>
											<div className="modal-hint">
												This could be your first name,
												or a nickname — however you’d
												like people to refer to you in
												Quack!
											</div>
										</div>

										<div className="modal-first-name-container">
											<div className="modal-label">
												What I do?
											</div>
											<input
												type="text"
												className="modal-input"
												value={this.state.profession}
												onChange={this.handleInput(
													"profession"
												)}
											/>
											<div className="modal-hint">
												Let people know what you do at
												Quack! Academy.
											</div>
										</div>
									</div>
									<div className="modal-content-column-secondary">
										<div className="modal-label">
											Profile photo
										</div>

										{preview}

										<label
											htmlFor="file-upload"
											className="modal-upload-button"
										>
											{"Upload Image"}
										</label>

										<input
											id="file-upload"
											key={this.state.photoUrl}
											type="file"
											onChange={(event) =>
												this.handleFile(event)
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={this.props.closeModal}
								className="modal-upload-button"
							>
								Cancel
							</button>
							<button className="modal-save-button">
								Save Changes
							</button>
						</div>
					</form>
				</>
			);
		}
	}
);
