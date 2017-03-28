#!/usr/bin/python
# -*- coding: utf-8 -*-

import math
import uuid
import random

def length(point1, point2):
    return math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)

def getBounds(points):
    minx = float("inf")
    maxx = -float("inf")
    miny = float("inf")
    maxy = -float("inf")
    for p in points:
        if minx > p[0]:
            minx = p[0]
        if maxx < p[0]:
            maxx = p[0]
        if miny > p[1]:
            miny = p[1]
        if maxy < p[1]:
            maxy = p[1]
    return minx, maxx, miny, maxy

###
###
### The NodeMatrix class is used to quickly locate the node nearest
### to the given one. It does this by partitioning the complete space
### into smaller rectangles and looking in the nearest rectangles first.
###
###
class NodeMatrix:
    def __init__(self, minx, maxx, miny, maxy):
        self.matrix = {}
        self.minx = minx
        self.maxx = maxx
        self.miny = miny
        self.maxy = maxy

    def add(self, node):
        x = node[1][0] // 10
        y = node[1][1] // 10
        key = (x, y)
        if key in self.matrix:
            self.matrix[key].append(node)
        else:
            self.matrix[key] = [node]

    def remove(self, node):
        x = node[1][0] // 10
        y = node[1][1] // 10
        key = (x, y)
        self.matrix[key].remove(node)
        if len(self.matrix[key]) == 0:
            del(self.matrix[key])

    def findNearest(self, node):
        found = False
        closest_node = None
        closest_distance = float("inf")
        node_x = node[1][0] // 10
        node_y = node[1][1] // 10
        for x in [node_x-1, node_x, node_x+1]:
            for y in [node_y-1, node_y, node_y+1]:
                if (x, y) in self.matrix:
                    for n in self.matrix[(x, y)]:
                        distance = length(n[1], node[1])
                        if distance < closest_distance:
                            closest_distance = distance
                            closest_node = n
                            found = True
        return found, closest_node, closest_distance
    
###
###
### The NodeSequence class maintains a list of nodes, where a node is a tuple
### of (int,point), i.e. a point and its index in the original problem
###
###
class NodeSequence:
    def __init__(self, points, minx, maxx, miny, maxy):
        self.nodes = []
        self.nodeMatrix = NodeMatrix(minx, maxx, miny, maxy)
        for i in range(len(points)):
            node = (i, points[i])
            self.nodes.append(node)
            self.nodeMatrix.add(node)

    def add(self, node):
        self.nodes.append(node)
        self.nodeMatrix.add(node)

    def insert(self, insert_index, node):
        self.nodes.insert(insert_index, node)
        self.nodeMatrix.add(node)

    def remove(self, node):
        self.nodes.remove(node)
        self.nodeMatrix.remove(node)
        
    def count(self):
        return len(self.nodes)
    
    def idx(self, node_index):
        return self.nodes[node_index][0]

    def pt(self, node_index):
        return self.nodes[node_index][1]
        
    # Return the two nodes farthest away from each other
    def getRemotestPair(self):
        max_distance = 0
        for i in range(len(self.nodes)):
            for j in range(i+1, len(self.nodes)):
                this_distance = length(self.pt(i), self.pt(j))
                if this_distance > max_distance:
                    max_distance = this_distance
                    node1 = self.nodes[i]
                    node2 = self.nodes[j]
        return node1, node2

    # Returns the node closest to to_node
    def get_nearest(self, to_node):
        found, node, min_distance = self.nodeMatrix.findNearest(to_node)
        if not found:
            min_distance = float("inf")
            for from_node in self.nodes:
                distance = length(from_node[1], to_node[1])
                if distance < min_distance:
                    min_distance = distance
                    node = from_node
        return node, min_distance

    def improveByTwoOpt(self):
        done = False
        while not done:
            done = True
            for i in range(1, len(self.nodes)):
                for j in range(i+2, len(self.nodes)-2):
                    old_length = length(self.pt(i-1), self.pt(i)) + length(self.pt(j), self.pt(j+1))
                    new_length = length(self.pt(i-1), self.pt(j)) + length(self.pt(i), self.pt(j+1))
                    if new_length < old_length:
                        self.nodes = self.nodes[0:i] + self.nodes[i:j+1][::-1] + self.nodes[j+1:]
                        done = False

    def improveByRandomTwoOpt(self, iterations):
        while iterations > 0:
            i = random.randrange(1, len(self.nodes)-4)
            j = random.randrange(i+2, len(self.nodes)-2)
            old_length = length(self.pt(i-1), self.pt(i)) + length(self.pt(j), self.pt(j+1))
            new_length = length(self.pt(i-1), self.pt(j)) + length(self.pt(i), self.pt(j+1))
            if new_length < old_length:
                self.nodes = self.nodes[0:i] + self.nodes[i:j+1][::-1] + self.nodes[j+1:]
            iterations -= 1
                            
    def getObjectiveValue(self):    
        obj = length(self.pt(-1), self.pt(0))
        for i in range(0, len(self.nodes)-1):
            obj += length(self.pt(i), self.pt(i+1))
        return obj

    def getSolution(self):
        solution = []
        for node in self.nodes:
            solution.append(node[0]);
        return solution
    
