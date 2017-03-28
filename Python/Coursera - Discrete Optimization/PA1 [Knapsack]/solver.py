#!/usr/bin/python
# -*- coding: utf-8 -*-

class BaseSolver:

    def __init__(self, items, capacity, values, weights):
        self.items = items
        self.capacity = capacity
        self.values = values
        self.weights = weights
        self.value = 0
        self.weight = 0
        self.taken = []

    
"""
 A trivial greedy algorithm for filling the knapsack.
 It takes items in-order until the knapsack is full.
"""
class SuboptimalGreedySolver(BaseSolver):

    def solveIt(self):
        for i in range(0, self.items):
            if self.weight + self.weights[i] <= self.capacity:
                self.taken.append(1)
                self.value += self.values[i]
                self.weight += self.weights[i]
            else:
                self.taken.append(0)
        return self.value, self.taken

"""
 An algorithm using dynamic programming. Works well for
 small input data, but not for large.
"""
class DynamicProgrammingSolver(BaseSolver):

    def key(self, k, j):
        return 100000 * k + j
    
    def solve_rec(self, k, j):
        s = self.key(k, j)
        if s not in self.dict:
            if j == 0:
                result = 0
            elif self.weights[j] <= k:
                result = max(self.solve_rec(k, j-1), self.values[j] + self.solve_rec(k-self.weights[j], j-1))
            else:
                result = self.solve_rec(k, j-1)
            self.dict[s] = result
        return self.dict[s]

    def backtrack_dict(self, k, j):
        if j > 1:
            val = self.dict[self.key(k, j)]
            left_val = self.dict[self.key(k, j-1)]
            if val == left_val:
                self.backtrack_dict(k, j-1)
            else:
                self.taken.add(j)
                self.backtrack_dict(k-self.weights[j], j-1)
        
    def solveIt(self):
        self.taken = set([])
        self.dict = {}
        self.solve_rec(self.capacity, self.items-1)
        self.backtrack_dict(self.capacity, self.items-1)
        result = self.dict[self.key(self.capacity, self.items-1)]

        taken_desc = []
        for i in range(self.items):
            if i in self.taken:
                taken_desc.append(1)
            else:
                taken_desc.append(0)
        return result, taken_desc

