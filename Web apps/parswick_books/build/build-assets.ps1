Copy-Item kongtext.ttf -Destination ..\assets

function Create-Asset {
    param ( $Asset )
    D:\Tools\Aseprite-v1.3-rc6-x64\Aseprite.exe -b "D:\Dropbox\Dropbox\Graphics\Parswick Books\$Asset.aseprite" --save-as ..\assets\$Asset.png
}

Create-Asset -Asset fme-bottom
Create-Asset -Asset fme-left-bottom
Create-Asset -Asset fme-left-right-bottom
Create-Asset -Asset fme-right

Create-Asset -Asset itm-magnifying-glass
Create-Asset -Asset itm-magnifying-glass-i
Create-Asset -Asset itm-metal-box
Create-Asset -Asset itm-model-car
Create-Asset -Asset itm-model-car-i
Create-Asset -Asset itm-stones
Create-Asset -Asset itm-stones-i
Create-Asset -Asset itm-rock-pick
Create-Asset -Asset itm-paper-clip
Create-Asset -Asset itm-unknown-book
Create-Asset -Asset itm-house-history-book
Create-Asset -Asset itm-cup
Create-Asset -Asset itm-office-door-key
Create-Asset -Asset itm-open-cabinet
Create-Asset -Asset itm-open-drawer
Create-Asset -Asset itm-keyhole
Create-Asset -Asset itm-lamp-switch
Create-Asset -Asset itm-latin-dictionary

Create-Asset -Asset loc-art-and-architecture-section
Create-Asset -Asset loc-bathroom
Create-Asset -Asset loc-fiction-section
Create-Asset -Asset loc-history-section
Create-Asset -Asset loc-kitchen
Create-Asset -Asset loc-office
Create-Asset -Asset loc-office-dark
Create-Asset -Asset loc-office-semidark
Create-Asset -Asset loc-travel-and-language-section
