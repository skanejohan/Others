/*
	Copyright 2009 Aston Design Studio

	Global definitions for the GemRunner application.
*/

#ifndef GLOBAL
#define GLOBAL

#include <hgeresource.h>

/* The size (and half size) of a block (part of platform, gem etc.) */
const int blockSize=32;
const int halfBlockSize=16;

/* Indicate how the avatar relates to a platform. */
const int abovePlatform=1;
const int rightOfPlatform=2;
const int belowPlatform=3;
const int leftOfPlatform=4;
const int insidePlatform=5;
const int outsidePlatform=6;

extern HGE* hge;
extern hgeResourceManager* resourceManager;

#endif