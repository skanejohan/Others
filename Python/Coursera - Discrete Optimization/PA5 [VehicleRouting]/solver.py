#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import math

depot_index = 0 # The depot is "customer 0"

file_index = 1

def dump_input(input_data):
    global file_index
    f = open('./' + str(file_index) + '.txt', 'w')
    f.write(input_data)
    file_index += 1

def dump_vehicle_tours(customers, tours, file_name):
    result = []
    for tour in tours:
        result.append((0, (customers[0].x, customers[0].y)))
        for idx in range(len(tour)):
            result.append((tour[idx], (customers[tour[idx]].x, customers[tour[idx]].y)))
        result.append((0, (customers[0].x, customers[0].y)))
    f = open(file_name, 'w')
    f.write(','.join(map(str, result)))

def length(customer1, customer2):
    return math.sqrt((customer1.x - customer2.x)**2 + (customer1.y - customer2.y)**2)

def angle_between(customer1, customer2):
    return math.pi + math.atan2(customer2.y-customer1.y, customer2.x - customer1.x)

class Customer:
    def __init__(self, demand, x, y):
        self.demand = demand
        self.x = x
        self.y = y
        self.angle = 0

def getObjectiveValue(vehicle_tours, vehicle_count, customers):                
    # calculate the cost of the solution; for each vehicle the length of the route
    obj = 0
    for v in range(0, vehicle_count):
        vehicle_tour = vehicle_tours[v]
        if len(vehicle_tour) > 0:
            obj += length(customers[depot_index], customers[vehicle_tour[0]])
            for i in range(0, len(vehicle_tour) - 1):
                obj += length(customers[vehicle_tour[i]], customers[vehicle_tour[i + 1]])
            obj += length(customers[vehicle_tour[-1]], customers[depot_index])
    return obj

def prepare_output(vehicle_tours, objective_value, vehicle_count):
    outputData = str(objective_value) + ' ' + str(0) + '\n'
    for v in range(0, vehicle_count):
        outputData += str(depot_index) + ' ' + ' '.join(map(str,vehicle_tours[v])) + ' ' + str(depot_index) + '\n'
    return outputData

# Returns the node closest to to_node
def get_nearest(customers, tour, to_node):
    min_distance = float("inf")
    for from_node in tour:
        distance = length(customers[from_node], customers[to_node])
        if distance < min_distance:
            min_distance = distance
            node = from_node
    return node, min_distance

# Locate the remaining point that has the "largest smallest distance"
# to any of the points already in the tour.
def fis_select_node(customers, tour, unordered_tour):
    largest_smallest_distance = 0
    # print "fis_select_node, unordered_tour:", unordered_tour
    for node in unordered_tour:
        nearest_node, distance = get_nearest(customers, tour, node)
        if distance >= largest_smallest_distance:
            largest_smallest_distance = distance
            selected_node = node
    return selected_node

# Given a tour and a node, calculates the index at which the point should
# be inserted to increase the total cost as little as possible. 
def fis_get_insert_index(customers, tour, node):
    node1 = tour[-1]
    node2 = tour[0]
    global_delta_cost = length(customers[node1], customers[node]) + length(customers[node], customers[node2]) - length(customers[node1], customers[node2])
    global_index = len(tour)
    for tour_index in (range(len(tour)-1)):
        node1 = tour[tour_index]
        node2 = tour[tour_index+1]
        delta_cost = length(customers[node1], customers[node]) + length(customers[node], customers[node2]) - length(customers[node1], customers[node2])
        if delta_cost < global_delta_cost:
            global_delta_cost = delta_cost
            global_index = tour_index
    return global_index + 1

def tspByFarthestInsertion(customers, unordered_tour):
    
    if len(unordered_tour) > 1:
        #print "And now... improve", unordered_tour

        # Move the two nodes at the largest distance from each other into the tour
        max_distance = 0
        for i in range(len(unordered_tour)):
            for j in range(i+1, len(unordered_tour)):
                this_distance = length(customers[unordered_tour[i]], customers[unordered_tour[j]])
                if this_distance > max_distance:
                    max_distance = this_distance
                    node1 = i
                    node2 = j
        tour = [unordered_tour[node1],unordered_tour[node2]]
        #print tour
        #print unordered_tour
        unordered_tour.remove(tour[0])
        unordered_tour.remove(tour[1])

        # Now add one node at a time to the tour, according to the rules
        # of the farthest insertion algorithm, until unordered_tour is empty
        while len(unordered_tour) > 0:
            node = fis_select_node(customers, tour, unordered_tour)
            insert_index = fis_get_insert_index(customers, tour, node)
            tour.insert(insert_index, node)
            unordered_tour.remove(node)

        # Now re-order the tour so that the customer closest to the warehouse
        # is the first one in the tour. This is because we will start driving
        # from the warehouse to the first customer in the tour.
        closest_length = sys.maxint
        for i in range(len(tour)):
            customer_index = tour[i]
            if length(customers[0], customers[customer_index]) < closest_length:
                closest_length = length(customers[0], customers[customer_index])
                closest_customer = i
        tour = list(tour[closest_customer:]) + list(tour[:closest_customer])

    else:
        tour = unordered_tour

    return tour
    
