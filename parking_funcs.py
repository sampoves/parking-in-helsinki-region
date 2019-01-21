# -*- coding: utf-8 -*-
"""
Created on Sun Jan 20 14:44:33 2019

@author: Sampo
"""

# Import libraries 
from descartes import PolygonPatch
import matplotlib.pyplot as plt
from shapely.geometry import Point, MultiPoint
from shapely.ops import cascaded_union
import shapely
import geopandas as gpd
import numpy as np
import math
from functools import partial
import pyproj
from shapely.ops import transform
import pandas as pd
from fiona.crs import from_epsg


def plot_polygon(polygonList):
    '''
    Insert Polygons in lists! If only one polygon, then use list with one
    value, for example plot_polygon([polygon]).
    
    Code by Kevin Dwyer, HumanGeo blog. Edited by Sampo Vesanen
    View alpha shape polygons in pylab
    # Very useful Polygon viewing tool, just stack them and view them
    
    Input       ds
    Returns     ds
    '''
    
    def createPolygonPatch(pol, alpha):
        '''
        Declutter code, create PolygonPatch inside this function. For now
        the function only accepts the input Polygon and a value for transparency.
        '''
        thisPatch = PolygonPatch(pol, 
                         fc=np.random.rand(3,), # each object gets a random color
                         ec=np.random.rand(3,), 
                         fill=True,
                         alpha=alpha,
                         zorder=-1)
        return thisPatch
    
    # keeps track if Point is detected
    polIsPoint = 0
    
    # Enable user to forget the use of unary_union when building list of
    # GeoDataFrames. If item in loop is instance GeoDataFrame, perform
    # unary_union on it, else don't make changes.
    polygonList = [item.unary_union if isinstance(item, gpd.GeoDataFrame) else \
                   item for item in polygonList]
    
    fig = plt.figure(figsize=(10,10))
    ax = fig.add_subplot(111)
    margin = 1000 # Give resuls more space. Original was .3
    x_min, y_min, x_max, y_max = cascaded_union(polygonList).bounds
    envArea = cascaded_union(polygonList).envelope.area
    ax.set_xlim([x_min - margin, x_max + margin])
    ax.set_ylim([y_min - margin, y_max + margin])
    ax.axes.set_aspect('equal') # prevents Polygon distortion in matplotlib window
    
    for pol in polygonList:
        # allow Points and MultiPoints in plot_polygon(). Also implemented 
        # cascaded union envelope size based Point buffer
        if isinstance(pol, (Point, MultiPoint)):
            # if envArea is zero, buffer is 10, otherwise formula
            pol = pol.buffer(10 if envArea == 0.0 else 20 * math.log(envArea))
            polIsPoint = 1

        thisPatch = createPolygonPatch(pol, 1)
        ax.add_patch(thisPatch)
        
        # insert halo of sorts for Points for better visibility
        if polIsPoint == 1 and envArea != 0:
            bgpol = createPolygonPatch(pol.buffer(1000), 0.5)
            ax.add_patch(bgpol)
            polIsPoint = 0
            
    plt.tight_layout()
    return fig



def getLength(inputted): 
    '''
    calc distance
    '''
    if isinstance(inputted, shapely.geometry.linestring.LineString):
        ls = inputted.length
        return ls
    
    elif isinstance(inputted, shapely.geometry.polygon.Polygon):
        world_ext = inputted.exterior
        world_ext_length = world_ext.length
        return world_ext_length
    
    else:
        raise Exception('Error: LineString or Polygon geometries required!')  
        
        
        
# Transformation for loop
def coord_transform(dataframe):
    '''
    Survey123 coordinates are in WGS84 Lat Lon, need to transform:
    https://doc.arcgis.com/en/survey123/desktop/create-surveys/geopoints.htm
    
    Idea from here
    https://stackoverflow.com/questions/27943093/library-to-perform-coordinate-system-transformations
    '''
    result = dataframe.copy()
    project = partial(
            pyproj.transform,
            pyproj.Proj(init="epsg:4326"),
            pyproj.Proj(init="epsg:3067"))
    
    for idx, point in enumerate(dataframe.geometry):
        point2 = transform(project, point)
        result.loc[idx, "geometry"] = point2
        
    return result



def convertToDatetime(dataframe, columnName):
    '''
    declutter code
    '''
    return pd.to_datetime(dataframe[columnName], format="%m/%d/%Y %I:%M:%S %p") 



def prepareForExport(dataframe, removeGeomCol):
    '''
    do stuff to declutter code
    '''
    result = dataframe.loc[:, dataframe.columns != removeGeomCol].copy()
    
    if removeGeomCol == "geometry":
        result = result.rename(columns={"dest_geom": "geometry"})
    
    result["survey_answered"] = [str(val) for val in result["survey_answered"]]
    result["park_datetime"] = [str(val) for val in result["park_datetime"]]
    result = coord_transform(result)
    result.crs = from_epsg(3067)
    result = result.to_crs(epsg=3067)
    
    return result