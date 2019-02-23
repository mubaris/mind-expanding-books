import glob
import csv
import markdown
from lxml import etree
import json
import goodreads_api_client as gr
from goodreads import client
import time

grClient = gr.Client(developer_key='3vSHhFDbwPDYCNdXZ8D7g')
gc = client.GoodreadsClient('3vSHhFDbwPDYCNdXZ8D7g', 'y7KD7UFxswI7SLEJhtYjO6brGzvkS3MsMcv9fBNdZ4')

data = {}

count = 0

for name in glob.glob("*.csv"):
    X = name.split('.')[0]
    data[X] = []
    with open(name) as f:
        dic = csv.DictReader(f)
        for line in dic:
            doc = etree.fromstring(markdown.markdown(str(line)))
            linkObj = doc.xpath('//a')[0]
            link = linkObj.get('href')
            starts = (
                'https://www.goodreads.com/book/show/',
                'http://www.goodreads.com/book/show/',
                'https://www.goodreads.com/series/',
                'http://www.goodreads.com/series/',
                'www.goodreads.com/book/show/'
            )
            if link.startswith(starts[0]):
                id_name = link.split(starts[0])[1]
                id = id_name.split('.')[0]
                id = id.split('-')[0]
                count += 1
                data[X].append(str(id))
                # print(id)
            if link.startswith(starts[1]):
                id_name = link.split(starts[1])[1]
                id = id_name.split('.')[0]
                id = id.split('-')[0]
                count += 1
                data[X].append(str(id))
                # print(id)
            if link.startswith(starts[2]):
                id_name = link.split(starts[2])[1]
                id = id_name.split('.')[0]
                id = id.split('-')[0]
                try:
                    series = grClient.Series.show(id)
                    ids = [x['id'] for x in series['series_works']['series_work']]
                    # print(ids)
                    count += len(ids)
                    data[X].extend(ids)
                except Exception as e:
                    print("Error", id, e)
                time.sleep(1)
            if link.startswith(starts[3]):
                id_name = link.split(starts[3])[1]
                id = id_name.split('.')[0]
                id = id.split('-')[0]
                try:
                    series = grClient.Series.show(id)
                    ids = [x['id'] for x in series['series_works']['series_work']]
                    # print(ids)
                    count += len(ids)
                    data[X].extend(ids)
                except Exception as e:
                    print("Error", id, e)
                time.sleep(1)
            if link.startswith(starts[4]):
                id_name = link.split(starts[4])[1]
                id = id_name.split('.')[0]
                id = id.split('-')[0]
                count += 1
                data[X].append(str(id))
                # print(id)

with open('data.json', 'w') as f:
    json.dump(data, f)