/*
	Copyright 2009 Aston Design Studio

	Defines a level manager for the GemRunner application.
*/

#pragma once

#include <string>
#include <vector>
#include <stddef.h>
#include "Board.h"

using namespace std;

class LevelManager
{
public:
	LevelManager(void);
	LevelManager(Board *aBoard, string aLevelFile);
	void startFirstLevel();
	void startNextLevel();
	~LevelManager(void);
private:
	int mCurrentLevel;
	vector <string> mLevels;
	Board *mBoard;
	string mLevelFile;
};
