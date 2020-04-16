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
				showModal: false,
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
						<p>Modal text!</p>
						<button onClick={this.handleCloseModal}>
							Close Modal
						</button>
					</ReactModal>
				</div>
			);
		}
	}
);
