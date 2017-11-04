import watson_developer_cloud
import requests
import json

conversation = watson_developer_cloud.ConversationV1(
  username = '0967e618-5534-4a0e-87b8-329a7849af63',
  password = 'TZIJR0ywVlsw',
  version = '2017-05-26'
)

def wat(q):
    mr = conversation.message(
		workspace_id = 'e1e56ea1-f07e-4fdd-8b86-67d9954078cf',
		message_input = {
			'text' : q
		}
	)
    text = mr["output"]["text"][0]
    out = "Aliri responded with: " + text
    return out

def wolf(q):
    payload = {'i' : q, 'output' : 'json'}
    queryCheck = requests.get("http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default", params = payload)
    if queryCheck.json()['query'][0]['accepted'] == "true":
        result = requests.get("http://api.wolframalpha.com/v1/result?appid=2HAULH-VTUJJEJ65R", params = payload)
        return result.text
    return "Wolfram Alpha does not understand your reponse"
