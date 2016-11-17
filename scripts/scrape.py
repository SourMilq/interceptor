import requests
import urllib
import json

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

# class Purifier:
#     def __init__(self):
#
#     def

if __name__ == "__main__":
    p = Parser(218586+200);
    for i in range(0, 100):
        p.parse()
