# CDT codes at cut and pasted from https://ca.healthnetadvantage.com/content/dam/centene/healthnet/pdfs/medicare/2019/CA/2019-CA-HNTCD-MA-MAPD-DSNP.pdf 
# did not meet formatting requires.  Wanted to convert to easily parsed TSV.
import re
f = open('cdt-src.txt', "r")
# use readlines to read all lines in the file
# The variable "lines" is a list containing all lines in the file
header = f.readline().strip();
lines = f.readlines()
# close the file after reading the lines.
f.close()
fout=open("cdt-codes.tsv", "w")

# Ordering is important keep most complex phrases
# first especially if they include word from less
# complex phrase.
mapcats = ["Adjunctive ", 
  
  "Oral Surgery ", 
  "Prosthodontics, fixed ",
  "Prosthodontic, removable",
  "Prosthodontics, removable",
  "removable Comprehensive ",
  "Orthodontics ", 
  "Periodontics ", 
  "Endodontics ", 
  "Restorative ", 
  "Diagnostic ",
  "Preventive ",
  ]

# Ordering is important keep most complex phrases
# first especially if they include word from less
# complex phrase.
hpmscat = ["Preventive - Oral Exam", 
   "Comprehensive - Diagnostic",
   "Preventive - Oral Exam",
   "Preventive - X-rays", 
   "Preventive - Prophylaxis (cleanings)",
   "Preventive - Fluoride Treatment", 
   "Comprehensive - Non-Routine",
   "Comprehensive - Restorative", 
   "Comprehensive - Endodontics ", 
   "Comprehensive - Periodontics",
   "Comprehensive - Prosthodontics", 
   "Comprehensive - Non-Routine",
   "Comprehensive - Endodontics", 
   "Comprehensive - Periodontics",    
   "Preventive - Prophylaxis (cleanings)",
   "Preventive - Prophylaxis (cleanings)"
   
  
  ] 
fout.write(header + "\n")
for line in lines:
  line = line.strip()
  code = line[:5]
  rest = line[6:]

  if line.startswith("CDT Code") or len(line) < 10:
    continue;

  restOrig = rest
  for cat in hpmscat:
    #use RE so we can match only at end of string
    pat = re.sub("\W",".",cat) + "$"  
    #print ("cat=", cat, "pat=", pat, "rest=", rest)      
    rest = re.sub(pat, "\t" + cat, rest)
    if rest != restOrig:
      break

  restOrig = rest
  for mcat in mapcats:
    rest = rest.replace(mcat, "\t" + mcat, 1)
    if rest != restOrig:
      break

  print ("code=", code, " rest=", rest)
  rest = rest.replace("\t\t\t", "\t")
  rest = rest.replace("\t\t", "\t")
  fout.write(code + "\t" + rest + "\n")


fout.close()
