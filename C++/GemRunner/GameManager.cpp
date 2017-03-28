#include "GameManager.h"

GameManager::GameManager(void)
{
	throw "Construction of empty game manager is illegal!";;
}

GameManager::GameManager(string levelFile)
{
	mScore = 0;
	mHiScore = 0;
	mExit = false;
	mDeltaX = 0.0f;
	mDeltaY = 0.0f;
	mNumberOfBounces = 0;
	mIdOfBouncePlatform = -1;
	mHiScoreAchieved = false;
	mDiamondsPickedInThisLevel = 0;
	mColorsInGreenInThisLevel = 0;
	mStateChanged = false;

	mBoard = new Board();
	mTray = new Tray();
	mLevelManager = new LevelManager(mBoard, levelFile);
	mRedParticles = resourceManager->GetParticleSystem("partGemRed")->info;
	mGreenParticles = resourceManager->GetParticleSystem("partGemGreen")->info;
	mBlueParticles = resourceManager->GetParticleSystem("partGemBlue")->info;
	mWhiteParticles = resourceManager->GetParticleSystem("partGemWhite")->info;
	mParticleManager = new hgeParticleManager();
	mFont = new hgeFont("Images\\grFont.fnt"); // todo
}

GameManager::~GameManager(void)
{
	delete mBoard;
	delete mTray;
	delete mLevelManager;
	delete mParticleManager;
	delete mFont;
}

void GameManager::start()
{
	setCurrentState(stPlaying);
	mLevelManager->startFirstLevel();
}

void GameManager::render()
{
	mBoard->render();
	mTray->render();
	mParticleManager->Render();

	mFont->printf(100, 10, HGETEXT_LEFT, "Score: %d", mScore);
	mFont->printf(400, 10, HGETEXT_LEFT, "Hi-score: %d", mHiScore);
	if (mCurrentState == stLost)
	{
		mFont->printf(100, 100, HGETEXT_LEFT, "Game Over");
		if (mHiScoreAchieved)
			mFont->printf(100, 120, HGETEXT_LEFT, "New hi-score");
	}
	if (mCurrentState == stWon)
	{
		mFont->printf(100, 100, HGETEXT_LEFT, "Level cleared");
		mFont->printf(100, 120, HGETEXT_LEFT, "Bonus for picking %d diamonds: %d", 
			mDiamondsPickedInThisLevel, mDiamondsPickedInThisLevel * scorePerDiamond);
		if (mColorsInGreenInThisLevel == 2)
			mFont->printf(100, 140, HGETEXT_LEFT, "Bonus for two colors in ""green"": %d", bonusForTwoGreen);
		if (mColorsInGreenInThisLevel == 3)
			mFont->printf(100, 140, HGETEXT_LEFT, "Bonus for three colors in ""green"": %d", bonusForThreeGreen);
	}
	
	mStateChanged = false;
}

void GameManager::update()
{
	float dt=hge->Timer_GetDelta();
	if ((mCurrentState == stPlaying) && (hge->Random_Float(0, 100) < (chanceOfPlacingDiamond * dt))) 
		mBoard->placeDiamond();

	moveAvatar(dt);
	checkCollission();
	mBoard->update(dt);
	mTray->update(dt);
	mParticleManager->Update(dt);

	checkIfLeaveState();

	if (mStateChanged)
	{
		if ((mCurrentState == stLost) && (mScore > mHiScore))
		{
			mHiScore = mScore;
			mHiScoreAchieved = true;
		}

		if (mCurrentState == stWon)
		{
			mScore += mDiamondsPickedInThisLevel * scorePerDiamond;
			mColorsInGreenInThisLevel = mTray->getNoOfColorsInGreen();
			if (mColorsInGreenInThisLevel == 2)
				mScore += bonusForTwoGreen;
			if (mColorsInGreenInThisLevel == 3)
				mScore += bonusForThreeGreen;
		}
	}

	if (hge->Input_GetKeyState(HGEK_ESCAPE))
	{
		mExit = true;
	}
}
void GameManager::setCurrentState(int newState)
{
	if (newState != mCurrentState)
	{
		mStateChanged = true;
		mCurrentState = newState;
		mCurrentStateEnteredAt = hge->Timer_GetTime();
	}
}

float GameManager::timeInCurrentState()
{
	return hge->Timer_GetTime() - mCurrentStateEnteredAt;
}

