.PHONY: check
check: webdriver-spec.html
	curl -s \
		-F laxtype=yes \
		-F parser=html5 \
		-F level=error \
		-F out=gnu \
		-F doc=@$< \
		https://validator.nu \
	| sed -e 's/"//g' \
	| python -c "exit(len(raw_input()) > 0)"
