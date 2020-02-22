# Copy Content from the main place they live 
# in this repository to appropriate locations 
# in the docs directory which is the source that 
# github pages uses to publish from.    Note I
# did it this way to facilitate the more sophisticated
# demonstration using a custom server while also supporting
# a basic Demo using the static html pages from the same
# code artifacts.
mkdir data
rm -Rf docs/data/forms
rm -Rf docs/js
rm -Rf docs/css
cp -r http-docs/* docs
cp -r data docs
rm -Rf docs/data/raw-download
