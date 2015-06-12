expect = require('expect.js')
_ = require('lodash')
WGS84IntersectUtil = require('../')
mtDiabloFC = require('./mtDiablo.json')

mtDiabloBBox = [-121.91762745380402,37.880463790016,-121.91213428974153,37.884232042827264]

noIntersection = {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -121.91652882099152,
          37.882906825336
        ],
        [
          -121.91534757614134,
          37.882906825336
        ],
        [
          -121.91534757614134,
          37.8835444396404
        ],
        [
          -121.91652882099152,
          37.8835444396404
        ],
        [
          -121.91652882099152,
          37.882906825336
        ]
      ]
    ]
  },
  "properties": {}
}

intersectLines = {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -121.91660821437836,
          37.880588267657366
        ],
        [
          -121.9163829088211,
          37.880588267657366
        ],
        [
          -121.9163829088211,
          37.881742477189
        ],
        [
          -121.91660821437836,
          37.881742477189
        ],
        [
          -121.91660821437836,
          37.880588267657366
        ]
      ]
    ]
  },
  "properties": {}
}

intersectPolygon = {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -121.91479504108429,
          37.88142915851499
        ],
        [
          -121.91459119319917,
          37.88142915851499
        ],
        [
          -121.91459119319917,
          37.88191607208041
        ],
        [
          -121.91479504108429,
          37.88191607208041
        ],
        [
          -121.91479504108429,
          37.88142915851499
        ]
      ]
    ]
  },
  "properties": {}
}

points = null
polygons = null
lines = null

describe 'WGS84IntersectUtil', ->

   beforeEach ->
      points = _.filter mtDiabloFC.features, 
         geometry: {
            type: 'Point'
         }
      polygons = _.filter mtDiabloFC.features, 
         geometry: {
            type: 'Polygon'
         }
      lines = _.filter mtDiabloFC.features, 
         geometry: {
            type: 'LineString'
         }

   describe 'intersectPolygons', ->
      it 'should return no intersections with noIntersection polygon', ->
         expect(WGS84IntersectUtil.intersectPolygons(noIntersection, polygons)).to.have.length(0)

      it 'should return no intersections with intersectLines polygon', ->
         expect(WGS84IntersectUtil.intersectPolygons(intersectLines, polygons)).to.have.length(0)

      it 'should return an intersection with intersectPolygon polygon', ->
         expect(WGS84IntersectUtil.intersectPolygons(intersectPolygon, polygons)).to.have.length(1)

   describe 'intersectLines', ->
      it 'should return no intersections with noIntersection polygon', ->
         expect(WGS84IntersectUtil.intersectLines(noIntersection, lines)).to.have.length(0)

      it 'should return intersections with intersectLines polygon', ->
         expect(WGS84IntersectUtil.intersectLines(intersectLines, lines)).to.have.length(3)

      it 'should return intersections with intersectPolygon polygon', ->
         expect(WGS84IntersectUtil.intersectLines(intersectPolygon, lines)).to.have.length(3)
