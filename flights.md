# Oneway Trip API

API endpoint for this API is: **`https://api.flightapi.io/onewaytrip`**

{% hint style="info" %}
Each request to this API will cost 2 credits.
{% endhint %}

## Guide

Your API requests are authenticated using API keys. Any request that doesn't include an API key will return an error.

You can generate an API key from your Dashboard at any time.

Here is the list of default parameters you have to use with this API:

| Parameters                                                                         | Description                                                                                                                                                                                         | Type     |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| <p>api\_key</p><p><br><mark style="color:red;">required</mark></p>                 | This is your personal API key. You can find this on your Dashboard.                                                                                                                                 | `String` |
| <p>departure\_airport\_code</p><p><br><mark style="color:red;">required</mark></p> | This is the IATA code of departure airport.                                                                                                                                                         | `String` |
| <p>arrival\_airport\_code</p><p><br><mark style="color:red;">required</mark></p>   | This is the IATA code of arrival airport.                                                                                                                                                           | `String` |
| <p>departure\_date</p><p><br><mark style="color:red;">required</mark></p>          | <p>Date of deparure<br><br>Format - <em>YYYY-MM-DD</em></p>                                                                                                                                         | `String` |
| <p>number\_of\_adults</p><p><br><mark style="color:red;">required</mark></p>       | This is the number of adults.                                                                                                                                                                       | `String` |
| <p>number\_of\_childrens<br><br><mark style="color:red;">required</mark></p>       | This is the number of childrens.                                                                                                                                                                    | `String` |
| <p>number\_of\_infants<br><br><mark style="color:red;">required</mark></p>         | This is the number of infants.                                                                                                                                                                      | `String` |
| <p>cabin\_class<br><br><mark style="color:red;">required</mark></p>                | <p>This is the class of the seat in the plane.<br><br>Possible Values- "<strong>Economy</strong>", "<strong>Business</strong>", "<strong>First</strong>" or "<strong>Premium\_Economy</strong>"</p> | `String` |
| <p>currency<br><br><mark style="color:red;">required</mark></p>                    | You can use any currency code like **USD**, **INR**, **EUR**, etc                                                                                                                                   | `String` |
| <p>region<br><br><mark style="color:red;">required</mark></p>                      | Check local prices of any country by passing the ISO code of that country.                                                                                                                          | `String` |

## API Schema

You can follow this API schema to pass parameters.

**`https://api.flightapi.io/onewaytrip/<api-key>/<departure_airport_code>/<arrival_airport_code>/<departure_date>/<number_of_adults>/<number_of_childrens>/<number_of_infants>/<cabin_class>/<currency>`**

## API Example

You have to send a GET request to  `https://api.flightapi.io/oneway` along with all the parameters.&#x20;

Take a look at how you might call this API using various different coding languages.

{% tabs %}
{% tab title="curl" %}

```bash
curl "https://api.flightapi.io/onewaytrip/5f8b1ec2a9d31578961b4109f4dfd8/HEL/OUL/2024-05-20/1/0/0/Economy/USD"
```

{% endtab %}

{% tab title="Node" %}

```javascript
// require the Unirest or any other module to make an HTTP GET request
const unirest = require('unirest')

unirest.get('https://api.flightapi.io/onewaytrip/5f8b1ec2a9d31578961b4109f4dfd8/HEL/OUL/2024-05-20/1/0/0/Economy/USD')
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error);
  });


```

{% endtab %}

{% tab title="Python" %}

```python
// Set your API key before making the request
import requests

resp = requests.get('https://api.flightapi.io/onewaytrip/5f8b1ec2a9d31578961b4109f4dfd8/HEL/OUL/2024-05-20/1/0/0/Economy/USD')
print (resp.json())
```

{% endtab %}
{% endtabs %}

### Response

The sample response of the API will look somewhat like this.

{% code overflow="wrap" fullWidth="false" %}

```json
// Sample Response

"itineraries": [
        {
            "id": "12126-2405200600--32317-0-15130-2405200700",
            "leg_ids": [
                "12126-2405200600--32317-0-15130-2405200700"
            ],
            "pricing_options": [
                {
                    "id": "EgiHJ3q9CXVr",
                    "agent_ids": [
                        "finn"
                    ],
                    "price": {
                        "amount": 52.1,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:11:11",
                        "quote_age": 224
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "finn",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/finn/1/12126.15130.2024-05-20/air/airli/flights?itinerary=flight|-32317|431|12126|2024-05-20T06:00|15130|2024-05-20T07:00|60|ZNY0T9BE|Z|ESLCAMP11&carriers=-32317&operators=-32317&passengers=1&channel=website&cabin_class=economy&fps_session_id=5e87d1e4-0b01-4009-a2cf-f29a19e81c96&ticket_price=52.10&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-OS4mJJy8zLE2LmuBcnxcwxq0yhYemqTWxGTAqMAHly0aAcAAAA|8623981251399725447|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:11:11&pqid=false",
                            "segment_ids": [
                                "12126-15130-2405200600-2405200700--32317"
                            ],
                            "price": {
                                "amount": 52.1,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:11:11",
                                "quote_age": 224
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "12126-15130-2405200600-2405200700--32317",
                                    "fare_basis_code": "ZNY0T9BE",
                                    "booking_code": "Z",
                                    "fare_family": "ESLCAMP11"
                                }
                            ],
                            "opaque_id": "-1017400199",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 10,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
],
"legs": [
        {
            "id": "12126-2405200600--32317-0-15130-2405200700",
            "origin_place_id": 12126,
            "destination_place_id": 15130,
            "departure": "2024-05-20T06:00:00",
            "arrival": "2024-05-20T07:00:00",
            "segment_ids": [
                "12126-15130-2405200600-2405200700--32317"
            ],
            "duration": 60,
            "stop_count": 0,
            "marketing_carrier_ids": [
                -32317
            ],
            "operating_carrier_ids": [
                -32317
            ],
            "stop_ids": []
        }
],
"segments": [
        {
            "id": "12126-15130-2405200600-2405200700--32317",
            "origin_place_id": 12126,
            "destination_place_id": 15130,
            "arrival": "2024-05-20T07:00:00",
            "departure": "2024-05-20T06:00:00",
            "duration": 60,
            "marketing_flight_number": "431",
            "marketing_carrier_id": -32317,
            "operating_carrier_id": -32317,
            "mode": "flight"
        }
]
  
```

