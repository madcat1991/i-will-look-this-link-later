from flask import Blueprint
from flask import request

uploader = Blueprint('uploader', __name__, template_folder='templates')

@uploader.route('/upload', methods=['GET', 'POST'])
def upload_files():
    errors = []
    info_messages = []
    if request.method == 'POST':