import React, { Component } from "react";
import { createNewMessage } from "../actions/messagesActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import { Icon, InlineIcon } from "@iconify/react";
import commandIcon from "@iconify/icons-icomoon-free/command";
import appleKeyboardCommand from "@iconify/icons-mdi/apple-keyboard-command";

import "quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";

var icons = ReactQuill.Quill.import("ui/icons");
icons["submit"] =
	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2l.01 7z"  class="rich-text-submit"/></svg>';

// icons['submit'] = ''<i class="fa fa-bold" aria-hidden="true"></i>'';

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

				this.state = { message: "" }; //bonus pull from local storage if not sent?
				this.handleMessage = this.handleMessage.bind(this);
				this.handleKeyPressed = this.handleKeyPressed.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.submitMessage = this.submitMessage.bind(this);

				// this.onCustomControlClick = this.onCustomControlClick.bind(
				// 	this
				// );
				// this.renderContainer = this.renderContainer.bind(this);

				Quill.register(
					{
						"formats/emoji": quillEmoji.EmojiBlot,
						"modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
						"modules/emoji-textarea": quillEmoji.TextAreaEmoji,
						"modules/emoji-shortname": quillEmoji.ShortNameEmoji,
						"modules/submit": (quill, options) => {
							var container = document.querySelector(
								".ql-submit"
							);
							container.addEventListener("click", (event) => {
								this.handleSubmit(event);
							});
						},
					},
					true
				);

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
							["emoji", "submit"],
						],
					},

					"emoji-toolbar": true,
					"emoji-textarea": false,
					"emoji-shortname": true,
					submit: true,
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

			componentDidMount() {
				console.log("mounted!");
			}

			componentDidUpdate(prevProps) {
				if (this.props.channelId !== prevProps.channelId) {
					document
						.getElementsByClassName("ql-editor ql-blank")[0]
						.setAttribute(
							"data-placeholder",
							`Message #${this.props.channelInfo.name}`
						);
				}
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
									{!!this.props.channelInfo ? (
										<ReactQuill
											theme="snow"
											modules={this.modules}
											formats={this.formats}
											onChange={this.handleMessage}
											value={this.state.message || ""}
											placeholder={`Message #${this.props.channelInfo.name}`}
										/>
									) : null}
									<div className="rich-chat-info-footer-text">
										<span className="rich-chat-info-footer-item-1">
											<InlineIcon
												icon={appleKeyboardCommand}
											/>
											<span className="rich-chat-info-footer-left-space">
												{" "}
												+ Return{" "}
											</span>
											<span className="rich-chat-info-footer-left-space">
												{"to send"}
											</span>
										</span>
										<span className="rich-chat-info-footer-item-2">
											<span
												rich-chat-info-footer-text-bold
											>
												{"Return"}
											</span>
											<span className="rich-chat-info-footer-left-space">
												{"to add a new line"}
											</span>
										</span>
									</div>
								</div>
							</div>
						</form>
					</>
				);
			}
		}
	)
);