{% endcode %}

{% hint style="info" %}
It is just a sample API response. Some objects will have more attributes. New arrays will also be there.
{% endhint %}

### Understanding the Response

In the JSON response, you may observe that many objects include references (IDs or codes) to objects from other lists. This pattern is employed in our API to prevent redundant data and reduce the overall size by allowing multiple objects to reference the same data.

<figure><img src="https://3461487639-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F64KQudssITthDnR3aDZs%2Fuploads%2Fw69NJrA9gvt8h5y0oCzx%2Fimage.png?alt=media&#x26;token=aa0beb4c-2503-4f60-bd86-ad2eddd37c67" alt=""><figcaption><p>Response Fields</p></figcaption></figure>

| Field Name    | Description                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `itineraries` | A return trip will consist of 2 `legs`, while a one-way trip will consist of 1 `leg`. An `itinerary` will contain a `deepLink` field which takes the traveler to the booking page.                      |
| `legs`        | Provides information about the flight leg from the destination to the origin. A leg comprises a single segment for a direct flight and may consist of multiple segments if there are several stopovers. |
| `segments`    | Displays information about individual stops within a `leg`. For instance, if a `leg` includes one-stop, the segment will provide details about the stopover, including its duration and location.       |
| `places`      | Reveals specific stops within a `leg`. For instance, in the case of a `leg` with a single stop, the segment will present information about the stopover, including its duration and location.           |
| `carriers`    | Like `places`, the `carriers` section contains details about the airlines mentioned in the `itineraries`.                                                                                               |
| `agents`      | Just like `places`, the `agents` section comprises details about the Online Travel Agencies (OTAs) mentioned in the `itineraries`.                                                                      |

###

{% hint style="info" %}
Sometimes you might have to make more than one API call to get complete data. Since we compare a lot of airlines and vendors sometimes it becomes impossible to pull this much amount of data at once
{% endhint %}

### Video Tutorial

{% embed url="<https://www.loom.com/share/f08b356f2a4e40a28ef6776c1eae8cb8?sid=96c4d211-1267-4dfb-8266-e692a5c1282a>" %}

# Round Trip API

API endpoint for this API is: **`https://api.flightapi.io/roundtrip`**

{% hint style="info" %}
Each request to this API will cost 2 credits.
{% endhint %}

## Guide

Your API requests are authenticated using API keys. Any request that doesn't include an API key will return an error.

You can generate an API key from your Dashboard at any time.

Here is the list of default parameters you have to use with this API:

| Parameters                                                                         | Description                                                                                                                                                                                         | Type     |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| <p>api\_key</p><p><br><mark style="color:red;">required</mark></p>                 | This is your personal API key. You can find this on your Dashboard.                                                                                                                                 | `String` |
| <p>departure\_airport\_code</p><p><br><mark style="color:red;">required</mark></p> | This is the IATA code of departure airport.                                                                                                                                                         | `String` |
| <p>arrival\_airport\_code</p><p><br><mark style="color:red;">required</mark></p>   | This is the IATA code of arrival airport.                                                                                                                                                           | `String` |
| <p>departure\_date</p><p><br><mark style="color:red;">required</mark></p>          | <p>Date of departure<br><br>Format - <em>YYYY-MM-DD</em></p>                                                                                                                                        | `String` |
| <p>arrival\_date<br><br><mark style="color:red;">required</mark></p>               | <p>Date of Arrival<br><br>Format - <em>YYYY-MM-DD</em></p>                                                                                                                                          | `String` |
| <p>number\_of\_adults</p><p><br><mark style="color:red;">required</mark></p>       | This is the number of adults.                                                                                                                                                                       | `String` |
| <p>number\_of\_childrens<br><br><mark style="color:red;">required</mark></p>       | This is the number of childrens.                                                                                                                                                                    | `String` |
| <p>number\_of\_infants<br><br><mark style="color:red;">required</mark></p>         | This is the number of infants.                                                                                                                                                                      | `String` |
| <p>cabin\_class<br><br><mark style="color:red;">required</mark></p>                | <p>This is the class of the seat in the plane.<br><br>Possible Values- "<strong>Economy</strong>", "<strong>Business</strong>", "<strong>First</strong>" or "<strong>Premium\_Economy</strong>"</p> | `String` |
| <p>currency<br><br><mark style="color:red;">required</mark></p>                    | You can use any currency code like **USD**, **INR**, **EUR**, etc                                                                                                                                   | `String` |
| <p>region<br><br><mark style="color:red;">required</mark></p>                      | Check local prices of any country by passing the ISO code of that country.                                                                                                                          | `String` |

## API Schema

You can follow this API schema to pass parameters.

