# fake-visual-studio
helps you cheat  
![image](https://github.com/Byte-White/fake-visual-studio/assets/51212450/f0e3ee70-0ad8-407b-93ce-222e56ebdc81)

write code on one device, get it in all.
it has a desktop version and a mobile version.
![image](https://github.com/Byte-White/fake-visual-studio/assets/51212450/998123d2-fb13-41f7-9149-efdf9ea0bd82)

## How To Build:
run `npm install` in the main folder

setup your firebase project in https://console.firebase.google.com/ (add firestore and hosting)

make a new file `.env.local` (get them firebase)
```
NEXT_PUBLIC_API_KEY=<your api key>
NEXT_PUBLIC_AUTH_DOMAIN=<your auth domain>
NEXT_PUBLIC_PROJECT_ID=<your project id>
NEXT_PUBLIC_STORAGE_BUCKET=<your storage bucket>
NEXT_PUBLIC_MESSAGING_SENDER_ID=<your messaging sender ID>
NEXT_PUBLIC_APP_ID=<your app ID>
```


run `firebase init`, `npm run build` and `firebase deploy`