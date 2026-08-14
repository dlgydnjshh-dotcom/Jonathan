공용 비밀번호 생성기

- 세 개의 배수를 원하는 정수로 직접 입력할 수 있습니다.
- 설정은 Netlify Blobs에 공용으로 저장됩니다.
- 같은 사이트를 사용하는 모든 브라우저는 약 2초마다 설정을 확인합니다.
- 아무 사용자가 값을 변경하면 다른 사용자 화면도 자동으로 같은 값으로 바뀝니다.

배포:
1. 이 폴더 전체를 GitHub 저장소에 올리고 Netlify에서 그 저장소를 연결하는 방식이 가장 확실합니다.
2. Build command는 비워도 됩니다.
3. Publish directory는 . 입니다.
4. netlify/functions/settings.mjs가 Netlify Function으로 배포되어야 합니다.
5. 배포 후 Netlify의 Functions 화면에 settings 함수가 보이면 정상입니다.
