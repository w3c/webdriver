all: webdriver-spec.html

webdriver-spec.html: Makefile *_*.html capabilities-*.html
	grep span *_*.html | \
		grep capability- | \
		sed -Ee 's/.*(capability-[a-zA-Z]+).*">([a-zA-Z]+).*/<li><a href="#\1">\2<\/a><\/li>/g' |\
		sort > caps.fragment
	cat capabilities-header.html caps.fragment capabilities-footer.html > 85_capabailities.html
	cat *_*.html > webdriver-spec.tmp
	cat webdriver-spec.tmp | \
		sed -Ee 's/(<span class="(capability-[a-zA-Z]+).*">.*<\/span>)/<a name="\2"><\/a>\1/g' > webdriver-spec.html
		rm webdriver-spec.tmp
