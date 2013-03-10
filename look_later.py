import sqlite3
from flask import Blueprint, render_template, current_app, jsonify, request, g
from tools import simple_url_checker

look_later = Blueprint('uploader', __name__, template_folder='templates')


def connect_db():
    """Returns a new connection to the database."""
    return sqlite3.connect(current_app.config['DB_PATH'], detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)


@look_later.before_request
def before_request():
    """Make sure we are connected to the database each request."""
    g.db = connect_db()


@look_later.after_request
def after_request(response):
    """Closes the database again at the end of the request."""
    g.db.close()
    return response


@look_later.route('/')
def main_page():
    return render_template('main_page.html')


@look_later.route('/push', methods=['POST'])
def push_url():
    if request.method == 'POST':
        url = request.form.get('url', None)
        password = request.form.get('pass', None)

        if url and password:
            if password == current_app.config['PUSH_PASSWORD']:
                if simple_url_checker(url):
                    #check for duplicates
                    sql = "SELECT * FROM look_later_url WHERE url=? AND watched=0"
                    cur = g.db.execute(sql, (url,))
                    if len(cur.fetchall()) == 0:
                        #insert url
                        sql = "INSERT INTO look_later_url(url) VALUES(?)"
                        g.db.execute(sql, (url,))
                        g.db.commit()

                    return jsonify(success="ok")
                else:
                    return jsonify(success="error", message="Incorrect url string")
            else:
                return jsonify(success="error", message="Wrong push password")
    return jsonify(success="error", message="Wrong push params")
