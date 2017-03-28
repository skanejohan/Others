/*
	Copyright 2009 Aston Design Studio

	Application entry point for the GemRunner application.
*/

/*
	todo
		IniFile -> AdsIniFile + checka in testprojekt.
		Kom ihåg hi-score.
		Gör RedLevel och YellowLevel läsbart per level.
		Se till att man inte kan hoppa ut 
		Strukturera om!

		Första diamanten till grön nivå => timer räknar ner
		Diamant borttagen så att grön är tom => timern stängs av igen och tas bort.
		Timer har slagit => level slut. 

		Skapa två levels med vettiga inställningar.
		Se till att applikationen kan snabba upp levels tills det är slut.
*/

#include <hge.h>
#include <hgeResource.h>
#include <iostream>
#include "adsFile.h"
#include "GameManager.h"

HGE *hge=0;
hgeResourceManager *resourceManager;

GameManager* gameManager;

bool FrameFunc()
{
	gameManager->update();
	return gameManager->getExit();
}

bool RenderFunc()
{
	hge->Gfx_BeginScene();
	hge->Gfx_Clear(0);
	gameManager->render();
	hge->Gfx_EndScene();
	return false;
}

int WINAPI WinMain(HINSTANCE, HINSTANCE, LPSTR, int)
{
	try
	{
		hge = hgeCreate(HGE_VERSION);

		hge->System_SetState(HGE_LOGFILE, "GemRunner.log");
		hge->System_SetState(HGE_FRAMEFUNC, FrameFunc);
		hge->System_SetState(HGE_RENDERFUNC, RenderFunc);
		hge->System_SetState(HGE_TITLE, "GemRunner");
		hge->System_SetState(HGE_FPS, 100);
		hge->System_SetState(HGE_WINDOWED, true);
		hge->System_SetState(HGE_SCREENWIDTH, 800);
		hge->System_SetState(HGE_SCREENHEIGHT, 600);
		hge->System_SetState(HGE_SCREENBPP, 32);

		if(hge->System_Initiate()) 
		{
			resourceManager = new hgeResourceManager(getWorkingDirectory().append("\\Debug\\Data\\grResource.res").c_str());
			if(!resourceManager)
			{
				hge->System_Shutdown();
				hge->Release();
				return 0;
			}
			gameManager = new GameManager(getWorkingDirectory().append("\\Debug\\Data\\grLevels.ini"));
			hge->Random_Seed();
			gameManager->start();
			hge->System_Start();
		}

		hge->System_Shutdown();
		hge->Release();
		return 0;
	}
	catch (char* str)
	{
		std::cout << "Exception raised: " << str << "\n";
	}
}
