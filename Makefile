SRC = \
	*_*.html \
	capabilities.html \
	command.html \
	threadsafety.html \
	security.html \
	mapping.html \
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

jsoncommand.fragment: *_*.html
	grep "td" *_*.html | \
		grep "/session" | \
		sed -Ee "s/(.*<td id='((post|get|delete)-.*)'>(\/session.*)<\/td>)/<li><a href=\"#\2\">\3 - \4<\/a><\/li>/g" > $@

mapping.html: jsoncommand.fragment
	cat appendix-mapping-header.html jsoncommand.fragment appendix-mapping-footer.html > $@

command.html:
	cat appendix-commandformat-header.html appendix-commandformat-footer.html > $@

capabilities.html: caps.fragment capabilities-*.html
	cat capabilities-header.html caps.fragment capabilities-footer.html > $@

clean:
	rm -f capabilities.html
	rm -f command.html
	rm -f mapping.html
	rm -f webdriver-spec.tmp
	rm -f caps.fragment
	rm -f jsoncommand.fragment

validate: webdriver-spec.html
	curl -s -F laxtype=yes -F parser=html5 -F level=error -F out=gnu -F doc=@$< https://validator.nu

.PHONY: all clean validate