**`https://api.flightapi.io/roundtrip/<api-key>/<departure_airport_code>/<arrival_airport_code>/<departure_date>/<arrival_date>/<number_of_adults>/<number_of_childrens>/<number_of_infants>/<cabin_class>/<currency>`**

## API Example

You have to send a GET request to  `https://api.flightapi.io/roundtrip` along with all the parameters.&#x20;

Take a look at how you might call this API using various different coding languages.

{% tabs %}
{% tab title="curl" %}

```bash
curl "https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD"
```

{% endtab %}

{% tab title="Node" %}

```javascript
// require the Unirest or any other module to make an HTTP GET request
const unirest = require('unirest')

unirest.get('https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD')
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error);
  });


```

{% endtab %}

{% tab title="Python" %}

```python
# Set your API key before making the request
import requests

resp = requests.get('https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD')
print (resp.json())
```

{% endtab %}
{% endtabs %}

### Response

The sample response of the API will look somewhat like this.

{% code overflow="wrap" fullWidth="false" %}

```json
// Sample Response

"itineraries": [
        {
            "id": "16216-2404021419--32385-1-12387-2404030005|12387-2404091500--32385-1-16216-2404091945",
            "leg_ids": [
                "16216-2404021419--32385-1-12387-2404030005",
                "12387-2404091500--32385-1-16216-2404091945"
            ],
            "pricing_options": [
                {
                    "id": "LGJ4vcG7cf33",
                    "agent_ids": [
                        "dela"
                    ],
                    "price": {
                        "amount": 1390.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "dela",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/dela/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32385|437|16216|2024-04-02T14:19|9596|2024-04-02T21:48|269|KAUOA0MQ|K|ECONOMY;flight|-32385|2178|9596|2024-04-02T22:25|12387|2024-04-03T00:05|100|KAUOA0MQ|K|ECONOMY,flight|-32385|784|12387|2024-04-09T15:00|9596|2024-04-09T16:38|98|LAUOA0ML|L|ECONOMY;flight|-32385|471|9596|2024-04-09T17:20|16216|2024-04-09T19:45|325|LAUOA0ML|L|ECONOMY&carriers=-32385&operators=-32385;-32385,-32385;-32385&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1390.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJSc1JFGLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAVZuTLIgAAAA|4231563191487365489|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-9596-2404021419-2404022148--32385",
                                "9596-12387-2404022225-2404030005--32385",
                                "12387-9596-2404091500-2404091638--32385",
                                "9596-16216-2404091720-2404091945--32385"
                            ],
                            "price": {
                                "amount": 1390.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-9596-2404021419-2404022148--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-12387-2404022225-2404030005--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "12387-9596-2404091500-2404091638--32385",
                                    "fare_basis_code": "LAUOA0ML",
                                    "booking_code": "L",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-16216-2404091720-2404091945--32385",
                                    "fare_basis_code": "LAUOA0ML",
                                    "booking_code": "L",
                                    "fare_family": "ECONOMY"
                                }
                            ],
                            "opaque_id": "40861565",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 4.02762,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 4.02159,
            "cheapest_price": {
                "amount": 1390.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
        {
            "id": "16216-2404021419--32385-1-12387-2404030005|12387-2404090955--32385-1-16216-2404091721",
            "leg_ids": [
                "16216-2404021419--32385-1-12387-2404030005",
                "12387-2404090955--32385-1-16216-2404091721"
            ],
            "pricing_options": [
                {
                    "id": "ASK54wWqMUef",
                    "agent_ids": [
                        "dela"
                    ],
                    "price": {
                        "amount": 1250.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "dela",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/dela/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32385|437|16216|2024-04-02T14:19|9596|2024-04-02T21:48|269|KAUOA0MQ|K|ECONOMY;flight|-32385|2178|9596|2024-04-02T22:25|12387|2024-04-03T00:05|100|KAUOA0MQ|K|ECONOMY,flight|-32385|2332|12387|2024-04-09T09:55|9596|2024-04-09T11:40|105|UAVNA0ME|U|ECONOMY;flight|-32385|662|9596|2024-04-09T14:55|16216|2024-04-09T17:21|326|UAVNA0ME|U|ECONOMY&carriers=-32385&operators=-32385;-32385,-32385;-32385&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1250.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJSc1JFGLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAVZuTLIgAAAA|-4101514496198410679|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-9596-2404021419-2404022148--32385",
                                "9596-12387-2404022225-2404030005--32385",
                                "12387-9596-2404090955-2404091140--32385",
                                "9596-16216-2404091455-2404091721--32385"
                            ],
                            "price": {
                                "amount": 1250.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-9596-2404021419-2404022148--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-12387-2404022225-2404030005--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "12387-9596-2404090955-2404091140--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-16216-2404091455-2404091721--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                }
                            ],
                            "opaque_id": "1678779893",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 3.77988,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 3.77421,
            "cheapest_price": {
                "amount": 1250.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
        {
            "id": "16216-2404021240--32573-1-12387-2404031618|12387-2404091412--32573-1-16216-2404091942",
            "leg_ids": [
                "16216-2404021240--32573-1-12387-2404031618",
                "12387-2404091412--32573-1-16216-2404091942"
            ],
            "pricing_options": [
                {
                    "id": "7hH3LRleVI0e",
                    "agent_ids": [
                        "aaus"
                    ],
                    "price": {
                        "amount": 1307.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "aaus",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/aaus/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32573|304|16216|2024-04-02T12:40|10968|2024-04-02T18:09|209|GVAKZNBX|B|BASIC+ECONOMY;flight|-32573|1863|10968|2024-04-03T12:29|12387|2024-04-03T16:18|169|QVAHZNBX|B|BASIC+ECONOMY,flight|-32573|5543|12387|2024-04-09T14:12|10602|2024-04-09T15:44|92|LVAZZNBZ|B|BASIC+ECONOMY;flight|-32573|2184|10602|2024-04-09T16:58|16216|2024-04-09T19:42|344|LVAZZNBZ|B|BASIC+ECONOMY&carriers=-32573&operators=-32573;-32573,-30992;-32573&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1307.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJTCwtFmLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAeMkDFIgAAAA|-7557581151614243129|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-10968-2404021240-2404021809--32573",
                                "10968-12387-2404031229-2404031618--32573",
                                "12387-10602-2404091412-2404091544--32573",
                                "10602-16216-2404091658-2404091942--32573"
                            ],
                            "price": {
                                "amount": 1307.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-10968-2404021240-2404021809--32573",
                                    "fare_basis_code": "GVAKZNBX",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                },
                                {
                                    "segment_id": "10968-12387-2404031229-2404031618--32573",
                                    "fare_basis_code": "QVAHZNBX",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                },
                                {
                                    "segment_id": "12387-10602-2404091412-2404091544--32573",
                                    "fare_basis_code": "LVAZZNBZ",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                },
                                {
                                    "segment_id": "10602-16216-2404091658-2404091942--32573",
                                    "fare_basis_code": "LVAZZNBZ",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                }
                            ],
                            "opaque_id": "-1013399851",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 1.87645,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 1.87364,
            "cheapest_price": {
                "amount": 1307.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
        {
            "id": "16216-2404021226--32385-1-12387-2404022253|12387-2404090955--32385-1-16216-2404091721",
            "leg_ids": [
                "16216-2404021226--32385-1-12387-2404022253",
                "12387-2404090955--32385-1-16216-2404091721"
            ],
            "pricing_options": [
                {
                    "id": "157vMhkQJ8Vt",
                    "agent_ids": [
                        "dela"
                    ],
                    "price": {
                        "amount": 1370.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "dela",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/dela/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32385|361|16216|2024-04-02T12:26|11152|2024-04-02T20:00|274|QAUOA0MQ|Q|ECONOMY;flight|-32385|2288|11152|2024-04-02T21:20|12387|2024-04-02T22:53|93|QAUOA0MQ|Q|ECONOMY,flight|-32385|2332|12387|2024-04-09T09:55|9596|2024-04-09T11:40|105|UAVNA0ME|U|ECONOMY;flight|-32385|662|9596|2024-04-09T14:55|16216|2024-04-09T17:21|326|UAVNA0ME|U|ECONOMY&carriers=-32385&operators=-32385;-32385,-32385;-32385&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1370.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJSc1JFGLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAVZuTLIgAAAA|6389860417948404334|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-11152-2404021226-2404022000--32385",
                                "11152-12387-2404022120-2404022253--32385",
                                "12387-9596-2404090955-2404091140--32385",
                                "9596-16216-2404091455-2404091721--32385"
                            ],
                            "price": {
                                "amount": 1370.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-11152-2404021226-2404022000--32385",
                                    "fare_basis_code": "QAUOA0MQ",
                                    "booking_code": "Q",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "11152-12387-2404022120-2404022253--32385",
                                    "fare_basis_code": "QAUOA0MQ",
                                    "booking_code": "Q",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "12387-9596-2404090955-2404091140--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-16216-2404091455-2404091721--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                }
                            ],
                            "opaque_id": "-1667017661",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 3.3171,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 3.31214,
            "cheapest_price": {
                "amount": 1370.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
],
"legs": [
        {
            "id": "16216-2404021419--32385-1-12387-2404030005",
            "origin_place_id": 16216,
            "destination_place_id": 12387,
            "departure": "2024-04-02T14:19:00",
            "arrival": "2024-04-03T00:05:00",
            "segment_ids": [
                "16216-9596-2404021419-2404022148--32385",
                "9596-12387-2404022225-2404030005--32385"
            ],
            "duration": 406,
            "stop_count": 1,
            "marketing_carrier_ids": [
                -32385
            ],
            "operating_carrier_ids": [
                -32385
            ],
            "stop_ids": [
                [
                    9596
                ]
            ]
        },
        {
            "id": "12387-2404091500--32385-1-16216-2404091945",
            "origin_place_id": 12387,
            "destination_place_id": 16216,
            "departure": "2024-04-09T15:00:00",
            "arrival": "2024-04-09T19:45:00",
            "segment_ids": [
                "12387-9596-2404091500-2404091638--32385",
                "9596-16216-2404091720-2404091945--32385"
            ],
            "duration": 465,
            "stop_count": 1,
            "marketing_carrier_ids": [
                -32385
            ],
            "operating_carrier_ids": [
                -32385
            ],
            "stop_ids": [
                [
                    9596
                ]
            ]
        }
],
"segments": [
        {
            "id": "16216-9596-2404021419-2404022148--32385",
            "origin_place_id": 16216,
            "destination_place_id": 9596,
            "arrival": "2024-04-02T21:48:00",
            "departure": "2024-04-02T14:19:00",
            "duration": 269,
            "marketing_flight_number": "437",
            "marketing_carrier_id": -32385,
            "operating_carrier_id": -32385,
            "mode": "flight"
        },
        {
            "id": "9596-12387-2404022225-2404030005--32385",
            "origin_place_id": 9596,
            "destination_place_id": 12387,
            "arrival": "2024-04-03T00:05:00",
            "departure": "2024-04-02T22:25:00",
            "duration": 100,
            "marketing_flight_number": "2178",
            "marketing_carrier_id": -32385,
            "operating_carrier_id": -32385,
            "mode": "flight"
        }
]
  
```