def trivialSolver(customers, vehicle_count, vehicle_capacity):
    # build a trivial solution by assigning customers to
    # vehicles starting by the largest customer demands
    vehicle_tours = []
    customer_indices = set(range(1, len(customers)))  # start at 1 to remove depot index
    
    for v in range(0, vehicle_count):
        # print "Start Vehicle: ",v
        vehicle_tours.append([])
        capacity_remaining = vehicle_capacity
        while sum([capacity_remaining >= customers[ci].demand for ci in customer_indices]) > 0:
            used = set()
            order = sorted(customer_indices, key=lambda ci: -customers[ci].demand)
            for ci in order:
                if capacity_remaining >= customers[ci].demand:
                    capacity_remaining -= customers[ci].demand
                    vehicle_tours[v].append(ci)
                    # print '   add', ci, capacityRemaining
                    used.add(ci)
            customer_indices -= used

    # checks that the number of customers served is correct
    assert sum([len(v) for v in vehicle_tours]) == len(customers) - 1

    return vehicle_tours, getObjectiveValue(vehicle_tours, vehicle_count, customers)

def angleSolver(customers, vehicle_count, vehicle_capacity):
    # build a solution by assigning customers to
    # vehicles going in anti-clockwise order
    vehicle_tours = []
    customer_indices = set(range(1, len(customers)))  # start at 1 to remove depot index
    for i in customer_indices:
        customers[i].angle = angle_between(customers[0], customers[i])
    customers_ordered_by_angle = sorted(customer_indices, key=lambda ci: customers[ci].angle)

    """
    for v in range(0, vehicle_count):
        vehicle_tours.append([])
        capacity_remaining = vehicle_capacity
        while len(customers_ordered_by_angle) > 0:
            customer = customers[customers_ordered_by_angle[0]]
            if capacity_remaining >= customer.demand:
                vehicle_tours[v].append(customers_ordered_by_angle[0])
                customers_ordered_by_angle.pop(0)
                capacity_remaining -= customer.demand
            else:
                print vehicle_tours[v]
                break

    """

    for v in range(0, vehicle_count):
        # print "Start Vehicle: ",v
        vehicle_tours.append([])
        capacity_remaining = vehicle_capacity
        used = set()
        while sum([capacity_remaining >= customers[ci].demand for ci in customer_indices]) > 0:
            order = sorted(customer_indices, key=lambda ci: customers[ci].angle)
            for ci in order:
                if ci not in used:
                    if capacity_remaining >= customers[ci].demand:
                        capacity_remaining -= customers[ci].demand
                        vehicle_tours[v].append(ci)
                        # print '   add', ci, capacityRemaining
                        used.add(ci)
            customer_indices -= used
        vehicle_tours[v] = tspByFarthestInsertion(customers, vehicle_tours[v])
        #print vehicle_tours[v]
        
    # checks that the number of customers served is correct
    assert sum([len(v) for v in vehicle_tours]) == len(customers) - 1

    return vehicle_tours, getObjectiveValue(vehicle_tours, vehicle_count, customers)

def solveIt(inputData):
    dump_input(inputData)
    
    # parse the input - the result is the initial list of customers
    # (customers), the number of vehicles (vehicle_count) and the
    # capacity of each vehicle (vehicle_capacity)
    lines = inputData.split('\n')
    parts = lines[0].split()
    customer_count = int(parts[0])
    vehicle_count = int(parts[1])
    vehicle_capacity = int(parts[2])
    customers = []
    for i in range(1, customer_count+1):
        line = lines[i]
        parts = line.split()
        customers.append(Customer(int(parts[0]), float(parts[1]), float(parts[2])))

    # perform the calculations and return a correctly formatted result
    #vehicle_tours, objective_value = trivialSolver(customers, vehicle_count, vehicle_capacity)
    vehicle_tours, objective_value = angleSolver(customers, vehicle_count, vehicle_capacity)
    dump_vehicle_tours(customers, vehicle_tours, './tours.txt')
    return prepare_output(vehicle_tours, objective_value, vehicle_count)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        fileLocation = sys.argv[1].strip()
        inputDataFile = open(fileLocation, 'r')
        inputData = ''.join(inputDataFile.readlines())
        inputDataFile.close()
        print 'Solving:', fileLocation
        print solveIt(inputData)
    else:

        print 'This test requires an input file.  Please select one from the data directory. (i.e. python solver.py ./data/vrp_5_4_1)'

