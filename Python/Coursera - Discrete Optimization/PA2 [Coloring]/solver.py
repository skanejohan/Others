#!/usr/bin/python
# -*- coding: utf-8 -*-

import random

class Solver:

    def __init__(self, nodeCount, edges):
        self.graph = {}
        self.nodeColors = []
        self.nodeViolations = []
        self.numberOfColors = 0
        for i in range(nodeCount):
            self.nodeColors.append(-1)
            self.nodeViolations.append(-1)
            self.graph[i] = ([])
        for edge in edges:
            self.graph[edge[0]].append(edge[1])
            self.graph[edge[1]].append(edge[0])

    def countViolations(self):
        for i in range(len(self.nodeColors)):
            violations = 0
            for j in self.graph[i]:
                if self.nodeColors[i] == self.nodeColors[j]:
                    violations += 1
            self.nodeViolations[i] = violations

    def getNumberOfColors(self):
        return self.numberOfColors

    def getSolution(self):
        return self.nodeColors
    
    # Assigns a color to each node in the "nodes" list, using a greedy
    # algorithm that simply assigns a node the lowest possible value
    # while avoiding to break the color constraint.
    def initColors(self, nodes):
        highestColor = -1
        for i in nodes:
            col = 0
            colFound = False
            while not colFound:
                colorExists = False
                for j in self.graph[i]:
                    if self.nodeColors[j] == col:
                        colorExists = True
                if not colorExists:
                    self.nodeColors[i] = col
                    colFound = True
                else:
                    col += 1
            if col > highestColor:
                highestColor = col
            self.numberOfColors = highestColor+1
        self.countViolations();
        
    # Init colors to all nodes, ordered by their ID.
    # This typically leaves us with a "3/10" solution for all problems. 
    def initColorsByNodeID(self):
        self.initColors(range(len(self.nodeColors)))

    # Init colors to all nodes, ordered by their degree.
    # This gets a "7/10" solution on some instances.
    def initColorsByNodeDegree(self):
        temp = []
        for i in range(len(self.nodeColors)):
            temp.append((len(self.graph[i]), i))
        temp.sort()
        temp.reverse()
        nodes = []
        for i in temp:
            nodes.append(i[1])
        self.initColors(nodes)

    # Returns True if node has two (or more) neighbors with the given color
    def twoNeighborsHaveColor(self, node, color):
        count = 0
        for n in self.graph[node]:
            if self.nodeColors[n] == color:
                count += 1
        return count > 1
    
    # Tries to find a valid swap for node i.
    def trySwap(self, i):
        swapped = False
        for j in self.graph[i]:
            if self.nodeColors[i] == self.nodeColors[j]:
                swapped = self.performSwap(j, i)
                break
        return swapped
    
    # Look at n's neighbors. To be able to swap colors between n and
    # another node, n2, the following criteria must be fulfilled:
    #  - n must not have another neighbor with the same color as n2
    #  - n2 must not have another neighbor with the same color as n
    # If OK, performs the swap and returns True
    def performSwap(self, n, excluded_node):
        #print "Trying to perform swap for", n, "but not with", excluded_node
        swapped = False
        for n2 in self.graph[n]:
            if not (self.twoNeighborsHaveColor(n, self.nodeColors[n2]) or
                    self.twoNeighborsHaveColor(n2, self.nodeColors[n]) or
                    n2 == excluded_node):
                tmp = self.nodeColors[n]
                self.nodeColors[n] = self.nodeColors[n2]
                self.nodeColors[n2] = tmp
                swapped = True
                #print n, "swapped with", n2
                break
        if (not swapped) and (len(self.graph[n]) > 1):
            print n, "has not been swapped. Will try recursive"
            randomNode = n
            while randomNode == n:
                randomNode = self.graph[n][random.randrange(len(self.graph[n]))]
            print "randomNode =", randomNode
            swapped = self.trySwap(randomNode)
        return swapped
        
    # Tries to decrease the number of colors by one, by
    # performing repeated swaps and returns True if
    # possible, False otherwise. TODO max number of tries
    """
    def decreaseColorByOne(self):
        for i in range(len(self.nodeColors)):
            if self.nodeColors[i] == self.numberOfColors - 1:
                #print "Checking for", i, "which has color", self.nodeColors[i]
                self.nodeColors[i] -= 1
                if not self.trySwap(i):
                    self.nodeColors[i] += 1
                    return False
        self.numberOfColors -= 1
        self.countViolations()
        return True
    """

    def selectNewColor(self, n, maxColor):
        oldColor = self.nodeColors[n]
        neighborColors = list([0]) * maxColor
        #print neighborColors
        for neighbor in range(len(self.graph[n])):
            neighborColor = self.nodeColors[neighbor]
            if neighborColor < maxColor:
                neighborColors[neighborColor] += 1
        high = len(self.graph[n]) * 2
        for c in range(len(neighborColors)):
            if neighborColors[c] < high:
                high = neighborColors[c]
                newColor = c
        return newColor
    
    def decreaseNode(self, n):
        stack = []
        stack.append(n)
        maxColor = self.nodeColors[n]
        print maxColor
        while len(stack) > 0:
            self.countViolations()
            #print "Violations:", sum(self.nodeViolations)
            node = stack.pop()
            print "Popped", node
            color = self.selectNewColor(node, maxColor)
            self.nodeColors[node] = color
            neighborsWithSameColor = []
            for neighbor in self.graph[node]:
                if self.nodeColors[neighbor] == color:
                    neighborsWithSameColor.append(neighbor)
            random.shuffle(neighborsWithSameColor)
            for neighbor in neighborsWithSameColor:
                stack.append(neighbor)
        
    """
    def decreaseColorByOne(self):
        for i in range(len(self.nodeColors)):
            if self.nodeColors[i] == self.numberOfColors - 1:
                print "Checking for", i, "which has color", self.nodeColors[i]
                self.nodeColors[i] -= 1
                if not self.decreaseNode(i): # self.trySwap(i):
                    self.nodeColors[i] += 1
                    return False
        self.numberOfColors -= 1
        self.countViolations()
        return True
    """
    
    # Tries to decrease the number of colors by one, and returns True
    # if possible, False otherwise.
    def decreaseColorByOne(self):
        for i in range(len(self.nodeColors)):
            if self.nodeColors[i] == self.numberOfColors - 1:
                #print "Checking for", i, "which has color", self.nodeColors[i]
                swapped = False
                self.nodeColors[i] -= 1
                for j in self.graph[i]:
                    if self.nodeColors[i] == self.nodeColors[j]:
                        swapped = self.performSwap(j, i)
                        break
                if not swapped:
                    self.nodeColors[i] += 1
                    return False
        self.numberOfColors -= 1
        self.countViolations()
        return True

    def decreaseColorByOneUsingKempeChain(self, color_to_remove, color1, color2):
        #print "decreaseColorByOneUsingKempeChain", color_to_remove, color1, color2
        for i in range(len(self.nodeColors)):
            if self.nodeColors[i] == color_to_remove:
                #print "Checking for", i, "which has color", self.nodeColors[i]
                color_set1 = set() # Will be changed to color1
                color_set2 = set() # Will be changed to color2
                neighbour_stack = []
                #self.nodeColors[i] = color1
                color_set1.add(i)
                #print "Adding", i, "to color set 1"
                for n in self.graph[i]:
                    if self.nodeColors[n] == color1:
                        #print "Pushing", n
                        neighbour_stack.append(n)

                while len(neighbour_stack) > 0:
                    node_index = neighbour_stack.pop()
                    #print "Popping", node_index
                    if self.nodeColors[node_index] == color1 and node_index not in color_set2:
                        #print "Adding", node_index, "to color set 2"
                        color_set2.add(node_index)
                        for n in self.graph[node_index]:
                            if n in color_set2: #self.nodeColors[n] in color_set2:
                                #print "Neighbour", n, "is already in color set 2"
                                return False
                            elif self.nodeColors[n] == color2 and n not in color_set1:
                                #print "Pushing", n
                                neighbour_stack.append(n)
                    elif self.nodeColors[node_index] == color2 and node_index not in color_set1:
                        #print "Adding", node_index, "to color set 1"
                        color_set1.add(node_index)
                        for n in self.graph[node_index]:
                            if n in color_set1: # self.nodeColors[n] in color_set1:
                                #print "Neighbour", n, "is already in color set 1"
                                return False
                            elif self.nodeColors[n] == color1 and n not in color_set2:
                                #print "Pushing", n
                                neighbour_stack.append(n)

                #print color_set1, color_set2
                #"""
                for col1 in color_set1:
                    self.nodeColors[col1] = color1
                for col2 in color_set2:
                    self.nodeColors[col2] = color2
                break
            
        self.countViolations();
        self.numberOfColors = len(set(self.nodeColors))
        return True
        #"""
    