{% endcode %}

{% hint style="info" %}
It is just a sample API response. Some objects will have more attributes. New arrays will also be there.
{% endhint %}

### Understanding the Response

In the JSON response, you may observe that many objects include references (IDs or codes) to objects from other lists. This pattern is employed in our API to prevent redundant data and reduce the overall size by allowing multiple objects to reference the same data.

<figure><img src="https://3461487639-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F64KQudssITthDnR3aDZs%2Fuploads%2FQzKpayxnyjvQsvcgDKAM%2Fimage.png?alt=media&#x26;token=11481132-1f24-45e9-967b-82902639e32b" alt=""><figcaption><p>Response Fields</p></figcaption></figure>

| Field Name    | Description                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `itineraries` | A return trip will consist of 2 `legs`, while a one-way trip will consist of 1 `leg`. An `itinerary` will contain a `deepLink` field which takes the traveler to the booking page.                      |
| `legs`        | Provides information about the flight leg from the destination to the origin. A leg comprises a single segment for a direct flight and may consist of multiple segments if there are several stopovers. |
| `segments`    | Displays information about individual stops within a `leg`. For instance, if a `leg` includes one-stop, the segment will provide details about the stopover, including its duration and location.       |
| `places`      | Reveals specific stops within a `leg`. For instance, in the case of a `leg` with a single stop, the segment will present information about the stopover, including its duration and location.           |
| `carriers`    | Like `places`, the `carriers` section contains details about the airlines mentioned in the `itineraries`.                                                                                               |
| `agents`      | Just like `places`, the `agents` section comprises details about the Online Travel Agencies (OTAs) mentioned in the `itineraries`.                                                                      |

