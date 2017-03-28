#include "PlatformList.h"

PlatformList::PlatformList(void)
{
}

PlatformList::~PlatformList(void)
{
}

void PlatformList::add(int aID, int aLeft, int aTop, int aRight, int aBottom)
{
	mPlatforms.push_back(new Platform(aID, aLeft, aTop, aRight, aBottom));
}

void PlatformList::clear()
{
	for (std::vector<Platform *>::iterator it=mPlatforms.begin(); it!=mPlatforms.end(); it++)
		delete (*it);
	mPlatforms.clear();
}

void PlatformList::render()
{
	for (std::vector<Platform *>::iterator it=mPlatforms.begin(); it!=mPlatforms.end(); it++)
		(*it)->render();
}

Platform* PlatformList::relationToPlatform(int x, int y, int& relation)
{
	for (std::vector<Platform *>::iterator it=mPlatforms.begin(); it!=mPlatforms.end(); it++)
	{
		if ((x+halfBlockSize>=(*it)->getLeft()) && (x-halfBlockSize<=(*it)->getRight()))
		{
			if (y+halfBlockSize==(*it)->getTop()-1)
			{
				relation = abovePlatform;
				return *it;
			}
			if (y-halfBlockSize==(*it)->getBottom()+1)
			{
				relation = belowPlatform;
				return *it;
			}
			if ((y+halfBlockSize>=(*it)->getTop()) && (y-halfBlockSize<=(*it)->getBottom()))
			{
				relation = insidePlatform;
				return *it;
			}
		}
		if ((y+halfBlockSize>=(*it)->getTop()) && (y-halfBlockSize<=(*it)->getBottom()))
		{
			if (x+halfBlockSize==(*it)->getLeft()-1) 
			{
				relation = leftOfPlatform;
				return *it;
			}
			if (x-halfBlockSize==(*it)->getRight()+1) 
			{
				relation = rightOfPlatform;
				return *it;
			}
		}
	}
	relation = outsidePlatform;
	return NULL;
}

