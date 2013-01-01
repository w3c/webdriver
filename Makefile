GREP = grep
CAT = cat
RM = rm -f

all : webdriver-spec.html

webdriver-spec.html : 85_capabilities.html
	$(CAT) *_*.html > webdriver-spec.tmp
	$(CAT) webdriver-spec.tmp | \
		sed -Ee 's/(<span class="(capability-[a-zA-Z]+).*">.*<\/span>)/<a name="\2"><\/a>\1/g' > $@

caps.fragment :
	$(GREP) span *_*.html | \
		grep capability- | \
		sed -Ee 's/.*(capability-[a-zA-Z]+).*">([a-zA-Z]+).*/<li><a href="#\1">\2<\/a><\/li>/g' | \
		sort > $@

85_capabilities.html : caps.fragment capabilities-*.html
	$(CAT) capabilities-header.html caps.fragment capabilities-footer.html > $@

clean :
	$(RM) 85_capabilities.html
	$(RM) webdriver-spec.tmp
	$(RM) caps.fragment

.PHONY : all clean