{% hint style="info" %}
Sometimes you might have to make more than one API call to get complete data. Since we compare a lot of airlines and vendors sometimes it becomes impossible to pull this much amount of data at once
{% endhint %}

# Round Trip API

API endpoint for this API is: **`https://api.flightapi.io/roundtrip`**

{% hint style="info" %}
Each request to this API will cost 2 credits.
{% endhint %}

## Guide

Your API requests are authenticated using API keys. Any request that doesn't include an API key will return an error.

You can generate an API key from your Dashboard at any time.

Here is the list of default parameters you have to use with this API:

| Parameters                                                                         | Description                                                                                                                                                                                         | Type     |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| <p>api\_key</p><p><br><mark style="color:red;">required</mark></p>                 | This is your personal API key. You can find this on your Dashboard.                                                                                                                                 | `String` |
| <p>departure\_airport\_code</p><p><br><mark style="color:red;">required</mark></p> | This is the IATA code of departure airport.                                                                                                                                                         | `String` |
| <p>arrival\_airport\_code</p><p><br><mark style="color:red;">required</mark></p>   | This is the IATA code of arrival airport.                                                                                                                                                           | `String` |
| <p>departure\_date</p><p><br><mark style="color:red;">required</mark></p>          | <p>Date of departure<br><br>Format - <em>YYYY-MM-DD</em></p>                                                                                                                                        | `String` |
| <p>arrival\_date<br><br><mark style="color:red;">required</mark></p>               | <p>Date of Arrival<br><br>Format - <em>YYYY-MM-DD</em></p>                                                                                                                                          | `String` |
| <p>number\_of\_adults</p><p><br><mark style="color:red;">required</mark></p>       | This is the number of adults.                                                                                                                                                                       | `String` |
| <p>number\_of\_childrens<br><br><mark style="color:red;">required</mark></p>       | This is the number of childrens.                                                                                                                                                                    | `String` |
| <p>number\_of\_infants<br><br><mark style="color:red;">required</mark></p>         | This is the number of infants.                                                                                                                                                                      | `String` |
| <p>cabin\_class<br><br><mark style="color:red;">required</mark></p>                | <p>This is the class of the seat in the plane.<br><br>Possible Values- "<strong>Economy</strong>", "<strong>Business</strong>", "<strong>First</strong>" or "<strong>Premium\_Economy</strong>"</p> | `String` |
| <p>currency<br><br><mark style="color:red;">required</mark></p>                    | You can use any currency code like **USD**, **INR**, **EUR**, etc                                                                                                                                   | `String` |
| <p>region<br><br><mark style="color:red;">required</mark></p>                      | Check local prices of any country by passing the ISO code of that country.                                                                                                                          | `String` |

## API Schema

You can follow this API schema to pass parameters.

**`https://api.flightapi.io/roundtrip/<api-key>/<departure_airport_code>/<arrival_airport_code>/<departure_date>/<arrival_date>/<number_of_adults>/<number_of_childrens>/<number_of_infants>/<cabin_class>/<currency>`**

## API Example

You have to send a GET request to  `https://api.flightapi.io/roundtrip` along with all the parameters.&#x20;

Take a look at how you might call this API using various different coding languages.

{% tabs %}
{% tab title="curl" %}

```bash
curl "https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD"
```

{% endtab %}

{% tab title="Node" %}

```javascript
// require the Unirest or any other module to make an HTTP GET request
const unirest = require('unirest')

unirest.get('https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD')
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error);
  });


```

{% endtab %}

{% tab title="Python" %}

```python
# Set your API key before making the request
import requests

resp = requests.get('https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD')
print (resp.json())
```

{% endtab %}
{% endtabs %}

### Response

The sample response of the API will look somewhat like this.

