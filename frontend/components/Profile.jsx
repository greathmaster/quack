import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";

function mSTP(state, ownProps) {
	return {
		userID: [state.session.id],
	};
}

export default connect(mSTP)(
	class Profile extends Component {
		constructor(props) {
			super(props);
			this.handleInput = this.handleInput.bind(this);

			this.state = {
				loading: true,
				username: "",
				photoFile: null,
				photoUrl: null,
				showModal: true,
			};
			this.handleCloseModal = this.handleCloseModal.bind(this);
			this.handleOpenModal = this.handleOpenModal.bind(this);
		}

		handleOpenModal() {
			this.setState({ showModal: true });
		}

		handleCloseModal() {
			this.setState({ showModal: false });
		}

		componentDidMount() {
			$.ajax({
				url: `api/users/${this.props.userID}`,
				method: "GET",
			}).then((user) => {
				this.setState({ loading: false, username: user.username });
			});
		}

		handleInput(e) {
			this.setState({ username: e.target.value });
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
			if (this.state.photoFile) {
				formData.append("user[avatar]", this.state.photoFile);
			}

			$.ajax({
				url: `/api/users/${this.props.userID}`,
				method: "PATCH",
				data: formData,
				contentType: false,
				processData: false,
			}).then(
				(response) => console.log(response.message),
				(response) => {
					console.log("error?");
					console.log(response.responseJSON);
				}
			);
		}

		render() {
			console.log(this.state);
			const preview = this.state.photoUrl ? (
				<img src={this.state.photoUrl} />
			) : null;

			return this.state.loading ? (
				<>Loading</>
			) : (
				<div>
					<button onClick={this.handleOpenModal}>
						Trigger Modal
					</button>
					<ReactModal
						isOpen={this.state.showModal}
						contentLabel="onRequestClose Example"
						onRequestClose={this.handleCloseModal}
						className="Modal"
						overlayClassName="Overlay"
					>
						<div className="modal-content">
							<div className="modal-header">
								<div>Edit your profile</div>
								<div>X</div>
							</div>
							<div className="modal-content-inner">
								<div className="modal-content-inner-columns-outter">
									<div className="modal-content-inner-columns">
										<div className="modal-content-column-primary">
											<div className="modal-first-name-container">
												<div className="modal-label">
													Full name
												</div>
												<input
													type="text"
													className="modal-input"
												/>
											</div>

											<div className="modal-nickname-container">
												<div className="modal-label">
													Nickname
												</div>

												<input
													type="text"
													className="modal-input"
												/>
												<div className="modal-hint">
													This could be your first
													name, or a nickname —
													however you’d like people to
													refer to you in Slack.
												</div>
											</div>

											<div className="modal-first-name-container">
												<div className="modal-label">
													What I do?
												</div>
												<input
													type="text"
													className="modal-input"
												/>
												<div className="modal-hint">
													Let people know what you do
													at App Academy.
												</div>
											</div>
										</div>
										<div className="modal-content-column-secondary">
											<div className="modal-label">
												Profile photo
											</div>
											<img
												src="https://ca.slack-edge.com/T03GU501J-URF2PD015-g864c9c14e8e-192"
												className="modal-image"
											/>
											<button className="modal-upload-button">
												Upload an Image
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button className="modal-upload-button">
									Cancel
								</button>
								<button className="modal-save-button">
									Save Changes
								</button>
							</div>
						</div>
					</ReactModal>
				</div>
			);
		}
	}
);
