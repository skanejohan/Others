#include "GemList.h"

GemList::GemList(void)
{
}

GemList::~GemList(void)
{
}

void GemList::add(int aType, int aColor, bool inTray, int aX, int aY)
{
	Gem *gem = new Gem(aType, aColor, inTray);
	gem->setX(aX);
	gem->setY(aY);
	mGems.push_back(gem);
}

void GemList::remove(Gem* aGem)
{
	mGems.remove(aGem);
	delete aGem;
}

bool GemList::removeLast()
{
	if (mGems.size() > 0)
	{
		Gem *gem = mGems.back();
		mGems.pop_back();
		delete gem;
		return true;
	}
	else
		return false;
}

int GemList::clear()
{
	int size = mGems.size();
	while (removeLast())
		;
	return size;
}

void GemList::update(float deltaTime)
{
	for (std::list<Gem *>::iterator it=mGems.begin(); it!=mGems.end(); it++)
		(*it)->update(deltaTime);
}

void GemList::render()
{
	for (std::list<Gem *>::iterator it=mGems.begin(); it!=mGems.end(); it++)
		(*it)->render();
}

Gem *GemList::occupies(int x, int y)
{
	for (std::list<Gem *>::iterator it=mGems.begin(); it!=mGems.end(); it++)
	{
		if (((*it)->getX() == x) && ((*it)->getY() == y))
		{
			return (*it);
		}
	}
	return NULL;
}

Gem *GemList::collidesWith(int x, int y, int dx, int dy)
{
	for (std::list<Gem *>::iterator it=mGems.begin(); it!=mGems.end(); it++)
	{
		if (((*it)->getState() == gsActive) || ((*it)->getState() == gsDeactivating))
		{
			if ((abs((*it)->getX()-x) <= dx) && (abs((*it)->getY()-y) <= dy))
			{
				return (*it);
			}
		}
	}
	return NULL;
}

void GemList::removeAllInactive()
{
	for (std::list<Gem *>::iterator it=mGems.begin(); it!=mGems.end(); it++)
	{
		if ((*it)->getState() == osInactive)
		{
			remove(*it);
			break; // todo figure out how to remove them all. This way one is removed per frame (OK, really)
		}
	}
}
