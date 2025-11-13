# 🚀 AWS Amplify Gen1 Demo

이 프로젝트는 **AWS Amplify**를 활용해 React 프론트엔드와 클라우드 백엔드를 통합 배포하는 실습용 예제입니다.  
S3 + CloudFront 기반으로 정적 웹사이트를 호스팅하며, Amplify CLI를 통해 Auth / API / Storage 리소스를 자동으로 관리합니다.

---

## 📁 프로젝트 구조
```
amplify-gen1-demo/
├─ amplify/ # Amplify backend 설정 및 CloudFormation 템플릿
├─ amplify-ui-demo/ # React 프론트엔드 소스 코드
│ ├─ public/
│ └─ src/
├─ amplifyPublishIgnore.json
├─ .gitignore
└─ README.md
```
---

## ⚙️ 주요 기술 스택
- **Frontend:** React (Create React App)
- **Backend:** AWS Amplify CLI (Auth, API, Storage, Hosting)
- **Hosting:** Amazon S3 + CloudFront
- **Deployment:** Amplify CLI (`amplify publish`)

---

## 🧩 실행 방법

### 1️⃣ 설치 및 초기 설정
```
npm install -g @aws-amplify/cli
amplify configure
```
### 2️⃣ 프로젝트 클론 후 패키지 설치
```
git clone https://github.com/your-repo-name/amplify-gen1-demo.git
cd amplify-ui-demo
npm install
```
### 3️⃣ 로컬 실행
```
npm start
```
### 4️⃣ 빌드 및 배포
```
npm run build
npx amplify publish
```
## 참고
https://docs.amplify.aws/gen1/
https://create-react-app.dev/
