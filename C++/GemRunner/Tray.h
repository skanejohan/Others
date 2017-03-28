/*
	Copyright 2009 Aston Design Studio

	Defines the tray for the GemRunner application.
*/

#pragma once

#include <list>
#include <hgeResource.h>
#include "GemList.h"

const int trayLeft = 700;
const int trayBottom = 572;
const int trayCellWidth = 32;
const int trayCellHeight = 32;

/* This class maintains the "tray" into which the gems are collected. */
class Tray
{
public:
	Tray();
	~Tray();
	
	/* Call this method to add a gem of given color to the tray. The 
	   current state (won/lost) will be updated to reflect this. */
	void add(int color);
	
	/* Call this method to remove one gem of given color from the tray. If a 
	   gem was actually removed, the function returns true. If not (there
	   were no gems of the given color in the tray), it returns false. */
	bool remove(int color);
	
	/* Call this method to remove all gems of given color from the tray. The 
	   function returns the number of gems that were actually removed. */
	int empty(int color);
	
	/* Call this method to clear the tray, i.e. remove all gems from it and 
	   free the associated memory. The current state (won/lost) will be updated
	   to reflect this. */
	void clear();

	/* Returns the number (0-3) of colors that have reached the green area of 
	   the tray. */
	int getNoOfColorsInGreen();

	/* Calls the update() method for all diamonds in the tray. */
	void update(float dt);

	/* Renders the tray by rendering the backgfround colors, then calling the
	   render() method for all diamonds in the tray. */
	void render();
	
	/* Indicates whether the level has been "won". Returns true if one color 
	   has reached the top of the green area, and no color is left in the red 
	   area, otherwise returns false. */ 
	bool stateWon() { return mStateWon; }
	
	/* Indicates whether the level has been "lost". Returns true if one color 
	   has reached the top of the green area, and at least one color is left 
	   in the red area, otherwise returns false. */ 
	bool stateLost() { return mStateLost; }

private:
	int mRedLevel;
	int mYellowLevel;
	int mGreenLevel;
	GemList redDiamonds;
	GemList greenDiamonds;
	GemList blueDiamonds;
	hgeSprite *mRedBackground;
	hgeSprite *mYellowBackground;
	hgeSprite *mGreenBackground;
	bool mStateWon;
	bool mStateLost;
	void updateState();
};
