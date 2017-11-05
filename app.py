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
	wat = api.wat(i)
	message = wat
	output = {'out' : wat}
	if wat[:4] == "poke":
		message = api.poke(wat[5:])
		output = {"out" : message[0], "check" : wat[:4] , "in" : message[1] , "sprite" : message[2], "ability" : message[3]}
	if wat == "temp":
		message = api.wolf(wat)
		output = {"out" : message}
	if wat == "I didn't understand. You can try rephrasing.":
		message = api.wolf(i)
		output = {"out" : message}
	return json.dumps(output)

if __name__ == "__main__":
	app.debug = True
	app.run()