void GameManager::checkIfLeaveState()
{
	if ((mCurrentState == stLost) && (timeInCurrentState() > timeInStateLost))
	{
		mDiamondsPickedInThisLevel = 0;	
		mHiScoreAchieved = false;
		mBoard->clear();
		mTray->clear();
		mScore = 0;
		mLevelManager->startFirstLevel();
		setCurrentState(stPlaying);
	}
	else if ((mCurrentState == stWon) && (timeInCurrentState() > timeInStateWon))
	{
		mDiamondsPickedInThisLevel = 0;
		mBoard->clear();
		mTray->clear();
		mLevelManager->startNextLevel();
		setCurrentState(stPlaying);
	}
}

void GameManager::moveAvatar(float dt)
{
	int platformRelationBeforeMovement;
	int platformRelationAfterMovement;

	platformRelationBeforeMovement = mBoard->calculatePlatformRelation();

	// Calculate mDeltaX, i.e. the x component of the velocity vector. 
	if ((mCurrentState == stPlaying) && (hge->Input_GetKeyState(HGEK_LEFT))) 
	{
		mDeltaX-=speed*dt; 
	}
	else if ((mCurrentState == stPlaying) && (hge->Input_GetKeyState(HGEK_RIGHT)))
	{
		mDeltaX+=speed*dt;
	}
	else if (mDeltaX>0)
	{
		mDeltaX-=0.2*speed*dt;
		if (mDeltaX<0)
		{
			mDeltaX=0;
		}
	}
	else if (mDeltaX<0)
	{
		mDeltaX+=0.2*speed*dt;
		if (mDeltaX>0)
		{
			mDeltaX=0;
		}
	}
	mDeltaX*=friction; 
	if (mDeltaX>maxSpeedX)
	{
		mDeltaX=maxSpeedX;
	}
	if (mDeltaX<-maxSpeedX)
	{
		mDeltaX=-maxSpeedX;
	}

	// Calculate mDeltaY, i.e. the y component of the velocity vector. 
	if ((mCurrentState == stPlaying) && (hge->Input_GetKeyState(HGEK_CTRL)) && (platformRelationBeforeMovement==abovePlatform))
	{
		mDeltaY = -jumpSpeed;
		if ((mNumberOfBounces > 0) && (mIdOfBouncePlatform == mBoard->getCurrentPlatform()->getID()))
		{
			// Twice the jump speed from first bounce
			mDeltaY-=jumpSpeed; //*0.5;
			//if (mNumberOfBounces > 0/*1*/) 
			//	mDeltaY-=jumpSpeed*0.5;
		}
		else
			mNumberOfBounces = 0;

		mIdOfBouncePlatform = mBoard->getCurrentPlatform()->getID();
	}
	mDeltaY*=friction; 
	mDeltaY+=gravity;
	if ((platformRelationBeforeMovement == abovePlatform) && (mDeltaY > 0))
	{
		mDeltaY = 0;
	}

	// Apply mDeltaX and mDeltaY, i.e. change the avatar's position.
	float xPrevious=mBoard->getAvatarX();
	float yPrevious=mBoard->getAvatarY();
	mBoard->setAvatarX(xPrevious+mDeltaX); 
	mBoard->setAvatarY(yPrevious+mDeltaY);

	platformRelationAfterMovement = mBoard->calculatePlatformRelation();

	if ((platformRelationBeforeMovement == abovePlatform) && (platformRelationAfterMovement == abovePlatform))
	{
		mNumberOfBounces = 0;
		mIdOfBouncePlatform = -1;
	}

	//	Now limit the avatar - we may not exceed the bounds of the playing 
	//	field and we may not end up inside a platform. 
	if(mBoard->getAvatarX()<playFieldMinX) 
	{
		mBoard->setAvatarX(playFieldMinX);
		mDeltaX=0;
	}
	/*
	if(y<playFieldMinY) 
	{
		y=playFieldMinY;
		mDeltaY=0;
	}
	*/
	if(mBoard->getAvatarX()>playFieldMaxX) 
	{
		mBoard->setAvatarX(playFieldMaxX);
		mDeltaX=0;
	}
	if(mBoard->getAvatarY()>playFieldMaxY) 
	{
		mBoard->setAvatarY(playFieldMaxY);
		mDeltaY=0;
	}
	if(platformRelationAfterMovement==insidePlatform) 
	{
		if ((xPrevious+halfBlockSize<mBoard->getCurrentPlatform()->getLeft()) && 
			(mBoard->getAvatarX()+halfBlockSize>=mBoard->getCurrentPlatform()->getLeft()))
		{
			// We moved into a platform from the left. 
			mBoard->setAvatarX(mBoard->getCurrentPlatform()->getLeft()-halfBlockSize-1);
			mDeltaX=0;
		}
		else if ((xPrevious-halfBlockSize>mBoard->getCurrentPlatform()->getRight()) && 
			(mBoard->getAvatarX()-halfBlockSize<=mBoard->getCurrentPlatform()->getRight()))
		{
			// We moved into a platform from the right. 
			mBoard->setAvatarX(mBoard->getCurrentPlatform()->getRight()+halfBlockSize+1);
			mDeltaX=0;
		}
		else if ((yPrevious+halfBlockSize<mBoard->getCurrentPlatform()->getTop()) && 
			(mBoard->getAvatarY()+halfBlockSize>=mBoard->getCurrentPlatform()->getTop()))
		{
			// We moved into a platform from the top. 
			mBoard->setAvatarY(mBoard->getCurrentPlatform()->getTop()-halfBlockSize-1);
			mDeltaY=0;
			mNumberOfBounces++;
		}
		else if ((yPrevious-halfBlockSize>mBoard->getCurrentPlatform()->getBottom()) && 
			(mBoard->getAvatarY()-halfBlockSize<=mBoard->getCurrentPlatform()->getBottom()))
		{
			// We moved into a platform from the bottom. 
			mBoard->setAvatarY(mBoard->getCurrentPlatform()->getBottom()+halfBlockSize+1);
			mDeltaY=0;
		}
	}
}

