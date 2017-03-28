#include "Tray.h"

Tray::Tray()
{
	mStateLost = false;
	mStateWon = false;
	mRedLevel = 2; // todo read from file
	mYellowLevel = 3; // todo read from file
	mGreenLevel = 5; // todo read from file
	mRedBackground = resourceManager->GetSprite("sprTrayRed");
	mYellowBackground = resourceManager->GetSprite("sprTrayYellow");
	mGreenBackground = resourceManager->GetSprite("sprTrayGreen");
}

Tray::~Tray()
{
}

void Tray::add(int color)
{
	//Gem *trayDiamond = new Gem(gtDiamond, color, true, mResourceManager, mHGE);
	switch (color)
	{
		case gcRed:
			redDiamonds.add(gtDiamond, color, true, trayLeft, 
				trayBottom - redDiamonds.size() * trayCellHeight);
			//trayDiamond->setX(trayLeft);
			//trayDiamond->setY(trayBottom - redDiamonds.size() * trayCellHeight);
			//redDiamonds.add(trayDiamond); 
			break;
		case gcGreen:
			greenDiamonds.add(gtDiamond, color, true, trayLeft + trayCellWidth, 
				trayBottom - greenDiamonds.size() * trayCellHeight);
			//trayDiamond->setX(trayLeft + trayCellWidth);
			//trayDiamond->setY(trayBottom-greenDiamonds.size() * trayCellHeight);
			//greenDiamonds.add(trayDiamond); 
			break;
		case gcBlue:
			blueDiamonds.add(gtDiamond, color, true, trayLeft + 2 * trayCellWidth, 
				trayBottom - blueDiamonds.size() * trayCellHeight);
			//trayDiamond->setX(trayLeft + 2 * trayCellWidth);
			//trayDiamond->setY(trayBottom-blueDiamonds.size() * trayCellHeight);
			//blueDiamonds.add(trayDiamond); 
	}
	updateState();
}

bool Tray::remove(int color)
{
	GemList* gemList;

	switch (color)
	{
		case gcRed: gemList = &redDiamonds; break;
		case gcGreen: gemList = &greenDiamonds; break;
		case gcBlue: gemList = &blueDiamonds; break;
	}
	return gemList->removeLast();
}

int Tray::empty(int color)
{
	GemList* gemList;

	switch (color)
	{
		case gcRed: gemList = &redDiamonds; break;
		case gcGreen: gemList = &greenDiamonds; break;
		case gcBlue: gemList = &blueDiamonds; break;
	}
	return gemList->clear();
}

void Tray::clear()
{
	redDiamonds.clear();
	greenDiamonds.clear();
	blueDiamonds.clear();
	updateState();
}

int Tray::getNoOfColorsInGreen()
{
	int count = 0;
	if (redDiamonds.size() > mYellowLevel) count++;
	if (greenDiamonds.size() > mYellowLevel) count++;
	if (blueDiamonds.size() > mYellowLevel) count++;
	return count;
}

void Tray::update(float dt)
{
	redDiamonds.update(dt);
	greenDiamonds.update(dt);
	blueDiamonds.update(dt);
}

void Tray::render()
{
	for (int i=0; i<mRedLevel; i++)
	{
		mRedBackground->Render(trayLeft, trayBottom - i * trayCellHeight);
		mRedBackground->Render(trayLeft + trayCellWidth, trayBottom - i * trayCellHeight);
		mRedBackground->Render(trayLeft + 2 * trayCellWidth, trayBottom - i * trayCellHeight);
	}

	for (int i=mRedLevel; i<mYellowLevel; i++)
	{
		mYellowBackground->Render(trayLeft, trayBottom - i * trayCellHeight);
		mYellowBackground->Render(trayLeft + trayCellWidth, trayBottom - i * trayCellHeight);
		mYellowBackground->Render(trayLeft + 2 * trayCellWidth, trayBottom - i * trayCellHeight);
	}

	for (int i=mYellowLevel; i<mGreenLevel; i++)
	{
		mGreenBackground->Render(trayLeft, trayBottom - i * trayCellHeight);
		mGreenBackground->Render(trayLeft + trayCellWidth, trayBottom - i * trayCellHeight);
		mGreenBackground->Render(trayLeft + 2 * trayCellWidth, trayBottom - i * trayCellHeight);
	}

	redDiamonds.render();
	greenDiamonds.render();
	blueDiamonds.render();
}

void Tray::updateState()
{
	int size1 = redDiamonds.size();
	int size2 = greenDiamonds.size();
	int size3 = blueDiamonds.size();

	mStateLost = false;
	mStateWon = false;

	if ((size1 >= mGreenLevel) || (size2 >= mGreenLevel) || (size3 >= mGreenLevel))
	{
		if ((size1 <= mRedLevel) || (size2 <= mRedLevel) || (size3 <= mRedLevel))
		{
			mStateLost = true;
		}
		else
		{
			mStateWon = true;
		}
	}
}