{% code overflow="wrap" fullWidth="false" %}

```json
// Sample Response

"itineraries": [
        {
            "id": "16216-2404021419--32385-1-12387-2404030005|12387-2404091500--32385-1-16216-2404091945",
            "leg_ids": [
                "16216-2404021419--32385-1-12387-2404030005",
                "12387-2404091500--32385-1-16216-2404091945"
            ],
            "pricing_options": [
                {
                    "id": "LGJ4vcG7cf33",
                    "agent_ids": [
                        "dela"
                    ],
                    "price": {
                        "amount": 1390.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "dela",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/dela/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32385|437|16216|2024-04-02T14:19|9596|2024-04-02T21:48|269|KAUOA0MQ|K|ECONOMY;flight|-32385|2178|9596|2024-04-02T22:25|12387|2024-04-03T00:05|100|KAUOA0MQ|K|ECONOMY,flight|-32385|784|12387|2024-04-09T15:00|9596|2024-04-09T16:38|98|LAUOA0ML|L|ECONOMY;flight|-32385|471|9596|2024-04-09T17:20|16216|2024-04-09T19:45|325|LAUOA0ML|L|ECONOMY&carriers=-32385&operators=-32385;-32385,-32385;-32385&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1390.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJSc1JFGLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAVZuTLIgAAAA|4231563191487365489|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-9596-2404021419-2404022148--32385",
                                "9596-12387-2404022225-2404030005--32385",
                                "12387-9596-2404091500-2404091638--32385",
                                "9596-16216-2404091720-2404091945--32385"
                            ],
                            "price": {
                                "amount": 1390.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-9596-2404021419-2404022148--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-12387-2404022225-2404030005--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "12387-9596-2404091500-2404091638--32385",
                                    "fare_basis_code": "LAUOA0ML",
                                    "booking_code": "L",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-16216-2404091720-2404091945--32385",
                                    "fare_basis_code": "LAUOA0ML",
                                    "booking_code": "L",
                                    "fare_family": "ECONOMY"
                                }
                            ],
                            "opaque_id": "40861565",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 4.02762,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 4.02159,
            "cheapest_price": {
                "amount": 1390.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
        {
            "id": "16216-2404021419--32385-1-12387-2404030005|12387-2404090955--32385-1-16216-2404091721",
            "leg_ids": [
                "16216-2404021419--32385-1-12387-2404030005",
                "12387-2404090955--32385-1-16216-2404091721"
            ],
            "pricing_options": [
                {
                    "id": "ASK54wWqMUef",
                    "agent_ids": [
                        "dela"
                    ],
                    "price": {
                        "amount": 1250.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "dela",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/dela/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32385|437|16216|2024-04-02T14:19|9596|2024-04-02T21:48|269|KAUOA0MQ|K|ECONOMY;flight|-32385|2178|9596|2024-04-02T22:25|12387|2024-04-03T00:05|100|KAUOA0MQ|K|ECONOMY,flight|-32385|2332|12387|2024-04-09T09:55|9596|2024-04-09T11:40|105|UAVNA0ME|U|ECONOMY;flight|-32385|662|9596|2024-04-09T14:55|16216|2024-04-09T17:21|326|UAVNA0ME|U|ECONOMY&carriers=-32385&operators=-32385;-32385,-32385;-32385&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1250.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJSc1JFGLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAVZuTLIgAAAA|-4101514496198410679|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-9596-2404021419-2404022148--32385",
                                "9596-12387-2404022225-2404030005--32385",
                                "12387-9596-2404090955-2404091140--32385",
                                "9596-16216-2404091455-2404091721--32385"
                            ],
                            "price": {
                                "amount": 1250.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-9596-2404021419-2404022148--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-12387-2404022225-2404030005--32385",
                                    "fare_basis_code": "KAUOA0MQ",
                                    "booking_code": "K",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "12387-9596-2404090955-2404091140--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-16216-2404091455-2404091721--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                }
                            ],
                            "opaque_id": "1678779893",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 3.77988,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 3.77421,
            "cheapest_price": {
                "amount": 1250.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
        {
            "id": "16216-2404021240--32573-1-12387-2404031618|12387-2404091412--32573-1-16216-2404091942",
            "leg_ids": [
                "16216-2404021240--32573-1-12387-2404031618",
                "12387-2404091412--32573-1-16216-2404091942"
            ],
            "pricing_options": [
                {
                    "id": "7hH3LRleVI0e",
                    "agent_ids": [
                        "aaus"
                    ],
                    "price": {
                        "amount": 1307.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "aaus",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/aaus/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32573|304|16216|2024-04-02T12:40|10968|2024-04-02T18:09|209|GVAKZNBX|B|BASIC+ECONOMY;flight|-32573|1863|10968|2024-04-03T12:29|12387|2024-04-03T16:18|169|QVAHZNBX|B|BASIC+ECONOMY,flight|-32573|5543|12387|2024-04-09T14:12|10602|2024-04-09T15:44|92|LVAZZNBZ|B|BASIC+ECONOMY;flight|-32573|2184|10602|2024-04-09T16:58|16216|2024-04-09T19:42|344|LVAZZNBZ|B|BASIC+ECONOMY&carriers=-32573&operators=-32573;-32573,-30992;-32573&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1307.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJTCwtFmLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAeMkDFIgAAAA|-7557581151614243129|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-10968-2404021240-2404021809--32573",
                                "10968-12387-2404031229-2404031618--32573",
                                "12387-10602-2404091412-2404091544--32573",
                                "10602-16216-2404091658-2404091942--32573"
                            ],
                            "price": {
                                "amount": 1307.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-10968-2404021240-2404021809--32573",
                                    "fare_basis_code": "GVAKZNBX",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                },
                                {
                                    "segment_id": "10968-12387-2404031229-2404031618--32573",
                                    "fare_basis_code": "QVAHZNBX",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                },
                                {
                                    "segment_id": "12387-10602-2404091412-2404091544--32573",
                                    "fare_basis_code": "LVAZZNBZ",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                },
                                {
                                    "segment_id": "10602-16216-2404091658-2404091942--32573",
                                    "fare_basis_code": "LVAZZNBZ",
                                    "booking_code": "B",
                                    "fare_family": "BASIC ECONOMY"
                                }
                            ],
                            "opaque_id": "-1013399851",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 1.87645,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 1.87364,
            "cheapest_price": {
                "amount": 1307.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
        {
            "id": "16216-2404021226--32385-1-12387-2404022253|12387-2404090955--32385-1-16216-2404091721",
            "leg_ids": [
                "16216-2404021226--32385-1-12387-2404022253",
                "12387-2404090955--32385-1-16216-2404091721"
            ],
            "pricing_options": [
                {
                    "id": "157vMhkQJ8Vt",
                    "agent_ids": [
                        "dela"
                    ],
                    "price": {
                        "amount": 1370.4,
                        "update_status": "current",
                        "last_updated": "2024-01-09T09:40:39",
                        "quote_age": 5
                    },
                    "unpriced_type": "",
                    "items": [
                        {
                            "agent_id": "dela",
                            "url": "/transport_deeplink/4.0/US/en-GB/USD/dela/2/16216.12387.2024-04-02,12387.16216.2024-04-09/air/airli/flights?itinerary=flight|-32385|361|16216|2024-04-02T12:26|11152|2024-04-02T20:00|274|QAUOA0MQ|Q|ECONOMY;flight|-32385|2288|11152|2024-04-02T21:20|12387|2024-04-02T22:53|93|QAUOA0MQ|Q|ECONOMY,flight|-32385|2332|12387|2024-04-09T09:55|9596|2024-04-09T11:40|105|UAVNA0ME|U|ECONOMY;flight|-32385|662|9596|2024-04-09T14:55|16216|2024-04-09T17:21|326|UAVNA0ME|U|ECONOMY&carriers=-32385&operators=-32385;-32385,-32385;-32385&passengers=2&channel=website&cabin_class=economy&fps_session_id=a727e06a-6c38-4bcf-8a23-b5bcba1666ac&ticket_price=1370.40&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=c087ce1e-3920-4547-8524-1628381be925&q_ids=H4sIAAAAAAAA_-NS4GJJSc1JFGLmuFEnxczxOEGhYeraDWwaDV2XNrAZMSkwAQAVZuTLIgAAAA|6389860417948404334|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2024-01-09T09:40:39&pqid=false",
                            "segment_ids": [
                                "16216-11152-2404021226-2404022000--32385",
                                "11152-12387-2404022120-2404022253--32385",
                                "12387-9596-2404090955-2404091140--32385",
                                "9596-16216-2404091455-2404091721--32385"
                            ],
                            "price": {
                                "amount": 1370.4,
                                "update_status": "current",
                                "last_updated": "2024-01-09T09:40:39",
                                "quote_age": 5
                            },
                            "booking_proposition": "PBOOK",
                            "transfer_protection": "",
                            "max_redirect_age": 10,
                            "fares": [
                                {
                                    "segment_id": "16216-11152-2404021226-2404022000--32385",
                                    "fare_basis_code": "QAUOA0MQ",
                                    "booking_code": "Q",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "11152-12387-2404022120-2404022253--32385",
                                    "fare_basis_code": "QAUOA0MQ",
                                    "booking_code": "Q",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "12387-9596-2404090955-2404091140--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                },
                                {
                                    "segment_id": "9596-16216-2404091455-2404091721--32385",
                                    "fare_basis_code": "UAVNA0ME",
                                    "booking_code": "U",
                                    "fare_family": "ECONOMY"
                                }
                            ],
                            "opaque_id": "-1667017661",
                            "booking_metadata": {
                                "metadata_set": "",
                                "signature": ""
                            },
                            "ticket_attributes": [],
                            "flight_attributes": []
                        }
                    ],
                    "transfer_type": "MANAGED",
                    "score": 3.3171,
                    "pricing_option_fare": {
                        "attribute_labels": [],
                        "leg_details": {},
                        "brand_names": []
                    }
                }
            ],
            "score": 3.31214,
            "cheapest_price": {
                "amount": 1370.4,
                "update_status": "current",
                "last_updated": "2024-01-09T09:40:39",
                "quote_age": 5
            },
            "pricing_options_count": 1
        },
],
"legs": [
        {
            "id": "16216-2404021419--32385-1-12387-2404030005",
            "origin_place_id": 16216,
            "destination_place_id": 12387,
            "departure": "2024-04-02T14:19:00",
            "arrival": "2024-04-03T00:05:00",
            "segment_ids": [
                "16216-9596-2404021419-2404022148--32385",
                "9596-12387-2404022225-2404030005--32385"
            ],
            "duration": 406,
            "stop_count": 1,
            "marketing_carrier_ids": [
                -32385
            ],
            "operating_carrier_ids": [
                -32385
            ],
            "stop_ids": [
                [
                    9596
                ]
            ]
        },
        {
            "id": "12387-2404091500--32385-1-16216-2404091945",
            "origin_place_id": 12387,
            "destination_place_id": 16216,
            "departure": "2024-04-09T15:00:00",
            "arrival": "2024-04-09T19:45:00",
            "segment_ids": [
                "12387-9596-2404091500-2404091638--32385",
                "9596-16216-2404091720-2404091945--32385"
            ],
            "duration": 465,
            "stop_count": 1,
            "marketing_carrier_ids": [
                -32385
            ],
            "operating_carrier_ids": [
                -32385
            ],
            "stop_ids": [
                [
                    9596
                ]
            ]
        }
],
"segments": [
        {
            "id": "16216-9596-2404021419-2404022148--32385",
            "origin_place_id": 16216,
            "destination_place_id": 9596,
            "arrival": "2024-04-02T21:48:00",
            "departure": "2024-04-02T14:19:00",
            "duration": 269,
            "marketing_flight_number": "437",
            "marketing_carrier_id": -32385,
            "operating_carrier_id": -32385,
            "mode": "flight"
        },
        {
            "id": "9596-12387-2404022225-2404030005--32385",
            "origin_place_id": 9596,
            "destination_place_id": 12387,
            "arrival": "2024-04-03T00:05:00",
            "departure": "2024-04-02T22:25:00",
            "duration": 100,
            "marketing_flight_number": "2178",
            "marketing_carrier_id": -32385,
            "operating_carrier_id": -32385,
            "mode": "flight"
        }
]
  
```

