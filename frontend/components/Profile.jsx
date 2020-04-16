import React, { Component } from "react";
import { connect } from "react-redux";
// import "regenerator-runtime/runtime";
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
			};
		}

		componentDidMount() {
			$.ajax({
				url: `api/users/${this.props.userID}`,
				method: "GET",
			}).then(user => {
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
				response => console.log(response.message),
				response => {
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
				<>
					{/* <div> */}
					{/* <form onSubmit={this.handleSubmit.bind(this)}>
						<label>
							Username
						
								<input
							type="text"
							onChange={this.handleInput.bind(this)}
							value={this.state.username}
							placeholder={"Username"}
							className="signinup"
						/>
							<input
								type="file"
								onChange={this.handleFile.bind(this)}
							/>
						</label>
						{preview}
						<button>Update</button>
					</form> */}
					{/* </div> */}

					<div className="">
						<div className="profileUpperContainer">
							<form onSubmit={this.onSubmit}>
								<div>
									<div className="imagePreviewContainer">
										<div className="profileFileUpload">
											<div className="imagePreview">
												{preview}
											</div>
											<input
												type="file"
												onChange={this.handleFile.bind(
													this
												)}
											/>
										</div>
										<input
											type="text"
											onChange={this.handleUsername}
											value={this.state.username}
											placeholder={"Username"}
											className="signinup"
										/>

										<button
											className="buttonLogin"
											onSubmit={this.onSubmit}
										>
											{"Update"}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</>
			);
		}
	}
);
