//window.apiUrl = 'https://46.river-pay.com/';
//window.apiUrl = 'http://adm.linux-dev.servupdate.com:8887';
//window.brandId = '22333';
//window.appTheme = 'violet';
//window.appTheme = 'grey';

window.apiUrl = 'https://river-pay.com';

switch(location.host){
  case 'vsplay777.com':
    window.brandId = '77712';
    window.appTheme = 'violet';
    break;
  case 'phantom-wifi.com':
    window.brandId = '58691';
    window.appTheme = 'grey';
    break;
  case 'play.novobet.games':
    window.brandId = '22334';
    break;
  default:
    window.brandId = '22333';
}
