import React, { Component } from "react";
import { createNewMessage } from "../actions/messagesActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

// Quill.register(
// 	{
// 		"formats/emoji": quillEmoji.EmojiBlot,
// 		"modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
// 		"modules/emoji-textarea": quillEmoji.TextAreaEmoji,
// 		"modules/emoji-shortname": quillEmoji.ShortNameEmoji,
// 		"modules/counter": function (quill, options) {
// 			var container = document.querySelector(".ql-counter");
// 			container.addEventListener("click", function () {

// 			});
// 		},
// 	},
// 	true
// );

function mapStateToProps(state, ownProps) {
	return {
		currentUser: state.entities.users[state.session.id],
		channelId: ownProps.match.params.id,
		channelInfo: state.entities.channels[ownProps.match.params.id],
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createNewMessage: (message) => dispatch(createNewMessage(message)),
	};
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(
		class RichChatbar extends Component {
			constructor(props) {
				super(props);

				Quill.register(
					{
						"formats/emoji": quillEmoji.EmojiBlot,
						"modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
						"modules/emoji-textarea": quillEmoji.TextAreaEmoji,
						"modules/emoji-shortname": quillEmoji.ShortNameEmoji,
						"modules/counter": (quill, options) => {
							var container = document.querySelector(
								".ql-counter"
							);
							container.addEventListener("click", function () {
								console.log("Test agin!");
							});
						},
					},
					true
				);

				this.state = { message: "" }; //bonus pull from local storage if not sent?
				this.handleMessage = this.handleMessage.bind(this);
				this.handleKeyPressed = this.handleKeyPressed.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.submitMessage = this.submitMessage.bind(this);

				this.onCustomControlClick = this.onCustomControlClick.bind(
					this
				);
				this.renderContainer = this.renderContainer.bind(this);
				this.modules = {
					toolbar: {
						container: [
							[
								"bold",
								"italic",
								"underline",
								{ list: "ordered" },
								{ list: "bullet" },
							],
							["emoji", "counter"],
						],
					},

					"emoji-toolbar": true,
					"emoji-textarea": false,
					"emoji-shortname": true,
					counter: true,
				};

				this.formats = [
					"bold",
					"italic",
					"underline",
					"list",
					"bullet",
					"emoji",
				];
			}

			onCustomControlClick() {
				console.log("Here");
			}

			renderContainer() {
				return (
					<button className="custom-control" value="customControl" />
				);
			}

			handleMessage(content, delta, source, editor) {
				return this.setState({ message: editor.getHTML() });
			}

			handleKeyPressed(e) {
				// if (
				// 	e.key === "Enter" &&
				// 	this.state.message.trim().length !== 0
				// ) {
				e.preventDefault();
				this.submitMessage();
				// }
			}

			handleSubmit(e) {
				e.preventDefault();
				this.submitMessage();
			}

			submitMessage() {
				let now = new Date();

				const audioEl = document.getElementsByClassName(
					"audio-element"
				)[0];
				audioEl.play();

				let message = {
					content: this.state.message,
					sender_id: this.props.currentUser.id,
					channel_id: this.props.channelId,
				};
				this.setState({ message: "" });
				this.props.createNewMessage(message);
			}

			render() {
				return (
					<>
						<audio className="audio-element">
							<source src="https://www.myinstants.com/media/sounds/quack.mp3"></source>
						</audio>
						<form onSubmit={this.handleSubmit}>
							<div className="rich-chat-area-container">
								<div>
									<ReactQuill
										theme="snow"
										modules={this.modules}
										formats={this.formats}
										onChange={this.handleMessage}
										value={this.state.message || ""}
										placeholder={
											!!this.props.channelInfo
												? `Message # ${this.props.channelInfo.name}`
												: ""
										}
									/>
								</div>
								<div>
									<input type="submit" value="submit" />
								</div>
							</div>
						</form>
					</>
				);
			}
		}
	)
);
