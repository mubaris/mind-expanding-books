import json
import time
from urllib.parse import urlparse, urlunparse
from goodreads import client
from airtable import Airtable
from progress.bar import Bar

from goodreads.request import GoodreadsRequestException

at = Airtable('appC2tRb1r3Mshpxo', 'Books', api_key='key9uCpvumZhpZwid')
gc = client.GoodreadsClient('3vSHhFDbwPDYCNdXZ8D7g', 'y7KD7UFxswI7SLEJhtYjO6brGzvkS3MsMcv9fBNdZ4')

with open('data.json') as f:
    data = json.load(f)

bookData = []

count = 0

for k,v in data.items():
    for id in v:
        count += 1

bar = Bar('Processing', max=count)

for k, v in data.items():
    for id in v:
        try:
            book = gc.book(id)
            time.sleep(1)
            u = urlparse(book.image_url)
            newPath = str(u.path).replace('m', 'l')
            url = urlunparse([u.scheme, u.netloc, newPath, u.params, u.query, u.fragment])
            author = ''
            for a in book.authors:
                author += a.name + ', '
            author = author[:-2]
            x = {
                'Name': book.title,
                'Description': book.description,
                'Image': [{
                    'url': url
                }],
                'Authors': author,
                'Category': k,
                'Rating': (book.average_rating),
                'Goodreads': book.link,
                'Pages': (book.num_pages),
                'Year': (book.publication_date[2]),
                'Rating_Dist': book.rating_dist,
                'Ratings_Count': (book.ratings_count),
                'Text_Reviews_Count': (book.text_reviews_count)
            }
            bookData.append(x)
            at.insert(x, typecast=True)
        except GoodreadsRequestException:
            print()
            print("Book Not Found", id)
        except Exception as e:
            print("Error", id)
            print(e)
        bar.next()

with open('book_data.json', 'w') as f:
    json.dump(bookData, f)

bar.finish()