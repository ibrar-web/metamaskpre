var s_iOffsetX = 0;
var s_iOffsetY = 0;
var s_fInverseScaling;
var s_bLandscape = false;

        /**
         * jQuery.browser.mobile (http://detectmobilebrowser.com/)
         * jQuery.browser.mobile will be true if the browser is a mobile device
         **/
(function(a){(jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))})(navigator.userAgent || navigator.vendor || window.opera);
                
$(window).resize(function() {
    sizeHandler();                
});
                
function trace(szMsg){
    console.log(szMsg);                        
}

        
function isIOS(){
        
    var iDevices = [             
        'iPad Simulator',            
        'iPhone Simulator',            
        'iPod Simulator',            
        'iPad',             
        'iPhone',             
        'iPod'      
    ];
                
    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){
            s_bIsIphone = true; 
            return true;
        }  
    }     
    s_bIsIphone = false;            
    return false;             
}

        
window.addEventListener("orientationchange", onOrientationChange);
                
function onOrientationChange(){                
    if (window.matchMedia("(orientation: portrait)").matches) {               
        // you're in PORTRAIT mode	                   
        sizeHandler();                
    }                
    if (window.matchMedia("(orientation: landscape)").matches) {
                
        // you're in LANDSCAPE mode                   
        sizeHandler();                
    }            
}
        
function getSize(Name) {
        
    var size;                
    var name = Name.toLowerCase();            
    var document = window.document;
    var documentElement = document.documentElement;
    if (window["inner" + Name] === undefined) {
        // IE6 & IE7 don't have window.innerWidth or innerHeight
        size = documentElement["client" + Name];
        }        
        else if (window["inner" + Name] != documentElement["client" + Name]) {           
            // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

            // Insert markup to test if a media query will match document.doumentElement["client" + Name]
            var bodyElement = document.createElement("body");
            bodyElement.id = "vpw-test-b";
            bodyElement.style.cssText = "overflow:scroll";
            var divElement = document.createElement("div");
            divElement.id = "vpw-test-d";
            divElement.style.cssText = "position:absolute;top:-1000px";
            // Getting specific on the CSS selector so it won't get overridden easily        
            divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
            bodyElement.appendChild(divElement);
            documentElement.insertBefore(bodyElement, document.head);
            if (divElement["offset" + Name] == 7) {
            // Media query matches document.documentElement["client" + Name]
                size = documentElement["client" + Name];
            }
            else {
                // Media query didn't match, use window["inner" + Name]
                size = window["inner" + Name];
            }
            // Cleanup
            documentElement.removeChild(bodyElement);
        }
        else {
            // Default to use window["inner" + Name]
            size = window["inner" + Name];
        }
        return size;
    };
    
function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
};

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) - getIOSWindowHeight();
    return tH > 1 ? tH : 0;
};

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION
function sizeHandler() {
    window.scrollTo(0, 1);

	if (!$("#canvas")){
		return;
	}

        

	var h;
        if(platform.name.toLowerCase() === "safari"){
            h = getIOSWindowHeight();
        }else{ 
            h = getSize("Height");
        }
        
        var w = getSize("Width");

	var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

        if(w>h){
		//LANDSCAPE
		//EDGEBOARD_X = 0;
		//EDGEBOARD_Y = 570;
                s_bLandscape = true;
	}else{
		//EDGEBOARD_X = 470;
		//EDGEBOARD_Y = 0;
                s_bLandscape = false;
	}

	var destW = Math.round(CANVAS_WIDTH * multiplier);
	var destH = Math.round(CANVAS_HEIGHT * multiplier);
        

        //$("#canvas").css("width",destW+"px");
        //$("#canvas").css("height",destH+"px");

        
    var iAdd = 0;
    if (destH < h){
        iAdd = h - destH;
        destH += iAdd;
        destW += iAdd * (CANVAS_WIDTH / CANVAS_HEIGHT);
    } else  if (destW < w){
        iAdd = w - destW;
        destW += iAdd;
        destH += iAdd * (CANVAS_HEIGHT / CANVAS_WIDTH);
    }
    
    var fOffsetY = ((h / 2) - (destH / 2));
    var fOffsetX = ((w / 2) - (destW / 2));
    var fGameInverseScaling = (CANVAS_WIDTH / destW);
    if (fOffsetX * fGameInverseScaling < - EDGEBOARD_X ||
            fOffsetY * fGameInverseScaling < - EDGEBOARD_Y){
        s_iScaleFactor = Math.min(h / (CANVAS_HEIGHT - (EDGEBOARD_Y * 2)), w / (CANVAS_WIDTH - (EDGEBOARD_X * 2)));
        destW = Math.round( CANVAS_WIDTH * s_iScaleFactor );
        destH = Math.round( CANVAS_HEIGHT * s_iScaleFactor );
        fOffsetY = (h - destH) / 2;
        fOffsetX = (w - destW) / 2;
        fGameInverseScaling = (CANVAS_WIDTH / destW);
    }
    
    s_fInverseScaling = fGameInverseScaling;
    
    s_iOffsetX = ( - 1 * fOffsetX * fGameInverseScaling);
    s_iOffsetY = ( - 1 * fOffsetY * fGameInverseScaling);
    if (fOffsetY >= 0){
        s_iOffsetY = 0;
    }
    
    if (fOffsetX >= 0){
        s_iOffsetX = 0;
    }
    
    if (s_oInterface !== null){
        s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    }
    if (s_oMenu !== null){
        s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    }
    if(s_oGame){
        s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    }
    
    $("#canvas").css("width", destW + "px");
    $("#canvas").css("height", destH + "px");

    
    if(fOffsetY < 0){
        $("#canvas").css("top",fOffsetY+"px");
        
    }else{
        // centered game
        fOffsetY = (h - destH)/2;
        $("#canvas").css("top",fOffsetY+"px");
    }
    s_iCanvasOffsetHeight=fOffsetY;
    
    $("#canvas").css("left", fOffsetX + "px"); 


    resizeCanvas3D();
    
    s_iCanvasResizeWidth  = destW;
    s_iCanvasResizeHeight = destH;
    
    s_iCanvasOffsetWidth=fOffsetX;
    
    fullscreenHandler();
};
 
