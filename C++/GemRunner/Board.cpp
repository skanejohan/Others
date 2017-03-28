#include "Board.h"

Board::Board()
{
	mDiamondsVisible = 0;
	mAvatar = resourceManager->GetAnimation("animAvatar");
	mAvatar->Play();
}

Board::~Board()
{
	delete mAvatar;
}

void Board::loadFromFile(std::string fileName, std::string levelName)
{
	IniFile iniFile;

	clear();
	
	iniFile.readFromFile(fileName);
	for (int i=1; i<=iniFile.getInt(levelName, "PlatformCount", 0); i++)
	{
		string baseKey = stringAndInt("Platform", i);
		string key = baseKey;
		key.append("Left");
		int left = iniFile.getInt(levelName, key, 0);
		key = baseKey;
		key.append("Top");
		int top = iniFile.getInt(levelName, key, 0);
		key = baseKey;
		key.append("Right");
		int right = iniFile.getInt(levelName, key, 0);
		key = baseKey;
		key.append("Bottom");
		int bottom = iniFile.getInt(levelName, key, 0);
		mPlatforms.add(i, left * blockSize, top * blockSize, right * blockSize, bottom * blockSize);
	}
	mBackground = resourceManager->GetSprite(iniFile.getString(levelName, "Background", "").c_str());

    mAvatarX = iniFile.getInt(levelName, "AvatarX", 1) * blockSize + halfBlockSize;
	mAvatarY = iniFile.getInt(levelName, "AvatarY", 1) * blockSize + halfBlockSize - 1;

	chanceEvents.addEvent(redDiamondChanceId, iniFile.getInt(levelName, "RedDiamondChance", 0));
	chanceEvents.addEvent(greenDiamondChanceId, iniFile.getInt(levelName, "GreenDiamondChance", 0));
	chanceEvents.addEvent(blueDiamondChanceId, iniFile.getInt(levelName, "BlueDiamondChance", 0));
	chanceEvents.addEvent(whiteDiamondChanceId, iniFile.getInt(levelName, "WhiteDiamondChance", 0));
	chanceEvents.addEvent(blackDiamondChanceId, iniFile.getInt(levelName, "BlackDiamondChance", 0));
	chanceEvents.addEvent(redKillerDiamondChanceId, iniFile.getInt(levelName, "RedKillerDiamondChance", 0));
	chanceEvents.addEvent(greenKillerDiamondChanceId, iniFile.getInt(levelName, "GreenKillerDiamondChance", 0));
	chanceEvents.addEvent(blueKillerDiamondChanceId, iniFile.getInt(levelName, "BlueKillerDiamondChance", 0));
	chanceEvents.addEvent(redMinusDiamondChanceId, iniFile.getInt(levelName, "RedMinusDiamondChance", 0));
	chanceEvents.addEvent(greenMinusDiamondChanceId, iniFile.getInt(levelName, "GreenMinusDiamondChance", 0));
	chanceEvents.addEvent(blueMinusDiamondChanceId, iniFile.getInt(levelName, "BlueMinusDiamondChance", 0));
}

void Board::clear()
{
	mGems.clear();
	mPlatforms.clear();
}

void Board::removeGem(Gem *aGem)
{
	mGems.remove(aGem);
	mDiamondsVisible--;
}

Gem *Board::collidesWith()
{
	return mGems.collidesWith(mAvatarX, mAvatarY, 30, 30); //todo ?
}

void Board::update(float dt)
{
	mGems.update(dt);
	mGems.removeAllInactive();
	mAvatar->Update(dt);
}

void Board::render()
{
	mBackground->Render(0, 0);
	mPlatforms.render();
	mGems.render();
	mAvatar->Render(getAvatarX(), getAvatarY());
}

int Board::calculatePlatformRelation()
{
	int relation;

	Platform* relatedPlatform = mPlatforms.relationToPlatform(mAvatarX, mAvatarY, relation);
	/* If we are outside any platform, it is important not to change the value
	   of mCurrentPlatform. This way, a user can store the value of 
	   mCurrentPlatform, call this method and then determine if we have 
	   changed platform or not. */
	if (relation != outsidePlatform)
		mCurrentPlatform = relatedPlatform;
	return relation;
}

bool Board::getVacantSpot(int& X, int& Y)
{
	Platform *platform;
	int pfPos;
	bool placed;

	/* Make a number of attempts to find a vacant spot for the diamond. */
	for (int i=0; i<AttemptsToPlaceDiamond; i++)
	{
		// Select a random platform
		platform = mPlatforms.platform(hge->Random_Int(0, mPlatforms.size()-1));

		// Have diamondX and diamondY become coordinates of a random position on the selected platform
		pfPos = hge->Random_Int(0, ((platform->getRight() - platform->getLeft()) / blockSize)-1);
		X = platform->getLeft() + pfPos * blockSize + halfBlockSize;
		Y = platform->getTop() - halfBlockSize - 1;
		if (!mGems.occupies(X, Y))
			return true;
	}
	return false;
}

void Board::placeDiamond()
{
	int diamondX;
	int diamondY; 

	if (getVacantSpot(diamondX, diamondY))
	{
		switch(chanceEvents.getEvent())
		{	
			case redDiamondChanceId: mGems.add(gtDiamond, gcRed, false, diamondX, diamondY); break;
			case greenDiamondChanceId: mGems.add(gtDiamond, gcGreen, false, diamondX, diamondY); break;
			case blueDiamondChanceId: mGems.add(gtDiamond, gcBlue, false, diamondX, diamondY); break;
			case whiteDiamondChanceId: mGems.add(gtDiamond, gcWhite, false, diamondX, diamondY); break;
			case blackDiamondChanceId: mGems.add(gtDiamond, gcBlack, false, diamondX, diamondY); break;
			case redKillerDiamondChanceId: mGems.add(gtKillerDiamond, gcRed, false, diamondX, diamondY); break;
			case greenKillerDiamondChanceId: mGems.add(gtKillerDiamond, gcGreen, false, diamondX, diamondY); break;
			case blueKillerDiamondChanceId: mGems.add(gtKillerDiamond, gcBlue, false, diamondX, diamondY); break;
			case redMinusDiamondChanceId: mGems.add(gtMinusDiamond, gcRed, false, diamondX, diamondY); break;
			case greenMinusDiamondChanceId: mGems.add(gtMinusDiamond, gcGreen, false, diamondX, diamondY); break;
			case blueMinusDiamondChanceId: mGems.add(gtMinusDiamond, gcBlue, false, diamondX, diamondY); break;
		}
		mDiamondsVisible++;
	}
}

