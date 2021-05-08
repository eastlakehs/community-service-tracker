from datetime import datetime
import re

today = datetime.today()

with open("../../LICENSE", "r+") as f:
    old = f.read() # read everything in the file
    f.truncate(0)
    f.seek(0)
    f.write(re.sub(r"([1-3][0-9]{3})", str(today.year), old))

print("Completed!")