function _checkOrientation(iWidth,iHeight){
    if(s_bMobile && ENABLE_CHECK_ORIENTATION){
        if( iWidth>iHeight ){ 
            if( $(".orientation-msg-container").attr("data-orientation") === "landscape" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }  
        }else{
            if( $(".orientation-msg-container").attr("data-orientation") === "portrait" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }   
        }
    }
}


function createBitmap(oSprite, iWidthHitArea, iHeightHitArea){
    var oBmp = new createjs.Bitmap(oSprite);
    var hitObject = new createjs.Shape();
    if (iWidthHitArea && iHeightHitArea){
        hitObject.graphics.beginFill("#fff").drawRect( - iWidthHitArea / 2, - iHeightHitArea / 2, iWidthHitArea, iHeightHitArea);
    } else{
        hitObject.graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
    }
    oBmp.hitArea = hitObject;
    return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX, iRegY, iWidth, iHeight){
    if (szState !== null){
        var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
    } else{
        var oRetSprite = new createjs.Sprite(oSpriteSheet);
    }

    var hitObject = new createjs.Shape();
    hitObject.graphics.beginFill("#000000").drawRect( - iRegX, - iRegY, iWidth, iHeight);
    oRetSprite.hitArea = hitObject;
    return oRetSprite;
}

function smartResize(oElement, iXTolerance, iYTolerance){
    
    _checkXResize(oElement, iXTolerance);
    _checkYResize(oElement, iYTolerance);
    
    function _checkXResize(oElement, iXTolerance){
        if(oElement.getBounds() === null){
            return;
        }
        
        var iWidth = oElement.getBounds().width+iXTolerance;
        var iScreenWidth = CANVAS_WIDTH-2*s_iOffsetX;
        
        var iScaleRatio = iScreenWidth/iWidth;
        
        if(iWidth>iScreenWidth){
            oElement.scaleX = oElement.scaleY = iScaleRatio;
        }
    };

    function _checkYResize(oElement, iYTolerance){
        if(oElement.getBounds() === null){
            return;
        }

        var iHeight = oElement.getBounds().height+iYTolerance;
        var iScreenHeight = CANVAS_HEIGHT-2*s_iOffsetY;

        var iScaleRatio = iScreenHeight/iHeight;
        
        if(iHeight>iScreenHeight){
            oElement.scaleX = oElement.scaleY = iScaleRatio;
        }
    };

};

function linearFunction(x, x1, x2, y1, y2){
    return ( (x-x1)*(y2-y1)/(x2-x1) ) + y1; 
}

