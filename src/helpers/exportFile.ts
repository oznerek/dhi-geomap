export function downloadGeoJSON(polygonList: [number, number][][]) {
  const geoJson = prepareGeoJSON(polygonList);
  const blob = new Blob([JSON.stringify(geoJson, null, 2)], {
    type: "application/geo+json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mapping-dat.geojson";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function prepareGeoJSON(polygonList: [number, number][][]) {
  const iso = new Date().toISOString();

  const geoJson = {
    type: "FeatureCollection",
    features: polygonList.map((polygon) => ({
      type: "Feature",
      properties: {
        id: "polygon-" + Math.random() * 100,
        type: "drawn_polygon",
        color: [0, 0, 255, 100],
        created_at: iso,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[...polygon, polygon[0]]],
      },
    })),
  };

  return geoJson;
}
