cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-google-analytics/www/analytics.js",
        "id": "cordova-plugin-google-analytics.UniversalAnalytics",
        "pluginId": "cordova-plugin-google-analytics",
        "clobbers": [
            "analytics",
            "ga"
        ]
    },
    {
        "file": "plugins/cordova-plugin-google-analytics/browser/UniversalAnalyticsProxy.js",
        "id": "cordova-plugin-google-analytics.UniversalAnalyticsProxy",
        "pluginId": "cordova-plugin-google-analytics",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-google-analytics": "1.8.3"
}
// BOTTOM OF METADATA
});