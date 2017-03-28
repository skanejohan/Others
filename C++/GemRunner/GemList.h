/*
	Copyright 2009 Aston Design Studio

	Defines a gem list for the GemRunner application.
*/

#pragma once

#include <list>
#include "Gem.h"

/* This class maintains a list of gems. */
class GemList
{
public:
	GemList(void);
	~GemList(void);

	/* Returns the number of gems in the list. */
	int size() {return mGems.size(); }
	
	/* Adds a gem to the list. The gem is created internally, and the list 
	   is responsible for its memory management, i.e. when the gem is removed, 
	   this class will automatically free its associated memory. */
	void add(int aType, int aColor, bool inTray, int aX, int aY);

	/* Removes the supplied gem from the list and frees its associated memory. */
	void remove(Gem* aGem);

	/* Removes a gem from the end of the list and frees its associated memory. */
	bool removeLast();

	/* Removes all gems from the list that have state "inactive", i.e. that are
	   no longer visible. */
	void removeAllInactive();

	/* Removes all gems from the list and frees all memory. */
	int clear();

	/* Calls the update() method for each gem in the list. */
	void update(float deltaTime);

	/* Calls the render() method for each gem in the list. */
	void render();

	/* Returns the gem with the given coordinates, or NULL if no such item is 
	   found. */
	Gem *occupies(int x, int y);

	/* Returns the gem that has state "active" or "deactivating", and collides
	   with an object at coordinates (x, y). dx and dy are the max difference 
	   between the two objects' x and y coordinates respectively. */
	Gem *collidesWith(int x, int y, int dx, int dy);

private:
	std::list<Gem *> mGems;
};
