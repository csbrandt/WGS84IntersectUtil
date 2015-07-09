[![NPM](https://nodei.co/npm/wgs84-intersect-util.png?downloads=true&stars=true)](https://nodei.co/npm/wgs84-intersect-util/)

Geographic intersect utilities using WGS84 datum

Installation
-------------
    $ npm install wgs84-intersect-util

Methods
--------
    intersectPolygons(searchWithin, polygons)
> Intersect a list of GeoJSON polygons with a given GeoJSON polygon
>
> **searchWithin**:  *object*,  GeoJSON polygon
>
> **polygons**:  *array*,  GeoJSON polygons
>
> **Returns**
>
> *array*, a list of polygons that intersect `searchWithin`

    intersectLineBBox(line, bbox)
> Intersect a GeoJSON line with a bounding box
>
> **line**:  *object*, GeoJSON LineString
>
> **bbox**:  *array*, an array of bounding box coordinates in the form: [xLow, yLow, xHigh, yHigh]


> **Returns**
>
> *array*,  a list of GeoJSON points that represent intersection points on `bbox`

    intersectLines(searchWithin, lines)
> Intersect a list of GeoJSON LineStrings with a given GeoJSON polygon
>
> **searchWithin**:  *object*,  GeoJSON polygon
>
> **lines**:  *array*,  GeoJSON LineStrings
>
> **Returns**
>
> *array*,  a list of LineStrings that intersect `searchWithin`


Running Tests
--------------
Install the development dependencies:

    $ npm install

Then run the tests:

    $ npm test

Code Coverage
--------------
Install the development dependencies:

    $ npm install

Then run coverage

    $ npm run coverage

View coverage reports

    $ firefox coverage/lcov-report/index.html

Browser Bundle
---------------
    $ npm run build