function randomFloatBetween(minValue, maxValue, precision){
    if (typeof (precision) === 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
}

function shuffle(array) {
    var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function formatTime(iTime){	
    iTime/=1000;
    var iMins = Math.floor(iTime/60);
    var iSecs = Math.floor(iTime-(iMins*60));
    //iSecs = parseFloat(iSecs).toFixed(1)
    
    var szRet = "";

    if ( iMins < 10 ){
            szRet += "0" + iMins + ":";
    }else{
            szRet += iMins + ":";
    }

    if ( iSecs < 10 ){
            szRet += "0" + iSecs;
    }else{
            szRet += iSecs;
    }	

    return szRet;
}

function degreesToRadians(iAngle){
    return iAngle * Math.PI / 180;
}

function distance(v1,v2){
        return Math.sqrt( ( (v2.x-v1.x)*(v2.x-v1.x) ) + ( (v2.y-v1.y)*(v2.y-v1.y) ) );
}

function distance2(v1,v2){
        return ( (v2.x-v1.x)*(v2.x-v1.x) ) + ( (v2.y-v1.y)*(v2.y-v1.y) );
}
                
function NoClickDelay(el) {
	this.element = el;
	if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}
//Fisher-Yates Shuffle
function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
}

NoClickDelay.prototype = {
handleEvent: function(e) {
    switch(e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
},
	
onTouchStart: function(e) {
    e.preventDefault();
    this.moved = false;
    
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
},
	
onTouchMove: function(e) {
    this.moved = true;
},
	
onTouchEnd: function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);
    
    if( !this.moved ) {
        var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
        
        var theEvent = document.createEvent('MouseEvents');
        theEvent.initEvent('click', true, true);
        theTarget.dispatchEvent(theEvent);
    }
}

};
        
(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = { 
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
            };

        evt = evt || window.event;
		
        if (evt.type in evtMap){
            document.body.className = evtMap[evt.type];
        }else{        
            document.body.className = this[hidden] ? "hidden" : "visible";

			if(document.body.className === "hidden"){
				s_oMain.stopUpdate();
			}else{
				s_oMain.startUpdate();
			}
		}
        
        
                
    }
})();

function playSound(szSound,iVolume,bLoop){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){

        s_aSounds[szSound].play();
        s_aSounds[szSound].volume(iVolume);

        s_aSounds[szSound].loop(bLoop);

        return s_aSounds[szSound];
    }
    return null;
}

function stopSound(szSound){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        s_aSounds[szSound].stop();
    }
}   

function setVolume(szSound, iVolume){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        s_aSounds[szSound].volume(iVolume);
    }
}  

function setMute(szSound, bMute){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        s_aSounds[szSound].mute(bMute);
    }
}


function ctlArcadeResume(){
    if (s_oMain !== null){
        s_oMain.startUpdate();
    }
}

function ctlArcadePause(){
    if (s_oMain !== null){
        s_oMain.stopUpdate();
    }
}


function getParamValue(paramName){
    var url = window.location.search.substring(1);
            var qArray = url.split('&');
            for (var i = 0; i < qArray.length; i++)
    {
    var pArr = qArray[i].split('=');
            if (pArr[0] == paramName)
            return pArr[1];
    }
}

function rotateVector2D(iAngle, o) {
    var iX = o.x * Math.cos(iAngle) + o.y * Math.sin(iAngle);
    var iY = o.x * ( - Math.sin(iAngle)) + o.y * Math.cos(iAngle);
    return {x : iX, y : iY};
}


function normalize(o, len){
    if (len > 0){
        o.x /= len; o.y /= len;
    }
    return o
};
function length (o){
    return Math.sqrt(o.x * o.x + o.y * o.y);
};

function findNearestIntersectingObject(clientX, clientY, camera, objects) {
    // Get the picking ray from the point
    //var projector = new THREE.Projector();
    var SCREEN_WIDTH = CANVAS_RESIZE_WIDTH + OFFSET_WIDTH * 2;
    var SCREEN_HEIGHT = CANVAS_RESIZE_HEIGHT + OFFSET_HEIGHT * 2;

    var raycaster = new THREE.Raycaster();
    var mouse3D = new THREE.Vector3();
    // Get 3D point form the client x y
    mouse3D.x = (clientX / SCREEN_WIDTH) * 2 - 1;
    mouse3D.y = - (clientY / SCREEN_HEIGHT) * 2 + 1;
    mouse3D.z = 0.5;
    raycaster.setFromCamera(mouse3D, camera);
    var hits = raycaster.intersectObjects(objects, true);
    // Find the closest intersecting object
    // Now, cast the ray all render objects in the scene to see if they collide. Take the closest one.
    //var hits = raycaster.intersectObjects(objects,true);
//                console.log(hits);
    var closest = false;
    if (hits.length > 0) {
    closest = hits[0];
    }

    return closest;
}
                
                
                
                
function distance(x1, y1, x2, y2){
    var iDx = x1 - x2;
    var iDy = y1 - y2;
    return Math.sqrt((iDx * iDx) + (iDy * iDy));
}
function distance2(x1, y1, x2, y2){
    var iDx = x1 - x2;
    var iDy = y1 - y2;
    return ((iDx * iDx) + (iDy * iDy));
}
function resizeCanvas3D(){
    $("canvas").each(function(){
        if( $(this).attr("id") == "#canvas"){
            return;
        }
        $(this).css("width", $("#canvas").css("width"));
        $(this).css("height", $("#canvas").css("height"));
        $(this).css("position", $("#canvas").css("position"));
        $(this).css("left", $("#canvas").css("left"));
        $(this).css("top", $("#canvas").css("top"));
    });
}

