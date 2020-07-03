https://reactnative.dev/docs/environment-setup
install nodejs
install java
install android
setup environmental variables JAVA HOME and ANDROID HOME
in project file open cmd
open the cmd and run ipconfig. get the ip address and Set the correct server url to serviceurl variable in src/common/CommonData.js file 
npm install
npx react-native run-android

If not run project. open code on android studio and rebuild
then run 'npx react-native run-android' 


if you need the debug version of the application, run the below command in cmd with the project path. run this comman in side android folder of the project.

'gradlew assembleDebug'

once you generated the apk, you will be able to find it in given path => react-address-book(project name)\android\app\build\outputs\apk\debug








