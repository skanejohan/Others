/*
	Copyright 2009 Aston Design Studio

	Defines the playing board for the GemRunner application.
*/

#pragma once

#include <list>
#include <vector>
#include <string>

#include "adsIniFile.h"
#include "adsChanceEvents.h"

#include "Global.h"
#include "GemList.h"
#include "PlatformList.h"

const int redDiamondChanceId = 1;
const int greenDiamondChanceId = 2;
const int blueDiamondChanceId = 3;
const int whiteDiamondChanceId = 4;
const int blackDiamondChanceId = 5;
const int redKillerDiamondChanceId = 6;
const int greenKillerDiamondChanceId = 7;
const int blueKillerDiamondChanceId = 8;
const int redMinusDiamondChanceId = 9;
const int greenMinusDiamondChanceId = 10;
const int blueMinusDiamondChanceId = 11;

const int AttemptsToPlaceDiamond = 10;

/* This class is responsible for the board, i.e. the platforms and the gems in 
   the playing field. */
class Board
{
public:
	Board();
	~Board();

	void clear();
	void render();
	void update(float dt);
	Gem *collidesWith();
	bool getVacantSpot(int& X, int& Y);
	void placeDiamond();
	int getDiamondVisible() { return mDiamondsVisible; }
	int calculatePlatformRelation(); // todo side effect: sets mCurrentPlatform!
	Platform *getCurrentPlatform() { return mCurrentPlatform; }
	void loadFromFile(std::string fileName, std::string levelName);
	void removeGem(Gem *aGem);
	int getAvatarX() { return mAvatarX; }
	void setAvatarX(int aX) { mAvatarX = aX; }
	int getAvatarY() { return mAvatarY; }
	void setAvatarY(int aY) { mAvatarY = aY; }
private:
	int mAvatarX;
	int mAvatarY;
	hgeAnimation* mAvatar;
	AdsChanceEvents chanceEvents;
	int mDiamondsVisible;
	GemList mGems;
	PlatformList mPlatforms;
	Platform* mCurrentPlatform;
	hgeSprite* mBackground;
};