{% endcode %}

{% hint style="info" %}
It is just a sample API response. Some objects will have more attributes. New arrays will also be there.
{% endhint %}

### Understanding the Response

In the JSON response, you may observe that many objects include references (IDs or codes) to objects from other lists. This pattern is employed in our API to prevent redundant data and reduce the overall size by allowing multiple objects to reference the same data.

<figure><img src="https://3461487639-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F64KQudssITthDnR3aDZs%2Fuploads%2FQzKpayxnyjvQsvcgDKAM%2Fimage.png?alt=media&#x26;token=11481132-1f24-45e9-967b-82902639e32b" alt=""><figcaption><p>Response Fields</p></figcaption></figure>

| Field Name    | Description                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `itineraries` | A return trip will consist of 2 `legs`, while a one-way trip will consist of 1 `leg`. An `itinerary` will contain a `deepLink` field which takes the traveler to the booking page.                      |
| `legs`        | Provides information about the flight leg from the destination to the origin. A leg comprises a single segment for a direct flight and may consist of multiple segments if there are several stopovers. |
| `segments`    | Displays information about individual stops within a `leg`. For instance, if a `leg` includes one-stop, the segment will provide details about the stopover, including its duration and location.       |
| `places`      | Reveals specific stops within a `leg`. For instance, in the case of a `leg` with a single stop, the segment will present information about the stopover, including its duration and location.           |
| `carriers`    | Like `places`, the `carriers` section contains details about the airlines mentioned in the `itineraries`.                                                                                               |
| `agents`      | Just like `places`, the `agents` section comprises details about the Online Travel Agencies (OTAs) mentioned in the `itineraries`.                                                                      |

