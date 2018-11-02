WebDriver Standard
==================

[WebDriver] is a remote control interface that enables introspection
and control of user agents.  It provides a platform- and language-neutral
wire protocol as a way for out-of-process programs to remotely
instruct the behavior of web browsers.

Provided is a set of interfaces to discover and manipulate DOM
elements in web documents and to control the behavior of a user
agent. It is primarily intended to allow web authors to write tests
that automate a user agent from a separate controlling process, but
may also be used in such a way as to allow in-browser scripts to
control a — possibly separate — browser.

The standard is authored by the W3C [Browser Testing- and Tools
Working Group], and has produced the following documents:

  * **Living Standard**: https://w3c.github.io/webdriver/
  * **Candidate Recommendation** version 1: https://www.w3.org/TR/webdriver/

[WebDriver]: https://w3c.github.io/webdriver/
[Browser Testing- and Tools Working Group]: https://www.w3.org/testing/browser/


Contribute
----------

In short, change `index.html` and submit a pull request
(PR) with a [good commit message].  Changes that affect behaviour
_must_ be accompanied with corresponding test changes to the [Web
Platform Tests] repository.

We use [ReSpec] to help us maintain referential integrity,
bibliographical data, and perform other mundane tasks such as
styling.  To preview your changes, just load `index.html`
from disk in a browser.

You may add your name to the [Acknowledgements] section in your
first PR, even for trivial fixes.  The names are sorted lexicographically.

See [CONTRIBUTING.md] for more guidelines.

[good commit message]: https://github.com/erlang/otp/wiki/Writing-good-commit-messages
[Acknowledgements]: https://w3c.github.io/webdriver/#acknowledgements
[Web Platform Tests]: https://github.com/web-platform-tests/wpt/tree/master/webdriver
[ReSpec]: https://github.com/w3c/respec/wiki
[CONTRIBUTING.md]: ./CONTRIBUTING.md