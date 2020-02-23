# Copy essential files to a named directory
# that will allow a basic demonstration form
# to be rendered.   Needed this because 
# the extent of demonstrations in this repo
# can make the system seem larger than needed
# I also wanted the ability to safely update a 
# repo with only the mforms contents without chaning
# user local forms.
#
# Operation:   
#  To create a new diretory with minimum content needed 
#  to run the forms system and start building your own 
#  server run this script naming the directory where you 
#  want to target.   EG: If updating ../test1
#
#  bash update-other-repo.sh ../test1
#
# If you want to publish for gitpages then runn
# update-gitpages.sh
#
# Re-run whenever you want to update your local copy
# of the mforms libraries.  You would normally do a 
# git clone or git pull to update your local copy of
# of mforms first. 
#
# WIP UNDER CONSTRUCTION
set -x
echo p0=$0
echo p1=$1
echo p2=$2

if [ -z "$1" ]
  then
    echo "Parameter 1 must be target directory"
    exit
fi

mkdir -p $1
mkdir $1/data
mkdir $1/docs
mkdir -p $1/http-docs/demo
rm -Rf $1/http-docs/mforms
rm -Rf $1/docs/mforms


cp -R http-docs/mforms $1/http-docs
cp -n docs/favicon.ico $1/docs || true
cp -n .dockerignore $1
cp -R data/states.txt $1/data/states.txt
cp -n update-gitpages.sh $1
cp  Dockerfile $1
cp -R .gitignore $1
cp -R httpServer $1
cp -R http-docs/demo/examples $1/http-docs/demo
chmod 777 *.sh


# After running this script 
# Change directory to the target diretory /http-server
# run the httpserver executable.  On windows this is 
# httpserver.exe   open browser on 127.0.0.1:9831 or 
# the ip address of host server.    Navigate to examples/simple-form.html.
#  Example: http://127.0.0.1:9831/demo/examples/simple-form.html  
#  If everything works then you should see the sample form. 
