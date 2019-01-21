# -*- coding: utf-8 -*-
"""
Created on Sat Jan 19 16:14:49 2019

@author: Sampo Vesanen

This is part of my gradu!
"""

# import libraries
import pandas as pd
import geopandas as gpd
import os
from shapely.geometry import Point, LineString
from shapely.ops import unary_union
import osmnx as ox
import networkx as nx
import matplotlib.pyplot as plt
from geopandas.tools import geocode
import reverse_geocoder as rg
from fiona.crs import from_epsg

wd = r"C:\Sampon\Maantiede\Master of the Universe\python"
os.chdir(wd)

# Import functions. Has to be done after inserting os.chdir()
from parking_funcs import *

# Import data
data = pd.read_csv("Parking_private_cars_in_Helsinki_Capital_Region_0.csv")
grid = gpd.read_file("MetropAccess_YKR_grid_EurefFIN.shp")

# Edit survey data
removeCols = ["ObjectID", "GlobalID", "Creator", "EditDate", "Editor", "x", "y"]
columnNames = ["park_datetime", "park_search_dur", "park_freq", "spot_type",
               "park_x", "park_y", "dest_x", "dest_y", "survey_answered"]
data = data.drop(removeCols, axis=1)
data.columns = columnNames

# Datetimes to datetime format
data["park_datetime"] = convertToDatetime(data, "park_datetime")
data["survey_answered"] = convertToDatetime(data, "survey_answered")

# To shapely geometries and gdf
data["geometry"] = [Point(park_x, park_y) for park_x, park_y in zip(
        data["park_x"], data["park_y"])]
data["dest_geom"] = [Point(dest_x, dest_y) for dest_x, dest_y in zip(
        data["dest_x"], data["dest_y"])]

data = gpd.GeoDataFrame(data, geometry="geometry")

# Remove x and y cols
#removeCols = ["park_x", "park_y", "dest_x", "dest_y"]
#data = data.drop(removeCols, axis=1)

# Separate origin and destination data to their own gdfs
orig = prepareForExport(data, removeGeomCol="dest_geom")
dest = prepareForExport(data, removeGeomCol="geometry")

# Export to shp
orig.to_file(wd + "origin_points.shp")
dest.to_file(wd + "destination_points.shp")







# TEST
plot_polygon([grid.unary_union, orig.geometry[2]])
plot_polygon([grid.unary_union, dest.iloc[1].geometry])
coords = (data["park_y"][2], data["park_x"][2])
results = rg.search(coords)
print(results)




# Reverse geocoder testing. NB! ordering is YX
coords = (data["park_y"][0], data["park_x"][0])
coords_dest = (data["dest_y"][0], data["dest_x"][0])
results = rg.search(coords)
currentLoc = "{0}, {1}, Finland".format(results[0]["name"], results[0]["admin2"])

# OSMnx and networkx to calculate routes from park to dest
#place_name = "Laajasalo, Helsinki, Finland"
graph = ox.graph_from_place(currentLoc, network_type='walk')
fig, ax = ox.plot_graph(graph)

# Networkx testing
nodes, edges = ox.graph_to_gdfs(graph, nodes=True, edges=True)
nodeOrigin = ox.get_nearest_node(graph, coords, method='euclidean')
nodeTarget = ox.get_nearest_node(graph, coords_dest, method='euclidean')
oneRoute = nx.shortest_path(G=graph, source=nodeOrigin, target=nodeTarget, 
                            weight="distance")
route_nodes = nodes.loc[oneRoute]

routes = gpd.GeoDataFrame()
routes['geometry'] = None
routes['length_m'] = None

i = 0

if len(route_nodes) == 1:
    print("continue")
else:            
    path = LineString(list(route_nodes.geometry.values)) # path is a finished linestring variable combined from route_nodes nodes
    routes.loc[i, "geometry"] = path # save the LineString we've created here
    pathLength = getLength(path) #calculate current path length, use custom function getLength
    routes.loc[i, "length_m"] = pathLength # save to length_m
    #i = i + 1 # this allows us to move to the next route