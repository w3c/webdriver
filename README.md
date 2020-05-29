WebDriver Standard
==================

WebDriver is a remote control interface that enables introspection
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

* **Living Document**: https://w3c.github.io/webdriver/
* **Level 2** (Working Draft): https://www.w3.org/TR/webdriver2/
* **Level 1** (Recommendation): https://www.w3.org/TR/webdriver1/


Contribute
----------

In short, change `index.html` and submit a pull request
(PR) with a [good commit message].  Changes that affect behaviour
_must_ be accompanied with corresponding test changes to the [Web
Platform Tests] repository.

We use [ReSpec] to help us maintain referential integrity,
bibliographical data, and perform other mundane tasks such as
styling.  To preview your changes, just load `index.html` from disk
in a browser.  To verify the integrity of the document you can run
`make test`.

You may add your name to the [Acknowledgements] section in your
first PR, even for trivial fixes.  The names are sorted lexicographically.

See [CONTRIBUTING.md] for more guidelines.


Vendor status documents
-----------------------

* [Mozilla Firefox](https://bugzilla.mozilla.org/showdependencytree.cgi?id=721859&hide_resolved=1)
* [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver#w3c-webdriver)
* [Apple Safari](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/WebDriverEndpointDoc/Commands/Commands.html)
* [WebKit GTK port](http://trac.webkit.org/wiki/WebDriverStatus)
* [Selenium IEDriverServer](https://github.com/SeleniumHQ/selenium/wiki/W3C-WebDriver-Status)
* [Chrome](https://chromium.googlesource.com/chromium/src/+/master/docs/chromedriver_status.md)


[Browser Testing- and Tools Working Group]: https://www.w3.org/testing/browser/
[good commit message]: https://github.com/erlang/otp/wiki/Writing-good-commit-messages
[Acknowledgements]: https://w3c.github.io/webdriver/#acknowledgements
[Web Platform Tests]: https://github.com/web-platform-tests/wpt/tree/master/webdriver
[ReSpec]: https://github.com/w3c/respec/wiki
[CONTRIBUTING.md]: ./CONTRIBUTING.md
