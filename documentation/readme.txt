This direcotry in it's editable form id at repository base
/ documentation.    It is copied by update-gitpages.sh
into the docs directory.    

This change was made 2020-02-10 to avoid 
triggering a republishing of the gitpages site 
unless we explicitly trigger it.   Priorto that 
time it was located inside of docs directly but
was triggering a republish of gitpages everytime
the actions file was edited. when we modified 
the parsers to produce thousands of files to 
drive auto suggest it became important not to 
trigger the builds until we actually wanted 
to push code changes.
