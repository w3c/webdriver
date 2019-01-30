.DEFAULT_GOAL = test
.PHONY: test validate respec

VALIDATOR ?= https://validator.w3.org/nu/
VALIDATOR_OPTS ?= -F laxtype=yes -F parser=html5 -F level=error

curl = curl -sSLf
respec = respec2html --disable-sandbox -ew

out := $(shell mktemp)

test: validate

validate: index.html
	@$(curl) $(VALIDATOR_OPTS) -F out=gnu -F doc=@$< $(VALIDATOR) | sed -e 's/^"$<"/$</g' >$(out)
	@cat $(out)
	@trap 'rm -rf $(out)' EXIT
	@test -z "$(shell cat $(out))"

respec: index.html
	@$(respec) -s $< -o /dev/null
