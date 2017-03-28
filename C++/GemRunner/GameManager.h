/*
	Copyright 2009 Aston Design Studio

	Defines a game manager for the GemRunner application.
*/

// todo: read the font from the ini file? Finish moveAvatar.

#pragma once

#include <string>
#include "Global.h"
#include "Board.h"
#include "Tray.h"
#include "LevelManager.h"

using namespace std;

/* Constants for the current state. stPlaying means that we are currently 
   playing, i.e. the system reacts to input and moves the avatar accordingly.
   stLost means that the game was lost. During this state, the words "Game 
   Over" and possibly high-score indication are displayed. The system will 
   automatically leave this state after the number of seconds specified by 
   timeInStateLost. stWon means that the current level has been won. During 
   this state, information about the bonus awarded for level is displayed. The 
   system will automatically leave this state after the number of seconds 
   specified by timeInStateWon. */
const int stPlaying = 0;
const int stLost = 1;
const int stWon = 2;
const float timeInStateLost = 2.0f;
const float timeInStateWon = 4.0f;

/* Constats that control the avatar's movement behaviour. */
const float speed=20;
const float friction=0.98f;
const float gravity=0.2f;
const float jumpSpeed = 5.0f;
const float maxSpeedX = 4.0f;

/* Constants that indicate the playing area's bounds. */
const int playFieldMinX = 16;
const int playFieldMaxX = 784;
const int playFieldMinY = 0;
const int playFieldMaxY = 600;

/* The number of points awarded per picked gem. This score is awarded when a 
   gem is picked. If the level is won, this score will be awarded once more for 
   each gem picked in the level. */
const int scorePerDiamond = 100;

/* The bonus that will be awarded if two of the gem colors are in the "green" 
   tray area when a level is won. */
const int bonusForTwoGreen = 3000;

/* The bonus that will be awarded if all three gem colors are in the "green" 
   tray area when a level is won. */
const int bonusForThreeGreen = 10000;

/* This constant controls the odds that a new diamond is placed during each 
   frame. */
const int chanceOfPlacingDiamond = 200;

/* This object maintains the game; reacts to input and updates positions, the 
   board, the tray etc. */
class GameManager
{
public:
	GameManager(void);
	GameManager(string levelFile);
	~GameManager(void);
	
	/* Call this method to start the game. Sets the game state to "playing" and 
	   tells the level manager to load the first level. */
	void start();
	
	/* Called once per frame, this method renders the board (which in turn 
	   renders the background, platforms, gems and avatar), tray and particle 
	   systems, then writes the needed texts, such as score, hi-score and 
	   other information. */
	void render();
	
	/* Called once per frame, this method calculates the time since the last 
	   update (to make the game independent of frame rate), randomly places 
	   new gems, moves the avatar, checks for collissions, calls the update()
	   method of the board, tray and particle manager, checks if it is time to
	   leave the current state and inflly calculates high score (if we changed 
	   state to stLost) or adds bonus to the current score if we changed state
	   to stWon). */
	void update();
	
	/* Returns true if the user has selected to exit the game, by clicking 
	   "Escape" or closing the window. */
	bool getExit() { return mExit; }

private:
	int mScore;
	bool mExit;
	Tray* mTray;
	int mHiScore;
	Board* mBoard;
	hgeFont* mFont;
	float mDeltaX;
	float mDeltaY;
	int mCurrentState;
	bool mStateChanged;
	int mNumberOfBounces;
	bool mHiScoreAchieved;
	int mIdOfBouncePlatform;
	LevelManager* mLevelManager;
	float mCurrentStateEnteredAt;
	int mColorsInGreenInThisLevel;
	int mDiamondsPickedInThisLevel;
	hgeParticleManager *mParticleManager;
	hgeParticleSystemInfo mRedParticles;
	hgeParticleSystemInfo mGreenParticles;
	hgeParticleSystemInfo mBlueParticles;
	hgeParticleSystemInfo mWhiteParticles;

	/* If newState differs from the current state, this method changes the
	   current state. It also sets the mStateChanged variable to True, to make 
	   it possible to determine that this frame is the first one in the new 
	   state. The render() method sets the mStateChange variable back to False
	   after performing its actual tasks.. */
	void setCurrentState(int newState);

	/* Returns the time, in seconds, that have passed since entering this state
	   (i.e. since the setCurrentState metrhod changed state). */
	float timeInCurrentState();

	/* This method checks if it is time to leave one of the states in which we 
	   should remain for a fixed time. If that is the case, the method performs
	   the necessary actions to enter a new state. This method is called by the 
	   update() method once per frame. */
	void checkIfLeaveState();

	/* This method is responsible for moving the avatar, by looking at what 
	   keys that are pressed and the avatar's relation to the platforms. This 
	   method is called by the update() method once per frame.*/
	void moveAvatar(float dt);

	/* This method checks if the avatar has collided with a gem. If so, it 
	   removes the gem from the board, updates the score, possibly spawns a 
	   particle system and updates the tray. Finally, it checks the state of 
	   the tray to find out if the level has been won or lost, in which case
	   it calls setCurrentState. This method is called by the update() method 
	   once per frame. */
	   void checkCollission();
};
