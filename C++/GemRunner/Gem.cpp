#include "Gem.h"

Gem::Gem()
{
	Gem(gtDiamond, gcRed, false);
}

Gem::Gem(int aType, int aColor, bool inTray)
{
	std::string animationName;

	mType = aType;
	mColor = aColor;	
	switch (mType)
	{
		case gtDiamond: animationName = "animGem"; break;
		case gtKillerDiamond: animationName = "animGemKiller"; break;
		case gtMinusDiamond: animationName = "animGemMinus"; break;
	}
	switch(mColor)
	{
		case gcBlack: animationName += "Black";	break;
		case gcBlue: animationName += "Blue"; break;
		case gcGreen: animationName += "Green"; break;
		case gcRed: animationName += "Red";	break;
		case gcWhite: animationName += "White";	break;
	}
	mAnimation = new hgeAnimation(*(resourceManager->GetAnimation(animationName.c_str())));
	mAnimation->Play(); 
	if (inTray)
		setState(gsActive);
	else
		setState(gsActivating, 1);
}

Gem::~Gem()
{
	delete mAnimation;
}

void Gem::update(float deltaTime)
{
	mAnimation->Update(deltaTime);
	if ((mTimeWhenLeaveState != -1.0f) && (hge->Timer_GetTime() > mTimeWhenLeaveState))
		changeState();
}

void Gem::render()
{
	mRenderWhenFlashing = !mRenderWhenFlashing;
	switch (mCurrentState)
	{
		case gsActivating:
			if (mRenderWhenFlashing)
				mAnimation->Render(mX, mY); 
			break;
		case gsActive:
			mAnimation->Render(mX, mY);
			break;
		case gsDeactivating:
			if (mRenderWhenFlashing)
				mAnimation->Render(mX, mY);
			break;
	}
}

void Gem::setState(int state, int secondsBeforeLeaveState)
{
	mCurrentState = state;
	if (secondsBeforeLeaveState == -1)
		mTimeWhenLeaveState = -1.0f;
	else
		mTimeWhenLeaveState = hge->Timer_GetTime() + secondsBeforeLeaveState;
}

void Gem::changeState()
{
	switch (mCurrentState)
	{
		case gsActivating: setState(gsActive, hge->Random_Int(2, 10)); break;
		case gsActive: setState(gsDeactivating, 1);	break;
		case gsDeactivating: setState(osInactive); break;
	}
}


