GREP = grep
CAT = cat
RM = rm -f

all : webdriver-spec.html

webdriver-spec.html : capabilities.html footer.html *_*.html
	$(CAT) *_*.html capabilities.html footer.html > webdriver-spec.tmp
	$(CAT) webdriver-spec.tmp | \
		sed -Ee 's/(<span class="(capability-[a-zA-Z]+).*">.*<\/span>)/<a name="\2"><\/a>\1/g' > $@

caps.fragment : *_*.html
	$(GREP) span *_*.html | \
		grep capability- | \
		sed -Ee 's/.*(capability-[a-zA-Z]+).*">([a-zA-Z]+).*/<li><a href="#\1">\2<\/a><\/li>/g' | \
		sort > $@

capabilities.html : caps.fragment capabilities-*.html
	$(CAT) capabilities-header.html caps.fragment capabilities-footer.html > $@

clean :
	$(RM) capabilities.html
	$(RM) webdriver-spec.tmp
	$(RM) caps.fragment

.PHONY : all clean
