#include "LevelManager.h"

LevelManager::LevelManager(void)
{
	throw "Construction of empty level manager is illegal!";;
}

LevelManager::LevelManager(Board *aBoard, string aLevelFile)
{
	IniFile iniFile;

	mBoard = aBoard;
	mLevelFile = aLevelFile;
	iniFile.readFromFile(mLevelFile);
	int count = iniFile.getInt("Levels", "Count", 0);
	for (int i=0; i<count; i++)
	{
		mLevels.push_back(iniFile.getString("Levels", stringAndInt("Level", i+1), ""));
	}
	mCurrentLevel = 0;
}


LevelManager::~LevelManager(void)
{
}

void LevelManager::startFirstLevel()
{
	// todo reset speed factor
	mCurrentLevel = 0;
	mBoard->loadFromFile(mLevelFile, mLevels[mCurrentLevel]);
}

void LevelManager::startNextLevel()
{
	mCurrentLevel++;
	if (mCurrentLevel == mLevels.size())
	{
		// todo increase speed factor
		mCurrentLevel = 0;
	}
	mBoard->loadFromFile(mLevelFile, mLevels[mCurrentLevel]);
}
