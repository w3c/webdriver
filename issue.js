// issue.js provides a widget that will appear in HTML documents when
// text is selected that allows extraction of prose to form quotations of
// new GitHub issues.
//
// The widget will appear when the user selects text in the document.
// When clicking the button that appears, the selected text is quoted,
// along with references to the chapter and section from whence the quote
// came, in the new GitHub issue that is created.
//
// Configure by setting the GitHub project URL and any optional parameter
// fields in the new issue form you want populated:
//
// 	<html
// 	 data-issue-url="https://github.com/w3c/webdriver"
// 	 data-issue-param-milestone="Level 1">
//
// Inspired by the “Simple Bug File Assistant” for the W3C Bugzilla
// bug tracker.
//
// © 2016 Andreas Tolfsen <ato@mozilla.com>
// Licensed under the MIT license.

document.addEventListener("DOMContentLoaded", function() {
	"use strict";

	const ISSUE_PARAM_PREFIX = "data-issue-param-";
	const BASE_BUTTON_STYLE = `
		color: #fff;
		cursor: pointer;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
		background-color: #60b044;
		background-image: linear-gradient(#8add6d, #60b044);
		border: 1px solid #d5d5d5;
		whitespace: nowrap;
		border-radius: 3px;
		line-height: 20px;
		font-weight: 600;
		font-size: 12px;
		padding: 6px 12px;
		border-color: #5ca941;
	`;

	let baseUrl = document.documentElement.attributes["data-issue-url"].value;
	let newIssueUrl = baseUrl + (baseUrl.endsWith("/") ? "issues/new" : "/issues/new");

	let inputs = {body: ""};
	[].forEach.call(document.documentElement.attributes, attr => {
		if (attr.name.startsWith(ISSUE_PARAM_PREFIX))
			inputs[attr.name.substr(ISSUE_PARAM_PREFIX.length)] = attr.value;
	});

	function formatSelection(sel) {
		let quoteText = text => text.split("\n").map(el => "> " + el).join("\n");

		// TODO(ato): Make this just construct a tree of h2/h3
		let findSection = (el, localName) => {
			let sectionEl = el.closest("section");
			if (!sectionEl)
				return null;
			let heading = sectionEl.querySelector(":scope > " + localName);
			if (!heading)
				return findSection(sectionEl.parentNode, localName);

			let relUrl = location.href + "#" + encodeURIComponent(heading.id);

			return {
				url: relUrl,
				text: heading.textContent,
			};
		};

		let parent = sel.anchorNode.parentElement;

		let chapter = findSection(parent, "h2");
		let subchapter = findSection(parent, "h3");
		let desc = quoteText(sel.toString());

		let rv = "";
		if (chapter)
			rv = `In chapter [${chapter.text}](${chapter.url})`;
		if (subchapter)
			rv += `, section [${subchapter.text}](${subchapter.url})`;
		if (chapter || subchapter)
			rv += ":\n";
		return rv + desc;
	}

	function getAbsolutePosition(node) {
		let bodyRect = document.body.getBoundingClientRect();
		let nodeRect = node.getBoundingClientRect();
		return {
			top: nodeRect.top - bodyRect.top,
			left: nodeRect.left - bodyRect.left,
		};
	}

	let widget = new class {
		constructor(rootEl) {
			this.parent = rootEl;
			this.el = null;
			this.shown = false;
		}

		show() {
			if (!this.el) {
				let form = this.parent.appendChild(document.createElement("form"));
				form.action = newIssueUrl;
				form.target = "_blank";

				let submit = form.appendChild(document.createElement("input"));
				submit.type = "submit";
				submit.accessKey = "f";
				submit.value = "File an issue";
				submit.style.cssText = BASE_BUTTON_STYLE;

				Object.keys(inputs).forEach(name => {
					let input = form.appendChild(document.createElement("input"));
					input.type = "hidden";
					input.name = name;
					input.value = inputs[name];
					inputs[name] = input;
				});

				form.addEventListener("submit", this.click);

				this.submitEl = submit;
				this.el = form;
				this.el.style.visibility = "visible";
			}

			this.el.style.visibility = "visible";
			this.shown = true;
			this.paint();
		}

		paint() {
			if (!this.shown)
				return;

			let pos = getAbsolutePosition(window.getSelection().getRangeAt(0));

			this.el.style.position = "absolute";
			this.el.style.top = (pos.top - 40) + "px";
			this.el.style.left = (pos.left + 45) + "px";
		}

		hide() {
			if (!this.shown)
				return;
			this.el.style.visibility = "hidden";
			this.shown = false;
		}

		click() {
			let sel = window.getSelection();
			if (sel.toString().length > 0)
				inputs.body.value = formatSelection(sel);
		}
	}(document.documentElement);

	document.addEventListener("selectionchange", () => {
		if (window.getSelection().toString().length == 0)
			widget.hide();
		else
			widget.show();
	}, false);

	document.addEventListener("scroll", widget.paint, false);
}, false);
