/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


var cloneDeep = require('lodash.clonedeep');
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
var reportedErrorsMap = {};

/** @module wgs84-intersect-util */
var WGS84IntersectUtil = exports;

var logError = function(e, typeID) {
   if (!typeID) {
      typeID = "N/A";
   }
   if (!reportedErrorsMap[e.name + typeID]) {
      var errorString = e.name + ": " + "ID: " + typeID + " " + e.message + "\n";
      console.error(errorString);
      reportedErrorsMap[e.name + typeID] = true;
   }
};

WGS84IntersectUtil.intersectPolygons = function(searchWithin, polygons) {
   var intersectedPolygons = [];
   var overlap;
   var overlapExtentPoints;

   for (var polyIndex = 0; polyIndex < polygons.length; polyIndex++) {
      try {
         overlap = intersect(searchWithin, polygons[polyIndex]);
         if (overlap) {
            intersectedPolygons.push(cloneDeep(polygons[polyIndex]));
         }
      } catch (e) {
         logError(e, polygons[polyIndex].id);
      }
   }

   return intersectedPolygons;
};

WGS84IntersectUtil.intersectLineBBox = function(line, bbox) {
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
         Array.prototype.push.apply(intersectionPoints, intersection);
      }
   }

   return intersectionPoints;
};

WGS84IntersectUtil.intersectLines = function(searchWithin, lines) {
   var intersectedLines = [];
   var bbox = extent(searchWithin);
   var intersectionPoints;
   var pointOnLine;
   var line;

   for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      intersectionPoints = WGS84IntersectUtil.intersectLineBBox(lines[lineIndex], bbox);
      if (intersectionPoints.length) {
         line = cloneDeep(lines[lineIndex]);
         line.properties.intersectionPoints = intersectionPoints;
         intersectedLines.push(line);
      } else {
         pointOnLine = pointOnSurface(lines[lineIndex]);
         if (inside(pointOnLine, bboxPolygon(bbox))) {
            line = cloneDeep(lines[lineIndex]);
            line.properties.intersectionPoints = [pointOnLine.geometry];
            intersectedLines.push(line);
         }
      }
   }

   return intersectedLines;
};
