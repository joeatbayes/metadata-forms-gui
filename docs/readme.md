Please See the repository [Readme](../README.md) and the [programmers guide](documentation/programmers-guide.md).

This directory by convention enforced by github.com is used as the source for the gitpages site published at:  [https://joeatbayes.github.io/metadata-forms-gui/](https://joeatbayes.github.io/metadata-forms-gui/)  

Every time we do a commit that changes files in this directory they are automatically refreshed onto the gitpages site.      Think of this as a publish and release step.   We edit the files in their main location and use the script [update-gitpages.sh](../update-gitpages.sh) to copy data, JavaScript and CSS from their main locations into this directory. This provides a simple way to host the demonstrable forms from the free gitpages server.      Most of the content is copied from [../data](../data) [../http-docs](../http-docs).

As an exception, The files in the [documentation](documentation) directory are OK to edit in this directory.  This was an explicit choice to avoid the need copy these rather large files during the release step. 

As a note the local [http-server](../http-server) references their files at their main location which allows local testing and commit without affecting what is published to the gitpages site only when the [update-gitpages.sh](../update-gitpages.sh) is executed.