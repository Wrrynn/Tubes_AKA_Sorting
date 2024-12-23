from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('opening.html')

@app.route('/index.html')
def halaman2():
    return render_template('/index.html')

if __name__ == '__main__':
    app.run(debug=True)