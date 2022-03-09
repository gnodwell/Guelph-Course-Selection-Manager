
set -e
set -u
set -o pipefail
umask 0077


OS=`uname -a`

if [[ "$OS" == *"Linux"* ]]
then
    echo "Setting up Linux Enviroment"
    cd ..
    cd cli
    cd scraper
    npm install
    cd ..
    cd ..
    cd webapp
    cd front
    npm install
    # in case npm install does not work?
    # node --max-old-space-size=1000 $(which npm) install


elif [[ "$OS" == *"Darwin"* ]]
then
    echo "Setting up Darwin Enviroment"
    cd ..
    cd cli
    cd scraper
    npm install
    cd ..
    cd ..
    cd webapp
    cd front
    npm install


fi







