from flask import Flask, request, redirect, url_for, render_template, session

from utils import api

app = Flask(__name__)

app.secret_key = "921jfn1nr18cD8jJJ"

@app.route("/")
def home():
	return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
	d = request.form
	i = d['input']
	wat, wolf = api.wat(i),api.wolf(i)
	message = wat
	if wat == "Aliri responded with: I didn't understand. You can try rephrasing.":
		message = wolf
	return render_template("index.html", r = message)

if __name__ == "__main__":
	app.debug = True
	app.run()