def outputGraph(edges, nodeColors, filename):
    f = open(filename, 'w')
    f.write('graph {\n')
    for e in edges:
        f.write('  ' + str(e[0]) + ' -- ' + str(e[1]) + '\n')
    for n in range(len(nodeColors)):
        f.write('  ' + str(n) + ' [label="' + str(n) + '(' + str(nodeColors[n]) + ')"];\n')
    f.write('}\n')
    
def solveIt(inputData):
    # Modify this code to run your optimization algorithm

    # parse the input
    lines = inputData.split('\n')

    firstLine = lines[0].split()
    nodeCount = int(firstLine[0])
    edgeCount = int(firstLine[1])

    edges = []
    for i in range(1, edgeCount + 1):
        line = lines[i]
        parts = line.split()
        edges.append((int(parts[0]), int(parts[1])))

    solver = Solver(nodeCount, edges)
    solver.initColorsByNodeDegree()
    #solver.nodeColors[0] = 0
    #solver.nodeColors[1] = 1
    #solver.nodeColors[2] = 2
    #solver.nodeColors[3] = 1
    #solver.nodeColors[4] = 0
    #solver.nodeColors[5] = 0
    #print ' '.join(map(str, solver.getSolution()))
    solver.decreaseColorByOne()
    while solver.getNumberOfColors() > 20:
        col1 = 19
        ok = False
        while col1 > 0 and not ok:
            col2 = col1 - 1
            while col2 >= 0 and not ok:
                ok = solver.decreaseColorByOneUsingKempeChain(20, col1, col2)
                col2 -= 1
            col1 -= 1
    
    outputGraph(edges, solver.getSolution(), "./graph")

    """
    solver.decreaseColorByOne()
    while solver.getNumberOfColors() > 20:
#        nums = range(20)
#        nums.reverse()
#        for i in nums:
#            color_to_remove = random.randrange(solver.numberOfColors)
#            solver.decreaseColorByOneUsingKempeChain(color_to_remove, i, i-1) #solver.numberOfColors - 2, solver.numberOfColors - 3)
            color_to_remove = 9 #random.randrange(solver.numberOfColors)
            color1 = 15 #random.randrange(solver.numberOfColors)
            color2 = 2 #random.randrange(solver.numberOfColors)
            solver.decreaseColorByOneUsingKempeChain(color_to_remove, color1, color2) #solver.numberOfColors - 2, solver.numberOfColors - 3)
            print solver.getNumberOfColors(), solver.getSolution()
    #print solver.decreaseColorByOne()
    """
    
    if sum(solver.nodeViolations) > 0:
        print "VIOLATIONS: ", solver.nodeViolations

    colCount = []
    for i in range(solver.getNumberOfColors()):
      colCount.append(solver.nodeColors.count(i))
    #print colCount
    
    # prepare the solution in the specified output format
    outputData = str(solver.getNumberOfColors()) + ' ' + str(0) + '\n'
    outputData += ' '.join(map(str, solver.getSolution()))

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
        print 'This test requires an input file.  Please select one from the data directory. (i.e. python solver.py ./data/gc_4_1)'

