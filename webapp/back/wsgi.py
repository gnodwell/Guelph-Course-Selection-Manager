from api import app

if __name__ == "__main__":
    context = ('/etc/ssl/certs/nginx-selfsigned.crt','/etc/ssl/private/nginx-selfsigned.key')
    app.run(host='131.104.49.104', debug=True, ssl_context=context)
