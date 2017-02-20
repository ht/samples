var paths = window.location.href.replace(/\/+$/,'').split('/');
screenType = 1;
if(paths[paths.length - 1] !== 'sm'){
    MyApp.app.common.loadTheme(Ext.util.Cookies.get('theme'));
    screenType = 2;
}