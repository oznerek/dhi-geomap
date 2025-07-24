# 🗺️ DHI-geomap – Interactive Map with Polygon Drawing and GeoJSON Support

A React-based web application that lets you draw polygons on a map, import/export GeoJSON data, search locations, and view feature data in a dynamic table.

---

## 🚀 How to Run the Application

1. **Clone the repository**

   ```bash
   git clone https://github.com/oznerek/dhi-geomap
   cd dhi-geomap

   ```

2. **Install dependecies**
   npm install

3. **Start the development server**
   npm start

4. **Open browser**
   http://localhost:3000

## ✨ Features

## 🗺️ 1. OpenStreetMap Display

Base map using OpenStreetMap tiles

Rendered with deck.gl

## ✏️ 2. Polygon Drawing

Toggle drawing mode to draw polygons on the map

Supports multiple polygons

Geometry is stored in memory and can be exported

## 📤 3. Export to GeoJSON

Export all drawn polygons as a .geojson file

Conforms to the official GeoJSON standard

## 🌐 4. Import GeoJSON from URL

Paste a valid GeoJSON file URL

Features from the external source are displayed on the map and in the data table

## 🔍 5. Location Search

Search modal accepts:

Place name (e.g. New York)

Coordinates (e.g. 40.7128 74.0060)

Automatically pans and zooms the map to the selected location

## 📊 6. Data Table View

View data of currently displayed features (drawn or imported)

Auto-generated table columns based on GeoJSON properties

Supports pagination for large datasets

## 🧰 Tech Stack

React

deck.gl

OpenStreetMap

Material UI for UI components

## 👤 Author

Created by [Michał Oznerek](https://github.com/oznerek)
