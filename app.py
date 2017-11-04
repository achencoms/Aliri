from flask import Flask, request, redirect, url_for, render_template, session

from utils import api

import json

app = Flask(__name__)

app.secret_key = "921jfn1nr18cD8jJJ"

@app.route("/")
def home():
	return render_template("Bootstrap.html")

@app.route("/process", methods=["GET"])
def process():
	data = request.args
	i = data.get('input')
	wat, wolf = api.wat(i),api.wolf(i)
	message = wat
	if message == "Aliri responded with: I didn't understand. You can try rephrasing.":
		message = wolf
	output = {"out" : message}
	return json.dumps(output)

if __name__ == "__main__":
	app.debug = True
	app.run()
