#include "Platform.h"

Platform::Platform()
{
	Platform(0, 0, 0, 0, 0);
}

Platform::Platform(int aID, int aLeft, int aTop, int aRight, int aBottom)//, hgeResourceManager *resourceManager)
{
	mID = aID;
	mLeft = aLeft;
	mTop = aTop;
	mRight = aRight;
	mBottom = aBottom;
	mSprite = new hgeSprite(*(resourceManager->GetSprite("sprPlatform")));
	mSprite->SetTextureRect(0, 0, mRight-mLeft, mBottom-mTop);
}

Platform::~Platform()
{
	delete mSprite;
}

void Platform::render()
{
	mSprite->Render(mLeft, mTop);
}