######################################################################
###
### Solves the problem using the "nearest neighbor" algorithm.
###
######################################################################
def nearestNeighborSolver(points):
    minx, maxx, miny, maxy = getBounds(points)
    tour = NodeSequence([], minx, maxx, miny, maxy)
    remainingNodes = NodeSequence(points, minx, maxx, miny, maxy)
    
    # Start at point 0
    node = remainingNodes.nodes[0]
    tour.add(node)
    remainingNodes.remove(node)

    # While there are remaining nodes, add the one closest to the last
    while remainingNodes.count() > 0:
        node, distance = remainingNodes.get_nearest(node)
        tour.add(node)
        remainingNodes.remove(node)

    tour.improveByTwoOpt()
    return tour.getSolution(), tour.getObjectiveValue()

######################################################################
###
### Solves the problem using the "farthest insertion" algorithm
###
######################################################################

# Locate the remaining point that has the "largest smallest distance"
# to any of the points already in the tour.
def fis_selectNode(tour, remainingNodes):
    largest_smallest_distance = 0
    for node in remainingNodes.nodes:
        nearest_node, distance = tour.get_nearest(node)
        if distance > largest_smallest_distance:
            largest_smallest_distance = distance
            selected_node = node
    return selected_node

# Given a tour and a node, calculates the index at which the point should
# be inserted to increase the total cost as little as possible. 
def fis_getInsertIndex(tour, node):
    node1 = tour.nodes[-1]
    node2 = tour.nodes[0]
    global_delta_cost = length(node1[1], node[1]) + length(node[1], node2[1]) - length(node1[1], node2[1])
    global_index = tour.count()
    for tour_index in (range(tour.count()-1)):
        node1 = tour.nodes[tour_index]
        node2 = tour.nodes[tour_index+1]
        delta_cost = length(node1[1], node[1]) + length(node[1], node2[1]) - length(node1[1], node2[1])
        if delta_cost < global_delta_cost:
            global_delta_cost = delta_cost
            global_index = tour_index
    return global_index + 1
    
def farthestInsertionSolver(points):
    minx, maxx, miny, maxy = getBounds(points)
    tour = NodeSequence([], minx, maxx, miny, maxy)
    remainingNodes = NodeSequence(points, minx, maxx, miny, maxy)

    # Start with the two nodes farthest away from each other
    node1, node2 = remainingNodes.getRemotestPair()
    tour.add(node1)
    tour.add(node2)
    remainingNodes.remove(node1)
    remainingNodes.remove(node2)
    
    # Now add one node at a time, according to the rules of the farthest
    # insertion algorithm, until remainingNodes is empty
    while remainingNodes.count() > 0:
        node = fis_selectNode(tour, remainingNodes)
        insert_index = fis_getInsertIndex(tour, node)
        tour.insert(insert_index, node)
        remainingNodes.remove(node)
        
    tour.improveByTwoOpt()
    return tour.getSolution(), tour.getObjectiveValue()

######################################################################
###
### Solves the problem by selecting an initial configuration at random
### and then applying the "randomized 2-opt" improvement algorithm. The
### idea is to run this many many times and take the best result.
###
######################################################################
def randomSolver(points):
    minx, maxx, miny, maxy = getBounds(points)
    tour = NodeSequence([], minx, maxx, miny, maxy)
    remainingNodes = NodeSequence(points, minx, maxx, miny, maxy)
    while remainingNodes.count() > 0:
        node = remainingNodes.nodes[random.randrange(len(remainingNodes.nodes))]
        tour.add(node)
        remainingNodes.remove(node)
    tour.improveByRandomTwoOpt(15000)
    return tour.getSolution(), tour.getObjectiveValue()
    
######################################################################
###
### Run a problem solver
###
######################################################################

def dumpInput(inputData):
    f = open('./' + str(uuid.uuid4()) + '.txt', 'w')
    f.write(inputData)

def solveIt(inputData):
    dumpInput(inputData)
    lines = inputData.split('\n')
    nodeCount = int(lines[0])
    points = []
    for i in range(1, nodeCount+1):
        line = lines[i]
        parts = line.split()
        points.append((float(parts[0]), float(parts[1])))

    #solution, obj = nearestNeighborSolver(points)
    solution, obj = farthestInsertionSolver(points)

    # prepare the solution in the specified output format
    outputData = str(obj) + ' ' + str(0) + '\n'
    outputData += ' '.join(map(str, solution))

    return outputData


import sys

if __name__ == '__main__':
    if len(sys.argv) > 1:
        fileLocation = sys.argv[1].strip()
        inputDataFile = open(fileLocation, 'r')
        inputData = ''.join(inputDataFile.readlines())
        inputDataFile.close()
        print solveIt(inputData)
    else:
        print 'This test requires an input file.  Please select one from the data directory. (i.e. python solver.py ./data/tsp_51_1)'

