from datetime import datetime
import re

# get today's date
today = datetime.today()

with open("../../LICENSE", "r+") as f:
    # read everything in the file and store
    old = f.read() 
    # delete
    f.truncate(0)
    # go to start
    f.seek(0)
    # rewrite by subbing in any year related numbers with today's year
    f.write(re.sub(r"([1-3][0-9]{3})", str(today.year), old))

print("Completed!")
