#!/usr/bin/env bash

#Create env file
echo "Creating .env file"
cat > ./.env <<EOL
API_URL=${API_URL}
APP_LINK_URL=${APP_LINK_URL}
RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY}
REVENUE_CAT_PUBLIC_KEY_ANDROID=${REVENUE_CAT_PUBLIC_KEY_ANDROID}
REVENUE_CAT_PUBLIC_KEY_IOS=${REVENUE_CAT_PUBLIC_KEY_IOS}
EOL

#Create  appcenter-config.json file
echo "Update  appcenter-config.json file for Adnroid"
sed -i '' -e "s/APP_CENTER_SECRET_KEY_ANDROID/${APP_CENTER_SECRET_KEY_ANDROID}/g" android/app/src/main/assets/appcenter-config.json

#Create AppCenter-Config.plist file
echo "Create AppCenter-Config.plist file for iOS"
$(/usr/libexec/PlistBuddy -c "Set :AppSecret $APP_CENTER_SECRET_KEY_IOS"  "ios/vitalopwellnessMobile/AppCenter-Config.plist")


#set up environment variables
echo "Set up app version"
newVer=$(jq -r ".version" package.json)
echo "Application Version is $newVer"

#Android
currentVersionName=`awk '/versionName/ {print $2}' android/app/build.gradle`
echo "Current version in the build.gradle file is $currentVersionName"
sed -i '' -e 's/versionName [0-9a-zA-Z -_]*/versionName "'"$newVer"'"/g' android/app/build.gradle
NewVersionName=`awk '/versionName/ {print $2}' android/app/build.gradle`
echo "New version in the build.gradle file is $NewVersionName"

#iOS
echo "Changing the application version in the file Info.plist"
$(/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $newVer"  "ios/vitalopwellnessMobile/Info.plist")

cat  ios/vitalopwellnessMobile/Info.plist
