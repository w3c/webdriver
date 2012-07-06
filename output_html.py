"""Generate HTML from a source document and output to stdout.
"""

__author__ = 'simonstewart@google.com (Simon Stewart)'

import selenium.webdriver
import selenium.webdriver.support.wait
import sys

def main(argv):
  driver = selenium.webdriver.Chrome()
  wait = selenium.webdriver.support.wait.WebDriverWait(driver, 30)
  driver.get(argv[1])
  wait.until(lambda d: d.find_element_by_id('references'))
  source = driver.page_source
  driver.quit()
  sys.stdout.write(source.encode('ascii', 'xmlcharrefreplace'))


if __name__ == '__main__':
  main(sys.argv)