{% hint style="info" %}
Sometimes you might have to make more than one API call to get complete data. Since we compare a lot of airlines and vendors sometimes it becomes impossible to pull this much amount of data at once
{% endhint %}

# Airline & Airport code API

API endpoint for this API is: **`https://api.flightapi.io/iata`**

## Guide

Your API requests are authenticated using API keys. Any request that doesn't include an API key will return an error.

You can generate an API key from your Dashboard at any time.

Here is the list of default parameters you have to use with this API:

| Parameters                                                      | Description                                                                                                                                                    | Type     |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| <p>api\_key<br><br><mark style="color:red;">required</mark></p> | This is your personal API key. You can find this on your Dashboard.                                                                                            | `String` |
| <p>name<br><br><mark style="color:red;">required</mark></p>     | This could be any string matching an airline or an airport.                                                                                                    | `String` |
| <p>type<br><br><mark style="color:red;">required</mark></p>     | <p>type could be either an <strong><code>airline</code></strong> or <strong><code>airport</code></strong>.<br><br><mark style="color:red;">required</mark></p> | `String` |

## Usage

You have to send a GET request to  `https://api.flightapi.io/trackbyroute` along with all the parameters.&#x20;

Take a look at how you might call this API using various different coding languages.

{% tabs %}
{% tab title="curl" %}

```bash
curl "https://api.flightapi.io/iata/api-key?name=american&type=airline"
```

{% endtab %}

{% tab title="Node" %}

```javascript
// require the Unirest or any other module to make an HTTP GET request
const unirest = require('unirest')

unirest.get('https://api.flightapi.io/iata/api-key?name=american&type=airline')
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error);
  });


```

{% endtab %}

{% tab title="Python" %}

```python
// Set your API key before making the request
import requests

resp = requests.get('https://api.flightapi.io/iata/api-key?name=american&type=airline')
print (resp.json())
```

{% endtab %}
{% endtabs %}

### Response

The sample response of the API will look somewhat like this.

{% code overflow="wrap" fullWidth="false" %}

```json
// Sample Response
{
  "data": [
    {
      "fs": "AA",
      "name": "American Airlines"
    },
    {
      "fs": "SCM",
      "name": "American Jet International"
    },
    {
      "fs": "NA",
      "name": "North American Airlines"
    },
    {
      "fs": "GTW",
      "name": "American Air Charter"
    }
  ]
}
  
```

{% endcode %}

{% hint style="info" %}
It is just a sample API response. Some objects will have more attributes. A new array might also be there.
{% endhint %}


api = 691c6333b074f3ac1a7368b5