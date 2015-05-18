validate: webdriver-spec.html
	curl -s -F laxtype=yes -F parser=html5 -F level=error -F out=gnu -F doc=@$< https://validator.nu

.PHONY: all clean validate
