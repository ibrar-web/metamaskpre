////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'game16/assets/background.png', id:'background'},
			{src:'game16/assets/logo.png', id:'logo'},
			{src:'game16/assets/button_start.png', id:'buttonStart'},
			
			{src:'game16/assets/bg_wheel.png', id:'bgWheel'},
			{src:'game16/assets/item_wheel_center.png', id:'itemWheelCentre'},
			{src:'game16/assets/item_arrow.png', id:'itemArrow'},
			{src:'game16/assets/item_wheel.png', id:'itemWheel'},
			{src:'game16/assets/item_pin.png', id:'itemPin'},
			{src:'game16/assets/item_light.png', id:'itemLight'},
			
			{src:'game16/assets/item_side.png', id:'itemSide'},
			{src:'game16/assets/item_game1.png', id:'itemGame1'},
			{src:'game16/assets/item_game2.png', id:'itemGame2'},
			{src:'game16/assets/item_ticket.png', id:'itemTicket'},
			{src:'game16/assets/button_spin.png', id:'buttonSpin'},
			
			{src:'game16/assets/button_plus.png', id:'buttonPlus'},
			{src:'game16/assets/button_minus.png', id:'buttonMinus'},
		
			{src:'game16/assets/button_yes.png', id:'buttonYes'},
			{src:'game16/assets/button_no.png', id:'buttonNo'},
			{src:'game16/assets/item_exit.png', id:'itemExit'},
			
			{src:'game16/assets/button_replay.png', id:'buttonReplay'},
			{src:'game16/assets/button_facebook.png', id:'buttonFacebook'},
			{src:'game16/assets/button_twitter.png', id:'buttonTwitter'},
			{src:'game16/assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'game16/assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'game16/assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'game16/assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'game16/assets/button_exit.png', id:'buttonExit'},
			{src:'game16/assets/button_settings.png', id:'buttonSettings'}	];

	//memberpayment
	if(typeof memberData != 'undefined' && enableMembership){
		addMemberRewardAssets();
	}
			
	for(var n=0;n<wheel_arr.length;n++){
		if(wheel_arr[n].src != ''){
			manifest.push({src:wheel_arr[n].src, id:'wheel'+n});
		}
		
		if(wheel_arr[n].highlight != ''){
			manifest.push({src:wheel_arr[n].highlight, id:'wheelH'+n});
		}
	}
	
	for(var n=0;n<wheelSecond_arr.length;n++){
		if(wheelSecond_arr[n].src != ''){
			manifest.push({src:wheelSecond_arr[n].src, id:'wheelInner'+n});
		}
		if(wheelSecond_arr[n].highlight != ''){
			manifest.push({src:wheelSecond_arr[n].highlight, id:'wheelInnerH'+n});
		}
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'game16/assets/sounds/click.ogg', id:'soundClick'});
		manifest.push({src:'game16/assets/sounds/loss.ogg', id:'soundLoss'});
		manifest.push({src:'game16/assets/sounds/win.ogg', id:'soundWin'});
		manifest.push({src:'game16/assets/sounds/lossall.ogg', id:'soundLossall'});
		manifest.push({src:'game16/assets/sounds/jackpot.ogg', id:'soundJackpot'});
		manifest.push({src:'game16/assets/sounds/spin.ogg', id:'soundSpin'});
		manifest.push({src:'game16/assets/sounds/spinning.ogg', id:'soundSpinning'});
		manifest.push({src:'game16/assets/sounds/ticket.ogg', id:'soundTicket'});
		manifest.push({src:'game16/assets/sounds/tone.ogg', id:'soundTone'});
		manifest.push({src:'game16/assets/sounds/result.ogg', id:'soundResult'});
		manifest.push({src:'game16/assets/sounds/arrow.ogg', id:'soundArrow'});
		manifest.push({src:'game16/assets/sounds/select.ogg', id:'soundSelect'});
		manifest.push({src:'game16/assets/sounds/start.ogg', id:'soundStart'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}