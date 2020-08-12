import os
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

BROWSERSTACK_URL = os.environ.get('BROWSERSTACK_KEY')
print(BROWSERSTACK_URL)

desired_caps = [
{
  'browser': 'Safari',
  'device': 'iPhone 8',
  'realMobile': 'true',
  'os_version': '11',
  'name' : 'iPhone8 screenshot',
  'project': 'screenshot',
  'build': 'IOS'
},
{
  'browser': 'Safari',
  'device': 'iPhone 8 Plus',
  'realMobile': 'true',
  'os_version' : "12", 
  'name' : 'iPhone8-plus screenshot',
  'project': 'screenshot',
  'build': 'IOS'
},
{
  'browser': 'Safari',
  'device': 'iPhone 11 Pro Max',
  'realMobile': 'true',
  'os_version' : '13', 
  'name' : 'iPhone11-pro-max screenshot',
  'project': 'screenshot',
  'build': 'IOS'
},
{
  'browser': 'Chrome',
  'device': 'Samsung Galaxy S20',
  'realMobile': 'true',
  'os_version' : '10.0',
  'name' : 'Samsung-galaxy-S20 screenshot',
  'project': 'screenshot',
  'build': 'Android'
},
]

for testrun in desired_caps: 
	driver = webdriver.Remote(command_executor=BROWSERSTACK_URL, desired_capabilities=testrun)
	driver.get("https://ehs-service.org")
	time.sleep(5) # placeholder, we need to embed some indicator that the website has loaded
	driver.save_screenshot(testrun['device'] + '.png')
	driver.quit()
