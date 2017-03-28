#!/usr/bin/python
# -*- coding: utf-8 -*-

import random

class Warehouse:
    def __init__(self, index, capacity, setup_cost):
        self.index = index
        self.capacity = capacity
        self.setup_cost = setup_cost
        self.remaining_capacity = capacity
        self.customers = set([])
        self.cost = 0

    def add_customer(self, customer):
        if customer.demand <= self.remaining_capacity:
            if len(self.customers) == 0:
                self.cost += self.setup_cost
            self.customers.add(customer)
            self.remaining_capacity -= customer.demand
            self.cost += customer.travel_costs[self.index]
            customer.connect_to(self)
            return True
        else:
            return False

    def cost_if_i_add_customer(self, customer):
        if customer.demand > self.remaining_capacity:
            return float("inf")
        elif len(self.customers) == 0:
            return self.setup_cost + customer.travel_costs[self.index]
        else:
            return self.cost + customer.travel_costs[self.index]

    def cost_if_i_remove_customer(self, customer):
        if customer not in self.customers:
            return self.cost
        elif len(self.customers) == 1:
            return 0
        else:
            return self.cost - customer.travel_costs[self.index]

    def remove_customer(self, customer):
        if customer in self.customers:
            self.customers.remove(customer)
            self.remaining_capacity += customer.demand
            if len(self.customers) == 0:
                self.cost = 0
            else:
                self.cost -= customer.travel_costs[self.index]
            customer.disconnect()
    
class Customer:
    def __init__(self, index, demand, travel_costs):
        self.index = index
        self.demand = demand
        self.warehouse = None
        self.travel_costs = travel_costs # List, indexed by warehouse index

    def connect_to(self, warehouse):
        self.warehouse = warehouse

    def disconnect(self):
        self.warehouse = None

def improveByRandomMoves(warehouses, customers, no_of_tries):
    tries_left = no_of_tries
    while tries_left > 0:
        warehouse = random.choice(warehouses)
        customer = random.choice(customers)
        add_cost = warehouse.cost_if_i_add_customer(customer) - warehouse.cost
        remove_cost = customer.warehouse.cost - customer.warehouse.cost_if_i_remove_customer(customer)
        if remove_cost > add_cost:
          customer.warehouse.remove_customer(customer)
          warehouse.add_customer(customer)
        tries_left -= 1

def get_solution(customers, warehouses):
    cost = 0
    solution = []
    for c in customers:
        solution.append(c.warehouse.index)
    for w in warehouses:
        cost += w.cost
    return solution, cost

file_index = 1

def dump_input(input_data):
    global file_index
    f = open('./' + str(file_index) + '.txt', 'w')
    f.write(input_data)
    file_index += 1

def solveIt(inputData):
    #dump_input(inputData)

    # parse the input
    lines = inputData.split('\n')
    parts = lines[0].split()
    warehouse_count = int(parts[0])
    customer_count = int(parts[1])

    # Create and populate the warehouses and customers lists
    warehouses = []
    for i in range(warehouse_count):
        line = lines[i+1]
        parts = line.split()
        warehouses.append(Warehouse(i, int(parts[0]), float(parts[1])))

    customers = []
    line_index = warehouse_count+1
    for i in range(0, customer_count):
        demand = int(lines[line_index+2*i])
        travel_cost = map(float, lines[line_index+2*i+1].split())
        customers.append(Customer(i, demand, travel_cost))

    # Build a trivial solution by packing the warehouses one by one
    # until all the customers are served, then perform random moves
    # between warehouses as long as they improve the objective value.
    # Works well (score 7) for the first three problems (wl_16_1,
    # wl_25_2, wl_50_1)
    """
    warehouse_index = 0
    for c in customers:
        if not warehouses[warehouse_index].add_customer(c):
            warehouse_index += 1
            warehouses[warehouse_index].add_customer(c)
    improveByRandomMoves(warehouses, customers, 1000000)
    solution, objective_value = get_solution(customers, warehouses)
    """
    
    # The solution above doesn't work well for problems where all
    # customers fit in one warehouse (they will all be assigned to
    # it and then the setup cost for adding a new warehouse will
    # be prohibitive). Instead, I make sure that they are split up
    # between the first two, after which I perform random moves.
    # Works well (score 7) for problems 5, 6 and 7 (wl_200_1,
    # wl_500_1 and wl_1000_1).
    """
    for c in customers:
        warehouse = warehouses[c.index % 3]
        warehouse.add_customer(c)
    improveByRandomMoves(warehouses, customers, 1000000)
    solution, objective_value = get_solution(customers, warehouses)
    """

    # For problem 8, I realize that all the nodes will fit in one warehouse.
    # It may not be the optimal solution, but I try assigning them all to
    # one warehouse at the time, selecting the cheapest solution.
    objective_value = float("inf")
    for w in warehouses:
        for c in customers:
            w.add_customer(c)
        this_solution, this_objective_value = get_solution(customers, warehouses)
        for c in customers:
            w.remove_customer(c)
        if this_objective_value < objective_value:
            solution = this_solution
            objective_value = this_objective_value

    # prepare the solution in the specified output format
    outputData = str(objective_value) + ' ' + str(0) + '\n'
    outputData += ' '.join(map(str, solution))

    return outputData


import sys

if __name__ == '__main__':
    if len(sys.argv) > 1:
        fileLocation = sys.argv[1].strip()
        inputDataFile = open(fileLocation, 'r')
        inputData = ''.join(inputDataFile.readlines())
        inputDataFile.close()
        print 'Solving:', fileLocation
        print solveIt(inputData)
    else:
        print 'This test requires an input file.  Please select one from the data directory. (i.e. python solver.py ./data/wl_16_1)'

