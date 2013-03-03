#coding: utf-8
from flask import Flask
from look_later import look_later

app = Flask(__name__)
app.register_blueprint(look_later)

#default configs
app.config['DB_PATH'] = 'db/look_later.db'
app.config['PUSH_PASSWORD'] = 'push'
app.config['POP_PASSWORD'] = 'pop'

if __name__ == "__main__":
    #run should be very simple without any addition actions
    app.run(port=8080, debug=True)