function convert3dPosTo2dScreen(pos, camera) {
        
        var vector = new THREE.Vector3();

        vector.set( pos.x, pos.y, pos.z );

        // map to normalized device coordinate (NDC) space
        vector.project( camera );

        // map to 2D screen space
        vector.x = Math.round( (   vector.x + 1 ) * CANVAS_WIDTH  * 0.5 );
        vector.y = Math.round( ( - vector.y + 1 ) * CANVAS_HEIGHT * 0.5 );
        vector.z = 0;

        return vector;             
};

function convert2dPosTo3d(pos, camera) {
        
        var vector = new THREE.Vector3();

        vector.set(
            ( pos.x / CANVAS_WIDTH ) * 2 - 1,
            - ( pos.y / CANVAS_HEIGHT ) * 2 + 1,
            0.5 );

        vector.unproject( camera );

        var dir = vector.sub( camera.position ).normalize();

        var distance = - camera.position.z / dir.z;

        var final = camera.position.clone().add( dir.multiplyScalar( distance ) );
        
        return {x: final.x, y:final.y};       
};

function createOrthoGraphicCamera(){
    var iWidth = ( CANVAS_WIDTH / 2);
    var iHeight = ( CANVAS_HEIGHT / 2 );

    var oCamera = new THREE.OrthographicCamera(-iWidth, iWidth, iHeight, -iHeight, NEAR, FAR);
    oCamera.position.set(START_CAMERA_POSITION.x, START_CAMERA_POSITION.y, START_CAMERA_POSITION.z);
    //oCamera.position.set(30, 0, 0);
    //oCamera.lookAt(new THREE.Vector3(0,0,0));
    //oCamera.up.set(0, 0, 1);
    //oCamera.rotation.y  =  180 * (Math.PI / 180);

    oCamera.zoom = CAMERA_ZOOM;
   
    oCamera.updateProjectionMatrix();  
    oCamera.updateMatrixWorld();
    
    return oCamera;
}
function dotProductV2(v1, v2){
    return ( v1.getX() * v2.getX()+ v1.getY() * v2.getY() );
}

function pointInPoly (pt, poly){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
    ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
    && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
    && (c = !c);
    return c;
};

function findPointOnCircle(originX, originY , radius, angleRadians) {
        var newX = radius * Math.cos(angleRadians) + originX
        var newY = radius * Math.sin(angleRadians) + originY
        return {"x" : newX, "y" : newY}
}


function angleBetweenVectors( v1, v2 ){
        /*
        var iAngle= Math.acos( dotProductV2( v1, v2 ) / (v1.length() * v2.length()) );
        if ( isNaN( iAngle ) == true ){
            return 0;
        }else{
            return iAngle;
        }
        */
       
        /////////// -180 to 180 ////////
        
        var dot = dotProductV2( v1, v2 )      // dot product
        var det = v1.getX()*v2.getY() - v1.getY()*v2.getX();      // determinant x1*y2 - y1*x2
        
        var iAngle = Math.atan2(det, dot)  // atan2(y, x) or atan2(sin, cos)
        return iAngle;
        
}

function rotateVector2D( iAngle, o ) {  
    var iX = o.getX()  *  Math.cos( iAngle )  + o.getY() * Math.sin( iAngle );
    var iY = o.getX() * (-Math.sin( iAngle )) + o.getY() * Math.cos( iAngle );  
    
    return {x : iX, y : iY, z : 0};
}
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

function distanceV3 (x1,y1,z1,x2,y2,z2){
    var iDx = x1 - x2;
    var iDy = y1 - y2;
    var iDz = z1 - z2;
    
    return Math.sqrt((iDx * iDx) + (iDy * iDy) + (iDz * iDz));
}


function distanceV2 ( v1, v2){
    var iDx = v1.x - v2.x;
    var iDy = v1.y - v2.y;

    return Math.sqrt((iDx * iDx) + (iDy * iDy) );
}


function fullscreenHandler(){
    if (!ENABLE_FULLSCREEN || !screenfull.enabled){
       return;
    }
	
    s_bFullscreen = screenfull.isFullscreen;

    if (s_oInterface !== null){
        s_oInterface.resetFullscreenBut();
    }

    if (s_oMenu !== null){
        s_oMenu.resetFullscreenBut();
    }
    
}


if (screenfull.enabled) {
    screenfull.on('change', function(){
            s_bFullscreen = screenfull.isFullscreen;

            if (s_oInterface !== null){
                s_oInterface.resetFullscreenBut();
            }

            if (s_oMenu !== null){
                s_oMenu.resetFullscreenBut();
            }
    });
}