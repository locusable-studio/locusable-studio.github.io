(function (global) {
  "use strict";

  var TILE_SOURCE_URL = "https://tiles.openfreemap.org/planet";
  var GLYPHS_URL = "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf";
  var SOURCE_ID = "openmaptiles";
  var LAYER_SOURCE_ID = "openfreemap";

  var BUILDING_BLEND_FACTOR = 0.14;
  var BUILDING_FILL_OPACITY = 0.84;
  var LANDCOVER_FILL_OPACITY = 0.7;
  var LANDUSE_FILL_OPACITY = 0.55;
  var MAP_BUILDING_MIN_ZOOM_DEFAULT = 8.0;
  var MAP_BUILDING_MIN_ZOOM_PRESERVE = 8.2;
  var DETAIL_PRESERVE_DISTANCE_METERS = 30000;

  var ROAD_MINOR_OVERVIEW_MIN_ZOOM = 0.0;
  var ROAD_MINOR_DETAIL_MIN_ZOOM = 6.0;
  var ROAD_PATH_OVERVIEW_MIN_ZOOM = 5.0;
  var ROAD_PATH_DETAIL_MIN_ZOOM = 8.0;
  var ROAD_OVERVIEW_MAX_ZOOM = 11.8;

  var MAP_WATERWAY_WIDTH_STOPS = [[0, 0.2], [6, 0.34], [12, 0.8], [18, 2.4]];
  var MAP_RAIL_WIDTH_STOPS = [[3, 0.4], [6, 0.7], [10, 1], [18, 1.5]];
  var MAP_ROAD_MAJOR_CLASSES = ["motorway"];
  var MAP_ROAD_MINOR_HIGH_CLASSES = [
    "primary", "primary_link", "secondary", "secondary_link",
    "motorway_link", "trunk", "trunk_link"
  ];
  var MAP_ROAD_MINOR_MID_CLASSES = ["tertiary", "tertiary_link", "minor"];
  var MAP_ROAD_MINOR_LOW_CLASSES = [
    "residential", "living_street", "unclassified", "road",
    "street", "street_limited", "service"
  ];
  var MAP_ROAD_PATH_CLASSES = ["path", "pedestrian", "cycleway", "track"];
  var MAP_RAIL_CLASSES = ["rail", "transit"];

  var MAP_ROAD_MINOR_HIGH_OVERVIEW_WIDTH_STOPS = [[0, 0.1], [4, 0.18], [8, 0.3], [11, 0.46]];
  var MAP_ROAD_MINOR_MID_OVERVIEW_WIDTH_STOPS = [[0, 0.08], [4, 0.14], [8, 0.24], [11, 0.36]];
  var MAP_ROAD_MINOR_LOW_OVERVIEW_WIDTH_STOPS = [[0, 0.06], [4, 0.1], [8, 0.18], [11, 0.3]];
  var MAP_ROAD_MINOR_HIGH_DETAIL_WIDTH_STOPS = [[6, 0.46], [10, 0.8], [14, 1.48], [18, 2.7]];
  var MAP_ROAD_MINOR_MID_DETAIL_WIDTH_STOPS = [[6, 0.34], [10, 0.62], [14, 1.2], [18, 2.35]];
  var MAP_ROAD_MINOR_LOW_DETAIL_WIDTH_STOPS = [[6, 0.24], [10, 0.44], [14, 0.84], [18, 1.65]];
  var MAP_ROAD_PATH_OVERVIEW_WIDTH_STOPS = [[5, 0.06], [8, 0.1], [11, 0.2]];
  var MAP_ROAD_PATH_DETAIL_WIDTH_STOPS = [[8, 0.2], [12, 0.42], [16, 0.85], [18, 1.3]];
  var MAP_ROAD_MAJOR_WIDTH_STOPS = [[0, 0.36], [3, 0.52], [9, 1.1], [14, 2.05], [18, 3.3]];

  var LINE_GEOMETRY_FILTER = [
    "match",
    ["geometry-type"],
    ["LineString", "MultiLineString"],
    true,
    false
  ];

  var DEFAULT_LAYER_OPTIONS = {
    includeLandcover: false,
    includeLanduse: false,
    includeBuildings: false,
    includeWater: true,
    includeParks: true,
    includeAeroway: false,
    includeRail: false,
    includeRoads: true,
    includeRoadPath: true,
    includeRoadMinorLow: true,
    includeRoadOutline: true
  };

  var LAYER_DEFS = [
    { id: "landcover", name: "Landcover", optionKey: "includeLandcover", defaultOn: false },
    { id: "landuse", name: "Landuse", optionKey: "includeLanduse", defaultOn: false },
    { id: "buildings", name: "Building", optionKey: "includeBuildings", defaultOn: false },
    { id: "water", name: "Water+Waterway", optionKey: "includeWater", defaultOn: true },
    { id: "parks", name: "Park", optionKey: "includeParks", defaultOn: true },
    { id: "roads", name: "Transportation (motorway/...)", optionKey: "includeRoads", defaultOn: true },
    { id: "rail", name: "Transportation (rail/...)", optionKey: "includeRail", defaultOn: false, pro: true },
    { id: "aeroway", name: "Aeroway", optionKey: "includeAeroway", defaultOn: false, pro: true }
  ];

  function parseHex(hex) {
    var value = String(hex || "").trim();
    if (value.charAt(0) === "#") value = value.slice(1);
    if (value.length === 3) {
      value = value.split("").map(function (ch) { return ch + ch; }).join("");
    }
    if (value.length !== 6) return null;
    var intValue = parseInt(value, 16);
    if (Number.isNaN(intValue)) return null;
    return {
      r: (intValue >> 16) & 255,
      g: (intValue >> 8) & 255,
      b: intValue & 255
    };
  }

  function blendHex(hexA, hexB, weight) {
    var a = parseHex(hexA);
    var b = parseHex(hexB);
    if (!a || !b) return hexA && String(hexA).length ? hexA : hexB;
    var t = Math.min(Math.max(weight == null ? 0.5 : weight, 0), 1);
    function mix(from, to) {
      return Math.round(from * (1 - t) + to * t);
    }
    function byte(n) {
      var s = n.toString(16);
      return s.length === 1 ? "0" + s : s;
    }
    return "#" + byte(mix(a.r, b.r)) + byte(mix(a.g, b.g)) + byte(mix(a.b, b.b));
  }

  function relativeLuminance(hex) {
    var rgb = parseHex(hex);
    if (!rgb) return null;
    function channel(value) {
      var c = value / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
  }

  function contrastingInk(hex) {
    var luminance = relativeLuminance(hex);
    if (luminance == null) return "#1a1a1a";
    return luminance > 0.45 ? "#1a1a1a" : "#f5f5f5";
  }

  function normalizeTheme(raw) {
    var uiBg = (raw.ui && raw.ui.bg) || "#F4F1EA";
    var uiText = (raw.ui && raw.ui.text) || "#2E2A26";
    var map = raw.map || {};
    var transport = map.transportation || {};
    var land = map.land || uiBg;
    var water = map.water || "#C7CDD0";
    var park = map.park || blendHex(land, uiText, 0.08);
    var building = map.building || blendHex(land, uiText, 0.14);
    var landcover = map.landcover || blendHex(land, park, 0.45);
    var landuse = map.landuse || blendHex(land, building, 0.2);
    var motorway = transport.motorway || uiText;
    var primarySecondaryTrunk = transport.primary_secondary_trunk || motorway;
    var tertiaryMinor = transport.tertiary_minor || primarySecondaryTrunk;
    var residentialService = transport.residential_service || blendHex(tertiaryMinor, land, 0.28);
    var pathPedestrianCyclewayTrack = transport.path_pedestrian_cycleway_track || residentialService;
    var transportationOutline = transport.outline || blendHex(land, uiText, 0.12);

    return {
      id: raw.id,
      name: raw.name || raw.id,
      description: raw.description || "",
      badge: raw.badge || null,
      ui: { bg: uiBg, text: uiText },
      map: {
        land: land,
        landcover: landcover,
        landuse: landuse,
        water: water,
        waterway: map.waterway || water,
        park: park,
        building: building,
        aeroway: map.aeroway || blendHex(land, water, 0.2),
        transportationRailTransit: map.transportation_rail_transit || uiText,
        transportation: {
          motorway: motorway,
          primarySecondaryTrunk: primarySecondaryTrunk,
          tertiaryMinor: tertiaryMinor,
          residentialService: residentialService,
          pathPedestrianCyclewayTrack: pathPedestrianCyclewayTrack,
          outline: transportationOutline
        }
      }
    };
  }

  function interpolateExpr(stops) {
    var expr = ["interpolate", ["linear"], ["zoom"]];
    stops.forEach(function (stop) {
      expr.push(stop[0], stop[1]);
    });
    return expr;
  }

  function scaledStops(stops, scale) {
    return stops.map(function (stop) {
      return [stop[0], stop[1] * scale];
    });
  }

  function lineClassFilter(classes) {
    return [
      "all",
      LINE_GEOMETRY_FILTER,
      ["match", ["get", "class"], classes, true, false]
    ];
  }

  function visibility(isVisible) {
    return isVisible ? "visible" : "none";
  }

  function resolveBuildingMinZoom(distanceMeters) {
    if (Number.isFinite(distanceMeters) && distanceMeters <= DETAIL_PRESERVE_DISTANCE_METERS) {
      return MAP_BUILDING_MIN_ZOOM_PRESERVE;
    }
    return MAP_BUILDING_MIN_ZOOM_DEFAULT;
  }

  function layerOptionsFromToggles(toggleState) {
    var options = Object.assign({}, DEFAULT_LAYER_OPTIONS);
    LAYER_DEFS.forEach(function (def) {
      if (Object.prototype.hasOwnProperty.call(toggleState, def.id)) {
        options[def.optionKey] = !!toggleState[def.id];
      }
    });
    return options;
  }

  function defaultToggleState() {
    var state = {};
    LAYER_DEFS.forEach(function (def) {
      state[def.id] = def.defaultOn;
    });
    return state;
  }

  function makeStyleJSON(theme, options, distanceMeters) {
    var map = theme.map;
    var transportation = map.transportation;
    var buildingFill = map.building
      ? map.building
      : blendHex(map.land, contrastingInk(map.land), BUILDING_BLEND_FACTOR);
    var buildingMinZoom = resolveBuildingMinZoom(distanceMeters);

    var roadMinorHighCasingStops = scaledStops(MAP_ROAD_MINOR_HIGH_DETAIL_WIDTH_STOPS, 1.45);
    var roadMinorMidCasingStops = scaledStops(MAP_ROAD_MINOR_MID_DETAIL_WIDTH_STOPS, 1.15);
    var roadPathCasingStops = scaledStops(MAP_ROAD_PATH_DETAIL_WIDTH_STOPS, 1.6);
    var roadMajorCasingStops = scaledStops(MAP_ROAD_MAJOR_WIDTH_STOPS, 1.38);

    var sharedSource = {
      type: "vector",
      url: TILE_SOURCE_URL,
      maxzoom: 14
    };

    return {
      version: 8,
      name: theme.name,
      glyphs: GLYPHS_URL,
      sources: (function () {
        var sources = {};
        sources[SOURCE_ID] = sharedSource;
        sources[LAYER_SOURCE_ID] = sharedSource;
        return sources;
      })(),
      layers: [
        {
          id: "background",
          type: "background",
          paint: { "background-color": map.land }
        },
        {
          id: "landcover",
          source: LAYER_SOURCE_ID,
          "source-layer": "landcover",
          type: "fill",
          layout: { visibility: visibility(options.includeLandcover) },
          paint: {
            "fill-color": map.landcover,
            "fill-opacity": LANDCOVER_FILL_OPACITY
          }
        },
        {
          id: "landuse",
          source: LAYER_SOURCE_ID,
          "source-layer": "landuse",
          type: "fill",
          layout: { visibility: visibility(options.includeLanduse) },
          paint: {
            "fill-color": map.landuse,
            "fill-opacity": LANDUSE_FILL_OPACITY
          }
        },
        {
          id: "park",
          source: LAYER_SOURCE_ID,
          "source-layer": "park",
          type: "fill",
          layout: { visibility: visibility(options.includeParks) },
          paint: { "fill-color": map.park }
        },
        {
          id: "water",
          source: LAYER_SOURCE_ID,
          "source-layer": "water",
          type: "fill",
          layout: { visibility: visibility(options.includeWater) },
          paint: { "fill-color": map.water }
        },
        {
          id: "waterway",
          source: LAYER_SOURCE_ID,
          "source-layer": "waterway",
          type: "line",
          filter: lineClassFilter(["river", "canal", "stream", "ditch"]),
          paint: {
            "line-color": map.waterway,
            "line-width": interpolateExpr(MAP_WATERWAY_WIDTH_STOPS)
          },
          layout: {
            visibility: visibility(options.includeWater),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "aeroway",
          source: LAYER_SOURCE_ID,
          "source-layer": "aeroway",
          type: "fill",
          filter: ["match", ["geometry-type"], ["MultiPolygon", "Polygon"], true, false],
          layout: { visibility: visibility(options.includeAeroway) },
          paint: {
            "fill-color": map.aeroway,
            "fill-opacity": 0.85
          }
        },
        {
          id: "building",
          source: LAYER_SOURCE_ID,
          "source-layer": "building",
          type: "fill",
          minzoom: buildingMinZoom,
          layout: { visibility: visibility(options.includeBuildings) },
          paint: {
            "fill-color": buildingFill,
            "fill-opacity": BUILDING_FILL_OPACITY
          }
        },
        {
          id: "rail",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          filter: lineClassFilter(MAP_RAIL_CLASSES),
          paint: {
            "line-color": map.transportationRailTransit,
            "line-width": interpolateExpr(MAP_RAIL_WIDTH_STOPS),
            "line-opacity": interpolateExpr([[0, 0.56], [12, 0.62], [18, 0.72]]),
            "line-dasharray": [2.0, 1.6]
          },
          layout: {
            visibility: visibility(options.includeRail),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-overview-high",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_OVERVIEW_MIN_ZOOM,
          maxzoom: ROAD_OVERVIEW_MAX_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_HIGH_CLASSES),
          paint: {
            "line-color": transportation.primarySecondaryTrunk,
            "line-width": interpolateExpr(MAP_ROAD_MINOR_HIGH_OVERVIEW_WIDTH_STOPS),
            "line-opacity": interpolateExpr([[0, 0.66], [8, 0.76], [12, 0]])
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-overview-mid",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_OVERVIEW_MIN_ZOOM,
          maxzoom: ROAD_OVERVIEW_MAX_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_MID_CLASSES),
          paint: {
            "line-color": transportation.tertiaryMinor,
            "line-width": interpolateExpr(MAP_ROAD_MINOR_MID_OVERVIEW_WIDTH_STOPS),
            "line-opacity": interpolateExpr([[0, 0.46], [8, 0.56], [12, 0]])
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-overview-low",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_OVERVIEW_MIN_ZOOM,
          maxzoom: ROAD_OVERVIEW_MAX_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_LOW_CLASSES),
          paint: {
            "line-color": transportation.residentialService,
            "line-width": interpolateExpr(MAP_ROAD_MINOR_LOW_OVERVIEW_WIDTH_STOPS),
            "line-opacity": options.includeRoadMinorLow
              ? interpolateExpr([[0, 0.26], [8, 0.34], [12, 0]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-path-overview",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_PATH_OVERVIEW_MIN_ZOOM,
          maxzoom: ROAD_OVERVIEW_MAX_ZOOM,
          filter: lineClassFilter(MAP_ROAD_PATH_CLASSES),
          paint: {
            "line-color": transportation.pathPedestrianCyclewayTrack,
            "line-width": interpolateExpr(MAP_ROAD_PATH_OVERVIEW_WIDTH_STOPS),
            "line-opacity": options.includeRoadPath
              ? interpolateExpr([[5, 0.45], [9, 0.58], [12, 0]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-major-casing",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          filter: lineClassFilter(MAP_ROAD_MAJOR_CLASSES),
          paint: {
            "line-color": transportation.outline,
            "line-width": interpolateExpr(roadMajorCasingStops),
            "line-opacity": options.includeRoadOutline ? 0.95 : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-high-casing",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_HIGH_CLASSES),
          paint: {
            "line-color": transportation.outline,
            "line-width": interpolateExpr(roadMinorHighCasingStops),
            "line-opacity": options.includeRoadOutline
              ? interpolateExpr([[6, 0.72], [12, 0.85], [18, 0.92]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-mid-casing",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_MID_CLASSES),
          paint: {
            "line-color": transportation.outline,
            "line-width": interpolateExpr(roadMinorMidCasingStops),
            "line-opacity": options.includeRoadOutline
              ? interpolateExpr([[6, 0.42], [12, 0.56], [18, 0.66]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-path-casing",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_PATH_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_PATH_CLASSES),
          paint: {
            "line-color": transportation.outline,
            "line-width": interpolateExpr(roadPathCasingStops),
            "line-opacity": options.includeRoadOutline && options.includeRoadPath
              ? interpolateExpr([[8, 0.62], [12, 0.72], [18, 0.85]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-major",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          filter: lineClassFilter(MAP_ROAD_MAJOR_CLASSES),
          paint: {
            "line-color": transportation.motorway,
            "line-width": interpolateExpr(MAP_ROAD_MAJOR_WIDTH_STOPS)
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-high",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_HIGH_CLASSES),
          paint: {
            "line-color": transportation.primarySecondaryTrunk,
            "line-width": interpolateExpr(MAP_ROAD_MINOR_HIGH_DETAIL_WIDTH_STOPS),
            "line-opacity": interpolateExpr([[6, 0.84], [10, 0.92], [18, 1]])
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-mid",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_MID_CLASSES),
          paint: {
            "line-color": transportation.tertiaryMinor,
            "line-width": interpolateExpr(MAP_ROAD_MINOR_MID_DETAIL_WIDTH_STOPS),
            "line-opacity": interpolateExpr([[6, 0.62], [10, 0.74], [18, 0.86]])
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-minor-low",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_MINOR_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_MINOR_LOW_CLASSES),
          paint: {
            "line-color": transportation.residentialService,
            "line-width": interpolateExpr(MAP_ROAD_MINOR_LOW_DETAIL_WIDTH_STOPS),
            "line-opacity": options.includeRoadMinorLow
              ? interpolateExpr([[6, 0.34], [10, 0.46], [18, 0.58]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        },
        {
          id: "road-path",
          source: LAYER_SOURCE_ID,
          "source-layer": "transportation",
          type: "line",
          minzoom: ROAD_PATH_DETAIL_MIN_ZOOM,
          filter: lineClassFilter(MAP_ROAD_PATH_CLASSES),
          paint: {
            "line-color": transportation.pathPedestrianCyclewayTrack,
            "line-width": interpolateExpr(MAP_ROAD_PATH_DETAIL_WIDTH_STOPS),
            "line-opacity": options.includeRoadPath
              ? interpolateExpr([[8, 0.7], [12, 0.82], [18, 0.95]])
              : 0.0
          },
          layout: {
            visibility: visibility(options.includeRoads),
            "line-cap": "round",
            "line-join": "round"
          }
        }
      ]
    };
  }

  global.ThemeMapStyle = {
    DEFAULT_DISTANCE_METERS: 4000,
    LAYER_DEFS: LAYER_DEFS,
    defaultToggleState: defaultToggleState,
    layerOptionsFromToggles: layerOptionsFromToggles,
    normalizeTheme: normalizeTheme,
    makeStyleJSON: makeStyleJSON
  };
})(typeof window !== "undefined" ? window : globalThis);
