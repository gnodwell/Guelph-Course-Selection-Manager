echo "Starting installations"

cd ../

cd webapp

cd front

npm install jquery

npm install bootstrap

npm install @material-ui/core
npm install @material-ui/icons

npm install react-router-dom

npm install --save-dev @babel/preset-env @babel/preset-react @testing-library/jest-dom @testing-library/react jest

npm ci
npm install
npx install playwright
npm i -D @playwright/test
npx playwright install
npx playwright install-deps


npm install react-d3-tree

npm install -g create-react-app

pip install -U Flask

pip install pytest

pip install uwsgi

## get updates and install nginx
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'		
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt ## OpenSSL self-signed key and certificate pair
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048   ## generate Diffie-Hellman group
sudo ufw app list       ## adjust firewall

npm i -D jest


