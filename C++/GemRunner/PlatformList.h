/*
	Copyright 2009 Aston Design Studio

	Defines a platform list for the GemRunner application.
*/

#pragma once

#include <vector>
#include "Global.h"
#include "Platform.h"

/* This class maintains a list of gems. */
class PlatformList
{
public:
	PlatformList(void);
	~PlatformList(void);

	/* Returns the number of platforms in the list. */
	int size() { return mPlatforms.size(); }

	/* Adds a platform to the list. The platform is created internally, and the 
	   list is responsible for its memory management, i.e. when the platform is 
	   removed, this class will automatically free its associated memory. */
	void add(int aID, int aLeft, int aTop, int aRight, int aBottom);

	/* Removes all platforms from the list and frees all memory. */
	void clear();

	/* Calls the render() method for each platform in the list. */
	void render();

	/* Gives access to the platform at given index (0..size()-1). */
	Platform* platform(int index) { return mPlatforms[index]; }

	/* todo comment */
	Platform* relationToPlatform(int x, int y, int& relation);
private:
	std::vector <Platform*> mPlatforms;
};
