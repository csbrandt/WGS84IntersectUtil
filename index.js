/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


var geojsonUtils = require('geojson-utils');
var featurecollection = require('turf-featurecollection');
var pointOnSurface = require('turf-point-on-surface');
var bboxPolygon = require('turf-bbox-polygon');
var linestring = require('turf-linestring');
var intersect = require('turf-intersect');
var explode = require('turf-explode');
var within = require('turf-within');
var extent = require('turf-extent');
var inside = require('turf-inside');

var intersectPolygons = function(searchWithin, polygons) {
   var intersectedPolygons = [];
   var overlap;
   var overlapExtentPoints;

   for (var polyIndex = 0; polyIndex < polygons.length; polyIndex++) {
      if (polygons[polyIndex].properties.overlapExtent) {
         overlapExtentPoints = explode(bboxPolygon(polygons[polyIndex].properties.overlapExtent));
         if (within(overlapExtentPoints, featurecollection([searchWithin])).features.length) {
            intersectedPolygons.push(polygons[polyIndex]);
         }
      } else {
         overlap = intersect(searchWithin, polygons[polyIndex]);
         if (overlap) {
            polygons[polyIndex].properties.overlapExtent = extent(featurecollection([overlap]));
            intersectedPolygons.push(polygons[polyIndex]);
         }
      }
   }

   return intersectedPolygons;
};

var intersectLineBBox = function(line, bbox) {
   var segments = [];
   var intersection;
   var intersectionPoints = [];
   // top
   segments[0] = linestring([[bbox[0], bbox[3]], [bbox[2], bbox[3]]]);
   // bottom
   segments[1] = linestring([[bbox[0], bbox[1]], [bbox[2], bbox[1]]]);
   // left
   segments[2] = linestring([[bbox[0], bbox[1]], [bbox[0], bbox[3]]]);
   // right
   segments[3] = linestring([[bbox[2], bbox[3]], [bbox[2], bbox[1]]]);

   for (var c = 0; c < segments.length; c++) {
      intersection = geojsonUtils.lineStringsIntersect(segments[c].geometry, line.geometry);

      if (intersection) {
         intersectionPoints.push(intersection);
      }
   }

   return intersectionPoints;
};

var intersectLines = function(searchWithin, lines) {
   var intersectedLines = [];
   var bbox = extent(searchWithin);

   // for each given line
   for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      if (intersectLineBBox(lines[lineIndex], bbox).length) {
         intersectedLines.push(lines[lineIndex]);
      } else if (inside(pointOnSurface(lines[lineIndex]), bboxPolygon(bbox))) {
         intersectedLines.push(lines[lineIndex]);
      }
   }

   return intersectedLines;
};