void GameManager::checkCollission()
{
	Gem *newDiamond;
	Gem *diamond = mBoard->collidesWith();
	if (diamond != NULL)
	{
		if (mCurrentState == stPlaying) 
		{
			switch(diamond->getType())
			{
				case gtDiamond:
					switch(diamond->getColor())
					{
						case gcRed: 
							mScore+=scorePerDiamond; 
							mDiamondsPickedInThisLevel++;
							mTray->add(gcRed); 
							mParticleManager->SpawnPS(&mRedParticles, diamond->getX() - 16, diamond->getY() - 16);
							break;
						case gcGreen: 
							mScore+=scorePerDiamond; 
							mDiamondsPickedInThisLevel++;
							mTray->add(gcGreen);  
							mParticleManager->SpawnPS(&mGreenParticles, diamond->getX() - 16, diamond->getY() - 16);
							break;
						case gcBlue: 
							mScore+=scorePerDiamond; 
							mDiamondsPickedInThisLevel++;
							mTray->add(gcBlue);
							mParticleManager->SpawnPS(&mBlueParticles, diamond->getX() - 16, diamond->getY() - 16);
							break;
						case gcWhite:
							mScore+=(3 * scorePerDiamond);
							mDiamondsPickedInThisLevel+=3;
							mTray->add(gcRed);
							mTray->add(gcGreen);
							mTray->add(gcBlue);
							mParticleManager->SpawnPS(&mWhiteParticles, diamond->getX() - 16, diamond->getY() - 16);
							break;
						case gcBlack:
							mTray->remove(gcRed);
							mTray->remove(gcGreen);
							mTray->remove(gcBlue);
							break;
					}
					break;
				case gtKillerDiamond:
					switch(diamond->getColor())
					{
						case gcRed:	
							mTray->empty(gcRed); 
							break;
						case gcGreen: 
							mTray->empty(gcGreen); 
							break;
						case gcBlue: 
							mTray->empty(gcBlue);	
							break;
						case gcWhite: 
							break;
						case gcBlack: 
							break;
					}
					break;
				case gtMinusDiamond:
					switch(diamond->getColor())
					{
						case gcRed: 
							mTray->remove(gcRed);
							break;
						case gcGreen: 
							mTray->remove(gcGreen);
							break;
						case gcBlue: 
							mTray->remove(gcBlue);
							break;
						case gcWhite: 
							break;
						case gcBlack: 
							break;
					}
					break;
			}
			mBoard->removeGem(diamond);

			if (mTray->stateLost()) 
				setCurrentState(stLost); 
			if (mTray->stateWon()) 
				setCurrentState(stWon); 

		}
	}
}

