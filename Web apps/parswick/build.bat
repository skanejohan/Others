mkdir .out
mkdir .out\_include
mkdir .out\framework
mkdir .out\framework\content
mkdir .out\framework\ui
mkdir .out\framework\ui\elements
mkdir .out\game

copy ..\_include\utils\arrayutils.js .out\_include
copy ..\_include\timing\timer.js .out\_include
copy ..\_include\timing\pausabletimer.js .out\_include
copy ..\_include\timing\timedvaluemodifier.js .out\_include
copy ..\_include\drawing\scaling_canvas.js .out\_include
copy ..\_include\drawing\text_utils.js .out\_include
copy ..\_include\drawing\ui\animations.js .out\_include
copy ..\_include\drawing\ui\elements.js .out\_include
copy ..\_include\drawing\ui\engine.js .out\_include
copy ..\_include\geometry\geometry.js .out\_include

copy src\framework\content\*.* .out\framework\content
copy src\framework\ui\elements\*.* .out\framework\ui\elements
copy src\framework\ui\*.* .out\framework\ui

copy src\game\*.* .out\game
copy src\game\test\*.* .out\game

copy .\parswick.html .out
copy .\parswick.js .out
