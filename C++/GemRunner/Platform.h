/*
	Copyright 2009 Aston Design Studio

	Defines the platforms for the GemRunner application.
*/

#pragma once

#include <hgeSprite.h>
#include <hgeResource.h>
#include "Global.h"

class Platform
{
private:
	int mID;
	int mLeft;
	int mRight;
	int mTop;
	int mBottom;
	hgeSprite *mSprite;
public:
	Platform();
	Platform(int aID, int aLeft, int aTop, int aRight, int aBottom);//, hgeResourceManager *resourceManager);
	~Platform();
	void render();
	int getID()			{ return mID; }
	int getLeft()		{ return mLeft; }
	int getRight()		{ return mRight; }
	int getTop()		{ return mTop; }
	int getBottom()		{ return mBottom; }
};
