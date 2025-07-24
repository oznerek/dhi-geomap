import React from "react";
import { Box } from "@mui/material";
import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";
import { BitmapLayer } from "@deck.gl/layers";
import {
  useInitialMapStore,
  usePointStore,
  usePolygonListStore,
  usePolygonStore,
} from "stores/mapStore";
import { useDrawStore } from "stores/drawStore";

const tileLayer = new TileLayer({
  id: "osm-tiles",
  data: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
  minZoom: 0,
  maxZoom: 20,
  tileSize: 256,
  renderSubLayers: (props) => {
    const { bbox } = props.tile;

    if (
      "west" in bbox &&
      "south" in bbox &&
      "east" in bbox &&
      "north" in bbox
    ) {
      const { west, south, east, north } = bbox;

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north],
      });
    } else {
      return null;
    }
  },
});

function Maps() {
  const drawPolygon = useDrawStore((state) => state.drawPolygon);
  const polygonPoints = usePolygonStore((state) => state.polygonPoints);
  const setPolygonPoints = usePolygonStore((state) => state.setPolygonPoints);
  const polygonList = usePolygonListStore((state) => state.polygonList);
  const initialMap = useInitialMapStore((state) => state.initialMap);
  const points = usePointStore((state) => state.points);

  const currentPolygonLayer = [
    new PolygonLayer({
      id: "drawn-polygon",
      data: [
        {
          polygon: polygonPoints,
        },
      ],
      getPolygon: (d) => d.polygon,
      getFillColor: [0, 120, 255, 80],
      stroked: true,
      getLineColor: [0, 120, 255],
      lineWidthMinPixels: 2,
      pickable: true,
    }),
  ];
  const savedPolygonLayers = polygonList.map(
    (poly, index) =>
      new PolygonLayer({
        id: `saved-polygon-${index}`,
        data: [{ polygon: poly }],
        getPolygon: (d) => d.polygon,
        getFillColor: [0, 0, 255, 100],
        getLineColor: [0, 0, 255, 200],
        lineWidthMinPixels: 2,
      })
  );
  const geoJsonLayer = new GeoJsonLayer({
    id: "points-layer",
    data: points,
    pickable: true,
    stroked: false,
    filled: true,
    pointRadiusMinPixels: 4,
    getPointRadius: 10000,
    getFillColor: [200, 0, 80, 180],
    getLineColor: [0, 0, 0],
  });
  function handleMapClick(event: any): void {
    const coords = event.coordinate;
    if (coords && drawPolygon) {
      const [lng, lat] = coords;
      setPolygonPoints([...polygonPoints, [lng, lat]]);
    }
  }
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <DeckGL
        getCursor={() => (drawPolygon ? "crosshair" : "grab")}
        initialViewState={initialMap}
        controller={true}
        layers={[
          tileLayer,
          currentPolygonLayer,
          savedPolygonLayers,
          geoJsonLayer,
        ]}
        onClick={handleMapClick}
      ></DeckGL>
    </Box>
  );
}

export default Maps;
