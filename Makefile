SRC = \
	*_*.html \
	capabilities.html \
	command.html \
	threadsafety.html \
	security.html \
	footer.html

all: webdriver-spec.html

webdriver-spec.html: $(SRC)
	cat $^ > webdriver-spec.tmp
	cat webdriver-spec.tmp | \
		sed -Ee 's/(<span class="(capability-[a-zA-Z]+).*">.*<\/span>)/<a name="\2"><\/a>\1/g' > $@

caps.fragment: *_*.html
	grep span *_*.html | \
		grep capability- | \
		sed -Ee 's/.*(capability-[a-zA-Z]+).*">([a-zA-Z]+).*/<li><a href="#\1">\2<\/a><\/li>/g' | \
		sort > $@

command.html:
	cat appendix-commandformat-header.html appendix-commandformat-footer.html > $@

capabilities.html: caps.fragment capabilities-*.html
	cat capabilities-header.html caps.fragment capabilities-footer.html > $@

clean:
	rm -f capabilities.html
	rm -f command.html
	rm -f webdriver-spec.tmp
	rm -f caps.fragment
	rm -f jsoncommand.fragment

validate: webdriver-spec.html
	curl -s -F laxtype=yes -F parser=html5 -F level=error -F out=gnu -F doc=@$< https://validator.nu

.PHONY: all clean validate
