GREP = grep
CAT = cat
RM = rm -f

UNAME = $(shell uname -s)
ifeq ($(UNAME),Linux)
SYSTEM_BROWSER := xdg-open
else
SYSTEM_BROWSER := open
endif
ROOT := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

BROWSER := firefox

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
	$(RM) WebDriver.html
	$(RM) vnu.jar

WebDriver.html : webdriver-spec.html
	./dump-source $(BROWSER) "file:/$(ROOT)/webdriver-spec.html" > $@

vnu.jar :
	curl -o $@ "https://bitbucket.org/sideshowbarker/vnu/raw/2759dcb15031a8931e99c46c7b7c3aacb7e155cb/vnu.jar"

validate : vnu.jar WebDriver.html
	java -Dnu.validator.client.quiet=yes  -jar vnu.jar WebDriver.html
	checklink -q -i -b WebDriver.html

open :
	$(SYSTEM_BROWSER) "file://$(ROOT)/webdriver-spec.html"

.PHONY : all clean validate open