"""
 A branch-and-bound solver, intended for use on the larger problems.
"""
class BranchAndBoundSolver(BaseSolver):

    # data is a list of tuples (index, value, weight, value/weight, [sel])
    # sorted by value/weight ratio descending. sel represents how much of
    # an item that is selected in the ideal (chocolate bar) case. It is
    # represented as a list since I am not allowed to mutate a tuple.
    def prepare(self):
        self.data = []
        self.estimate = 0
        remaining_capacity = self.capacity
        for i in range(len(self.values)):
            if self.weights[i] <= self.capacity:
                self.data.append((i, self.values[i], self.weights[i], float(self.values[i]) / float(self.weights[i]), []));
        self.data.sort(key = lambda rec: rec[3])
        self.data.reverse()
        for d in self.data:
            if remaining_capacity >= d[2]:
                d[4].append(1)
                remaining_capacity -= d[2]
                self.estimate += d[1]
            elif remaining_capacity > 0:
                ratio = float(remaining_capacity) / float(d[2])
                d[4].append(ratio)
                remaining_capacity = 0
                self.estimate += ratio * d[1]
            else:
                d[4].append(0)

    # Returns the value for the item at position i
    def v(self, i):
        return self.data[i][1]

    # Returns the weight for the item at position i
    def w(self, i):
        return self.data[i][2]

    # Returns the "selected" value for the item at position i
    def s(self, i):
        return self.data[i][4][0]

    # Returns the ID (the index in the unsorted list) for the item at position i
    def id(self, i):
        return self.data[i][0]

    # Returns the best estimation given the current value and that we keep filling
    # the knapsack according to the "chocolate bar" algorithm starting at item i
    def sum_est(self, i):
        sum_of_rest = 10
        room = self.current_capacity
        for j in range(i, len(self.data)):
            if room >= self.w(j):
                room -= self.w(j)
                sum_of_rest += self.v(j)
            elif room > 0:
                sum_of_rest += self.v(j) * float(room) / float(self.w(j))
                room = 0
            else:
                break
        return self.current_value + sum_of_rest

    # The "don't select an item" case used by the recursive algorithm
    def ex_dont_select(self, i):
        pass #print self.current_value, self.current_capacity, self.estimate, "ignoring ", i+1
        old_estimate = self.estimate
        self.estimate = self.sum_est(i+1)
        if i < len(self.values)-1 and self.estimate > self.value: # todo prune
            self.ex_select(i+1)
            self.ex_dont_select(i+1)
        else:
            pass #print "  Pruned - best now less than max: ", self.estimate
        self.estimate = old_estimate
  
    # The "do select an item" case used by the recursive algorithm
    def ex_select(self, i):
        pass #print self.current_value, self.current_capacity, self.estimate, "selecting", i+1
        if self.current_capacity >= self.w(i):
            self.current_capacity -= self.w(i)
            self.current_value += self.v(i)
            self.selected.add(self.id(i))
            if self.current_value > self.value:
                self.value = self.current_value
                self.selected_items = list(self.selected)
                pass #print "  Best: ", self.value, self.selected_items
            old_estimate = self.estimate
            self.estimate = self.sum_est(i+1)
            if i < len(self.data)-1 and self.estimate > self.value:
                self.ex_select(i+1)
                self.ex_dont_select(i+1)
            self.estimate = old_estimate    
            self.selected.remove(self.id(i))
            self.current_value -= self.v(i)
            self.current_capacity += self.w(i)
        else:
            pass #print "  BOOM"

    # Solve the problem using a recursive approach - will not work for the largest problems.
    def solveRec(self):
        self.ex_select(0)
        self.ex_dont_select(0)

    # Solve the problem using a non-recursive approach - will work for the largest problems.
    # The stack will contain items like (i, select, value, room, estimate, selected)
    def solve(self):
        stack = []
        stack.append((0, False, self.current_value, self.current_capacity, self.estimate, list(self.selected)))
        stack.append((0, True, self.current_value, self.current_capacity, self.estimate, list(self.selected)))
        while len(stack) > 0:
            elem = stack.pop()
            pass #print elem
            i = elem[0]
            select = elem[1]
            self.current_value = elem[2]
            self.current_capacity = elem[3]
            self.estimate = elem[4]
            self.selected = elem[5]
            if select: # Do select the item
                pass #print self.current_value, self.current_capacity, self.estimate, "selecting", i+1
                if self.current_capacity >= self.w(i):
                    self.current_capacity -= self.w(i)
                    self.current_value += self.v(i)
                    self.selected.append(self.id(i))
                    if self.current_value > self.value:
                        self.value = self.current_value
                        self.selected_items = list(self.selected)
                        pass #print "  Best: ", self.value, self.selected_items
                    self.estimate = self.sum_est(i+1)
                    if i < len(self.data)-1 and self.estimate > self.value:
                        stack.append((i+1, False, self.current_value, self.current_capacity, self.estimate, list(self.selected)))
                        stack.append((i+1, True, self.current_value, self.current_capacity, self.estimate, list(self.selected)))
                else:
                    pass #print "  BOOM"
            else: # Don't select the item
                pass #print self.current_value, self.current_capacity, self.estimate, "ignoring ", i+1
                #old_estimate = self.estimate
                self.estimate = self.sum_est(i+1)
                if i < len(self.values)-1 and self.estimate > self.value: # todo prune
                    stack.append((i+1, False, self.current_value, self.current_capacity, self.estimate, list(self.selected)))
                    stack.append((i+1, True, self.current_value, self.current_capacity, self.estimate, list(self.selected)))
                else:
                    pass #print "  Pruned - best now less than max: ", self.estimate
                #self.estimate = old_estimate

    def solveIt(self, recursive):
        self.selected_items = []
        self.prepare()
        self.current_capacity = self.capacity
        self.current_value = self.value
        self.value = 0
        self.selected = set([])
        if recursive:
            self.solveRec()
        else:
            self.solve()
        self.taken = []
        for item in range(len(self.values)):
            if item in self.selected_items:
                self.taken.append(1)
            else:
                self.taken.append(0)
        return self.value, self.taken

    

def solveIt(inputData):
    # Modify this code to run your optimization algorithm

    # parse the input
    lines = inputData.split('\n')

    firstLine = lines[0].split()
    items = int(firstLine[0])
    capacity = int(firstLine[1])

    values = []
    weights = []

    for i in range(1, items+1):
        line = lines[i]
        parts = line.split()

        values.append(int(parts[0]))
        weights.append(int(parts[1]))

    items = len(values)

    # value, taken = SuboptimalGreedySolver(items, capacity, values, weights).solveIt()
    #value, taken = DynamicProgrammingSolver(items, capacity, values, weights).solveIt()
    value, taken = BranchAndBoundSolver(items, capacity, values, weights).solveIt(False)
    
    # prepare the solution in the specified output format
    outputData = str(value) + ' ' + str(0) + '\n'
    outputData += ' '.join(map(str, taken))
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
        print 'This test requires an input file.  Please select one from the data directory. (i.e. python solver.py ./data/ks_4_0)'

