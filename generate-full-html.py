#!/usr/bin/env python

import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from time import sleep
from selenium import webdriver

d = webdriver.Chrome()
d.get(sys.argv[1])
sleep(5)
print u'%s' % d.page_source
d.quit()
