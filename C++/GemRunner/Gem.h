/*
	Copyright 2009 Aston Design Studio

	Defines the gems for the GemRunner application.
*/

#pragma once

#include <string>
#include <hge.h>
#include <hgeAnim.h>
#include <hgeResource.h>
#include "Global.h"

// Gem types
const int gtDiamond = 1;		// Add one to correct color (or all for white)
const int gtMinusDiamond = 2;	// Delete one from correct color (or all for white)
const int gtKillerDiamond = 3;	// Delete all from correct color (or all for white)

// Gem colors
const int gcRed = 1;
const int gcGreen = 2;
const int gcBlue = 3;
const int gcWhite = 4;
const int gcBlack = 5;

// Gem states
const int gsActivating = 0;
const int gsActive = 1;
const int gsDeactivating = 2;
const int osInactive = 3;

class Gem
{
public:
	Gem();
	Gem(int aType, int aColor, bool inTray);
	~Gem();
	
	float getX()					{ return mX; }
	void setX(float aX)				{ mX = aX; }
	float getY()					{ return mY; }
	void setY(float aY)				{ mY = aY; }
	int getType()					{ return mType; } 
	int getColor()					{ return mColor; } 
	int getState()					{ return mCurrentState; }
	void update(float deltaTime);
	void render();
private:
	float mX;
	float mY;
	int mType;	// Gem type
	int mColor; // Gem color
	int mCurrentState;
	float mTimeWhenLeaveState;
	hgeAnimation *mAnimation;
	bool mRenderWhenFlashing;
	void changeState();
	void setState(int state, int secondsBeforeLeaveState=-1);
};

