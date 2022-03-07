echo "Starting installations"

cd webapp

cd front

npm install jquery

npm install bootstrap

npm install @material-ui/core

npm install -g create-react-app

pip install -U Flask

## get updates and install nginx
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'		
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt ## OpenSSL self-signed key and certificate pair
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048   ## generate Diffie-Hellman group
sudo ufw app list       ## adjust firewall



