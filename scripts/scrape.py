from os import listdir
from os.path import isfile, join
from pprint import pprint
import requests
import urllib
import json
import glob

class Parser:
    def __init__(self, start):
        self.start=start
        self.offset=0
        self._base_url="https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url="

    def _get_external_site_url(self):
        rid = self.start + self.offset
        self.offset = self.offset + 1
        url = 'http://allrecipes.com/recipe/%d/' % rid
        print "External site: " + url
        return urllib.quote(url, safe='')

    def _get_full_url(self):
        return self._base_url + self._get_external_site_url()

    def _pp_json(self, o, sort=True, indents=4):
        if type(o) is str:
            print(json.dumps(json.loads(o), sort_keys=sort, indent=indents))
        else:
            print(json.dumps(o, sort_keys=sort, indent=indents))
        return None

    def parse(self):
        url = self._get_full_url()
        print "Parsing: " + url
        headers = {'X-Mashape-Key': 'R4NudSkGWwmshLc1bhZ9JVOS6Rp1p1wykggjsnUXSEeYFWOUVY'}
        r = requests.get(url, headers=headers)
        data = r.json()
        filename = 'recipe/%d.json' % (self.start + (self.offset-1))
        self._pp_json(data)
        with open(filename, 'w') as outfile:
            json.dump(data, outfile)

class Purifier:
    def _getFileNames(self):
        return [f for f in listdir('./recipe/') if isfile(join('./recipe/', f))]
    def purify(self):
        onlyfiles = self._getFileNames()
        for fname in onlyfiles:
            with open('./recipe/'+fname) as data_file:
                data = json.load(data_file)
                result = {
                    'title': data['title'] if 'title' in data else None,
                    'text': data['text'] if 'text' in data else None,
                    'cheap': data['cheap'] if 'cheap' in data else None,
                    'extendedIngredients': data['extendedIngredients'] if 'extendedIngredients' in data else None,
                    'id': data['id'] if 'id' in data else None,
                    'preparationMinutes': data['preparationMinutes'] if 'preparationMinutes' in data else None,
                    'cookingMinutes': data['cookingMinutes'] if 'cookingMinutes' in data else None,
                    'sourceUrl': data['sourceUrl'] if 'sourceUrl' in data else None,
                    'vegetarian': data['vegetarian'] if 'vegetarian' in data else None,
                    'vegan': data['vegan'] if 'vegan' in data else None,
                    'dairyFree': data['dairyFree'] if 'dairyFree' in data else None,
                }

                with open('./recipe/purified/'+fname, 'w') as outfile:
                    json.dump(result, outfile)

class Uploader:
    def _getFileNames(self):
        return [f for f in listdir('./recipe/purified/') if isfile(join('./recipe/purified/', f))]

    def upload(self):
        onlyFiles = self._getFileNames()
        headers = {'content-type': 'application/json'}
        for fname in onlyFiles:
            with open('./recipe/purified/'+fname) as data_file:
                data = json.load(data_file)
                result = {
                    'title': data['title'] if 'title' in data else None,
                    'text': data['text'] if 'text' in data else None,
                    'cheap': data['cheap'] if 'cheap' in data else None,
                    'extendedIngredients': data['extendedIngredients'] if 'extendedIngredients' in data else None,
                    'id': data['id'] if 'id' in data else None,
                    'preparationMinutes': data['preparationMinutes'] if 'preparationMinutes' in data else None,
                    'cookingMinutes': data['cookingMinutes'] if 'cookingMinutes' in data else None,
                    'sourceUrl': data['sourceUrl'] if 'sourceUrl' in data else None,
                    'vegetarian': data['vegetarian'] if 'vegetarian' in data else None,
                    'vegan': data['vegan'] if 'vegan' in data else None,
                    'dairyFree': data['dairyFree'] if 'dairyFree' in data else None,
                }

                pprint(result)

                requests.post('http://localhost:3000/v1/recipe/upload', headers=headers, data=json.dumps(result))

if __name__ == "__main__":
    # p = Parser(218586+200);
    # for i in range(0, 100):
    #     p.parse()
    # clean = Purifier()
    # clean.purify()
    uploader = Uploader()
    uploader.upload()
